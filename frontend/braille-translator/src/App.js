import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transcriptor from './pages/transcriptor';
import Translator from "./pages/translator";
import NavBar from './components/navbar';
// import DarkModeButton from "./components/darkmodebutton";
import Footer from "./components/footer";
import Scan from "./pages/scan";
import Contact from "./pages/contact";
import Lookup from "./pages/lookup";
import Home from "./pages/home";
import PageNotFound from "./pages/pageNotFound";
import Preloader from "./components/preloader";
import './App.css';

function App() {

  return (
    <>
      <Preloader />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="transcriptor" element={<Transcriptor />} />
            <Route path='translator' element={<Translator />} />
            <Route path='scan' element={<Scan />} />
            <Route path='lookup' element={<Lookup />} />
            <Route path='contact' element={<Contact />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
