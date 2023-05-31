import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux/es/exports";
import { useDispatch } from "react-redux/es/exports";
import DarkModeButton from "../components/darkmodebutton";
import { setTab } from "../redux/actions";
import logo from '../logo.svg';

function NavBar() {

  const location = useLocation();
  const currentTab = location.pathname;

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
    { name: "Lookup" },
    { name: "About" },
  ]

  const populateMenu = () => {
    return menuOpt.map((option, key) => (
      < li key={key} className={`${tab === key ? "select" : ""}`} onClick={
        () => handleSelect(key)
      } >
        <Link key={key} alt="dropdown language item" value={option.name} onClick={() => { dispatch(setTab(key)); }} to={`/${option.name.toLowerCase()}`}>{option.name}</Link>
      </li >
    ));
  }

  useEffect(() => {
    menuOpt.forEach((item, index) => {
      if ("/" + item.name.toLowerCase() === currentTab) {
        dispatch(setTab(index));
      }
    })
  }, [tab]);

  return (
    <>
      <nav>
        <div className="container">
          <div className="nav-container">
            <a href="/" className="logo">
              <img src={logo} alt="logo" className="logoimg" />
              doTwise
            </a>
            <ul className={`nav-links ${isActive ? "nav-active" : ""} `}>
              {populateMenu()}
              <li><DarkModeButton /></li>
            </ul >
            <div className={`burger ${isActive ? "toggle" : ""} `} onClick={handleDropdown}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </div >
      </nav >
      <Outlet />
    </>
  );
}

export default NavBar;
