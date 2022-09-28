import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { Size } from '../api/Interfaces'

const RadialChart = (props: { todayScore: number }) => {
  // svg parent ref
  const radialContainerRef = useRef<HTMLHeadingElement>(null)
  // ref for resize event
  const updateWidth = useRef(false)
  // responsive width
  // The size of the window
  const [size, setSize] = useState<Size>()

  useEffect(() => {
    // if resize remove the previous chart
    updateWidth.current ? d3.select('.radial-chart-svg').remove() : (updateWidth.current = true)
    DrawChart(props.todayScore)
    // Listening for the window resize event
    window.addEventListener('resize', resizeHandler)
    // Cleanup function
    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [props.todayScore, size])

  // This function updates the state thus re-render components
  const resizeHandler = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }

  const svgHeight = 320
  const margin = { top: 40, left: 30, right: 30, bottom: 20 }

  const DrawChart = (todayScore: number) => {
    // dimentions
    const graphWidth =
      parseInt(d3.select(radialContainerRef.current).style('width')) - margin.left - margin.right
    // create new chart
    const svg = d3
      .select(radialContainerRef.current)
      .append('svg')
      .classed('radial-chart-svg', true)
      .attr('width', '100%')
      .attr('height', svgHeight)
      .style('background-color', '#F5F7F9')
      .style('border-radius', '5px')
    // Dots Tooltip
    const draw = (type: string, x: number | string, y: number| string, className: string, text: string) => {
      svg
        .append(type)
        .attr('x', x)
        .attr('y', y)
        .text(text || '')
        .attr('class', className || '')
    }
    // add a title
    draw('text', margin.left, margin.top, 'radial_title', 'Score')

    // Draw the Circle
    svg
      .append('circle')
      .attr('transform', `translate(${graphWidth / 2 + margin.right}, ${svgHeight / 2 + margin.bottom})`)
      .attr('r', 90)
      .attr('fill', '#fff')
    // center text
    svg
    draw('text', '50%','50%', 'radial r--black', `${todayScore * 100}%`)
    draw('text', '50%','62%', 'radial ', 'de votre')
    draw('text', '50%','73%', 'radial', 'objectif')

    //
    const graph = svg
      .append('g')
      .attr('transform', `translate(${graphWidth / 2 + margin.right}, ${svgHeight / 2 + margin.bottom})`)

    const arcPath = d3.arc().outerRadius(100).innerRadius(90).startAngle(0).cornerRadius(8)

    graph
      .append('path')
      .datum({ endAngle: -0.1 })
      .attr('d', arcPath as any)
      .attr('class', 'red_circle')
      .transition()
      .duration(750)
      .call(arcTween, todayScore * Math.PI * -2)

    function arcTween(transition: any, newFinishAngle: number) {
      transition.attrTween('d', function (d: any) {
        const interpolateEnd = d3.interpolate(d.endAngle, newFinishAngle)
        return function (t: number) {
          d.endAngle = interpolateEnd(t)
          return arcPath(d)
        }
      })
    }
  }

  return <div className='radial-chart-container' ref={radialContainerRef}></div>
}

export default RadialChart
