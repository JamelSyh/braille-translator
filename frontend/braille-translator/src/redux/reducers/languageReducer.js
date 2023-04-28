

const languageReducer = (state = { inLang: { code: "auto", name: "Auto", native: "Detect", grade: [{ code: "1", name: "Grade 1" }] }, outLang: { code: "1", name: "Grade 1" }, inTrans: [{ code: "en", name: "English", native: "english", grade: { code: "1", name: "Grade 1" } }, [{ code: "1", name: "Grade 1" }]], outTrans: [{ code: "fr", name: "French", native: "francais", grade: { code: "1", name: "Grade 1" } }, [{ code: "1", name: "Grade 1" }]] }, action) => {
  // console.log(state.outTrans);
  switch (action.type) {
    case "INPUT_LANGUAGE":
      return { ...state, inLang: action.payload.inLang };
    case "OUTPUT_LANGUAGE":
      return { ...state, outLang: action.payload.outLang };
    case "SWITCH_LANGUAGE":
      return { ...state, inLang: state.outLang, outLang: state.inLang };
    case "INPUT_TRANSLATE":
      return { ...state, inTrans: action.payload.inTrans };
    case "OUTPUT_TRANSLATE":
      return { ...state, outTrans: action.payload.outTrans };
    case "SWITCH_TRANS":
      return { ...state, inTrans: state.outTrans, outTrans: state.inTrans };
    default:
      return state;
  }
}

export default languageReducer;
