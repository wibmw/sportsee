import { useState } from 'react'
import { Size } from '../api/Interfaces'

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

// This function updates the state thus re-render components
const resizeHanlder = () => {
  0
}

export const  resize = async(updateWidth) => {
    // window.removeEventListener('resize', resizeHanlder)
  // if resize remove the previous chart
  updateWidth.current ? document?.querySelector('.line-chart-svg')?.remove() : (updateWidth.current = true)

  // Listening for the window resize event
  window.addEventListener('resize', resizeHanlder)
  // Cleanup function
  // Remove the event listener when the component is unmounted
  return { width:0, height:0}
  
}
