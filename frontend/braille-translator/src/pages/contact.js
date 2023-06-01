import { useEffect } from 'react';
import supportImg from "../images/support.jpg";

function Contact() {

  useEffect(() => {
    const fadeFromLeftElements = document.querySelectorAll('.fadeFromLeft');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting && entry.target.classList.add('ffl-active');
      });
    });
    fadeFromLeftElements.forEach((el) => observer.observe(el));

    const fadeFromRightElements = document.querySelectorAll('.fadeFromRight');
    const observerTwo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting && entry.target.classList.add('ffr-active');
      });
    });
    fadeFromRightElements.forEach((el) => observerTwo.observe(el));


    const fadeFromTopElements = document.querySelectorAll('.fadeFromTop');
    const observerThree = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting && entry.target.classList.add('fft-active');
      });
    });
    fadeFromTopElements.forEach((el) => observerThree.observe(el));

    // Clean up the observers when the component unmounts
    return () => {
      observer.disconnect();
      observerTwo.disconnect();
      observerThree.disconnect();
    };
  }, []);

  return (
    <>
      <header className="contact__header">
        <h1 className="fadeFromLeft">Contact Us</h1>
        <div className="contact__header--nav fadeFromRight">
          <a href="index.html">Home</a><i className="fa-solid fa-chevron-right"></i><span>Contact Us</span>
        </div>
      </header>

      <div className="contact">
        <section className="contact__text">
          <h3 className="fadeFromTop">Contact</h3>
          <h2 className="fadeFromTop">We'd love to help you</h2>
          <p className="fadeFromTop">Reach out to us and let us know how we can assist you. We're here to answer your questions and provide support.</p>
        </section>
        <div className="contact__grids">
          <div className="contact__grid fadeFromTop">
            <div><i className="fa-solid fa-map-location-dot"></i></div>
            <section className="contact__grid--text">
              <h3>Address</h3>
              <a href="https://goo.gl/maps/2acuBK1gwU3TLuRGA">3333 Raleigh St, Houston, TX 77021, USA.</a>
            </section>
          </div>
          <div className="contact__grid fadeFromTop">
            <div><i className="fa-solid fa-phone"></i></div>
            <section className="contact__grid--text">
              <h3>Call us on</h3>
              <a href="tel:+18005554400">+1 800 555 44 00</a>
              <a href="tel:+321556667890">+321 55 666 7890</a>
            </section>
          </div>
          <div className="contact__grid fadeFromTop">
            <div><i className="fa-solid fa-envelope"></i></div>
            <section className="contact__grid--text">
              <h3>Mail at</h3>
              <a href="supportteam@example.com">support@dowiseapp.com</a>
            </section>
          </div>
        </div>
      </div>

      <div className="support">
        <div className="support__text">
          <h2>New case?<br />Send us message</h2>
          <p>Just send us your questions or concerns for new Features.</p>
          <div className="support__text--profile">
            <img src={supportImg} alt="support" />
            <section className="support__text--profile-text">
              <p>HAVE A QUESTION?</p>
              <h4>+888 445 55 678</h4>
            </section>
          </div>
          <div className="support__text--time">
            <p>Sunday - Tuesday:</p>
            <p>9.00 - 6.00</p>
            <p>Friday & Public Holidays (Closed)</p>
            <a href="#"><span>Request a callback</span> <i className="fa-solid fa-right-long"></i></a>
          </div>
        </div>
        <div className="support__form-container">
          <form action="#">
            <input type="text" placeholder="Your Name" />
            <input type="text" placeholder="Your Subject" />
            <input type="email" placeholder="Your Email" />
            <input type="number" placeholder="Your Phone" />
            <textarea type="textarea" placeholder="Your Message"></textarea>
            <button type="submit">Submit Message</button>
          </form>
        </div>
      </div>

      <div className="support__map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3465.611314131946!2d-95.3754924850505!3d29.70204668200806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640bfeaa3caa245%3A0x684a25b39a0066c3!2s3333%20Raleigh%20St%2C%20Houston%2C%20TX%2077021!5e0!3m2!1sen!2sus!4v1666800861739!5m2!1sen!2sus" width="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" aria-label="location"></iframe>
      </div>
    </>
  );
}

export default Contact;
