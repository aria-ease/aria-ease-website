import { FaGithub } from 'react-icons/fa'
import { makeTabAccessible } from 'aria-ease'
import { useEffect } from 'react'
import sunicon from '../assets/sun.png'
import moonicon from '../assets/moon.png'
import { Link } from 'react-router-dom'
import hamburgermenu from '../assets/hamburger.png'

// eslint-disable-next-line react/prop-types
const Header = ({darkMode, setDarkMode, showDropdownPage, setShowDropdownPage}) => {
    useEffect(() => {
        makeTabAccessible('header-buttons-grid-div', 'header-button')
        makeTabAccessible('header-nav-link-div', 'header-nav-link')
    }, [])
    
  return (
    <div className="header">
        <button className='header-menu-button center-flex' onClick={() => setShowDropdownPage(!showDropdownPage)}>
            <img src={hamburgermenu} alt='Hamburger Menu Icon' style={{height: '20px', width: '24px'}}></img>
        </button>
        <Link to='/' className='header-logo-link'><span className="logo-span">aria-ease</span></Link>
        <div className='header-nav-link-div' id="header-nav-link-div">
            <a href="/docs" target='blank' className='header-nav-link'>Documentation</a>
            <Link to='/examples/menu' className='header-nav-link'>Examples</Link>
            <Link to='https://github.com/Scriptkidd98/aria-ease' className='header-nav-link'>Github</Link>
        </div>
        <div className="header-search-div">
            <svg fill="rgba(181, 181, 181, 1)" height="18" viewBox="0 0 13 14" width="18" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="m8.82264 10.3833c-.92307.7008-2.07429 1.1167-3.32264 1.1167-3.03757 0-5.5-2.46243-5.5-5.5s2.46243-5.5 5.5-5.5 5.5 2.46243 5.5 5.5c0 1.24835-.4159 2.39957-1.1167 3.32264l2.897 2.89706c.2929.2929.2929.7677 0 1.0606s-.7677.2929-1.0606 0zm.67736-4.3833c0 2.20914-1.79086 4-4 4s-4-1.79086-4-4 1.79086-4 4-4 4 1.79086 4 4z" fillRule="evenodd"/></svg>
            <input type="text" placeholder="Search"/>
        </div>
        <div className='header-buttons-grid-div' id="header-buttons-grid-div">
            <a href="https://github.com/Scriptkidd98/aria-ease" className='header-button center-flex'><FaGithub className='header-button-icon'/></a>
            <button className='header-button center-flex' onClick={() => {setDarkMode(!darkMode)}}>
                {darkMode ? 
                    <img src={sunicon} alt='Sun Icon' id='Sun'></img> :
                    <img src={moonicon} alt='Moon Icon' id='Moon'></img>
                }
            </button>
        </div>
    </div>
  )
}

export default Header