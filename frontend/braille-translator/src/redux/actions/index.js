

export const inputOptions = (inOpt = [{ name: "Auto", code: "auto", native: "Detect" }]) => {
  return {
    type: "INPUT_OPTIONS",
    payload: { inOpt: inOpt }
  }
}

export const outputOptions = (outOpt = [{ name: "Grade 1", code: "1" }]) => {
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

export const inputLang = (inLang = { name: "Auto", code: "auto", native: "Detect" }) => {
  return {
    type: "INPUT_LANGUAGE",
    payload: { inLang: inLang }
  }
}

export const outputLang = (outLang = { name: "Grade 1", code: "1" }) => {
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


