import { useEffect } from 'react';
import pageNotFoundImg from "../images/pagenotfound.svg";
import { useDispatch } from "react-redux/es/exports";
import { setTab } from "../redux/actions";
import { Link } from "react-router-dom";

function PageNotFound() {

  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(setTab(0));
  }

  useEffect(() => {
    dispatch(setTab(-1));

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


      <div className="overview nav-section" id="overview">
        <div className="overview-flex fadeFromTop">
          <section className="overview-flex__text">
            <h2>Oops! Page Not Found</h2>
            <p>We're sorry, but the page you are looking for could not be found. Please check the URL or navigate back to the homepage.</p>
            <Link className="overview-flex__text-link" alt=" dotwise logo" value="go homepage button" onClick={handleSelect} to={`/home`}>
              Go to Homepage
            </Link>
          </section>
          <div className="overview-flex__img">
            <img src={pageNotFoundImg} alt="Page Not Found" />
          </div>
        </div>
      </div>

    </>
  );
}

export default PageNotFound;

