import { Outlet } from "react-router-dom";
import logo from '../images/logo.svg';
import '../newApp.css'

function Footer() {
  return (
    <>
      <footer>
        <div className="footer__top">
          <div className="footer__intro">
            <a href="#"><img src={logo} alt="Home | Dotwize" className="footer__intro--logo" /></a>
            <p>Unlocking a world of possibilities through accessible braille translation - empowering the blind community one dot at a time.</p>
            <ul className="footer__intro--media-links">
              <li><a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a></li>
              <li><a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a></li>
              <li><a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a></li>
              <li><a href="#" aria-label="Linkedin"><i className="fa-brands fa-linkedin"></i></a></li>
              <li><a href="#" aria-label="Youtube"><i className="fa-brands fa-youtube"></i></a></li>
              <li><a href="#" aria-label="Pinterest"><i className="fa-brands fa-pinterest"></i></a></li>
            </ul>
          </div>
          <div className="footer__grids">
            <section className="footer__grid">
              <h3>Solutions</h3>
              <ul className="footer__grid--list">
                <li><a href="#">Marketing</a></li>
                <li><a href="#">Analytics</a></li>
                <li><a href="#">Commerce</a></li>
                <li><a href="#">Insights</a></li>
                <li><a href="#">Promotion</a></li>
              </ul>
            </section>
            <section className="footer__grid">
              <h3>Support</h3>
              <ul className="footer__grid--list">
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Guides</a></li>
                <li><a href="#">API Status</a></li>
                <li><a href="#">Live Support</a></li>
              </ul>
            </section>
            <section className="footer__grid">
              <h3>Company</h3>
              <ul className="footer__grid--list">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Blog</a></li>
                <li><a href="#">Jobs</a></li>
                <li><a href="#">Press</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </section>
            <section className="footer__grid">
              <h3>Legal</h3>
              <ul className="footer__grid--list">
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Catering Services</a></li>
                <li><a href="#">Customer Relations</a></li>
                <li><a href="#">Innovation</a></li>
              </ul>
            </section>
          </div>
        </div>
        <div className="newsletter">
          <div className="newsletter__text">
            <h3>Subscribe To Our Newsletter</h3>
            <p>The latest news, articles, and resources, sent to your inbox weekly.</p>
          </div>
          <form action="#" className="newsletter__form">
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </footer>
      <Outlet />
    </>
  );
}

export default Footer;
