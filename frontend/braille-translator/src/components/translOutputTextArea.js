
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";
import { outputText } from "../redux/actions";
import TransDropdown from "./transDropdown";
import TransDropdownGrade from "./transDropdownGrade";
import { DownloadOne, Copy } from "@icon-park/react";
import '../App.css';

function TranslOutputTextArea() {


  const dispatch = useDispatch();
  const outText = useSelector(state => state.text.outputText);
  const outTrans = useSelector(state => state.language.outTrans);
  const outTransOpt = useSelector(state => state.options.outTransOpt);
  const inLang = useSelector(state => state.language.inLang);
  const pending = useSelector(state => state.text.pending);
  const url = useSelector(state => state.backend.url);
  const dotwise_api_key = useSelector(state => state.backend.dotwiseApiKey);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(outText);
  }

  const handleDownload = async () => {
    const response = await fetch(`${url}downloadfile/?braille=${outText}&key=${dotwise_api_key}`);
    const blob = await response.blob();
    const tempUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = tempUrl;
    link.download = "braille.brf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(tempUrl);
  };


  const placeholderHandler = () => {
    return pending ? 'translating...' : "translation"
  }

  return (
    <div className="card output-wrapper">
      <div className="to">
        <span className="heading">To :</span>
        <TransDropdown id="out" opt={outTransOpt} lang={outTrans} />
        <TransDropdownGrade id="out" opt={outTrans} lang={outTrans} />
      </ div>
      <textarea id="output-text" cols="30" rows="6" placeholder={placeholderHandler()} disabled value={outText ? outText : ""} onChange={event => dispatch(outputText(event.target.value))}></textarea>
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

