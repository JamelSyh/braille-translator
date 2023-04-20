import { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { inputOptions, outputOptions, switchOption, switchLang, switchText, dark, mobile } from "./redux/actions";
import InputTextArea from './components/inputTextArea';
import OutputTextArea from './components/outputTextArea';
import Convert from './components/convert';
import NavBar from './components/navbar';
import Keyboard from './components/keyboard';
import BrailleBoard from './components/brailleBoard';
import './App.css';

function App() {


  const dispatch = useDispatch();
  const kb = useSelector(state => state.functions.keyboard);
  const brailleBoard = useSelector(state => state.functions.board);
  const isDark = useSelector(state => state.functions.dark);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const swap = () => {
    dispatch(switchOption());
    dispatch(switchLang());
    dispatch(switchText());
  }

  const handleDarkMode = () => {
    dispatch(dark(!isDark));
  }

  useEffect(() => {
    const getOptions = async () => {
      const { data } = await axios.get('http://localhost:8000/options', {}, {
      });
      if (data) {
        dispatch(inputOptions(data.languages));
        dispatch(outputOptions(data.grades));
      }
    };
    getOptions();
  }, [dispatch]);

  useEffect(() => {
    const body = document.body;
    if (isDark) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [isDark]);

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

  // useEffect(() => {
  //   console.log(brailleBoard);
  // }, [brailleBoard]);


  return (
    <>
      <Convert />
      <NavBar />
      <div>
        <div className={`mode ${isDark ? "dark" : ""} dark`}>
          <label className="toggle" htmlFor="dark-mode-btn" onChange={handleDarkMode}>
            <div className="toggle-track">
              <input type="checkbox" className="toggle-checkbox" id="dark-mode-btn" />
              <span className="toggle-thumb"></span>
              <ion-icon name="sunny-outline"></ion-icon>
              <ion-icon name="moon-outline"></ion-icon>
            </div>
          </label>
        </div>
        <div className="container">
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
      {kb && <Keyboard />}
    </>
  );
}

export default App;
