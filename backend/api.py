from braille_transcriptor.transcriptor import BrailleTranscriptor, strategies
from fastapi import FastAPI, File, UploadFile, Response
from fastapi.middleware.cors import CORSMiddleware

import pytesseract
from PIL import Image


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

languages = [
    {
        "name": "Auto",
        "native": "Detect",
        "code": "auto",
    },
    {
        "name": "Arabic",
        "native": "العربية",
        "code": "ar",
    },
    {
        "name": "English",
        "native": "English",
        "code": "en",
    },
    {
        "name": "French",
        "native": "Francais",
        "code": "fr",
    },
]


grades = [
    {
        "name": "Grade 1",
        "code": "1"
    },
    {
        "name": "Grade 2",
        "code": "2"
    }
]

input_translate = [
    {
        "name": "Arabic",
        "native": "العربية",
        "code": "ar",
    },
    {
        "name": "English",
        "native": "English",
        "code": "en",
    },
    {
        "name": "French",
        "native": "Francais",
        "code": "fr",
    },
]
output_translate = [
    {
        "name": "Arabic",
        "native": "العربية",
        "code": "ar",
    },
    {
        "name": "English",
        "native": "English",
        "code": "en",
    },
    {
        "name": "French",
        "native": "Francais",
        "code": "fr",
    },
]


def exists(code, options):
    return any(option["code"] == code for option in options)


@app.post("/transcriptor/")
async def translate_to_braille(text: str, source: str, target: str):

    if (source == "auto" or target == "auto"):
        return
    if (exists(source, languages)):
        transcriptor = BrailleTranscriptor(
            strategy=strategies[source]['strate'], grade=int(target))
        return {"result": transcriptor.to_braille(text)}
    elif (exists(source, grades)):
        transcriptor = BrailleTranscriptor(
            strategy=strategies[target]['strate'], grade=int(source))
        return {"result": transcriptor.from_braille(text)}


@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...), lang: str = "eng", timestamp=""):
    if lang == "auto":
        return
    tessLang = strategies[lang]['lang']
    with Image.open(file.file) as img:
        text = pytesseract.image_to_string(img, lang=tessLang)
        printable_text = text[:-1]
    return {"text": printable_text}


@app.get("/downloadfile/")
async def download_file(braille: str):
    file_contents = braille
    response = Response(content=file_contents)
    response.headers["Content-Disposition"] = "attachment; filename=braille.brf"
    response.headers["Content-Type"] = "text/plain"
    return response


@app.get("/Transcript_options")
async def getTranscribeOptions():
    return {"languages": languages, "grades": grades}


@app.get("/Translate_options")
async def getTranslateOptions():
    return {"languages": input_translate, "grades": output_translate}
