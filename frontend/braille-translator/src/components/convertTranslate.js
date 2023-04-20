import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { inputOptions, outputOptions, inputLang, outputText, pending } from "../redux/actions";


function ConvertTranslate() {

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
    const getOptions = async () => {
      const { data } = await axios.get('http://localhost:8000/Translate_options', {}, {
      });
      if (data) {
        dispatch(inputOptions(data.languages));
        dispatch(outputOptions(data.grades));
      }
    };
    getOptions();
  }, [dispatch]);


  useEffect(() => {
    const Transcoding = async () => {
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
    Transcoding();
  }, [debouncedText, inLang, outLang, dispatch]);
}

export default ConvertTranslate;
