import * as d3 from 'd3'
import { useEffect, useRef, useState } from 'react'
import { Size } from '../api/Interfaces'
import { vh, vw } from '../utils/responsive'

const RadialChart = (props: { todayScore: number }) => {
  // svg parent ref
  const radialContainerRef = useRef<HTMLHeadingElement>(null)
  // ref for resize event
  const updateWidth = useRef(false)
  // The size of the window
  const [size, setSize] = useState<Size>()

  // responsive width
  const svgHeight = vw(16),
    svgWidth = vw(16),
    margin = { top: 40, left: 30, right: 30, bottom: 20 }

  let radius = 50,
    oRadius = 55,
    iRadius = 48

  if (svgWidth > 248) {
    radius = 90
    oRadius = 100
    iRadius = 90
  } else if (svgWidth > 200 && svgWidth <= 248) {
    radius = 70
    oRadius = 75
    iRadius = 65
  }

  useEffect(() => {
    // if resize remove the previous chart
    updateWidth.current
      ? document?.querySelector('.radial-chart-svg')?.remove()
      : (updateWidth.current = true)
    // re-draw the chart with new dimensions after resize
    DrawChart(props.todayScore)
    // Listening for the window resize event
    window.addEventListener('resize', resizeHanlder)
    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', resizeHanlder)
    }
  }, [props.todayScore, size])

  // This function updates the state thus re-render components
  const resizeHanlder = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }

  const DrawChart = (todayScore: number) => {
    // dimentions
    const graphWidth =
      parseInt(d3.select(radialContainerRef.current).style('width')) - margin.left - margin.right
    // create new chart
    const svg = d3
      .select(radialContainerRef.current)
      .append('svg')
      .classed('radial-chart-svg', true)
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .style('background-color', '#F5F7F9')
      .style('border-radius', '5px')
    // Dots Tooltip
    const draw = (type: string, x: number | string, y: number | string, className: string, text: string) => {
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
      .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2 + margin.bottom})`)
      .attr('r', radius)
      .attr('fill', '#fff')
    // center text
    svg
    draw('text', '50%', '50%', 'radial r--black', `${todayScore * 100}%`)
    draw('text', '50%', '62%', 'radial ', 'de votre')
    draw('text', '50%', '73%', 'radial', 'objectif')

    //
    const graph = svg
      .append('g')
      .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2 + margin.bottom})`)

    const arcPath = d3.arc().outerRadius(oRadius).innerRadius(iRadius).startAngle(0).cornerRadius(8)

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

  return <div className='radial_chart' ref={radialContainerRef}></div>
}

export default RadialChart
