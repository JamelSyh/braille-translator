

export const inputOptions = (inOpt = []) => {
  return {
    type: "INPUT_OPTIONS",
    payload: { inOpt: inOpt }
  }
}

export const outputOptions = (outOpt = []) => {
  return {
    type: "OUTPUT_OPTIONS",
    payload: { outOpt: outOpt }
  }
}

export const switchOption = () => {
  return {
    type: "SWITCH_OPTIONS",
  }
}

export const inputLang = (inLang = {}) => {
  return {
    type: "INPUT_LANGUAGE",
    payload: { inLang: inLang }
  }
}

export const outputLang = (outLang = {}) => {
  return {
    type: "OUTPUT_LANGUAGE",
    payload: { outLang: outLang }
  }
}

export const switchLang = () => {
  return {
    type: "SWITCH_LANGUAGE",
  }
}

export const inputTransOptions = (inTransOpt = []) => {
  return {
    type: "INPUT_TRANS_OPTIONS",
    payload: { inTransOpt: inTransOpt }
  }
}

export const outputTransOptions = (outTransOpt = []) => {
  return {
    type: "OUTPUT_TRANS_OPTIONS",
    payload: { outTransOpt: outTransOpt }
  }
}

export const switchTransOption = () => {
  return {
    type: "SWITCH_TRANS_OPTIONS",
  }
}


export const inputTransLang = (inTrans = []) => {
  return {
    type: "INPUT_TRANSLATE",
    payload: { inTrans: inTrans }
  }
}

export const outputTransLang = (outTrans = []) => {
  return {
    type: "OUTPUT_TRANSLATE",
    payload: { outTrans: outTrans }
  }
}

export const switchTransLang = () => {
  return {
    type: "SWITCH_TRANS",
  }
}

export const searchLang = (lang = []) => {
  return {
    type: "SEARCH_LANGUAGE",
    payload: { lang: lang }
  }
}
export const searchLangOptions = (langOpt = []) => {
  return {
    type: "SEARCH_LANGUAGE_OPTIONS",
    payload: { langOpt: langOpt }
  }
}

export const searchData = (data = []) => {
  return {
    type: "SEARCH_DATA",
    payload: { data: data }
  }
}

export const dropdownToggleIn = (state = false) => {
  return {
    type: "TOGGLE_IN",
    payload: { in: state }
  }
}

export const dropdownToggleOut = (state = false) => {
  return {
    type: "TOGGLE_OUT",
    payload: { out: state }
  }
}

export const inputText = (text = "") => {
  return {
    type: "INPUT_TEXT",
    payload: { inputText: text }
  }
}

export const outputText = (text = "") => {
  return {
    type: "OUTPUT_TEXT",
    payload: { outputText: text }
  }
}

export const pending = (state = false) => {
  return {
    type: "PENDING",
    payload: { pending: state }
  }
}

export const switchText = () => {
  return {
    type: "SWITCH_TEXT",
  }
}

export const keyboard = (state = false) => {
  return {
    type: "KEYBOARD",
    payload: { keyboard: state },
  }
}
export const board = (state = false) => {
  return {
    type: "BOARD",
    payload: { board: state },
  }
}


export const mobile = (state = false) => {
  return {
    type: "MOBILE",
    payload: { mobile: state },
  }
}

export const dark = (state = false) => {
  return {
    type: "DARK",
    payload: { dark: state },
  }
}

export const setTab = (tab = 0) => {
  return {
    type: "TAB",
    payload: { tab: tab },
  }
}


