import React from 'react'
import SideBar from '../components/Sidebar'
import TopMessage from '../components/TopMessage'

const Home = () => {
  return (
    <React.Fragment>
      <section id='main_section'>
        {/** *********** Home SideBar ******************/}
        <SideBar />
        <div id='charts_block'>
          <TopMessage />
        </div>
      </section>
    </React.Fragment>
  )
}

export default Home
