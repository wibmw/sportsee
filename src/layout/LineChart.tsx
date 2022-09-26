import * as d3 from 'd3'
import { FC, useEffect, useState, useRef } from 'react'
import { IAverage, IAverageSessions, Size } from '../api/Interfaces'

const LineChart = (props: { session: IAverageSessions[] }) => {
  // svg parent ref
  const lineContainerRef = useRef<HTMLHeadingElement>(null)
  // ref for resize event
  const updateLines = useRef(false)
  // responsive width
  // The size of the window
  const [size, setSize] = useState<Size>()

  // responsive width
  const svgHeight = 320
  const margin = { top: 35, left: 20, right: 20, bottom: 35 }

  useEffect(() => {
    // if resize remove the previous chart
    updateLines.current ? d3.select('.line-chart-svg').remove() : (updateLines.current = true)
    // re-draw the chart with new dimensions after resize
    console.log(props.session)
    DrawChart(props.session)
    // Listening for the window resize event
    window.addEventListener('resize', resizeHanlder)
    // Cleanup function
    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', resizeHanlder)
    }
  }, [props.session, size])

  // This function updates the state thus re-render components
  const resizeHanlder = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }
  console.log(props.session)
  const DrawChart = (session: IAverageSessions[]) => {
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
    // add a title
    svg
      .append('text')
      .attr('fill', '#fff')
      .attr('x', margin.right)
      .attr('y', margin.top)
      .text('Durée moyenne des sessions')
      .style('font-size', '1rem')
    // X axis
    const xScale = d3
      .scaleLinear()
      .domain([0, 6])
      .range([margin.left, graphWidth + margin.right])

    const tickLabels = session.map((d) => d.day)
    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(0)
      .tickPadding(10)
      .ticks(7)
      .tickFormat((d, i) => tickLabels[i].toString().substring(0, 1))
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(session, (d) => d.sessionLength)] as number[])
      .range([graphHeight, margin.top + margin.bottom])

    svg
      .append('g')
      .call(xAxis)
      .attr('color', '#fff')
      .attr('transform', `translate(0, ${graphHeight + margin.top - 10})`)
      .attr('font-size', '1rem')
      .select('.domain')
      .remove()

    // tooltips
    session.forEach((data, index) => {
      // path
      const line = d3
        .line()
        .x((d) => xScale(tickLabels.indexOf(d[0] as number)))
        .y((d) => yScale(d[1] as number))
        .curve(d3.curveMonotoneX)

      const path = svg
        .append('path')
        .attr('d', line(data))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .attr('fill', 'none')

      // animation
      const pathLength = path && path.node().getTotalLength()
      path
        .attr('stroke-dashoffset', pathLength)
        .attr('stroke-dasharray', pathLength)
        .transition()
        .duration(1500)
        .attr('stroke-dashoffset', 0)
        .ease(d3.easeSin)

      const group = svg.append('g').attr('id', 'day' + index + 'average')
      group
        .append('rect')
        .attr('x', xScale(index))
        .attr('y', 0)
        .attr('width', '100%')
        .attr('height', graphHeight + margin.top + margin.bottom)
        .attr('fill', 'rgba(0, 0, 0, 0.1)')
        .attr('opacity', '0')
      group
        .append('rect')
        .attr('x', displayTooltip(index))
        .attr('y', yScale(session[index].sessionLength) - 25)
        .attr('width', 50)
        .attr('height', 20)
        .attr('fill', '#fff')
        .attr('opacity', '0')
      group
        .append('text')
        .attr('x', displayTooltip(index) + 25)
        .attr('y', yScale(session[index].sessionLength) - 10)
        .style('text-anchor', 'middle')
        .attr('fill', 'black')
        .text(session[index].sessionLength + 'min')
        .attr('opacity', '0')
      group
        .append('circle')
        .attr('fill', '#fff')
        .attr('cx', xScale(index))
        .attr('cy', yScale(session[index].sessionLength))
        .attr('r', 4)
        .attr('opacity', '0')
      group
        .append('circle')
        .classed('low-opacity-circle', true)
        .attr('fill', '#fff')
        .attr('cx', xScale(index))
        .attr('cy', yScale(session[index].sessionLength))
        .attr('r', 10)
        .attr('opacity', '0')
      // hover area
      svg
        .append('rect')
        .attr('x', xScale(index))
        .attr('y', 0)
        .attr('width', graphWidth / 7)
        .attr('height', 300)
        .attr('fill', 'transparent')
        .attr('opacity', '1')
        // make it appear on hover + make the infos appears
        .on('mouseover', function () {
          d3.selectAll(`#day${index}average > *`).transition().attr('opacity', '1')
          d3.selectAll(`#day${index}average > .low-opacity-circle`).transition().attr('opacity', '.3')
        })
        .on('mouseout', function () {
          d3.selectAll(`#day${index}average > *`).transition().attr('opacity', '0')
        })
    })
    // Just to be sure a tooltip don't go outside the chart
    function displayTooltip(index: number) {
      if (xScale(index) <= graphWidth - margin.left - margin.right) return xScale(index)
      else return xScale(index) - margin.left - margin.right
    }
  }

  return (
    <div
      className='line-chart-container' // add a class for styling
      ref={lineContainerRef}
      style={{ height: svgHeight }}
    ></div>
  )
}

export default LineChart
