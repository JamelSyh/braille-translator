import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transcriptor from './pages/transcriptor';
import Translator from "./pages/translator";
import NavBar from './components/navbar';
import DarkModeButton from "./components/darkmodebutton";
import Footer from "./components/footer";
import Scan from "./pages/scan";
import About from "./pages/about";
import Lookup from "./pages/lookup";
import './App.css';

function App() {

  return (
    <>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<Transcriptor />} />
              <Route path="transcriptor" element={<Transcriptor />} />
              <Route path="braille-translator" element={<Transcriptor />} />
              <Route path='translator' element={<Translator />} />
              <Route path='scan' element={<Scan />} />
              <Route path='lookup' element={<Lookup />} />
              <Route path='about' element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </>
  );
}

export default App;
