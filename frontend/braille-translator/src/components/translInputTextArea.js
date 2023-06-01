import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";
import { Keyboard, UploadOne, Close, ViewGridCard } from "@icon-park/react";
import { inputText, keyboard, board } from "../redux/actions";
import TransDropdown from './transDropdown';
import TransDropdownGrade from "./transDropdownGrade";
import brailleToNum from '../constants/brailleToNum';
import brailleKeys from "../constants/brailleKeys";
import '../App.css';

function TranslInputTextArea() {

  const dispatch = useDispatch();
  const inText = useSelector(state => state.text.inputText);
  const inTrans = useSelector(state => state.language.inTrans);
  const inTransOpt = useSelector(state => state.options.inTransOpt);
  const kb = useSelector(state => state.functions.keyboard);
  const brailleBoard = useSelector(state => state.functions.board);

  // const [selectedFile, setSelectedFile] = useState(null);
  const [brailleInput, setBrailleInput] = useState("");
  const [brailleMode, setBrailleMode] = useState("");
  const [key, setKey] = useState('');

  const handleClear = () => {
    dispatch(inputText(""));
    // setSelectedFile(null);
  }

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  // const handleUpload = async () => {
  //   if (inTrans[0].code === "auto") {
  //     dispatch(inputLang(inTransOpt[2]));
  //   }
  //   const formData = new FormData();
  //   formData.append("file", selectedFile);
  //   await axios
  //     .post("http://localhost:8000/uploadfile", formData, {
  //       params: {
  //         lang: inTrans[0].code
  //       }
  //     })
  //     .then((response) => {
  //       dispatch(inputText(response.data.text));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleKeyPress = (event) => {
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

  // useEffect(() => {
  //   if (selectedFile) {
  //     dispatch(pending(true));
  //     handleUpload();
  //   }
  // }, [selectedFile, inTrans[0], dispatch]);

  // useEffect(() => {
  //   if (inTrans[0].code === "1" || inTrans.code === "2") {
  //     setBrailleMode(true);
  //   }
  //   else {
  //     setBrailleMode(false);
  //     dispatch(board(false));
  //     inTransOpt.forEach((lang) => {
  //       if (lang === inTrans[0])
  //         dispatch(outputOptions(lang.grade));
  //     })
  //   }
  // }, [inTrans[0]]);

  return (
    <div className="card input-wrapper">

      <div className="from">
        <span className="heading">From :</span>
        <TransDropdown id="in" opt={inTransOpt} lang={inTrans} />
        <TransDropdownGrade id="in" opt={inTrans} lang={inTrans} />
      </div>
      <div className="text-area">
        {inText !== "" && <div className="clear-btn" onClick={handleClear}> <Close theme="outline" size="23" strokeWidth={3} /></div>}
        <textarea id="input-text" cols="30" rows="6" value={inText} onChange={event => { dispatch(inputText(event.target.value)); /* setSelectedFile(null); */ }} onKeyDown={handleKeyPress}>
        </textarea>
        <div className="chars"><span id="input-chars">{inText.length}</span> / 5000</div>
      </div>
      <div className="card-bottom">
        {/* <label htmlFor="upload-document"> */}
        {/*   <div className="icoon" > */}
        {/*     <UploadOne size="30" strokeWidth={3} /> */}
        {/*   </div> */}
        {/*   <input type="file" onChange={handleFileChange} id="upload-document" hidden /> */}
        {/* </label> */}

        <div className="icoon" onClick={() => {
          dispatch(keyboard(!kb));
          dispatch(board(false));
        }} >
          <Keyboard size="30" strokeWidth={3} />
        </div>
        <div className="icoon" onClick={() => {
          dispatch(board(!brailleBoard));
          dispatch(keyboard(false));
        }} >
          <ViewGridCard size="30" strokeWidth={3} />
        </div>

      </div>
    </div >
  );
}

export default TranslInputTextArea;
