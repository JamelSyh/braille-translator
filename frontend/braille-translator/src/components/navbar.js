import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux/es/exports";
// import DarkModeButton from "../components/darkmodebutton";
import { setTab } from "../redux/actions";
import logo from '../images/logo.svg';
import whiteLogo from '../images/whitelogo.svg';
import '../newApp.css';

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
    setActive(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      // Add or remove 'scroll-down' class based on scroll position
      if (currentScroll > 0 || (tab != 0 && tab != 5)) {
        document.body.classList.add('scroll-down');
      } else if (tab == 0 || tab == 5) {
        document.body.classList.remove('scroll-down');
      }

      // Show or hide the 'go-top' element based on scroll position
      const goTop = document.querySelector('.go-top');
      if (currentScroll >= 620) {
        goTop.style.display = 'flex';
      } else {
        goTop.style.display = 'none';
      }
    };
    handleScroll();

    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tab]);

  const menuOpt = [
    { name: "Home" },
    { name: "Transcriptor" },
    { name: "Translator" },
    { name: "Scan" },
    { name: "Lookup" },
    { name: "Contact" },
  ]

  const populateMenu = () => {
    return menuOpt.map((option, key) => (
      <li key={key}><Link className={`header-link ${tab === key ? "active" : ""}`} key={key} alt="dropdown language item" value={option.name} onClick={handleSelect} to={`/${option.name.toLowerCase()}`}>{option.name}</Link>
      </li>
    ));
  }

  useEffect(() => {
    menuOpt.forEach((item, index) => {
      if ("/" + item.name.toLowerCase() === currentTab) {
        // console.log(item, index);
        dispatch(setTab(index));
      }
    })
  }, [tab]);

  return (
    <>
      <a href="#" className="go-top" aria-label="Go back to top"><i className="fa-solid fa-chevron-up"></i></a>
      <nav className={isActive ? "nav__active" : ""}>
        <Link className="nav__logo" alt="dotwise logo" value="Home" onClick={handleSelect} to={`/home`}>
          <img src={whiteLogo} height="60px" alt="Logo | Appvilla" className="nav__logo-white" />
          <img src={logo} height="60px" alt="Logo | Appvilla" className="nav__logo-orange" />
        </Link>
        <ul className="nav__links">
          {populateMenu()}
        </ul>
        <div className="nav__menu" onClick={handleDropdown}>
          <div className="hamburger"></div>
        </div>
        <Link className="nav__cta" alt="get started button" value="Transcriptor" onClick={handleSelect} to={`/transcriptor`}>
          Get Started
        </Link>
        {/* <a href="#" className="nav__cta">Get Started</a> */}
      </nav>
      <Outlet />
    </>
  );
}

export default NavBar;
