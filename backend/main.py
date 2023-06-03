from braille_transcriptor.transcriptor import BrailleTranscriptor, strategies
from braille_transcriptor.braille_alphabets import Dictionary
from fastapi import FastAPI, HTTPException, Security, File, UploadFile, Response
from fastapi.security import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from pydantic import BaseModel
from typing import Dict

# from dotenv import load_dotenv

# Load environment variables from .env file
# load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"
                   ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

env_api_key = os.environ.get("ENV_API_KEY")

API_KEY_NAME = "X-API-Key"
api_key_scheme = APIKeyHeader(name=API_KEY_NAME)


# Validate API Key
def validate_api_key(api_key: str = Security(api_key_scheme)):
    # Check if the api_key is valid and matches your expected value
    if api_key != env_api_key:
        raise HTTPException(status_code=403, detail="Invalid API key")


strategies = {
    "en": {"strate": strategies.EglishStrategy, 'lang': "eng", 'dictionary': Dictionary.English.value},
    "fr": {"strate": strategies.FrenchStrategy, 'lang': "fra", 'dictionary': Dictionary.French.value},
    "ar": {"strate": strategies.ArabicStrategy, 'lang': "ara", 'dictionary': Dictionary.Arabic.value},
    # add strategies here
}


transcript_options = [
    {
        "name": "Auto",
        "native": "Detect",
        "code": "auto",
        'grade': [
                {
                    "name": "Grade 1",
                    "code": "1"
                },
            {
                    "name": "Grade 2",
                    "code": "2"
            }
        ],
    },

    {
        "name": "Arabic",
        "native": "العربية",
        "code": "ar",
        'grade': [
            {
                "name": "Grade 1",
                "code": "1"
            },
            {
                "name": "Grade 2",
                "code": "2"
            }
        ],
    },

    {
        "name": "English",
        "native": "english",
        "code": "en",
        'grade': [
            {
                "name": "Grade 1",
                "code": "1"
            },
            {
                "name": "Grade 2",
                "code": "2"
            }
        ],
    },
    {
        "name": "French",
        "native": "francais",
        "code": "fr",
        'grade': [
            {
                "name": "Grade 1",
                "code": "1"
            },
            {
                "name": "Grade 2",
                "code": "2"
            }
        ],
    },
]

translate_options = [
    [
        {
            "name": "English",
            "native": "english",
            "code": "en",
            'grade':
            {
                "name": "Grade 1",
                "code": "1"
            },

        },
        [
            {
                "name": "Grade 1",
                "code": "1"
            },
            {
                "name": "Grade 2",
                "code": "2"
            }
        ],
    ],
    [
        {
            "name": "French",
            "native": "francais",
            "code": "fr",
            'grade':
            {
                "name": "Grade 1",
                "code": "1"
            },
        },
        [
            {
                "name": "Grade 1",
                "code": "1"
            },
            {
                "name": "Grade 2",
                "code": "2"
            },
        ],
    ],
    [
        {
            "name": "Arabic",
            "native": "العربية",
            "code": "ar",
            'grade':
            {
                "name": "Grade 1",
                "code": "1"
            },
        },
        [
            {
                "name": "Grade 1",
                "code": "1"
            },
            # {
            #     "name": "Grade 2",
            #     "code": "2"
            # }
        ],
    ],
]

search_options = [
    {'name': 'English', 'code': 'en'},
    {'name': 'Arabic', 'code': 'ar'},
    {'name': 'French', 'code': 'fr'}
]


def lang_exist(code, options):
    return any(option["code"] == code for option in options)


def grade_exist(code, lang, options):
    for option in options:
        if (lang == option['code']):
            return any(grade['code'] == code for grade in option['grade'])


@ app.post("/transcriptor/")
async def transcript(text: str, source: str, target: str, key: str = ""):
    validate_api_key(key)
    if (source == "auto" or target == "auto"):
        return
    if (lang_exist(source, transcript_options)):
        transcriptor = BrailleTranscriptor(
            strategy=strategies[source]['strate'], grade=int(target))
        return {"result": transcriptor.to_braille(text)}
    elif (grade_exist(source, target, transcript_options)):
        transcriptor = BrailleTranscriptor(
            strategy=strategies[target]['strate'], grade=int(source))
        return {"result": transcriptor.from_braille(text)}


@app.post("/translator/")
async def translate(text: str, source_lang: str, source_grade: str, target_lang: str, target_grade: str, key: str = ""):
    validate_api_key(key)
    transcriptor = BrailleTranscriptor(
        strategy=strategies[source_lang]['strate'], grade=int(source_grade))
    text = transcriptor.from_braille(text)
    url = "https://api.mymemory.translated.net/get"
    params = {"q": text, "langpair": f"{source_lang}|{target_lang}"}
    try:
        response = requests.get(url, params=params)
        # print(response)
    except:
        return {"result": text}

    if (text):
        translation = response.json()["responseData"]["translatedText"]
        transcriptor = BrailleTranscriptor(
            strategy=strategies[target_lang]['strate'], grade=int(target_grade))
        # print(text, translation)
        return {"result": transcriptor.to_braille(translation)}
    else:
        return


# @ app.post("/uploadfile/")
# async def create_upload_file(file: UploadFile = File(...), lang: str = "en", key: str = ""):
#     validate_api_key(key)
#     if lang == "auto":
#         return
#     tessLang = strategies[lang]['lang']
#     with Image.open(file.file) as img:
#         text = pytesseract.image_to_string(img, lang=tessLang)
#         printable_text = text[:-1]
#     return {"text": printable_text}


@ app.get("/downloadfile/")
async def download_file(braille: str, key: str = ""):
    validate_api_key(key)
    file_contents = braille
    response = Response(content=file_contents)
    response.headers["Content-Disposition"] = "attachment; filename=braille.brf"
    response.headers["Content-Type"] = "text/plain"
    return response


@ app.get("/transcript_options")
async def getTranscribeOptions(key: str = ""):
    validate_api_key(key)
    return transcript_options


@ app.get("/translate_options")
async def getTranslateOptions(key: str = ""):
    validate_api_key(key)
    return translate_options


@ app.post("/contraction_list")
async def contraction_list(lang: str, key: str = ""):
    validate_api_key(key)
    dictt = strategies[lang]['dictionary']
    contractions = []
    contractionslist = dictt.grade2_map[
        'standalone'] | dictt.grade2_map['group_sign']

    for item in dictt.grade2_map['standalone']:
        contractions.append(
            {"word": item, "contraction": contractionslist[item], "braille": BrailleTranscriptor(
                strategy=strategies[lang]['strate'], grade=int("1")).to_braille(contractionslist[item])})
    return contractions


@ app.get("/search_options")
async def searchOptions(key: str = ""):
    validate_api_key(key)
    return search_options
