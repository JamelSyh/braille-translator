const tabReducer = (state = { tab: 0 }, action) => {
  switch (action.type) {
    case "TAB":
      return { ...state, tab: action.payload.tab };
    default:
      return state;
  }
}

export default tabReducer;
