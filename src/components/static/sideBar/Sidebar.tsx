import './sidebar.scss'
import { NavLink } from 'react-router-dom'
import yogaButton from '../../../assets/images/sideBar/yogaButton.png'
import swimmingButton from '../../../assets/images/sideBar/swimmingButton.png'
import bicycleButton from '../../../assets/images/sideBar/bicycleButton.png'
import bodyBuildingButton from '../../../assets/images/sideBar/bodyBuildingButton.png'

const Sidebar = () => {
  return (
    <aside className='sidebar'>
      {/** *********** sidebar Buttons ******************/}

      <nav>
        <NavLink to={'/'} className='sidebar_button'>
          <img src={yogaButton} className='sidebar_logo' alt='Kasa' />
        </NavLink>
        <NavLink to={'/'} className='sidebar_button'>
          <img src={swimmingButton} className='sidebar_logo' alt='Kasa' />
        </NavLink>
        <NavLink to={'/'} className='sidebar_button'>
          <img src={bicycleButton} className='sidebar_logo' alt='Kasa' />
        </NavLink>
        <NavLink to={'/'} className='sidebar_button'>
          <img src={bodyBuildingButton} className='sidebar_logo' alt='Kasa' />
        </NavLink>
      </nav>
      {/** *********** sidebar text ******************/}
      <div className='sidebar_text'>Copiryght, SportSee 2020</div>
    </aside>
  )
}

export default Sidebar
