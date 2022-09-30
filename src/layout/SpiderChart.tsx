import * as d3 from 'd3'
import { useEffect, useState, useRef } from 'react'
import { IValues, Size } from '../api/Interfaces'

const SpiderChart = (props: { performances: IValues[] }) => {
  // svg parent ref
  const radarContainerRef = useRef<HTMLHeadingElement>(null)
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
      parseInt(d3.select(radarContainerRef.current).style('width')) - margin.left - margin.right
    const graphHeight =
      parseInt(d3.select(radarContainerRef.current).style('height')) - margin.top - margin.bottom
    // SpiderChart Settings
    const color = d3.scaleOrdinal().range(['#EDC951', '#CC333F', '#00A0B0'])

    const cfg = {
      w: graphWidth, // Width of the circle
      h: graphHeight, // Height of the circle
      margin: margin, // The margins of the SVG
      levels: 5, // How many levels or inner circles should there be drawn
      maxValue: 0.5, // What is the value that the biggest circle will represent
      labelFactor: 1.25, // How much farther than the radius of the outer circle should the labels be placed
      wrapWidth: 60, // The number of pixels after which a label needs to be given a new line
      opacityArea: 0.35, // The opacity of the area of the blob
      dotRadius: 4, // The size of the colored circles of each blog
      opacityCircles: 0.1, // The opacity of the circles of each blob
      strokeWidth: 2, // The width of the stroke around each blob
      roundStrokes: false, // If true the area and stroke will follow a round path (cardinal-closed)
      color: color, // d3.scaleOrdinal(d3.schemeCategory10), // Color function
    }

    // If the supplied maxValue is smaller than the actual one, replace by the max in the data
    const maxValue = Math.max(cfg.maxValue, d3.max(performances, (d) => d.value) as number)

    const allAxis = performances.map((d) => d.kind), // Names of each axis
      total = allAxis.length, // The number of different axes
      radius = Math.min(cfg.w / 2, cfg.h / 2), // Radius of the outermost circle
      Format = d3.format('%'), // Percentage formatting
      angleSlice = (Math.PI * 2) / total // The width in radians of each "slice"

    // Scale for the radius
    const rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue])

    // ///////////////////////////////////////////////////////
    // ////////// Create the container SVG and g /////////////
    // ///////////////////////////////////////////////////////

    // Remove whatever chart with the same id/class was present before
    d3.select(radarContainerRef.current).select('svg').remove()

    // Initiate the radar chart SVG
    const svg = d3
      .select(radarContainerRef.current)
      .append('svg')
      .classed('radial-chart-svg', true)
      .attr('width', cfg.w + cfg.margin.left + cfg.margin.right)
      .attr('height', cfg.h + cfg.margin.top + cfg.margin.bottom)
      .attr('class', 'spider_Radar')
    // Append a g element
    const g = svg
      .append('g')
      .attr(
        'transform',
        'translate(' + (cfg.w / 2 + cfg.margin.left) + ',' + (cfg.h / 2 + cfg.margin.top) + ')',
      )

    // ///////////////////////////////////////////////////////
    // //////// Glow filter for some extra pizzazz ///////////
    // ///////////////////////////////////////////////////////

    // Filter for the outside glow
    const filter = g.append('defs').append('filter').attr('id', 'glow'),
      feGaussianBlur = filter
        .append('feGaussianBlur')
        .attr('stdDeviation', '2.5')
        .attr('result', 'coloredBlur'),
      feMerge = filter.append('feMerge'),
      feMergeNode1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
      feMergeNode2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

    // ///////////////////////////////////////////////////////
    // ///////////// Draw the Circular grid //////////////////
    // ///////////////////////////////////////////////////////

    // Wrapper for the grid & axes
    const axisGrid = g.append('g').attr('class', 'axisWrapper')

    // Draw the background circles
    axisGrid
      .selectAll('.levels')
      .data(d3.range(1, cfg.levels + 1).reverse())
      .enter()
      .append('circle')
      .attr('class', 'gridCircle')
      .attr('r', function (d, i) {
        return (radius / cfg.levels) * d
      })
      .style('fill', '#CDCDCD')
      .style('stroke', '#CDCDCD')
      .style('fill-opacity', cfg.opacityCircles)
      .style('filter', 'url(#glow)')

    // Text indicating at what % each level is
    /* axisGrid
      .selectAll('.axisLabel')
      .data(d3.range(1, cfg.levels + 1).reverse())
      .enter()
      .append('text')
      .attr('class', 'axisLabel')
      .attr('x', 4)
      .attr('y', function (d) {
        return (-d * radius) / cfg.levels
      })
      .attr('dy', '0.4em')
      .style('font-size', '10px')
      .attr('fill', '#737373')
      .text(function (d, i) {
        return Format((maxValue * d) / cfg.levels)
      })*/

    // ///////////////////////////////////////////////////////
    // ////////////////// Draw the axes //////////////////////
    // ///////////////////////////////////////////////////////

    // Create the straight lines radiating outward from the center
    const axis = axisGrid.selectAll('.axis').data(allAxis).enter().append('g').attr('class', 'axis')
    // Append the lines
    axis
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', function (d, i) {
        return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2)
      })
      .attr('y2', function (d, i) {
        return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2)
      })
      .attr('class', 'line')
      .style('stroke', 'white')
      .style('stroke-width', '2px')

    // Append the labels at each axis
    axis
      .append('text')
      .attr('class', 'legend')
      .style('font-size', '11px')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('x', function (d, i) {
        return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2)
      })
      .attr('y', function (d, i) {
        return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2)
      })
      .text(function (d) {
        return d
      })
      .call(wrap, cfg.wrapWidth)

    // ///////////////////////////////////////////////////////
    // /////////// Draw the radar chart blobs ////////////////
    // ///////////////////////////////////////////////////////

    // The radial line function
    const radarLine = d3
      .lineRadial()
      .angle((d, i) => (Math.PI / 4) * i) // d is empty (and ignored), i is the index
      .radius((d, i) => (length - i) * 2)
    // .curve(d3.curveCardinalClosed)
    /* if (cfg.roundStrokes) {
      radarLine.interpolate('cardinal-closed')
    }*/

    // Create a wrapper for the blobs *****************************************
    const blobWrapper = g
      .selectAll('.radarWrapper')
      .data(performances)
      .enter()
      .append('g')
      .attr('class', 'radarWrapper')

    // Append the backgrounds *************************************************
    blobWrapper
      .append('path')
      .attr('class', 'radarArea')
      .attr('d', function (d, i) {
        return radarLine(d as any)
      })

    /* .on('mouseover', function (d, i) {
        // Dim all blobs
        d3.selectAll('.radarArea').transition().duration(200).style('fill-opacity', 0.1)
        // Bring back the hovered over blob
        d3.select(this).transition().duration(200).style('fill-opacity', 0.7)
      })
      .on('mouseout', function () {
        // Bring back all blobs
        d3.selectAll('.radarArea').transition().duration(200).style('fill-opacity', cfg.opacityArea)
      })*/

    // Create the outlines ***************************************************
    blobWrapper
      .append('path')
      .attr('class', 'radarStroke')
      .attr('d', function (d, i) {
        return radarLine(d as any)
      })
      .style('stroke-width', cfg.strokeWidth + 'px')
      .style('stroke', 'red')
      .style('filter', 'url(#glow)')

    // Append the circles ****************************************************
    /* blobWrapper
      .selectAll('.radarCircle')
      .data(function (d: any, i) {
        return d
      })
      .enter()
      .append('circle')
      .attr('class', 'radarCircle')
      .attr('r', cfg.dotRadius)
      .attr('cx', function (d: any, i) {
        console.log(d)
        return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)
      })
      .attr('cy', function (d: any, i) {
        console.log(d)
        return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)
      })
      .style('fill', '#000')
      .style('fill-opacity', 0.8)

    // ///////////////////////////////////////////////////////
    // ////// Append invisible circles for tooltip ///////////
    // ///////////////////////////////////////////////////////

    // Wrapper for the invisible circles on top
    /* const blobCircleWrapper = g
      .selectAll('.radarCircleWrapper')
      .data(performances)
      .enter()
      .append('g')
      .attr('class', 'radarCircleWrapper')

    // Append a set of invisible circles on top for the mouseover pop-up
    blobCircleWrapper
      .selectAll('.radarInvisibleCircle')
      .data(function (d: any, i) {
        return d
      })
      .enter()
      .append('circle')
      .attr('class', 'radarInvisibleCircle')
      .attr('r', cfg.dotRadius * 1.5)
      .attr('cx', function (d: any, i) {
        return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)
      })
      .attr('cy', function (d: any, i) {
        return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)
      })
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .on('mouseover', function (d, i) {
        const newX = parseFloat(d3.select(this).attr('cx')) - 10
        const newY = parseFloat(d3.select(this).attr('cy')) - 10

        tooltip
          .attr('x', newX)
          .attr('y', newY)
          .text(Format(d.value))
          .transition()
          .duration(200)
          .style('opacity', 1)
      })
      .on('mouseout', function () {
        tooltip.transition().duration(200).style('opacity', 0)
      })
*/
    // Set up the small tooltip for when you hover over a circle
    const tooltip = g.append('text').attr('class', 'tooltip').style('opacity', 0)

    // ///////////////////////////////////////////////////////
    // ///////////////// Helper Function /////////////////////
    // ///////////////////////////////////////////////////////

    // Taken from http://bl.ocks.org/mbostock/7555321
    // Wraps SVG text
    function wrap(text: any, width: number) {
      text.each(function (this: SVGElement) {
        const text = d3.select(this),
          lineHeight = 1.4, // ems
          words = text.text().split(/\s+/).reverse(),
          y = text.attr('y'),
          x = text.attr('x'),
          dy = parseFloat(text.attr('dy'))
        let word = '',
          line: string[] = [],
          lineNumber = 0,
          tspan = text
            .text(null)
            .append('tspan')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', dy + 'em')
        while ((word = words.pop() as string)) {
          line.push(word)
          tspan.text(line.join(' '))

          const textLength = tspan?.node()?.getComputedTextLength() || 0
          if (textLength > width) {
            line.pop()
            tspan.text(line.join(' '))
            line = [word]
            tspan = text
              .append('tspan')
              .attr('x', x)
              .attr('y', y)
              .attr('dy', ++lineNumber * lineHeight + dy + 'em')
              .text(word)
          }
        }
      })
    } // wrap
  } // RadarChar

  return (
    <div
      className='spider-chart-container' // add a class for styling
      ref={radarContainerRef}
      style={{ height: svgHeight }}
    ></div>
  )
}

export default SpiderChart
