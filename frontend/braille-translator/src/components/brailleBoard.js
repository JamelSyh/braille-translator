import { useState, useEffect } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { inputText } from "../redux/actions";

function BrailleBoard() {

  let brailleToNum = {
    '': ' ', '6': '⠠', '5': '⠐', '56': '⠰', '4': '⠈', '46': '⠨', '45': '⠘',
    '456': '⠸', '3': '⠄', '36': '⠤', '35': '⠔', '356': '⠴', '34': '⠌',
    '346': '⠬', '345': '⠜', '3456': '⠼', '2': '⠂', '26': '⠢', '25': '⠒',
    '256': '⠲', '24': '⠊', '246': '⠪', '245': '⠚', '2456': '⠺', '23': '⠆',
    '236': '⠦', '235': '⠖', '2356': '⠶', '234': '⠎', '2346': '⠮', '2345': '⠞',
    '23456': '⠾', '1': '⠁', '16': '⠡', '15': '⠑', '156': '⠱', '14': '⠉',
    '146': '⠩', '145': '⠙', '1456': '⠹', '13': '⠅', '136': '⠥', '135': '⠕',
    '1356': '⠵', '134': '⠍', '1346': '⠭', '1345': '⠝', '13456': '⠽', '12': '⠃',
    '126': '⠣', '125': '⠓', '1256': '⠳', '124': '⠋', '1246': '⠫', '1245': '⠛',
    '12456': '⠻', '123': '⠇', '1236': '⠧', '1235': '⠗', '12356': '⠷', '1234': '⠏',
    '12346': '⠯', '12345': '⠟', '123456': '⠿',
  };

  const encoder = (bin) => {
    let combo = "";
    bin.forEach((item, index) => {
      if (item) combo += index + 1;
    });
    return combo;
  }

  const dispatch = useDispatch();
  const inText = useSelector(state => state.text.inputText);

  const [input, setInput] = useState([false, false, false, false, false, false]);

  const handleDotClick = (e) => {
    let key = parseInt(e.target.value);
    setInput(prevInput => {
      let newInput = [...prevInput]; // create a new array instance
      newInput[key - 1] = !newInput[key - 1];
      return newInput;
    });
  }

  const dotHandler = () => {
    let dots = [];
    for (let i = 1; i < 4; i++) {
      for (let j = i; j < i + 4; j += 3) {
        dots.push(<input key={j} className={`cell-dot dot1${j}`} value={j} type="checkbox" checked={input[j - 1]} onChange={handleDotClick} />);
      }
    }
    return dots;
  }

  const handleAdd = () => {
    let num = encoder(input);
    dispatch(inputText(inText + brailleToNum[num]));
    handleClear();
  }
  const handleDelete = () => {
    dispatch(inputText(inText.slice(0, -1)));
  }

  const handleClear = () => {
    setInput([false, false, false, false, false, false]);
  }

  return (
    <div className="board-container">
      <div className="dots">
        {dotHandler()}
      </div>
      <div className="functions">
        <button className="add-btn" onClick={handleAdd} > insert </button>
        <button className="delete-btn" onClick={handleDelete} > delete </button>
        <button className="clear-btn" onClick={handleClear} > clear </button>
      </div>
    </div>
  );
}

export default BrailleBoard;
