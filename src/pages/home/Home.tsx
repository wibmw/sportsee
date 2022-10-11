import React from 'react'
import SideBar from '../../components/static/sideBar/Sidebar'
import TopMessage from '../../components/static/topMessage/TopMessage'
import Activity from '../../components/charts/activityItems/Activity'
import BarChart from '../../components/charts/barChart/BarChart'
import LineChart from '../../components/charts/lineChart/LineChart'
import RadialChart from '../../components/charts/radialChart/RadialChart'
import SpiderChart from '../../components/charts/spiderChart/SpiderChart'
import Service from '../../api/Service'

const Home = () => {
  const service = new Service('18'),
    user = service.getAllDatas(),
    userInfo = user.userInfos,
    sessionsActivity = user.sessionsActivity,
    sessionsAverage = user.sessionsAverage,
    todayScore = user.todayScore,
    performances = user.performances,
    { calorieCount, proteinCount, carbohydrateCount, lipidCount } = user.keyData

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
                <SpiderChart performances={performances} />
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
