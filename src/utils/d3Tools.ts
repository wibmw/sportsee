import * as d3 from 'd3'

/**
 * D3: SVG container
 * @module
 * @param {HTMLHeadingElement} select
 * @param {string} classed
 * @param {(string | number)} width
 * @param {(string | number)} height
 * @returns {SVGSVGElement}
 */
export const createSVG = (select: HTMLHeadingElement, classed: string, width: string | number, height: string | number) => {
  return d3.select(select).append('svg').classed(classed, true).attr('width', width).attr('height', height)
}

/**
 * D3: Add text on Charts
 * @module
 * @param {d3.Selection<SVGSVGElement, unknown, null, undefined>} svg
 * @param {(number | string)} x
 * @param {(number | string)} y
 * @param {string} className
 * @param {string} text
 */
export const svgAddText = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  x: number | string,
  y: number | string,
  className: string,
  text: string,
) => {
  svg
    .append('text')
    .attr('x', x)
    .attr('y', y)
    .text(text || '')
    .attr('class', className || '')
}

/**
 * D3: Add Axis on charts
 * @module
 * @param {d3.Selection<SVGSVGElement, unknown, null, undefined>} svg
 * @param {*} axis
 * @param {number} translate
 * @param {string} select
 * @param {?string} [className]
 * @param {?boolean} [remove]
 * @returns {*}
 */
export const svgAxis = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  axis: any,
  translate: number,
  select: string,
  className?: string,
  remove?: boolean,
) => {
  const svgAxis = svg
    .append('g')
    .call(axis)
    .attr('transform', remove ? `translate(${translate}, 0)` : `translate(0, ${translate})`)
    .attr('class', className || '')
    .select(select)
  if (remove) svgAxis.remove()

  return svgAxis
}

/**
 * D3: Add Legends Dots on charts
 * @meth
 * @param {d3.Selection<SVGSVGElement, unknown, null, undefined>} svg
 * @param {string} type
 * @param {string} text
 * @param {number} x
 * @param {number} y
 * @param {string} className
 * @param {?number} [r]
 * @returns {*}
 */
export const svgLegendDots = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  type: string,
  text: string,
  x: number,
  y: number,
  className: string,
  r?: number,
) => {
  const legend = svg
    .append(type)
    .text(text || '')
    .attr(type === 'circle' ? 'cx' : 'dx', x)
    .attr(type === 'circle' ? 'cy' : 'dy', y)
    .attr('class', className)
  if (r) legend.attr('r', r)

  return legend
}

/**
 * D3: Add Groups of elements on charts
 * @module
 * @param {d3.Selection<SVGGElement, unknown, null, undefined>} svg
 * @param {string} type
 * @param {number} x
 * @param {number} y
 * @param {(number | string)} width
 * @param {(number | string)} height
 * @param {string} text
 * @param {string} className
 * @param {number} index
 * @returns {*}
 */
export const svgGroups = (
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  type: string,
  x: number,
  y: number,
  width: number | string,
  height: number | string,
  text: string,
  className: string,
  index: number,
) => {
  const group = svg
    .append(type)
    .attr(type === 'circle' ? 'cx' : 'x', x)
    .attr(type === 'circle' ? 'cy' : 'y', y)
    .attr('width', width)
    .attr('height', height)
    .text(text)
    .attr('class', className)
    .attr('r', type === 'circle' ? width : 0)
  // make it appear on hover + make the infos appears
  if (className === 'bar_chart_tooltip')
    group
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
  else group.attr('opacity', '0')
  return group
}

/**
 * D3: Returns xScale for X Axis
 * @module
 * @param {number[]} domain
 * @param {number[]} range
 * @returns {*}
 */
export const svgXScale = (domain: number[], range: number[]) => {
  return d3.scaleLinear().domain(domain).range(range)
}
