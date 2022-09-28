import * as d3 from 'd3'
import { useEffect, useState, useRef } from 'react'
import { IValues, Size } from '../api/Interfaces'

const SpiderChart = (props: { performances: IValues[] }) => {
  // svg parent ref
  const lineContainerRef = useRef<HTMLHeadingElement>(null)
  // ref for resize event
  const updateWidth = useRef(false)
  // responsive width
  // The size of the window
  const [size, setSize] = useState<Size>()

  // responsive width
  const svgHeight = 320
  const margin = { top: 35, left: 20, right: 20, bottom: 35 }

  useEffect(() => {
    // if resize remove the previous chart
    updateWidth.current ? d3.select('.spider-chart-svg').remove() : (updateWidth.current = true)
    // re-draw the chart with new dimensions after resize
    DrawChart(props.performances)
    // Listening for the window resize event
    window.addEventListener('resize', resizeHandler)
    // Cleanup function
    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [props.performances, size])

  // This function updates the state thus re-render components
  const resizeHandler = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }

  const DrawChart = (performances: IValues[]) => {
    // dimentions
    const graphWidth =
      parseInt(d3.select(lineContainerRef.current).style('width')) - margin.left - margin.right
    const graphHeight =
      parseInt(d3.select(lineContainerRef.current).style('height')) - margin.top - margin.bottom
    // create new chart
    const svg = d3
      .select(lineContainerRef.current)
      .append('svg')
      .classed('line-chart-svg', true)
      .attr('width', graphWidth + margin.left + margin.right)
      .attr('height', graphHeight + margin.top + margin.bottom)
      .style('background-color', '#FF0000')
      .style('border-radius', '5px')
  }

  return (
    <div
      className='spider-chart-container' // add a class for styling
      ref={lineContainerRef}
      style={{ height: svgHeight }}
    ></div>
  )
}

export default SpiderChart
