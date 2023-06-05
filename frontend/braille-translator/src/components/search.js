import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { searchData, searchLangOptions } from "../redux/actions";


function Search() {

  const dispatch = useDispatch();
  const lang = useSelector(state => state.search.lang);
  const url = useSelector(state => state.backend.url);
  const dotwise_api_key = useSelector(state => state.backend.dotwiseApiKey);


  useEffect(() => {
    const getOptions = async () => {
      try {
        const { data } = await axios.get(`${url}search_options/`, {
          params: {
            key: dotwise_api_key,
          },
        });

        if (data) {
          dispatch(searchLangOptions(data));
        }
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    getOptions();
  }, [dispatch]);

  useEffect(() => {

    const getSearchData = async () => {
      try {
        const { data } = await axios.get(`${url}contraction_list/`, {
          params: {
            lang: lang.code,
            key: dotwise_api_key,
          }
        });
        if (data) {
          dispatch(searchData(data))
          // dispatch(inputOptions(data));
          // dispatch(outputOptions(data[0]['grade']));
        }
      } catch (error) {
        console.error('Error at contraction list :', error);
      }
    };
    getSearchData();
  }, [dispatch, lang]);

}

export default Search;

