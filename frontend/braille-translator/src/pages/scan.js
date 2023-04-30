import { useDispatch, useSelector } from "react-redux/es/exports";
import { switchOption, switchLang, switchText, mobile } from "../redux/actions";
import InputTextArea from '../components/inputTextArea';
import OutputTextArea from '../components/outputTextArea';
import ScanArea from "../components/scanArea";
// import Keyboard from '../components/keyboard';
// import BrailleBoard from '../components/brailleBoard';
import '../App.css';
import '../Scan.css';

function Scan() {

  const dispatch = useDispatch();
  // const kb = useSelector(state => state.functions.keyboard);
  // const brailleBoard = useSelector(state => state.functions.board);

  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const swap = () => {
    dispatch(switchOption());
    dispatch(switchLang());
    dispatch(switchText());
  }

  // useEffect(() => {
  //   function handleResize() {
  //     setScreenWidth(window.innerWidth);
  //     if (screenWidth < 720) {
  //       dispatch(mobile(true));
  //     } else {
  //       dispatch(mobile(false));
  //     }
  //   }

  // window.addEventListener('resize', handleResize);
  // return () => window.removeEventListener('resize', handleResize);

  // }, [screenWidth, dispatch]);

  return (
    <div>
      <div className="scan-container">
        <div className="container">
          <ScanArea />
        </div>
      </div>
    </div>
  );
}

export default Scan;
