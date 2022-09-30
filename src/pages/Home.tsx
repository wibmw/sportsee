import React from 'react'
import User from '../api/User'
import SideBar from '../components/Sidebar'
import TopMessage from '../components/TopMessage'
import Activity from '../layout/Activity'
import BarChart from '../layout/BarChart'
import LineChart from '../layout/LineChart'
import RadialChart from '../layout/RadialChart'
import SpiderChart2 from '../layout/SpiderChart2'

const Home = () => {
  const user: User = new User('12')

  const userInfo = user.getUserInfos()
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = user.getKeyData()
  const sessionsActivity = user.getSessionsActivity()
  const sessionsAverage = user.getSessionsAverage()
  const todayScore = user.getTodayScore()
  const performances = user.getPerformances()

  // const todayScore = user && user.getTodayScore()

  return (
    <React.Fragment>
      {user && (
        <>
          <section id='main_section'>
            {/** *********** Home SideBar ******************/}
            <SideBar />
            {/** *********** Charts Block ******************/}
            <div id='charts_block'>
              {/** *********** Welcome Message ******************/}
              <TopMessage {...userInfo} />
              {/** *********** Bar Chart ******************/}
              <BarChart session={sessionsActivity} />
              <section id='performance_chart_section'>
                {/** *********** 3 others Charts ******************/}
                <LineChart session={sessionsAverage} />
                <SpiderChart2 performances={performances} />
                <RadialChart todayScore={todayScore} />
              </section>
              {/** *********** Side Activities Infos ******************/}
              <Activity
                calorieCount={calorieCount}
                proteinCount={proteinCount}
                carbohydrateCount={carbohydrateCount}
                lipidCount={lipidCount}
              />
            </div>
          </section>
        </>
      )}
    </React.Fragment>
  )
}

export default Home
