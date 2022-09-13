import React from 'react'
import User from '../api/User'
import SideBar from '../components/Sidebar'
import TopMessage from '../components/TopMessage'
import { IKeyData, IUserInfos } from '../api/Interfaces'
import Activity from '../layout/Activity'

const Home = () => {
  const user: User = new User('12')
  user.getPerformances()

  const { firstName, lastName, age }: IUserInfos = user && user.getUserInfos()
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount }: IKeyData =
    user && user.getKeyData()
  const test = user && user.getPerformances()
  // const todayScore = user && user.getTodayScore()

  return (
    <React.Fragment>
      {user && (
        <>
          <section id='main_section'>
            {/** *********** Home SideBar ******************/}
            <SideBar />
            <div id='charts_block'>
              <TopMessage firstName={firstName} lastName={lastName} age={age} />
              <section id='performance_chart_section'></section>
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
