

const languageReducer = (state = { inLang: { code: "auto", name: "Auto", native: "Detect" }, outLang: { code: "1", name: "Grade 1" }, detectLang: { code: "", name: "" } }, action) => {
  switch (action.type) {
    case "INPUT_LANGUAGE":
      return { ...state, inLang: action.payload.inLang };
    case "OUTPUT_LANGUAGE":
      return { ...state, outLang: action.payload.outLang };
    case "SWITCH_LANGUAGE":
      return { ...state, inLang: state.outLang, outLang: state.inLang };
    default:
      return state;
  }
}

export default languageReducer;
