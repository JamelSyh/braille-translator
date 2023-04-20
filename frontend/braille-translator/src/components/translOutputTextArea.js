
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";
import { outputText } from "../redux/actions";
import DropdownOut from './dropdownOut';
import { DownloadOne, Copy } from "@icon-park/react";
import '../App.css';

function TranslOutputTextArea({ options }) {


  const dispatch = useDispatch();
  const outText = useSelector(state => state.text.outputText);
  const inLang = useSelector(state => state.language.inLang);
  const pending = useSelector(state => state.text.pending);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(outText);
  }

  const handleDownload = async () => {
    const response = await fetch(`http://localhost:8000/downloadfile/?braille=${outText}`);
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

  return (
    <div className="card output-wrapper">
      <div className="to">
        <span className="heading">To :</span>
        <DropdownOut id="out" />
        <DropdownOut id="out" />
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

export default TranslOutputTextArea;

