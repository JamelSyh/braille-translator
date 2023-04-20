import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { inputLang, outputText, pending } from "../redux/actions";


function Convert() {


  const dispatch = useDispatch();
  const inText = useSelector(state => state.text.inputText);
  const inLang = useSelector(state => state.language.inLang);
  const outLang = useSelector(state => state.language.outLang);
  const options = useSelector(state => state.options.inOpt);

  const [debouncedText, setDebouncedText] = useState(inText);

  useEffect(() => {

    dispatch(pending(true));
    const timer = setTimeout(() => {
      setDebouncedText(inText);
    }, 500);
    return () => { clearTimeout(timer); };
  }, [inText, inLang, dispatch]);

  useEffect(() => {
    const doDetection = async () => {
      try {
        if (inLang.code === "auto" && debouncedText !== "") {
          const { data } = await axios.post('https://translation.googleapis.com/language/translate/v2/detect', {}, {
            params: {
              q: debouncedText,
              key: "AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM"
            }
          });
          options.forEach((option) => {
            if (option.code === data.data.detections[0][0].language) {
              dispatch(inputLang(option));
            }
          });
        }
      } catch (e) {
        dispatch(inputLang(options[2]));
      }
    }
    doDetection();
  }, [debouncedText, inLang, options, dispatch]);

  useEffect(() => {

    const doTranslation = async () => {
      const { data } = await axios.post('http://localhost:8000/transcriptor', {}, {
        params: {
          text: debouncedText,
          source: inLang.code,
          target: outLang.code,
        }
      });
      if (data) {
        if (debouncedText !== "" && data.result)
          dispatch(outputText(data.result));
        else
          dispatch(outputText(""));

      }
      dispatch(pending(false));
    };
    doTranslation();
  }, [debouncedText, inLang, outLang, dispatch]);
}

export default Convert;