import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { inputTransOptions, outputTransOptions, inputTransLang, outputTransLang, inputText, outputText, pending } from "../redux/actions";


function ConvertTranslate() {

  const dispatch = useDispatch();
  const inText = useSelector(state => state.text.inputText);
  const outText = useSelector(state => state.text.outputText);
  const inLang = useSelector(state => state.language.inLang);
  const inTrans = useSelector(state => state.language.inTrans);
  const outTrans = useSelector(state => state.language.outTrans);
  const url = useSelector(state => state.backend.url);
  const dotwise_api_key = useSelector(state => state.backend.dotwiseApiKey);

  const [debouncedText, setDebouncedText] = useState(inText);

  useEffect(() => {

    dispatch(pending(true));
    const timer = setTimeout(() => {
      setDebouncedText(inText);
    }, 500);
    return () => { clearTimeout(timer); };
  }, [inText, inTrans, dispatch]);


  useEffect(() => {
    const getOptions = async () => {
      try {
        const { data } = await axios.get(`${url}translate_options/`, {
          params: {
            key: dotwise_api_key,
          }
        });
        if (data) {
          dispatch(inputTransOptions(data));
          dispatch(outputTransOptions(data));
          dispatch(inputTransLang(data[0]));
          dispatch(outputTransLang(data[1]));

          if (inLang.code !== "1" && inLang.code !== "2") {
            dispatch(inputText(outText));
          } else {
            dispatch(inputText(inText));
          }
        }
      } catch (error) {
        console.log("error at fteching options: ", error);
      }
    };
    getOptions();
  }, [dispatch]);


  useEffect(() => {
    const Transcoding = async () => {
      try {
        const formData = new FormData();
        formData.append('text', debouncedText);
        formData.append('source_lang', inTrans[0].code);
        formData.append('source_grade', inTrans[0].grade.code);
        formData.append('target_lang', outTrans[0].code);
        formData.append('target_grade', outTrans[0].grade.code);
        formData.append('key', dotwise_api_key);

        const { data } = await axios.post(`${url}translator/`, formData);
        if (data) {
          if (debouncedText !== "" && data.result)
            dispatch(outputText(data.result));
          else
            dispatch(outputText(""));
        }
        if (debouncedText === "")
          dispatch(outputText(""));

        dispatch(pending(false));
      } catch (error) {
        console.log("Error at translating:", error);
      }
    };
    Transcoding();
  }, [debouncedText, inText, inTrans, outTrans, dispatch]);
}

export default ConvertTranslate;
