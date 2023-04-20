
const textReducer = (state = { inputText: "", outputText: "", pending: false }, action) => {
  switch (action.type) {
    case "INPUT_TEXT":
      return { ...state, inputText: action.payload.inputText };
    case "OUTPUT_TEXT":
      return { ...state, outputText: action.payload.outputText };
    case "PENDING":
      return { ...state, pending: action.payload.pending }
    case "SWITCH_TEXT":
      return { ...state, inputText: state.outputText, outputText: state.inputText };
    default:
      return state;
  }
}

export default textReducer;
