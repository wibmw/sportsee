import * as d3 from 'd3'
import { useEffect, useState, useRef } from 'react'
import { IActivitySessions, Size } from '../../../api/Interfaces'
import { createSVG, svgAxis, svgLegendDots, svgGroups, svgAddText } from '../../../utils/d3Tools'

/**
 * React Component: Returns the Bar Chart from Activity Sessions Datas
 *
 * @module
 * @param {IActivitySessions} session
 * @returns {*}
 */
const BarCharts = (session: IActivitySessions) => {
  // SVG container
  const chartContainerRef = useRef<HTMLHeadingElement>(null),
    // ref for resize event
    updateBars = useRef(false),
    // The size of the window
    [size, setSize] = useState<Size>(),
    // Get Responsive width
    svgHeight = 320,
    // Container margin
    margin = { top: 50, left: 50, right: 20, bottom: 20 }

  useEffect(() => {
    // If re-render, remove the previous chart
    updateBars.current ? d3.select('.barChart-svg').remove() : (updateBars.current = true)
    // Draw the chart
    DrawChart(session)
    // Listening for the window resize event
    window.addEventListener('resize', resizeHanlder)
    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', resizeHanlder)
    }
  }, [session, size])

  // This function updates the state to re-render components
  const resizeHanlder = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }

  const DrawChart = ({ session }: IActivitySessions) => {
    // dimentions
    const graphWidth = parseInt(d3.select(chartContainerRef.current).style('width')) - margin.left - margin.right
    const graphHeight = parseInt(d3.select(chartContainerRef.current).style('height')) - margin.top - margin.bottom

    // create new chart
    const svg = createSVG(chartContainerRef.current, 'barChart-svg', graphWidth + margin.left + margin.right, svgHeight)

    // chart title
    svgAddText(svg, margin.right, 30, '', 'Activité quotidienne')

    // Scales
    const scales = (domain: number[], range: number[]) => {
      return d3.scaleLinear().domain(domain).range(range)
    }

    // Y axis
    const maxWeight = d3.max(session, (d) => d.kilogram) as number,
      minWeight = d3.min(session, (d) => d.kilogram) as number,
      maxCalories = d3.max(session, (d) => d.calories) as number,
      yWeightScale = scales([minWeight - 1, maxWeight], [svgHeight - margin.top, 100]),
      yCaloriesScale = scales([0, maxCalories * 2], [0, svgHeight]),
      yAxis = d3.axisRight(yWeightScale).ticks(2).tickSize(0).tickPadding(10)

    // Right Y axis
    svgAxis(svg, yAxis, graphWidth + margin.right, '.domain', 'legends_text', true)

    // Axis grid lines
    const gridTickValues = yAxis.scale<any>().ticks(2)
    const yAxisGrid = d3
      .axisLeft(yWeightScale)
      .tickSize(graphWidth - margin.right - margin.left)
      .tickFormat(() => '')
      .tickValues(gridTickValues)

    svgAxis(svg, yAxisGrid, graphWidth - margin.right, 'path', 'chart_axis_grid', true)

    // X axis
    const extent = d3.extent(session.map((d) => new Date(d.day).getDate())) as number[],
      xScale = scales(extent, [margin.left, graphWidth - margin.right]),
      xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(margin.bottom).ticks(7)

    svgAxis(svg, xAxis, svgHeight - margin.top, 'path', 'legends_text')

    // weight legend
    svgLegendDots(svg, 'circle', '', graphWidth - 190, margin.bottom + 5, '', 4)
    svgAddText(svg, graphWidth - 180, margin.bottom + 10, 'legends_text', 'Poids (kg)')

    // calories legend
    svgLegendDots(svg, 'circle', '', graphWidth - 100, margin.bottom + 5, 'red_circle', 4)
    svgAddText(svg, graphWidth - 90, margin.bottom + 10, 'legends_text', 'Calories brûlées (kCal)')

    // Bars creation
    const lines = (isWeight: boolean, isRounded: boolean, className: string) => {
      const xDiff = isWeight ? -7 : 7,
        yDiff = isRounded ? -5 : 0,
        y2Diff = isWeight ? 3 : 0,
        line = svg
          .append('g')
          .selectAll('line')
          .data(session)
          .enter()
          .append('line')
          .attr(
            'x1',
            (d, index) => xScale(new Date(d.day).getDate()) + xDiff + (index === 0 ? 10 : 0) + (index === 6 ? -10 : 0),
          )
          .attr(
            'x2',
            (d, index) => xScale(new Date(d.day).getDate()) + xDiff + (index === 0 ? 10 : 0) + (index === 6 ? -10 : 0),
          )
          .attr('y1', () => graphHeight + margin.bottom + yDiff)
          .attr('y2', () => graphHeight + margin.bottom + yDiff)
          .attr('class', className)
          .transition()
          .duration(700)
          .attr('y2', (d) => (isWeight ? yWeightScale(d.kilogram) + y2Diff : graphHeight - yCaloriesScale(d.calories)))

      return line
    }
    // rounded weight line
    lines(true, true, 'weight_line rounded_line')
    // rect weight line
    lines(true, false, 'weight_line butted_line')
    // rounded calories line
    lines(false, true, 'calories_line rounded_line')
    // rect calories line
    lines(false, false, 'calories_line butted_line')
    // tooltips
    session.forEach((d, index) => {
      // Just to be sure a tooltip don't go outside the chart
      const displayTooltip = (index: number) => {
        if (xScale(index) <= graphWidth - margin.left - margin.right) return xScale(index)
        else return xScale(index) - 100
      }
      const group = svg.append('g').attr('id', `day${index + 1}`)
      // create gray rectangles for hover
      svgGroups(group, 'rect', xScale(index + 1) - 40, margin.top + 10, 60, 210, '', 'bar_chart_tooltip', index)
      // tooltip red square
      svgGroups(group, 'rect', displayTooltip(index + 1) + 25, 40, 40, 55, '', 'bar_chart_tooltip-red', index)
      // weight tooltip info
      svgGroups(group, 'text', displayTooltip(index + 1) + 47, 55, 0, 0, d.kilogram + 'Kg', 'bar_chart_tooltip-text', index)
      // calories tooltip info
      svgGroups(
        group,
        'text',
        displayTooltip(index + 1) + 47,
        85,
        0,
        0,
        d.calories + 'Kcal',
        'bar_chart_tooltip-text',
        index,
      )
    })
  }

  return <div className='bar_chart' ref={chartContainerRef} style={{ height: svgHeight }}></div>
}

export default BarCharts
