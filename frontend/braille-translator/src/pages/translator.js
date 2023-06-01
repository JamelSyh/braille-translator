import TranslInputTextArea from '../components/translInputTextArea';
import TranslOutputTextArea from '../components/translOutputTextArea';
import { useDispatch, useSelector } from "react-redux/es/exports";
import { switchTransOption, switchTransLang, switchText } from "../redux/actions";
import ConvertTranslate from '../components/convertTranslate';
import VKeyboard from '../components/keyboard';
import BrailleBoard from '../components/brailleBoard';


function Translator() {

  const dispatch = useDispatch();
  const kb = useSelector(state => state.functions.keyboard);
  const brailleBoard = useSelector(state => state.functions.board);
  const inTrans = useSelector(state => state.language.inTrans);

  const swap = () => {
    dispatch(switchTransOption());
    dispatch(switchTransLang());
    dispatch(switchText());
  }


  return (
    <>
      <ConvertTranslate />
      <main>
        <div>
          <div className="container">
            <div className="input-container">
              <TranslInputTextArea />
              <div className="center">
                <div className="swap-position" onClick={swap}>
                  <ion-icon name="swap-horizontal-outline"></ion-icon>
                </div>
              </div>
              <TranslOutputTextArea />
            </div>
          </div>
        </div>
        {brailleBoard && <BrailleBoard />}
        {kb && <VKeyboard grade inLang={inTrans} />}
      </main>
    </>
  );
}

export default Translator;
