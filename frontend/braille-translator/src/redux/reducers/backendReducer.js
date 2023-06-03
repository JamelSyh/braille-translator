

const backendReducer = (state = { url: "https://api.dotwise.online" }, action) => {
  switch (action.type) {
    case "BACKEND_URL":
      return { ...state, url: action.payload.url };
    default:
      return state;
  }
}

export default backendReducer;
