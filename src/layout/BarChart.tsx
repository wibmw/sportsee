import { BarProps, IActivitySessions, Props, Tooltip } from '../api/Interfaces'
import * as d3 from 'd3'
import React, { FC, useEffect, useRef, useState } from 'react'

const BarChart: FC<IActivitySessions> = ({ session }) => {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null)
  const axisBottomRef = useRef<SVGGElement>(null)
  const axisRightRef = useRef<SVGGElement>(null)

  const margin = { top: 10, right: 0, bottom: 20, left: 30 }
  const width = 500 - margin.left - margin.right
  const height = 300 - margin.top - margin.bottom

  console.log(session)
  const days = session.map(({ day }) => day)
  const sublabels = Object?.keys(session[0])
  const calories = session.map(({ calories }) => calories).flat()
  const kilogram = session.map(({ kilogram }) => kilogram).flat()
  console.log(calories)
  console.log(kilogram)
  const scaleX = d3.scaleBand().domain(days).range([0, width]).padding(0.1)
  const scaleY = d3
    .scaleLinear()
    .domain([0, Math.max(...calories)])
    .range([height, 0])
  const subscaleX = d3.scaleBand().domain(sublabels).range([0, scaleX.bandwidth()]).padding(0.05)

  useEffect(() => {
    if (axisBottomRef.current) {
      d3.select(axisBottomRef.current).call(d3.axisBottom(scaleX))
    }

    if (axisRightRef.current) {
      d3.select(axisRightRef.current).call(d3.axisRight(scaleY))
    }
  }, [scaleX, scaleY])

  return (
    <React.Fragment>
      {session && (
        <>
          <svg
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
          >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
              <g ref={axisBottomRef} transform={`translate(0, ${height})`} />
              <g ref={axisRightRef} transform={`translate(0, ${height})`} />
              {session.map(({ day, kilogram, calories }, groupIndex) => (
                <g key={`rect-group-${groupIndex}`} transform={`translate(${scaleX(day)}, 0)`}>
                  <>
                  <Bar
                      key={`rect-${0}`}
                      x={subscaleX(String(0)) || 0}
                      y={scaleY(calories)}
                      width={subscaleX.bandwidth()}
                      height={height - scaleY(calories)}
                      color='red'
                    />
                    <Bar
                      key={`rect-${1}`}
                      x={subscaleX(String(100)) || 0}
                      y={scaleY(kilogram)}
                      width={subscaleX.bandwidth()}
                      height={height - scaleY(kilogram)}
                      color='black'
                      /* onMouseEnter={(event) => {
                        setTooltip({
                          x: event.clientX,
                          y: event.clientY,
                          index: groupIndex,
                        })
                      }}
                      onMouseLeave={() => setTooltip(null)}*/
                    />

                  </>
                </g>
              ))}
            </g>
          </svg>
          {/* tooltip !== null ? (
        <div className='tooltip' style={{ top: tooltip.y, left: tooltip.x }}>
          <span className='tooltip__title'>{labels[tooltip.index]}</span>
          <table className='tooltip__table'>
            <thead>
              <tr>
                <td>Value 1</td>
                <td>Value 2</td>
                <td>Value 3</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data[tooltip.index].values[0]}</td>
                <td>{data[tooltip.index].values[1]}</td>
                <td>{data[tooltip.index].values[2]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : null*/}
        </>
      )}
    </React.Fragment>
  )
}

function Bar({ x, y, width, height, color }: BarProps) {
  const radius = height === 0 ? 0 : width * 0.15

  return (
    <path
      d={`
      m${x},${y + radius}
      a${radius},${radius} 0 0 1 ${radius},${-radius}
      h${width - 2 * radius}
      a${radius},${radius} 0 0 1 ${radius},${radius}
      v${height - radius}
      h-${width}
      z
    `}
      fill={color}
      // onMouseEnter={(event) => onMouseEnter(event)}
      // onMouseLeave={onMouseLeave}
    />
  )
}

export default BarChart
