import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { inputOptions, outputOptions, inputLang, outputText, pending } from "../redux/actions";


function Convert() {


  const dispatch = useDispatch();
  const inText = useSelector(state => state.text.inputText);
  const inLang = useSelector(state => state.language.inLang);
  const outLang = useSelector(state => state.language.outLang);
  const options = useSelector(state => state.options.inOpt);
  const url = useSelector(state => state.backend.url);
  const dotwise_api_key = useSelector(state => state.backend.dotwiseApiKey);
  const detectlang_api_key = useSelector(state => state.backend.detectlangApiKey);

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
      try {
        const { data } = await axios.get(`${url}transcript_options/`, {
          params: {
            key: dotwise_api_key,
          },
        },);
        if (data) {
          dispatch(inputOptions(data));
          dispatch(outputOptions(data[0]['grade']));
        }
      } catch (error) {
        console.error('Error fetching options:', error);

      }
    };

    getOptions();
  }, [dispatch]);

  useEffect(() => {

    const doDetection = async () => {
      try {
        if (inLang.code === "auto" && debouncedText !== "") {
          const response = await axios.post(
            'https://ws.detectlanguage.com/0.2/detect',
            { q: debouncedText },
            {
              headers: {
                Authorization: `Bearer ${detectlang_api_key}`,
              },
            }
          );

          if (response)
            options.forEach((option) => {
              if (option.code === response.data.data.detections[0].language) {
                dispatch(inputLang(option));
              }
            });
        }
      } catch (error) {
        dispatch(inputLang(options[2]));
      }
    };
    doDetection();
  }, [debouncedText, inLang, options, dispatch]);

  useEffect(() => {

    const Transcoding = async () => {
      try {
        const formData = new FormData();
        formData.append('text', debouncedText);
        formData.append('source', inLang.code);
        formData.append('target', outLang.code);
        formData.append('key', dotwise_api_key);

        const { data } = await axios.post(`${url}transcriptor/`, formData);
        if (data) {
          if (debouncedText !== "" && data.result)
            dispatch(outputText(data.result));
          else
            dispatch(outputText(""));
        }
      } catch (error) {
        console.error('Error transcribing:', error);
      }
      dispatch(pending(false));
    };
    Transcoding();
  }, [debouncedText, inLang, outLang, dispatch]);
}

export default Convert;
