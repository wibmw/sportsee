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
  const user1 = user.build()

  const userInfo = user1.userInfos
  const todayScore = user1.todayScore
  // Todo
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = user.getKeyData() // user1.keyData
  const sessionsActivity = user.getSessionsActivity() // user1.sessionsActivity
  const sessionsAverage = user.getSessionsAverage() // user1.sessionsAverage()
  const performances = user.getPerformances() // user1.performances()

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
              <div id='blank_footer' />
            </div>
          </section>
        </>
      )}
    </React.Fragment>
  )
}

export default Home
