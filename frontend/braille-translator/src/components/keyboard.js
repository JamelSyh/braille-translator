import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";
import { inputText } from "../redux/actions";
import 'react-simple-keyboard/build/css/index.css';
import SimpleKeyboard from 'react-simple-keyboard';
import layout from '../constants/keyboardLayout';
import "../App.css";

const VKeyboard = ({ grade, inLang }) => {

  const [shift, setShift] = useState(false);
  const [caps, setCaps] = useState(false);
  const [brailleMode, setBrailleMode] = useState(false);
  const [layoutName, setLayoutName] = useState("default");

  const dispatch = useDispatch();
  const inText = useSelector(state => state.text.inputText);
  const outLang = useSelector(state => state.language.outLang);
  const inTrans = useSelector(state => state.language.inTrans);
  let normalLayout = "";

  if (grade)
    normalLayout = `${inTrans[0]['grade'].code}_${inTrans[0].code}${(caps || shift) ? '_shift' : ''}`;
  else
    normalLayout = `${inLang.code}_${outLang.code}${(caps || shift) ? '_shift' : ''}`;


  useEffect(() => {
    setLayoutName(normalLayout);
  }, [normalLayout])

  useEffect(() => {
    if (inLang.code === "1" || inLang.code === "2" || grade) {
      setBrailleMode(true);
    }
    else
      setBrailleMode(false);
  }, [inLang]);

  const onKeyPress = button => {
    switch (button) {
      case "{shift}":
        setShift(!shift);
        return;
      case "{lock}":
        setShift(false);
        setCaps(!caps);
        return;
      case "{bksp}":
        dispatch(inputText(inText.slice(0, -1)));
        return;
      case "{enter}":
        dispatch(inputText(inText + "\n"));
        return;
      case "{space}":
        dispatch(inputText(inText + " "));
        return;
      case "{tab}":
        dispatch(inputText(inText + "\t"));
        return;
      case "@":
        if (brailleMode) {
          if (layoutName === "more") {
            setLayoutName(normalLayout);
            return;
          }
          setLayoutName("more");
        } else {
          dispatch(inputText(inText + "@"));
        }

        return;

      default:
        setShift(false);
        dispatch(inputText(inText + button));
        return;


    }
  };

  return (
    <div id="kcontainer">
      <SimpleKeyboard
        layoutName={layoutName}
        layout={layout}
        onKeyPress={onKeyPress}
        theme="hg-theme-default myTheme "
        mergeDisplay={true}
        display={{
          "{enter}": "enter",
          "{tab}": "tab ⇥",
          "{bksp}": "⌫",
          "{capslock}": "caps lock ⇪",
          "{shift}": "⇧",
          '@': brailleMode ? "more" : "@",
        }}
      />
    </div>
  );
};

export default VKeyboard;
