from braille_transcriptor.transcriptor import BrailleTranscriptor, strategies
from fastapi import FastAPI, File, UploadFile, Response, Body
from fastapi.middleware.cors import CORSMiddleware
import requests
from pydantic import BaseModel
from typing import Dict

import pytesseract
from PIL import Image

key = "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM"

url = "https://translation.googleapis.com/language/translate/v2"
params = {
    "q": "Hello, world!",
    "target": "es",
    "source": "en",
    "key": key
}
headers = {
    "Content-Type": "application/json",
    'referer': 'http://localhost:8000'
}


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

strategies = {
    "en": {"strate": strategies.EglishStrategy, 'lang': "eng"},
    "fr": {"strate": strategies.FrenchStrategy, 'lang': "fra"},
    "ar": {"strate": strategies.ArabicStrategy, 'lang': "ara"},
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
            # {
            #     "name": "Grade 2",
            #     "code": "2"
            # }
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
            # {
            #     "name": "Grade 2",
            #     "code": "2"
            # }
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


def lang_exist(code, options):
    return any(option["code"] == code for option in options)


def grade_exist(code, lang, options):
    for option in options:
        if (lang == option['code']):
            return any(grade['code'] == code for grade in option['grade'])


@ app.post("/transcriptor/")
async def transcript(text: str, source: str, target: str):

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
async def translate(text: str, source_lang: str, source_grade: str, target_lang: str, target_grade: str):
    transcriptor = BrailleTranscriptor(
        strategy=strategies[source_lang]['strate'], grade=int(source_grade))
    text = transcriptor.from_braille(text)
    url = "https://api.mymemory.translated.net/get"
    params = {"q": text, "langpair": f"{source_lang}|{target_lang}"}
    try:
        response = requests.get(url, params=params)
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


@ app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...), lang: str = "eng"):
    if lang == "auto":
        return
    tessLang = strategies[lang]['lang']
    with Image.open(file.file) as img:
        text = pytesseract.image_to_string(img, lang=tessLang)
        printable_text = text[:-1]
    return {"text": printable_text}


@ app.get("/downloadfile/")
async def download_file(braille: str):
    file_contents = braille
    response = Response(content=file_contents)
    response.headers["Content-Disposition"] = "attachment; filename=braille.brf"
    response.headers["Content-Type"] = "text/plain"
    return response


@ app.get("/transcript_options")
async def getTranscribeOptions():
    return transcript_options


@ app.get("/translate_options")
async def getTranslateOptions():
    return translate_options
