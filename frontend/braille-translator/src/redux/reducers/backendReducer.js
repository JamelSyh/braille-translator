

const backendReducer = (state = { url: "https://api.dotwise.online", dotwiseApiKey: process.env.REACT_APP_DOTWISE_API_KEY, detectlangApiKey: process.env.REACT_APP_DETECTLANG_API_KEY, ocrApiKey: process.env.REACT_APP_OCR_API_KEY }, action) => {
  switch (action.type) {
    case "BACKEND_URL":
      return { ...state, url: action.payload.url };
    case "DOTWISE_API_KEY":
      return { ...state, dotwiseApiKey: action.payload.dotwiseApiKey };
    case "DETECTLANG_API_KEY":
      return { ...state, detectlangApiKey: action.payload.detectlangApiKey };
    case "OCR_API_KEY":
      return { ...state, ocrApiKey: action.payload.ocrApiKey };
    default:
      return state;
  }
}

export default backendReducer;
