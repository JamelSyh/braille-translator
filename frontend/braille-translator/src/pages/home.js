import React, { useEffect } from 'react';
import phoneImg from '../images/phone2.png';
import '../newApp.css';

function Home() {
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

    const fadeFromBottomElements = document.querySelectorAll('.fadeFromBottom');
    const observerThree = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting && entry.target.classList.add('ffb-active');
      });
    });
    fadeFromBottomElements.forEach((el) => observerThree.observe(el));

    const fadeFromTopElements = document.querySelectorAll('.fadeFromTop');
    const observerFour = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.isIntersecting && entry.target.classList.add('fft-active');
      });
    });
    fadeFromTopElements.forEach((el) => observerFour.observe(el));

    function handleAccordion() {
      let accordionOpened = document.querySelectorAll('details[open]')
      for (let item of accordionOpened) {
        if (this != item) {
          item.removeAttribute("open");
        }
      }
    }

    const accordions = document.querySelectorAll('details');
    accordions.forEach(accordion => {
      accordion.addEventListener('click', handleAccordion);
    })


    // Clean up the observers when the component unmounts
    return () => {
      observer.disconnect();
      observerTwo.disconnect();
      observerThree.disconnect();
      observerFour.disconnect();
    };
  }, []);

  return (
    <>
      <header id="header" className="nav-section">
        <section className="header__text">
          <h1 className="fadeFromLeft">The Accessible Braille Translation App</h1>
          <p className="fadeFromLeft">Empowering blind individuals with equal opportunities in daily life activities.</p>
          <div className="header__text-link fadeFromLeft">
            <a href="#"><i className="fa-brands fa-apple"></i><span>App Store</span></a>
            <a href="#"><i className="fa-brands fa-google-play"></i><span>Google Play</span></a>
          </div>
        </section>
        <div className="header__img">
          <img src={phoneImg} alt="Dotwize mobile app's UI" className="fadeFromRight" />
        </div>
      </header>
      <div className="features nav-section" id="features">
        <section className="features__text">
          <h3 className="fadeFromTop">Features</h3>
          <h2 className="fadeFromTop">Empowerment through Braille Translation</h2>
          <p className="fadeFromTop">The Accessible Braille Translation App provides a range of functionalities to assist blind assistants and users.</p>
        </section>
        <div className="features__grid">
          <section className="feature fadeFromTop">
            <div className="feature__icon">
              <i className="fa-solid fa-pencil-alt"></i>
            </div>
            <h3>Translation to Braille</h3>
            <p>Translate text into braille using a virtual keyboard, image upload, or voice input. Supports Arabic, English, and French languages with options for Grade 1 or Grade 2 Braille.</p>
          </section>
          <section className="feature fadeFromTop">
            <div className="feature__icon">
              <i className="fa-solid fa-undo"></i>
            </div>
            <h3>Translation from Braille</h3>
            <p>Translate Braille documents back into text. Enter Braille content through virtual keyboard, "fsdjkl" keys, or Braille board. Future updates will allow image upload for translation. Supports Grade 1 and Grade 2 Braille across multiple languages.</p>
          </section>
          <section className="feature fadeFromTop">
            <div className="feature__icon">
              <i className="fa-solid fa-language"></i>
            </div>
            <h3>Braille-to-Braille Translation</h3>
            <p>Convert Braille content from one language to another. For example, translate Grade 2 English Braille to Grade 1 Arabic Braille. Use the available input options for seamless translation.</p>
          </section>
          <section className="feature fadeFromTop">
            <div className="feature__icon">
              <i className="fa-solid fa-file-download"></i>
            </div>
            <h3>Braille Document Output</h3>
            <p>Download Braille output in .brf format for printing Braille documents using specialized devices.</p>
          </section>
          <section className="feature fadeFromTop">
            <div className="feature__icon">
              <i className="fa-solid fa-book"></i>
            </div>
            <h3>Contraction Dictionary</h3>
            <p>Access a dictionary of Braille Grade 2 contractions to efficiently convert text to Braille and vice versa.</p>
          </section>
        </div>
      </div>
      <section className="install">
        <h3 className="fadeFromLeft">Get Started Today</h3>
        <h2 className="fadeFromLeft">Download the App</h2>
        <p className="fadeFromTop">Experience the power of accessible Braille translation on your mobile device.</p>
        <div className="install__link fadeFromTop">
          <a href="#"><i className="fa-brands fa-apple"></i><span>App Store</span></a>
          <a href="#"><i className="fa-brands fa-google-play"></i><span>Google Play</span></a>
        </div>
      </section>

      <div className="faq">
        <section className="faq__text">
          <h3 className="fadeFromTop">FAQ</h3>
          <h2 className="fadeFromTop">Frequently Asked Questions</h2>
          <p className="fadeFromTop">Find answers to common questions about the Accessible Braille Translation App.</p>
        </section>
        <div className="faq__accordion">
          <details>
            <summary>
              <div className="question">
                <div className="question__count">01</div>
                <p>How do I contact customer services?</p>
              </div>
              <i className="fa-solid fa-plus"></i>
              <i className="fa-solid fa-minus"></i>
            </summary>
            <p className="answer">If you have any inquiries or need assistance, you can reach our customer service team by emailing support@dotwizeapp.com or by calling our helpline at +1-800-123-4567.</p>
          </details>
          <details>
            <summary>
              <div className="question">
                <div className="question__count">02</div>
                <p>What types of materials can you work with?</p>
              </div>
              <i className="fa-solid fa-plus"></i>
              <i className="fa-solid fa-minus"></i>
            </summary>
            <p className="answer">The Accessible Braille Translation App can work with various types of materials, including text input through a virtual keyboard, image upload for text recognition, and voice input for speech-to-text conversion.</p>
          </details>
          <details>
            <summary>
              <div className="question">
                <div className="question__count">03</div>
                <p>Can I have multiple activities in a single feature?</p>
              </div>
              <i className="fa-solid fa-plus"></i>
              <i className="fa-solid fa-minus"></i>
            </summary>
            <p className="answer">Yes, the app supports multiple activities within a single feature. For example, you can translate text to Braille, switch to Braille-to-text translation, and access the contraction dictionary all within the same feature.</p>
          </details>
          <details>
            <summary>
              <div className="question">
                <div className="question__count">04</div>
                <p>How can clients consult through online?</p>
              </div>
              <i className="fa-solid fa-plus"></i>
              <i className="fa-solid fa-minus"></i>
            </summary>
            <p className="answer">Clients can consult with us online through our website's live chat support. Simply visit our website at www.dotwizeapp.com and click on the live chat option to connect with our support team in real-time.</p>
          </details>
          <details>
            <summary>
              <div className="question">
                <div className="question__count">05</div>
                <p>Can I share resources between features?</p>
              </div>
              <i className="fa-solid fa-plus"></i>
              <i className="fa-solid fa-minus"></i>
            </summary>
            <p className="answer">Yes, you can share resources between different features of the Accessible Braille Translation App. The app provides a centralized storage system where you can manage and access shared resources across various features.</p>
          </details>
          <details>
            <summary>
              <div className="question">
                <div className="question__count">06</div>
                <p>Is this free?</p>
              </div>
              <i className="fa-solid fa-plus"></i>
              <i className="fa-solid fa-minus"></i>
            </summary>
            <p className="answer">Yes, the Accessible Braille Translation App is available for free. You can download it from the App Store for iOS devices or Google Play for Android devices without any cost. However, please note that certain premium features or additional services may require a subscription or in-app purchases.</p>
          </details>
        </div>
      </div>
    </>
  );
}

export default Home;
