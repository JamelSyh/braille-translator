import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux/es/exports";
import { dark } from "../redux/actions";



function DarkModeButton() {

  const dispatch = useDispatch();
  const isDark = useSelector(state => state.functions.dark);

  const handleDarkMode = () => {
    dispatch(dark(!isDark));
  }

  useEffect(() => {
    const body = document.body;
    if (isDark) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <label className="switch" >
      <input id="checkbox" onClick={handleDarkMode} type="checkbox" />
      <span className="slider"></span>
    </label>
  )
}

export default DarkModeButton;
