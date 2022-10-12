import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'
import React, { useEffect, useState } from 'react'
import { IValues, Size } from '../../../api/Interfaces'
import { vw, svgRadius } from '../../../utils/responsive'

const SpiderChart = (props: { performances: IValues[] }) => {
  // The size of the window
  const [size, setSize] = useState<Size>({ width: 0, height: 0 }),
    [component, setComponent] = useState<JSX.Element>(),
    // Get Responsive width
    svgHeight = vw(16),
    svgWidth = vw(16),
    // Get Responsive radius
    { iRadius } = svgRadius(svgWidth)

  useEffect(() => {
    // Draw the chart
    const res = DrawChart(props.performances)
    if (res !== null) setComponent(res)
    // Listening for the window resize event
    window.addEventListener('resize', resizeHandler)
    // Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, [props.performances, size])

  // This function updates the state to re-render the component
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
      <React.Fragment>
        {performances && (
          <>
            {/** *********** Spider Chart Section ******************/}
            <RadarChart
              height={svgHeight}
              width={svgWidth}
              className='spider_chart'
              data={performances}
              cx='47%'
              outerRadius={iRadius}
              style={{ backgroundColor: '#282A30', borderRadius: 5 }}
            >
              {/** *********** Chart Grids ******************/}
              <PolarGrid radialLines={false} />
              {/** *********** chart Legends ******************/}
              <PolarAngleAxis tickFormatter={formatLabels} tick={{ fill: 'white' }} tickSize={4} />
              {/** *********** Chart Data Area ******************/}
              <Radar dataKey='value' fill='#ff0000' fillOpacity={0.7} />
            </RadarChart>
          </>
        )}
      </React.Fragment>
    )
  }

  return component || <React.Fragment />
}

export default SpiderChart
