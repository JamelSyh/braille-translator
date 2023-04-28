
const optionsReducer = (state = { inOpt: [{ code: "auto", name: "Auto", native: "Detect", grade: [{ code: "1", name: "Grade 1" }] }], outOpt: [{ code: "1", name: "Grade 1" }], inTransOpt: [[{ code: "en", name: "English", native: "english", grade: { code: "1", name: "Grade 1" } }, [{ code: "1", name: "Grade 1" }]]], outTransOpt: [[{ code: "en", name: "English", native: "english", grade: { code: "1", name: "Grade 1" } }, [{ code: "1", name: "Grade 1" }]]] }, action) => {
  switch (action.type) {
    case "INPUT_OPTIONS":
      return { ...state, inOpt: action.payload.inOpt };
    case "OUTPUT_OPTIONS":
      return { ...state, outOpt: action.payload.outOpt };
    case "SWITCH_OPTIONS":
      return { ...state, inOpt: state.outOpt, outOpt: state.inOpt };
    case "INPUT_TRANS_OPTIONS":
      return { ...state, inTransOpt: action.payload.inTransOpt };
    case "OUTPUT_TRANS_OPTIONS":
      return { ...state, outTransOpt: action.payload.outTransOpt };
    case "SWITCH_TRANS_OPTIONS":
      return { ...state, inTransOpt: state.outTransOpt, outTransOpt: state.inTransOpt };
    default:
      return state;
  }
}

export default optionsReducer;
