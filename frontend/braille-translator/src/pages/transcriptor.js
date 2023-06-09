import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux/es/exports";
import { switchOption, switchLang, switchText, mobile } from "../redux/actions";
import Convert from '../components/convert';
import InputTextArea from '../components/inputTextArea';
import OutputTextArea from '../components/outputTextArea';
import VKeyboard from '../components/keyboard';
import BrailleBoard from '../components/brailleBoard';
import '../App.css';




function Transcriptor() {


  const dispatch = useDispatch();
  const kb = useSelector(state => state.functions.keyboard);
  const brailleBoard = useSelector(state => state.functions.board);
  const inLang = useSelector(state => state.language.inLang);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const swap = () => {
    dispatch(switchOption());
    dispatch(switchLang());
    dispatch(switchText());
  }

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
      if (screenWidth < 720) {
        dispatch(mobile(true));
      } else {
        dispatch(mobile(false));
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, [screenWidth, dispatch]);

  return (
    <>
      <Convert />
      <main>
        <div className="container">
          <div className="input-container">
            <InputTextArea />
            <div className="center">
              <div className="swap-position" onClick={swap}>
                <ion-icon name="swap-horizontal-outline"></ion-icon>
              </div>
            </div>
            <OutputTextArea />
          </div>
        </div>
        {brailleBoard && <BrailleBoard />}
        {kb && <VKeyboard inLang={inLang} />}
      </main>
    </>
  );
}

export default Transcriptor;
