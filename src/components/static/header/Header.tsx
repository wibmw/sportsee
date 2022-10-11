import { NavLink } from 'react-router-dom'
import homeLogo from '../../../assets/images/logo.png'

const Header = () => {
  return (
    <header className='header'>
      {/** *********** Home Picture Link ******************/}
      <NavLink to={'/'}>
        <img src={homeLogo} className='header_logo' alt='Kasa' />
      </NavLink>
      {/** *********** Nav links for all pages ******************/}
      <nav>
        <NavLink to={'/'} className='header_link'>
          Accueil
        </NavLink>
        <NavLink to={'/'} className='header_link'>
          Profil
        </NavLink>
        <NavLink to={'/'} className='header_link'>
          Réglage
        </NavLink>
        <NavLink to={'/'} className='header_link'>
          Communauté
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
