import * as d3 from 'd3'

export const createSVG = (select: HTMLHeadingElement, classed: string, width: string | number, height: string | number) => {
  return d3
    .select(select)
    .append('svg')
    .classed(classed, true)
    .attr('width', width)
    .attr('height', height)

}

export const svgDraw = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  type: string,
  x: number | string,
  y: number | string,
  className: string,
  text: string,
) => {
  svg
    .append(type)
    .attr('x', x)
    .attr('y', y)
    .text(text || '')
    .attr('class', className || '')
}

// Axis
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
// legends
export const svgLegends = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  type: string,
  text: string,
  x: number,
  y: number,
  className: string,
  r?: number,
) => {
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

export const svgXScale = (domain:number[], range:number[]) => {
  return d3
  .scaleLinear()
  .domain(domain)
  .range(range)
}
