import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'
import React, { useEffect, useState, useRef } from 'react'
import { IValues, Size } from '../api/Interfaces'
import { vh, vw } from '../utils/responsive'

const SpiderChart = (props: { performances: IValues[] }) => {
  // svg parent ref
  const radarContainerRef = useRef<HTMLHeadingElement>(null),
    // ref for resize event
    updateWidth = useRef(false),
    // responsive width,
    // The size of the window
    [size, setSize] = useState<Size>({ width: 0, height: 0 }),
    [component, setComponent] = useState<JSX.Element>(),
    // responsive width
    svgHeight = vw(16),
    svgWidth = vw(16),
    margin = { top: 35, left: 20, right: 20, bottom: 35 }

  const oRadius = () => {
    let radius = 50
    if (svgWidth > 280) radius = 80
    else if (svgWidth > 200 && svgWidth <= 280) radius = 65
    return radius
  }

  useEffect(() => {
    // if resize remove the previous chart
    updateWidth.current
      ? document?.querySelector('.spider-chart-svg')?.remove()
      : (updateWidth.current = true)
    // re-draw the chart with new dimensions after resize
    const res = DrawChart(props.performances)
    if (res !== null) setComponent(res)
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
    // Format labels
    const formatLabels = (i: number) => {
      const kind = performances[i]?.kind as string
      const capsKind = kind?.charAt(0)?.toUpperCase() + kind?.slice(1)
      return capsKind
    }

    return (
      performances && (
        <ResponsiveContainer
          height={svgHeight}
          width={svgWidth}
          className='spider_chart'
          ref={radarContainerRef}
        >
          <RadarChart
            data={performances}
            cx='47%'
            outerRadius={oRadius()}
            style={{ backgroundColor: '#282A30', borderRadius: 5 }}
          >
            <PolarGrid radialLines={false} />
            <PolarAngleAxis
              tickFormatter={formatLabels}
              tick={{ fill: 'white' }}
              tickSize={4}
            />
            <Radar dataKey='value' fill='#ff0000' fillOpacity={0.7} />
          </RadarChart>
        </ResponsiveContainer>
      )
    )
  }

  return component || <React.Fragment />
}

export default SpiderChart
