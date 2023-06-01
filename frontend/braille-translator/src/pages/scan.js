// import { useDispatch, useSelector } from "react-redux/es/exports";
// import { switchOption, switchLang, switchText, mobile } from "../redux/actions";
// import InputTextArea from '../components/inputTextArea';
// import OutputTextArea from '../components/outputTextArea';
// import ScanArea from "../components/scanArea";
import { useDispatch } from "react-redux/es/exports";
import { setTab } from "../redux/actions";
import { Link } from "react-router-dom";
import soonImg from "../images/soon.svg";
import { useEffect } from 'react';

function Scan() {

  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(setTab(0));
  }

  useEffect(() => {

    const fadeFromTopElements = document.querySelectorAll('.fadeFromTop');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting && entry.target.classList.add('fft-active');
      });
    });
    fadeFromTopElements.forEach((el) => observer.observe(el));

    // Clean up the observers when the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <main>
        <div className="overview nav-section" id="overview" style={{ marginTop: "5rem" }}>
          <div className="overview-flex fadeFromTop">
            <section className="overview-flex__text">
              <h2>Coming Soon</h2>
              <p>Exciting new features are on their way! Stay tuned as we bring you innovative enhancements to enhance your experience.</p>
              {/* <a href="#" >Go to Homepage</a> */}
              <Link className="overview-flex__text-link" alt=" dotwise logo" value="go homepage button" onClick={handleSelect} to={`/home`}>
                Go to Homepage
              </Link>
            </section>
            <img src={soonImg} height="500em" />
          </div>
        </div>

      </main >
    </>
  );
}

export default Scan;
