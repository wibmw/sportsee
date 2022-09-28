import React from 'react'
import User from '../api/User'
import SideBar from '../components/Sidebar'
import TopMessage from '../components/TopMessage'
import Activity from '../layout/Activity'
import BarChart from '../layout/BarChart'
import LineChart from '../layout/LineChart'
import RadialChart from '../layout/RadialChart'
import SpiderChart from '../layout/SpiderChart'

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
              <section id='performance_chart_section'>
                {/** *********** Bar Chart ******************/}
                <BarChart session={sessionsActivity} />
                {/** *********** 3 others Charts ******************/}
                <LineChart session={sessionsAverage} />
                <SpiderChart performances={performances} />
                <RadialChart todayScore={todayScore} />
              </section>
              {/** *********** Side Activities Infos ******************/}
              <section id='activity_data_section'>
                <Activity
                  calorieCount={calorieCount}
                  proteinCount={proteinCount}
                  carbohydrateCount={carbohydrateCount}
                  lipidCount={lipidCount}
                />
              </section>
            </div>
          </section>
        </>
      )}
    </React.Fragment>
  )
}

export default Home
