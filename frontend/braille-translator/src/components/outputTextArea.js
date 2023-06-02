import { useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";
import { outputText, inputOptions } from "../redux/actions";
import Dropdown from './dropdown';
import { DownloadOne, Copy } from "@icon-park/react";
import '../App.css';

function OutputTextArea() {


  const dispatch = useDispatch();
  const outText = useSelector(state => state.text.outputText);
  const inLang = useSelector(state => state.language.inLang);
  const outLang = useSelector(state => state.language.outLang);
  const inOpt = useSelector(state => state.options.inOpt);
  const outOpt = useSelector(state => state.options.outOpt);
  const pending = useSelector(state => state.text.pending);
  const url = "https://dotwise-backend.onrender.com";


  const copyToClipboard = () => {
    navigator.clipboard.writeText(outText);
  }

  const handleDownload = async () => {
    const response = await fetch(`${url}/downloadfile/?braille=${outText}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "braille.brf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };


  const placeholderHandler = () => {
    if (inLang.code === 'ar')
      return pending ? 'جار الترجمة...' : 'الترجمة';
    else
      return pending ? 'translating...' : "translation"
  }

  useEffect(() => {
    if (outLang.code !== "1" && outLang.code !== "2") {
      outOpt.forEach((lang) => {
        if (lang === outLang)
          dispatch(inputOptions(lang.grade));
      });
    }
  }, [outLang])

  return (
    <div className="card output-wrapper">
      <div className="to">
        <span className="heading">To :</span>
        <Dropdown id="out" opt={outOpt} lang={outLang} />
      </ div>
      <textarea id="output-text" dir={inLang.code === 'ar' ? 'rtl' : ''} cols="30" rows="6" placeholder={placeholderHandler()} disabled value={outText ? outText : ""} onChange={event => dispatch(outputText(event.target.value))}></textarea>
      {outText &&
        <div className="card-bottom">
          {(inLang.code !== "1" && inLang.code !== "2") && <div className="icoon" onClick={handleDownload} >
            <DownloadOne size="30" strokeWidth={3} />
          </div>}
          <div className="icoon" onClick={copyToClipboard} >
            <Copy theme="outline" size="25" strokeWidth={3} />
          </div>
        </div>
      }
    </div>
  );
}

export default OutputTextArea;

