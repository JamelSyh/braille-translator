import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transcriptor from './pages/transcriptor';
import Translator from "./pages/translator";
import NavBar from './components/navbar';
import DarkModeButton from "./components/darkmodebutton";
import Footer from "./components/footer";
import Scan from "./pages/scan";
import About from "./pages/about";
import Contact from "./pages/contact";
import './App.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Transcriptor />} />
            <Route path="transcriptor" element={<Transcriptor />} />
            <Route path="braille-translator" element={<Transcriptor />} />
            <Route path='translator' element={<Translator />} />
            <Route path='scan' element={<Scan />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
      <DarkModeButton />
    </>
  );
}

export default App;
