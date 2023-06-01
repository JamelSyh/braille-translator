import React, { useEffect } from 'react';
import '../newApp.css';

function Preloader() {
  useEffect(() => {
    const body = document.body;
    const preloader = document.querySelector('.preloader');

    const handleLoad = () => {
      body.classList.add('active');
      preloader.style.display = 'none';
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <div className="preloader">
      <span className="preloader__circle"></span>
      <span className="preloader__circle preloader__circle--two"></span>
    </div>
  );
}

export default Preloader;

