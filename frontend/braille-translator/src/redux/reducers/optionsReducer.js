
const optionsReducer = (state = { inOpt: [{ code: "auto", name: "Auto", native: "Detect" }], outOpt: [{ code: "1", name: "Grade 1" }], detectLang: { code: "", name: "" } }, action) => {
  switch (action.type) {
    case "INPUT_OPTIONS":
      return { ...state, inOpt: action.payload.inOpt };
    case "OUTPUT_OPTIONS":
      return { ...state, outOpt: action.payload.outOpt };
    case "SWITCH_OPTIONS":
      return { ...state, inOpt: state.outOpt, outOpt: state.inOpt };
    default:
      return state;
  }
}

export default optionsReducer;
