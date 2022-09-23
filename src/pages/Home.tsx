import React from 'react'
import User from '../api/User'
import SideBar from '../components/Sidebar'
import TopMessage from '../components/TopMessage'
import Activity from '../layout/Activity'
import BarChart from '../layout/BarChart'

const Home = () => {
  const user: User = new User('18')

  const userInfo = user.getUserInfos()
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = user.getKeyData()
  const sessionsActivity = user.getSessionsActivity()

  console.log(sessionsActivity)
  // const todayScore = user && user.getTodayScore()

  return (
    <React.Fragment>
      {user && (
        <>
          <section id='main_section'>
            {/** *********** Home SideBar ******************/}
            <SideBar />
            <div id='charts_block'>
              <TopMessage {...userInfo} />
              <section id='performance_chart_section'>
                {<BarChart session={sessionsActivity} />}
              </section>
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
