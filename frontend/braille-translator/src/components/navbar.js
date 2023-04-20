import { useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";
import { setTab } from "../redux/actions";
import logo from '../logo.svg';

function NavBar() {

  const [isActive, setActive] = useState(false);

  const dispatch = useDispatch();
  const tab = useSelector(state => state.tab.tab);

  const handleDropdown = () => {
    setActive(!isActive);
  }

  const handleSelect = (key) => {
    dispatch(setTab(key));
    handleDropdown();
  }

  const menuOpt = [
    { name: "Transcriptor" },
    { name: "Translator" },
    { name: "Scan" },
    { name: "About" },
    { name: "Contact" },
  ]

  const populateMenu = () => {
    return menuOpt.map((option, key) => (
      < li key={key} className={`${tab === key ? "select" : ""}`} onClick={
        e => handleSelect(key)
      } >
        <a key={key} href="#" value={option.name}>{option.name}</a>
      </li >
    ));
  }

  return (
    <nav>
      <a href="" className="logo">
        <img src={logo} alt="logo" className="logoimg" />
        doTwise
      </a>
      <ul className={`nav-links ${isActive ? "nav-active" : ""} `}>
        {populateMenu()}
      </ul >
      <div className={`burger ${isActive ? "toggle" : ""} `} onClick={handleDropdown}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </nav >
  );
}

export default NavBar;
