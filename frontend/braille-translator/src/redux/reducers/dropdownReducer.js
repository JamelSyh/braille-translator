
const dropdownReducer = (state = { in: false, out: false }, action) => {
  switch (action.type) {
    case "TOGGLE_IN":
      return { ...state, in: action.payload.in };
    case "TOGGLE_OUT":
      return { ...state, out: action.payload.out };
    default:
      return state;
  }
}

export default dropdownReducer;
