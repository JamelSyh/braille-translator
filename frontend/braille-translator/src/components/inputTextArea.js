import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";
import { useSpeechSynthesis } from 'react-speech-kit';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Keyboard, UploadOne, Close, ViewGridCard, Voice, VolumeNotice, PauseOne } from "@icon-park/react";
import { inputLang, inputText, keyboard, board, pending, outputLang } from "../redux/actions";
import DropdownIn from './dropdownIn';
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
  const pend = useSelector(state => state.text.pending);

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

  useEffect(() => {
    dispatch(inputText(transcript));
  }, [transcript, dispatch]);

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
      .post("http://localhost:8000/uploadfile", formData, {
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
  let brailleToNum = {
    '': ' ', '6': '⠠', '5': '⠐', '56': '⠰', '4': '⠈', '46': '⠨', '45': '⠘',
    '456': '⠸', '3': '⠄', '36': '⠤', '35': '⠔', '356': '⠴', '34': '⠌',
    '346': '⠬', '345': '⠜', '3456': '⠼', '2': '⠂', '26': '⠢', '25': '⠒',
    '256': '⠲', '24': '⠊', '246': '⠪', '245': '⠚', '2456': '⠺', '23': '⠆',
    '236': '⠦', '235': '⠖', '2356': '⠶', '234': '⠎', '2346': '⠮', '2345': '⠞',
    '23456': '⠾', '1': '⠁', '16': '⠡', '15': '⠑', '156': '⠱', '14': '⠉',
    '146': '⠩', '145': '⠙', '1456': '⠹', '13': '⠅', '136': '⠥', '135': '⠕',
    '1356': '⠵', '134': '⠍', '1346': '⠭', '1345': '⠝', '13456': '⠽', '12': '⠃',
    '126': '⠣', '125': '⠓', '1256': '⠳', '124': '⠋', '1246': '⠫', '1245': '⠛',
    '12456': '⠻', '123': '⠇', '1236': '⠧', '1235': '⠗', '12356': '⠷', '1234': '⠏',
    '12346': '⠯', '12345': '⠟', '123456': '⠿',
  };

  const inputList = {
    'f': '1',
    'd': '2',
    's': '3',
    'j': '4',
    'k': '5',
    'l': '6',
    ' ': ' ',
    'backspace': 'backspace',
    'enter': 'enter'
  }
  const handleKeyPress = (e) => {
    if (brailleMode) {
      if (outLang.code == "auto")
        dispatch(outputLang(outOpt[2]));
      const newKey = inputList[e.key.toLowerCase()];
      if (newKey) {
        setKey(newKey);
        setBrailleInput(brailleInput + newKey)
      }
      e.preventDefault();
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
    }
  }, [inLang]);

  return (
    <div className="card input-wrapper">

      <div className="from">
        <span className="heading">From :</span>
        <DropdownIn id="in" />
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
