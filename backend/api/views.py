from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from .models import Blog, Comment, Profile
from .serializers import BlogSerializer, CommentSerializer, ProfileSerializer, CommentCreateSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponseBadRequest, FileResponse

from braille_transcriptor.transcriptor import BrailleTranscriptor
from braille_transcriptor.strategy_factory import strategies_dict
from braille_transcriptor.braille_alphabets import Dictionary, transcript_options, translate_options, search_options
import requests
import os

# from dotenv import load_dotenv
# Load environment variables from .env file
# load_dotenv()

# strategies = {
#     "en": {"strate": strategies.EglishStrategy, 'lang': "eng", 'dictionary': Dictionary.English.value},
#     "fr": {"strate": strategies.FrenchStrategy, 'lang': "fra", 'dictionary': Dictionary.French.value},
#     "ar": {"strate": strategies.ArabicStrategy, 'lang': "ara", 'dictionary': Dictionary.Arabic.value},
#     # add strategies here
# }

# Validate API Key


def validate_api_key(api_key):
    # Check if the api_key is valid and matches your expected value
    if api_key != os.environ.get("ENV_API_KEY"):
        return Response({'detail': 'Invalid API key'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
def transcript(request):
    text = request.data.get('text')
    source = request.data.get('source')
    target = request.data.get('target')
    key = request.data.get('key', '')

    if source == "auto" or target == "auto":
        return Response(status=status.HTTP_204_NO_CONTENT)

    # validate_api_key(key)

    transcriptor = BrailleTranscriptor(text, source, target)
    result = transcriptor.get_results()
    return Response({'result': result})


@api_view(['POST'])
def translate(request):
    text = request.data.get('text')
    source_lang = request.data.get('source_lang')
    source_grade = request.data.get('source_grade')
    target_lang = request.data.get('target_lang')
    target_grade = request.data.get('target_grade')
    key = request.data.get('key', '')

    # validate_api_key(key)

    transcriptor = BrailleTranscriptor(text, source_grade, source_lang)
    result_text = transcriptor.get_results()

    url = "https://api.mymemory.translated.net/get"
    params = {"q": result_text, "langpair": f"{source_lang}|{target_lang}"}

    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
    except requests.exceptions.RequestException:
        return Response({'result': result_text})

    translation = response.json()["responseData"]["translatedText"]

    transcriptor = BrailleTranscriptor(translation, target_lang, target_grade)
    result = transcriptor.get_results()
    return Response({'result': result})


@api_view(['GET'])
def download_file(request):
    braille = request.query_params.get('braille')
    key = request.query_params.get('key', '')

    # validate_api_key(key)

    file_contents = braille
    response = FileResponse(content=file_contents, content_type='text/plain')
    response['Content-Disposition'] = 'attachment; filename=braille.brf'
    return response


@api_view(['GET'])
def get_transcribe_options(request):
    key = request.query_params.get('key', '')

    # validate_api_key(key)

    return Response(transcript_options)


@api_view(['GET'])
def get_translate_options(request):
    key = request.query_params.get('key', '')

    # validate_api_key(key)

    return Response(transcript_options)


@api_view(['GET'])
def get_contraction_list(request):
    lang = request.query_params.get('lang', '')
    key = request.query_params.get('key', '')

    validate_api_key(key)

    if not any(option["code"] == lang for option in transcript_options):
        return Response({'detail': 'Enter a valid language (en, ar, fr)'}, status=status.HTTP_403_FORBIDDEN)

    dictt = strategies_dict[lang]['dictionary']
    contractions = []
    contractionslist = dictt.grade2_map['standalone'] | dictt.grade2_map['group_sign']

    for item in dictt.grade2_map['standalone']:
        braille = BrailleTranscriptor(
            contractionslist[item], lang, int("1")).get_results()
        contractions.append({
            "word": item,
            "contraction": contractionslist[item],
            "braille": braille
        })

    return Response(contractions)


@api_view(['GET'])
def get_search_options(request):
    key = request.query_params.get('key', '')

    validate_api_key(key)

    return Response(search_options)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getBlogs(request):
    category = request.GET.get('category', None)
    if category is not None:
        blogs = Blog.objects.filter(category=category)
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)
    else:
        blogs = Blog.objects.all()
        serializer = BlogSerializer(blogs, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def getBlog(request, pk):
    blog = Blog.objects.get(pk=pk)
    blogSerializer = BlogSerializer(blog, many=False)
    return Response(blogSerializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyBlogs(request):
    user = request.user
    blogs = Blog.objects.filter(author=user)
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBlog(request):
    data = request.data
    user = Profile.objects.get(id=data['author'])
    serializer = BlogSerializer(data=data)
    if serializer.is_valid():
        serializer.save(author=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateBlog(request, pk):
    data = request.data
    blog = Blog.objects.get(pk=pk)
    serializer = BlogSerializer(instance=blog, data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteBlog(request, pk):
    blog = Blog.objects.get(pk=pk)
    blog.delete()
    return Response('Item successfully deleted!', status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def getComments(request, pk):
    comments = Comment.objects.filter(blog=pk)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createComment(request):
    data = request.data
    blog = Blog.objects.get(id=data['blog'])
    serializer = CommentCreateSerializer(data=data)
    if serializer.is_valid():
        serializer.save(blog=blog)
        comment = Comment.objects.latest('id')
        commentSerializer = CommentSerializer(comment, many=False)
        return Response(commentSerializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteComment(request, pk):
    comment = Comment.objects.get(pk=pk)
    comment.delete()
    return Response('Item successfully deleted!', status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = Profile.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password'],
            photo=data['photo'],
            bio=data['bio']
        )
        serializer = ProfileSerializer(user, many=False)
        return Response(serializer.data)

    except:
        message = {'detail': 'Profile with this username already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getCategory(request):
    return JsonResponse([category[1] for category in Blog.CHOICES], safe=False)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addLike(request, pk):
    blog = Blog.objects.get(pk=pk)
    blog.likes.add(request.data['user'])
    blog.save()
    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def removeLike(request, pk):
    blog = Blog.objects.get(pk=pk)
    blog.likes.remove(request.data['user'])
    blog.save()
    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfile(request, pk):
    user = Profile.objects.get(pk=pk)
    serializer = ProfileSerializer(user, many=False)
    return Response(serializer.data)
