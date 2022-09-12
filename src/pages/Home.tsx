import React from 'react'
import User from '../api/User'
import SideBar from '../components/Sidebar'
import TopMessage from '../components/TopMessage'
import { IUserInfos, userInfosProps } from '../api/Interfaces'

const Home = () => {
  const user: User = new User('12')

  const userInfos:userInfosProps = user && user.getUserInfos()
  // const todayScore = user && user.getTodayScore()

  return (
    <React.Fragment>
      {user && (
        <>
          <section id='main_section'>
            {/** *********** Home SideBar ******************/}
            <SideBar />
            <div id='charts_block'>
              <TopMessage userInfos={userInfos} />
            </div>
          </section>
        </>
      )}
    </React.Fragment>
  )
}

export default Home
