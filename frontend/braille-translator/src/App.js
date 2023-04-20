import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transcriptor from './pages/transcriptor';
import Translator from "./pages/translator";
import NavBar from './components/navbar';
import DarkModeButton from "./components/darkmodebutton";
import './App.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Transcriptor />} />
            <Route path="transcriptor" element={<Transcriptor />} />
            <Route path='translator' element={<Translator />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <DarkModeButton />
    </>
  );
}

export default App;
