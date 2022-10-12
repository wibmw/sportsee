import * as d3 from 'd3'
import { createSVG, svgDraw } from '../../../utils/d3Tools'
import { useEffect, useRef, useState } from 'react'
import { Size } from '../../../api/Interfaces'
import { vw, svgRadius } from '../../../utils/responsive'

const RadialChart = (props: { todayScore: number }) => {
  // SVG container
  const radialContainerRef = useRef<HTMLHeadingElement>(null),
    // ref for resize event
    updateWidth = useRef(false),
    // The size of the window
    [size, setSize] = useState<Size>(),
    // Get Responsive width
    svgHeight = vw(16),
    svgWidth = vw(16),
    // Container margin
    margin = { top: 40, left: 30, right: 30, bottom: 20 },
    // Get Responsive Radius
    { radius, oRadius, iRadius } = svgRadius(svgWidth)

  useEffect(() => {
    // If re-render, remove the previous chart
    updateWidth.current ? document?.querySelector('.radial_chart')?.remove() : (updateWidth.current = true)
    // Draw the chart
    DrawChart(props.todayScore)
    // Listening for the window resize event
    window.addEventListener('resize', resizeHanlder)
    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', resizeHanlder)
    }
  }, [props.todayScore, size])

  // This function updates the state to re-render components
  const resizeHanlder = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }

  const DrawChart = (todayScore: number) => {
    // Create the SVG container
    const svg = createSVG(radialContainerRef.current, 'radial_chart', svgWidth, svgHeight)
    // Add a legend
    svgDraw(svg, 'text', margin.left, margin.top, 'radial_legend', 'Score')
    // Draw the Circle
    svg
      .append('circle')
      .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2 + margin.bottom})`)
      .attr('r', radius)
      .attr('fill', '#fff')
    // Add the center score and text
    svgDraw(svg, 'text', '50%', '50%', 'radial_text r--black', `${todayScore * 100}%`)
    svgDraw(svg, 'text', '50%', '62%', 'radial_text', 'de votre')
    svgDraw(svg, 'text', '50%', '73%', 'radial_text', 'objectif')
    // Circle thickness
    const arcPath = d3.arc().outerRadius(oRadius).innerRadius(iRadius).startAngle(0).cornerRadius(8)
    // Add the circle to the svg
    svg
      .append('g')
      .attr('transform', `translate(${svgWidth / 2}, ${svgHeight / 2 + margin.bottom})`)
      .append('path')
      .datum({ endAngle: -0.1 })
      .attr('d', arcPath as any)
      .attr('class', 'red_circle')
      .transition()
      .duration(750)
      .call(arcTween, todayScore * Math.PI * -2)
    // Define circle angle size
    function arcTween(transition: any, newFinishAngle: number) {
      transition.attrTween('d', function (d) {
        const interpolateEnd = d3.interpolate(d.endAngle, newFinishAngle)
        return function (t: number) {
          d.endAngle = interpolateEnd(t)
          return arcPath(d)
        }
      })
    }
  }

  return <div ref={radialContainerRef}></div>
}

export default RadialChart
