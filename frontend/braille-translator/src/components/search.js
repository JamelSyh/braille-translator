import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { searchData, searchLangOptions } from "../redux/actions";


function Search() {


  const dispatch = useDispatch();
  const inText = useSelector(state => state.text.inputText);
  const lang = useSelector(state => state.search.lang);
  const langOpt = useSelector(state => state.search.langOpt);
  const url = "https://braille-1-d9412035.deta.app";


  useEffect(() => {
    const getOptions = async () => {
      const { data } = await axios.get(`${url}/search_options`, {}, {
      });
      if (data) {
        dispatch(searchLangOptions(data));
      }
    };
    getOptions();
  }, [dispatch]);

  useEffect(() => {
    const getSearchData = async () => {
      const { data } = await axios.post(`${url}/contraction_list`, {}, {
        params: {
          lang: lang.code,
        }
      });
      if (data) {
        dispatch(searchData(data))
        // dispatch(inputOptions(data));
        // dispatch(outputOptions(data[0]['grade']));
      }
    };
    getSearchData();
  }, [dispatch, lang]);

}

export default Search;

