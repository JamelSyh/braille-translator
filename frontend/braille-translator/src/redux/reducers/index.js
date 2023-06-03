import { combineReducers } from "redux";
import dropdownReducer from "./dropdownReducer";
import languageReducer from "./languageReducer";
import optionsReducer from "./optionsReducer";
import textReducer from "./textReducer";
import functionsReducer from "./functionsReducer";
import tabReducer from "./tabReducer";
import searchReducer from "./searchReducer";
import backendReducer from "./backendReducer";

export const reducers = combineReducers({
  options: optionsReducer,
  language: languageReducer,
  text: textReducer,
  dropdown: dropdownReducer,
  functions: functionsReducer,
  tab: tabReducer,
  search: searchReducer,
  backend: backendReducer,
});

