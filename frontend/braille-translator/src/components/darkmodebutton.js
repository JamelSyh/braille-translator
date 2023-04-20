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
  )
}

export default DarkModeButton;
