
export const vh = (percent) => {
  const screen = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    h = (percent * screen) / 100
  return h < 260 ? h : 260
}

export const vw = (percent) => {
  const screen = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    w = (percent * screen) / 100
  return w > 155 ? w : 154
}



