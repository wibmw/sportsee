import React from 'react'
import User from '../api/User'
import SideBar from '../components/Sidebar'
import TopMessage from '../components/TopMessage'
import PropTypes from 'prop-types'
import { IUserInfos } from '../api/Interfaces'

const Home = () => {
  const user: User = new User('12')

  console.log(user && user.getUserInfos())
  console.log(user && user.getSessionsAverage())
  console.log(user && user.getSessionsActivity())
  // const todayScore = user && user.getTodayScore()

  return (
    <React.Fragment>
      {user && (
        <>
          <section id='main_section'>
            {/** *********** Home SideBar ******************/}
            <SideBar />
            <div id='charts_block'>
              <TopMessage />
            </div>
          </section>
        </>
      )}
    </React.Fragment>
  )
}

Home.propTypes = {
  userInfos: PropTypes.object,
}

export default Home
