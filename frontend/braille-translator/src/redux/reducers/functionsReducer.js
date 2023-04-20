

const functionsReducer = (state = { keyboard: false, board: false, mobile: false, dark: false }, action) => {
  switch (action.type) {
    case "KEYBOARD":
      return { ...state, keyboard: action.payload.keyboard };
    case "BOARD":
      return { ...state, board: action.payload.board };
    case "MOBILE":
      return { ...state, mobile: action.payload.mobile }
    case "DARK":
      return { ...state, dark: action.payload.dark }
    default:
      return state;
  }
}

export default functionsReducer;
