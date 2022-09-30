import * as d3 from 'd3'
import { FC, useEffect, useState, useRef } from 'react'
import { IActivitySessions, Size } from '../api/Interfaces'

const BarCharts = (session: IActivitySessions) => {
  // svg parent ref
  const chartContainerRef = useRef<HTMLHeadingElement>(null)
  // ref for resize event
  const updateBars = useRef(false)
  // responsive width
  // The size of the window
  const [size, setSize] = useState<Size>()

  const svgHeight = 320
  const margin = { top: 50, left: 50, right: 20, bottom: 20 }

  useEffect(() => {
    // if resize remove the previous chart
    updateBars.current ? d3.select('.barChart-svg').remove() : (updateBars.current = true)
    // re-draw the chart with new dimensions after resize
    DrawChart(session)
    // Listening for the window resize event
    window.addEventListener('resize', resizeHanlder)
    // Cleanup function
    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', resizeHanlder)
    }
  }, [session, size])

  // This function updates the state thus re-render components
  const resizeHanlder = () => {
    setSize({ width: window.innerWidth, height: window.innerHeight })
  }

  const DrawChart = ({ session }: IActivitySessions) => {
    // dimentions
    const graphWidth =
      parseInt(d3.select(chartContainerRef.current).style('width')) - margin.left - margin.right
    const graphHeight =
      parseInt(d3.select(chartContainerRef.current).style('height')) - margin.top - margin.bottom

    // create new chart
    const svg = d3
      .select(chartContainerRef.current)
      .append('svg')
      .classed('barChart-svg', true)
      .attr('width', graphWidth + margin.left + margin.right)
      .attr('height', svgHeight)
      .style('background-color', '#F5F7F9')
      .style('border-radius', '5px')

    // chart title
    svg.append('text').attr('x', margin.right).attr('y', 30).text('Activité quotidienne')

    // Scales
    const scales = (domain: number[], range: number[]) => {
      return d3.scaleLinear().domain(domain).range(range)
    }

    // Axis
    const axis = (axis: any, translate: number, select: string, className?: string, remove?: boolean) => {
      const svgAxis = svg
        .append('g')
        .call(axis)
        .attr('transform', remove ? `translate(${translate}, 0)` : `translate(0, ${translate})`)
        .attr('class', className || '')
        .select(select)
      if (remove) svgAxis.remove()

      return svgAxis
    }

    // Y axis
    const maxWeight = d3.max(session, (d) => d.kilogram) as number
    const minWeight = d3.min(session, (d) => d.kilogram) as number
    const maxCalories = d3.max(session, (d) => d.calories) as number

    const yWeightScale = scales([minWeight - 1, maxWeight], [svgHeight - margin.top, 100])

    const yCaloriesScale = scales([0, maxCalories * 2], [0, svgHeight])

    const yAxis = d3.axisRight(yWeightScale).ticks(2).tickSize(0).tickPadding(10)

    // Right Y axis
    axis(yAxis, graphWidth + margin.right, '.domain', 'legends_text', true)

    // Axis grid lines
    const gridTickValues = yAxis.scale<any>().ticks(2)
    const yAxisGrid = d3
      .axisLeft(yWeightScale)
      .tickSize(graphWidth - margin.right - margin.left)
      .tickFormat(() => '')
      .tickValues(gridTickValues)

    axis(yAxisGrid, graphWidth - margin.right, 'path', 'chart_axis_grid', true)

    // X axis
    const extent = d3.extent(session.map((d) => new Date(d.day).getDate())) as number[]
    const xScale2 = d3
      .scaleBand()
      .domain(session.map((d) => new Date(d.day).getDate()) as any)
      .padding(-0.5)
    const xScale = scales(extent, [margin.left, graphWidth - margin.right])

    const xAxis = d3.axisBottom(xScale).tickSize(0).tickPadding(margin.bottom).ticks(7)

    axis(xAxis, svgHeight - margin.top, 'path', 'legends_text')

    // legends
    const legends = (type: string, text: string, x: number, y: number, className: string, r?: number) => {
      const legend = svg
        .append('g')
        .append(type)
        .text(text || '')
        .attr(type === 'circle' ? 'cx' : 'dx', x)
        .attr(type === 'circle' ? 'cy' : 'dy', y)
        .attr('class', className)
      if (r) legend.attr('r', r)

      return legend
    }
    // weight legend
    legends('circle', '', graphWidth - 190, margin.bottom + 5, '', 4)
    legends('text', 'Poids (kg)', graphWidth - 180, margin.bottom + 10, 'legends_text')

    // calories legend
    legends('circle', '', graphWidth - 100, margin.bottom + 5, 'red_circle', 4)
    legends('text', 'Calories brûlées (kCal)', graphWidth - 90, margin.bottom + 10, 'legends_text')

    // session
    const lines = (isWeight: boolean, isRounded: boolean, className: string) => {
      const xDiff = isWeight ? -7 : 7
      const yDiff = isRounded ? -5 : 0
      const y2Diff = isWeight ? 3 : 0
      const line = svg
        .append('g')
        .selectAll('line')
        .data(session)
        .enter()
        .append('line')
        .attr('x1', (d) => xScale(new Date(d.day).getDate()) + xDiff)
        .attr('x2', (d) => xScale(new Date(d.day).getDate()) + xDiff)
        .attr('y1', () => graphHeight + margin.bottom + yDiff)
        .attr('y2', () => graphHeight + margin.bottom + yDiff)
        .attr('class', className)
        .transition()
        .duration(700)
        .attr('y2', (d) =>
          isWeight ? yWeightScale(d.kilogram) + y2Diff : graphHeight - yCaloriesScale(d.calories),
        )

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
      const group = svg.append('g').attr('id', `day${index + 1}`)

      const groups = (
        type: string,
        x: number,
        y: number,
        width: number,
        height: number,
        data: string,
        className: string,
      ) => {
        const grp = group
          .append(type)
          .attr('x', x)
          .attr('y', y)
          .attr('width', width)
          .attr('height', height)
          .text(data)
          .attr('class', className)
        // make it appear on hover + make the infos appears
        if (className === 'bar_chart_tooltip')
          grp
            .on('mouseover', function () {
              d3.selectAll(`#day${index + 1} > *:not(:first-child)`)
                .transition()
                .duration(150)
                .attr('opacity', '1')
            })
            .on('mouseout', function () {
              d3.selectAll(`#day${index + 1} > *:not(:first-child)`)
                .transition()
                .attr('opacity', '0')
            })
        else grp.attr('opacity', '0')
        return grp
      }

      // Just to be sure a tooltip don't go outside the chart
      const displayTooltip = (index: number) => {
        if (xScale(index) <= graphWidth - margin.left - margin.right) return xScale(index)
        else return xScale(index) - 100
      }

      // create gray rectangles for hover
      groups('rect', xScale(index + 1) - 40, margin.top + 10, 60, 210, '', 'bar_chart_tooltip')
      // tooltip red square
      groups('rect', displayTooltip(index + 1) + 25, 40, 40, 55, '', 'bar_chart_tooltip-red')
      // weight tooltip info
      groups('text', displayTooltip(index + 1) + 47, 55, 0, 0, d.kilogram + 'Kg', 'bar_chart_tooltip-text')
      // calories tooltip info
      groups('text', displayTooltip(index + 1) + 47, 85, 0, 0, d.calories + 'Kcal', 'bar_chart_tooltip-text')
    })
  }

  return <div className='bar_chart' ref={chartContainerRef} style={{ height: svgHeight }}></div>
}

export default BarCharts
