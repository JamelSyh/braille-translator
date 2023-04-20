import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";
import { Keyboard, UploadOne, Close, ViewGridCard, Voice, VolumeNotice, PauseOne } from "@icon-park/react";
import { inputLang, inputText, keyboard, board, pending, outputLang } from "../redux/actions";
import DropdownIn from './dropdownIn';
import brailleToNum from '../constants/brailleToNum';
import brailleKeys from "../constants/brailleKeys";
import '../App.css';

function TranslInputTextArea() {

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

  const handleKeyPress = (e) => {
    if (brailleMode) {
      if (outLang.code == "auto")
        dispatch(outputLang(outOpt[2]));
      const newKey = brailleKeys[e.key.toLowerCase()];
      if (newKey) {
        setKey(newKey);
        setBrailleInput(brailleInput + newKey)
      }
      e.preventDefault();
    }
  };


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
      </div>
    </div >
  );
}

export default TranslInputTextArea;
