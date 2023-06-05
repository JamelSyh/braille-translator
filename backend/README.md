# Braille Transcriptor

This is a web service that allows you to transcribe text to and from Braille. It also has the ability to automatically detect the source language of the text and transcribe it accordingly. 

## Installation

1. Clone this repository `git clone git@github.com:JamelSyh/braille-translator.git` .
2. Create a virtual environment with `python -m venv venv`.
3. Activate the virtual environment with `source venv/bin/activate` (on Linux/macOS) or `venv\Scripts\activate` (on Windows).
4. Install the dependencies with `pip install -r requirements.txt`.


## Usage

### Starting the server

To start the server, run `uvicorn main:app --reload` from the root of the project. This will start the server on `http://localhost:8000`.

### Endpoints
- `/transcriptor`: POST endpoint that accepts a JSON payload with the following parameters:
    - `text`: the text to be transcribed
    - `source`: the language or Braille grade of the source text. Must be one of the options listed in the `/options` endpoint.
    - `target`: the language or Braille grade of the target text. Must be one of the options listed in the `/options` endpoint.
    
    The endpoint returns a JSON payload with the following format:
    ```
    {"result": "<transcribed text>"}
    ```
    
- `/uploadfile`: POST endpoint that accepts a file upload with an image of text. The image is converted to text using pytesseract before being transcribed to Braille. The endpoint returns a JSON payload with the following format:
    ```
    {"text": "<text from image>", "result": "<transcribed text>"}
    ```

- `/downloadfile`: GET endpoint that downloads a file with the transcribed Braille text. Accepts a query parameter with the following format:
    ```
    /downloadfile/?braille=<transcribed text>
    ```

- `/options`: GET endpoint that returns a JSON payload with the available options for the `source` and `target` parameters in the `/transcriptor` endpoint, as well as the available Braille grades. The payload has the following format:
    ```
    {"languages": [<list of language options>], "grades": [<list of Braille grade options>]}
    ```

### Uploading an image for transcription

To transcribe an image, make a POST request to `http://localhost:8000/uploadfile/` with the image file in the body of the request. The server will respond with the transcribed text.

### Transcribing text

To transcribe text, make a POST request to `http://localhost:8000/transcriptor/` with the following parameters:

- `text`: The text to transcribe.
- `source`: The language of the text (or "auto" to detect the language automatically).
- `target`: The grade of Braille to use for the transcription (currently only "1" is supported).

The server will respond with the transcribed text.

##### Request Body
`{
"text": "Hello, world!",
"source": "en",
"target": "1"
}`
- `text` (string, required): The text to be transcribed.
- `source` (string, required): The language code of the input text. Can be `auto` to automatically detect the language.
- `target` (string, required): The Braille grade to transcribe to. Currently only supports Grade 1.

#### Response Body
`{
"result": "⠓⠑⠇⠇⠕⠀⠺⠕⠗⠇⠙⠑"
}`
- `result` (string): The transcribed Braille text and viseversa.

### Downloading a Braille file

To download a Braille file, make a GET request to `http://localhost:8000/downloadfile/` with the following parameter:

- `braille`: The Braille text to download as a file.

The server will respond with a file download.

### Getting a list of supported languages and grades

To get a list of supported languages and grades, make a GET request to `http://localhost:8000/options`. The server will respond with a JSON object containing the available options.

The API can be accessed at `http://localhost:8000`.

#### Response Body
`{
"languages": [
{
"name": "Auto",
"native": "Detect",
"code": "auto"
},
{
"name": "Arabic",
"native": "العربية",
"code": "ar"
},
{
"name": "English",
"native": "English",
"code": "en"
},
{
"name": "French",
"native": "Français",
"code": "fr"
}
],
"grades": [
{
"name": "Grade 1",
"code": "1"
}
]
}`
- `languages` (array): The list of supported languages.
- `grades` (array): The list of supported braille grades.

    
## Acknowledgements
This API is built with FastAPI and pytesseract.

