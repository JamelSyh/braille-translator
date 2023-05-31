
import { searchLang, searchLangOptions } from "../redux/actions";
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux/es/exports";
import enFlag from "../flags/en-US.svg"
import arFlag from "../flags/ar-DZ.svg"
import frFlag from "../flags/fr-FR.svg"
import '../App.css';

function SearchDropdown() {

  const [isActive, setActive] = useState(false);

  const dispatch = useDispatch();
  const lang = useSelector(state => state.search.lang);
  const langOpt = useSelector(state => state.search.langOpt);


  const flags = {
    "ar": arFlag,
    "en": enFlag,
    "fr": frFlag,
  }

  const handleFlag = (code) => {
    // if (code === "auto") {
    //   return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.025 110.025"><path d="M55.013 0C24.593 0 0 24.593 0 55.013s24.593 55.012 55.013 55.012 55.012-24.592 55.012-55.012S85.433 0 55.013 0zM38.408 7.492a79.087 79.087 0 0 0-7.448 12.87H18.473a49.89 49.89 0 0 1 19.935-12.87zm-23.872 17.55h14.445c-3.397 8.752-5.265 18.09-5.535 27.63H4.748c.473-10.328 4.027-19.845 9.787-27.63zm0 59.94C8.775 77.198 5.22 67.68 4.748 57.352h18.697a82.305 82.305 0 0 0 5.625 27.63H14.535zm3.938 4.68h12.6c2.093 4.5 4.567 8.842 7.425 12.915a50.063 50.063 0 0 1-20.025-12.915zm34.2 15.638a53.872 53.872 0 0 1-6.907-.787 79.477 79.477 0 0 1-9.518-14.828h16.425V105.3zm0-20.317H34.111c-3.623-8.73-5.692-18.067-5.985-27.63h24.547v27.63zm0-32.31H28.125c.293-9.54 2.34-18.9 5.94-27.63h18.608v27.63zm.023-32.31H36.205a76.84 76.84 0 0 1 9.563-14.828c2.25-.427 4.567-.675 6.93-.787v15.615zm42.795 4.68c5.76 7.785 9.338 17.28 9.787 27.63H86.582a82.305 82.305 0 0 0-5.625-27.63h14.535zm-3.938-4.68h-12.6c-2.093-4.5-4.567-8.842-7.448-12.915a49.99 49.99 0 0 1 20.047 12.915zm-34.2-15.615c2.34.113 4.657.383 6.907.787a79.477 79.477 0 0 1 9.518 14.828H57.354V4.748zm0 20.295h18.563a78.19 78.19 0 0 1 5.985 27.63h-24.55v-27.63zm0 32.31H81.9a78.864 78.864 0 0 1-5.94 27.63H57.352V57.352zm-.023 47.925V89.663h16.492a76.84 76.84 0 0 1-9.563 14.828c-2.25.427-4.567.675-6.93.787zm14.175-2.7a82.683 82.683 0 0 0 7.402-12.915h12.667a50.223 50.223 0 0 1-20.07 12.915zm9.383-17.595c3.375-8.752 5.288-18.09 5.67-27.63H105.3c-.473 10.328-4.027 19.845-9.787 27.63H80.888z" /></svg>
    // }
    return <img alt="flag img" src={flags[code]} />
  }

  const toggleActive = () => {
    setActive(!isActive);
  }

  const populateOptions = () => {

    return langOpt.map((option) => (
      <div key={option.code} className={`option ${lang.code === option.code ? " active" : ""}`} onClick={() => {
        dispatch(searchLang(option));
        setActive(false);
      }} >
        {handleFlag(option.code)}
        < li value={option.code} >
          {option.name}
        </li >
      </div >
    ));
  }


  return (
    <div className={`dropdown-container ${isActive ? 'active' : ''}`} id="in">
      <div className="dropdown-toggle" onClick={toggleActive}>
        {handleFlag(lang.code)}
        <span className="selected" data-value={lang.code}>{lang.name}</span>
        <ion-icon name="chevron-down-outline"></ion-icon>
      </div>
      <ul className="dropdown-menu" style={{ height: `${langOpt.length * 50 + 40}px` }}>
        {populateOptions()}
      </ul>
    </div >
  );
}

export default SearchDropdown; 
