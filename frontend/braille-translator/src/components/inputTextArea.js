import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";
import { useSpeechSynthesis } from 'react-speech-kit';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Keyboard, UploadOne, Close, ViewGridCard, Voice, VolumeNotice, PauseOne } from "@icon-park/react";
import { inputLang, inputText, keyboard, board, pending, outputLang, outputOptions } from "../redux/actions";
import Dropdown from './dropdown';
import brailleToNum from "../constants/brailleToNum";
import brailleKeys from "../constants/brailleKeys";
import '../App.css';

function InputTextArea() {

  const dispatch = useDispatch();
  const inText = useSelector(state => state.text.inputText);
  const inLang = useSelector(state => state.language.inLang);
  const outLang = useSelector(state => state.language.outLang);
  const inOpt = useSelector(state => state.options.inOpt);
  const outOpt = useSelector(state => state.options.outOpt);
  const kb = useSelector(state => state.functions.keyboard);
  const brailleBoard = useSelector(state => state.functions.board);
  const url = "https://dotwise-backend.onrender.com";
  // const pend = useSelector(state => state.text.pending);

  const [selectedFile, setSelectedFile] = useState(null);
  const [brailleMode, setBrailleMode] = useState(false);
  const [brailleInput, setBrailleInput] = useState("")
  const [key, setKey] = useState('');
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
  const voiceList = {
    'auto': voices[1],
    'en': voices[1],
    'fr': voices[6],
  }
  const speechList = {
    'auto': '',
    'en': 'en-US',
    'fr': 'fr-FR',
    'ar': 'ar-SA'
  }
  const { transcript, resetTranscript, listening } = useSpeechRecognition();


  const handleStartRecognition = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true, language: speechList[inLang.code] });
    }
  };


  const handleClear = () => {
    dispatch(inputText(""));
    setSelectedFile(null);
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (inLang.code === "auto") {
      dispatch(inputLang(inOpt[2]));
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    await axios
      .post(`${url}/uploadfile`, formData, {
        params: {
          lang: inLang.code
        }
      })
      .then((response) => {
        dispatch(inputText(response.data.text));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeyPress = (event) => {
    if (brailleMode) {
      if (outLang.code == "auto")
        dispatch(outputLang(outOpt[2]));
      const newKey = brailleKeys[event.key.toLowerCase()];
      if (newKey) {
        setKey(newKey);
        setBrailleInput(brailleInput + newKey)
      }
      if (event.ctrlKey || event.metaKey) {
        event.stopPropagation();
        // Allow Ctrl+.. (or Cmd+C on Mac)
        return;
      }
      event.preventDefault();
    }
  };

  const handleSpeech = () => {
    if (listening)
      SpeechRecognition.stopListening();
    if (inLang.code === "auto") {
      dispatch(inputLang(inOpt[2]));
    }
    if (inText && !speaking && voiceList[inLang.code]) {
      speak({ text: inText, voice: voiceList[inLang.code] });
    }
  }

  useEffect(() => {
    dispatch(inputText(transcript));
  }, [transcript, dispatch]);

  useEffect(() => {
    const len = brailleInput.length
    if (key) {
      if (key === "backspace") {
        dispatch(inputText(inText.slice(0, inText.length - 1)));
        setBrailleInput(key);
      } else if (key == " ") {
        dispatch(inputText(inText + "  "));
        setBrailleInput("");
      }
      else if (key <= brailleInput.charAt(len - 2)) {
        if (brailleToNum[key])
          dispatch(inputText(inText + brailleToNum[key]));
        setBrailleInput(key);
      } else {
        if (brailleToNum[brailleInput])
          dispatch(inputText(inText.slice(0, inText.length - 1) + brailleToNum[brailleInput]));
      }
      setKey('');
    }
  }, [brailleInput, key]);


  useEffect(() => {
    if (selectedFile) {
      dispatch(pending(true));
      handleUpload();
    }
  }, [selectedFile, inLang, dispatch]);

  useEffect(() => {
    if (inLang.code === "1" || inLang.code === "2") {
      setBrailleMode(true);
    }
    else {
      setBrailleMode(false);
      dispatch(board(false));
      inOpt.forEach((lang) => {
        if (lang === inLang)
          dispatch(outputOptions(lang.grade));
      })
    }
  }, [inLang]);

  return (
    <div className="card input-wrapper">

      <div className="from">
        <span className="heading">From :</span>
        <Dropdown id="in" opt={inOpt} lang={inLang} />
      </div>
      <div className="text-area">
        {inText !== "" && inLang.code !== "ar" && <div className="clear-btn" onClick={handleClear}> <Close theme="outline" size="23" strokeWidth={3} /></div>}
        <textarea id="input-text" cols="30" rows="6" dir={inLang.code === 'ar' ? 'rtl' : ''} value={inText} onChange={event => { dispatch(inputText(event.target.value)); setSelectedFile(null); }} onKeyDown={handleKeyPress}>
        </textarea>
        {inText !== "" && inLang.code === "ar" && <div className="clear-btn" onClick={handleClear}> <Close theme="outline" size="23" strokeWidth={3} /></div>}
        <div className="chars"><span id="input-chars">{inText.length}</span> / 5000</div>
      </div>
      <div className="card-bottom">
        <label htmlFor="upload-document">
          <div className="icoon" >
            <UploadOne size="30" strokeWidth={3} />
          </div>
          <input type="file" onChange={handleFileChange} id="upload-document" hidden />
        </label>

        <div className="icoon" onClick={() => {
          dispatch(keyboard(!kb));
          dispatch(board(false));
        }} >
          <Keyboard size="30" strokeWidth={3} />
        </div>
        {brailleMode &&
          <div className="icoon" onClick={() => {
            dispatch(board(!brailleBoard));
            dispatch(keyboard(false));
          }} >
            <ViewGridCard size="30" strokeWidth={3} />
          </div>
        }

        {!brailleMode &&
          <>
            {inText &&
              < div className="icoon" onClick={handleSpeech}>
                <VolumeNotice theme="outline" size="30" strokeWidth={3} />
              </div>
            }

            < div className="icoon" onClick={handleStartRecognition} hidden={listening}>
              <Voice theme="outline" size="30" strokeWidth={3} />
            </div>
            < div className="icoon" onClick={handleStartRecognition} hidden={!listening}>
              <PauseOne theme="outline" size="30" strokeWidth={3} />
            </div>
          </>
        }
      </div>
    </div >
  );
}

export default InputTextArea;
