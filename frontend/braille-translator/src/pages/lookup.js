import SearchDropdown from "../components/searchDropdown";
import Table from "../components/Table";
import Search from "../components/search.js";
import VKeyboard from '../components/keyboard';
import BrailleBoard from '../components/brailleBoard';
import { useSpeechSynthesis } from 'react-speech-kit';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Keyboard, ViewGridCard, Voice } from "@icon-park/react";

import brailleToNum from "../constants/brailleToNum";
import brailleKeys from "../constants/brailleKeys";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";
import { inputText, keyboard, board } from "../redux/actions";

function Lookup() {
  const dispatch = useDispatch();
  const inText = useSelector(state => state.text.inputText);
  const lang = useSelector(state => state.search.lang);
  const data = useSelector(state => state.search.data);
  const kb = useSelector(state => state.functions.keyboard);
  const brailleBoard = useSelector(state => state.functions.board);
  const [filteredList, setFilteredList] = useState(data ? data : []);
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
      SpeechRecognition.startListening({ continuous: false, language: speechList[lang.code] });
    }
  };

  useEffect(() => {
    setFilteredList(data ? data : []);
  }, [data]);

  const handleSpeech = () => {
    if (listening)
      SpeechRecognition.stopListening();
    if (inText && !speaking && voiceList[lang.code]) {
      speak({ text: inText, voice: voiceList[lang.code] });
    }
  }

  useEffect(() => {
    dispatch(inputText(transcript));
  }, [transcript, dispatch]);

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    dispatch(inputText(query));
    // console.log(data);
    // Create copy of item list
    // Include all elements which includes the search query
    var updatedList = data.filter((item) => {
      return ((item.contraction.toLowerCase().indexOf(query.toLowerCase())) && item.word.toLowerCase().indexOf(query.toLowerCase()) && item.braille.toLowerCase().indexOf(query.toLowerCase())) !== -1;
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  };

  const handleKeyPress = (e) => {
    if (brailleMode) {
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

  return (

    <>
      <Search />
      <main>
        <div className="container">
          <div className="lookup-container">
            <div className="search-bar">
              <input type="text" className="input" placeholder='search' value={inText} onChange={filterBySearch} onKeyDown={handleKeyPress} maxLength={20} />
              <div className="flBtnCntr">
                <button className="flBtnBox big">+</button>
                <div className="flBtns">
                  <button className={`flBtnBox small ${listening ? 'active-float-btn' : ''}`} onClick={handleStartRecognition}>
                    <Voice theme="outline" size="20" strokeWidth={3} />
                  </button>
                  <button className={`flBtnBox small ${kb ? 'active-float-btn' : ''}`} onClick={() => { dispatch(keyboard(!kb)); dispatch(board(false)); }}>
                    <Keyboard size="20" strokeWidth={3} />
                  </button>
                  <button className={`flBtnBox small ${brailleBoard ? 'active-float-btn' : ''}`} onClick={() => { dispatch(board(!brailleBoard)); dispatch(keyboard(false)) }}>
                    <ViewGridCard size="20" strokeWidth={3} />

                  </button>
                  <button className={`flBtnBox small ${brailleMode ? 'active-float-btn' : ''}`} onClick={() => { setBrailleMode(!brailleMode); }}>B</button>
                </div>
              </div>
              <div className="lang-search">
                <SearchDropdown />
              </div>
            </div>
            {brailleBoard && <BrailleBoard />}
            {kb && <div className="keyboard-container"><VKeyboard grade={brailleMode ?? null} inLang={lang} /> </div>}
            <div className="result-container">
              <Table data={filteredList} rowsPerPage={10} />
            </div>
          </div>
        </div >
      </main>
    </>
  );
}

export default Lookup;
