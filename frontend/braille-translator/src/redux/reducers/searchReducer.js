
const searchReducer = (state = { lang: { code: "en", name: "English" }, langOpt: [{ code: "en", name: "English" }], data: [{ "contraction": "empty", "unicode": "empty" }] }, action) => {
  switch (action.type) {
    case "SEARCH_LANGUAGE":
      return { ...state, lang: action.payload.lang };
    case "SEARCH_DATA":
      return { ...state, data: action.payload.data };
    case "SEARCH_LANGUAGE_OPTIONS":
      return { ...state, langOpt: action.payload.langOpt };
    default:
      return state;
  }
}

export default searchReducer;
