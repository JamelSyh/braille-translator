from braille_transcriptor.transcriptor import BrailleTranscriptor, strategies
from braille_transcriptor.braille_alphabets import Dictionary, transcript_options, translate_options, search_options
from fastapi import FastAPI, HTTPException, Security, File, UploadFile, Response
from fastapi.security import APIKeyHeader
from fastapi.middleware.cors import CORSMiddleware
import requests
import os

from dotenv import load_dotenv
# Load environment variables from .env file
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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


@ app.post("/transcriptor")
async def transcript(text: str, source: str, target: str, key: str = ""):

    validate_api_key(key)

    if (source == "auto" or target == "auto"):
        return
    transcriptor = BrailleTranscriptor(
        text, source, target)
    return {"result": transcriptor.get_results()}


@app.post("/translator")
async def translate(text: str, source_lang: str, source_grade: str, target_lang: str, target_grade: str, key: str = ""):
    validate_api_key(key)
    transcriptor = BrailleTranscriptor(text, source_grade, source_lang)
    result_text = transcriptor.get_results()

    url = "https://api.mymemory.translated.net/get"
    params = {"q": result_text, "langpair": f"{source_lang}|{target_lang}"}

    try:
        response = requests.get(url, params=params)
    except:
        return {"result": result_text}

    if (result_text):
        translation = response.json()["responseData"]["translatedText"]

        transcriptor = BrailleTranscriptor(
            translation, target_lang, target_grade)
        return {"result": transcriptor.get_results()}
    else:
        return


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
    if not any(option["code"] == lang for option in transcript_options):
        raise HTTPException(
            status_code=403, detail="enter a valid language (en, ar, fr)")

    validate_api_key(key)
    dictt = strategies[lang]['dictionary']
    contractions = []
    contractionslist = dictt.grade2_map[
        'standalone'] | dictt.grade2_map['group_sign']

    for item in dictt.grade2_map['standalone']:
        contractions.append(
            {"word": item, "contraction": contractionslist[item], "braille": BrailleTranscriptor(
                contractionslist[item], lang, int("1"))})
    return contractions


@ app.get("/search_options")
async def searchOptions(key: str = ""):
    validate_api_key(key)
    return search_options
