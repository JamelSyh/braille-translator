import TranslInputTextArea from '../components/translInputTextArea';
import TranslOutputTextArea from '../components/translOutputTextArea';
import { useDispatch, useSelector } from "react-redux/es/exports";
import { switchOption, switchLang, switchText } from "../redux/actions";
import ConvertTranslate from '../components/convertTranslate';


function Translator() {

  const dispatch = useDispatch();

  const swap = () => {
    dispatch(switchOption());
    dispatch(switchLang());
    dispatch(switchText());
  }


  return (
    <>
      <ConvertTranslate />
      <div>
        <div className="container">
          <TranslInputTextArea />
          <div className="center">
            <div className="swap-position" onClick={swap}>
              <ion-icon name="swap-horizontal-outline"></ion-icon>
            </div>
          </div>
          <TranslOutputTextArea />
        </div>
      </div>
    </>
  );
}

export default Translator;
