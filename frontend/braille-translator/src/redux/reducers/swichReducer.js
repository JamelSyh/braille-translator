
const switchReducer = (state = { inOpt: [{ code: "en", name: "English", native: "English" }], outOpt: [{ code: "1", name: "Grade 1" }] }, action) => {
  switch (action.type) {
    case "SWITCH":
      return { ...state, inOpt: state.outOpt, outOpt: state.inOpt };
    default:
      return state;
  }
}

export default switchReducer;
