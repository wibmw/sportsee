/**
 * Responsive Chart: Returns VH size
 *
 * @method
 * @param {*} percent
 * @returns {number}
 */
export const vh = (percent) => {
  const screen = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    h = (percent * screen) / 100
  return h < 260 ? h : 260
}

/**
 * Responsive Chart: Returns VW size
 *
 * @method
 * @param {*} percent
 * @returns {number}
 */
export const vw = (percent) => {
  const screen = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    w = (percent * screen) / 100
  return w > 155 ? w : 154
}

/**
 * Responsive Chart: Returns reponsive Radius size
 *
 * @method
 * @param {*} width
 * @returns {{ radius: number, oRadius: number, iRadius: number }}
 */
export const svgRadius = (width) => {
  let radius = 50,
    oRadius = 55,
    iRadius = 48

  if (width > 248) {
    radius = 90
    oRadius = 100
    iRadius = 80
  } else if (width > 200 && width <= 248) {
    radius = 70
    oRadius = 75
    iRadius = 65
  }

  return { radius, oRadius, iRadius }
}
