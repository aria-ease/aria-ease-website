import { FaGithub } from 'react-icons/fa'
import { useEffect } from 'react'
import sunicon from '../assets/sun.png'
import moonicon from '../assets/moon.png'
import { Link } from 'react-router-dom'
import blacklogo from '../assets/black-logo.png'
import whitelogo from '../assets/white-logo.png'


// eslint-disable-next-line react/prop-types
const Header = ({page, darkMode, setDarkMode, showDropdownPage, setShowDropdownPage}) => {
    useEffect(() => {
        if(darkMode) {
            document.querySelector('.theme-mode-image').setAttribute('src', `${sunicon}`)
            document.querySelector('.theme-mode-image').setAttribute('alt', 'Sun Icon')
            document.querySelector('.logo-img').setAttribute('src', `${whitelogo}`)
        } else {
            document.querySelector('.theme-mode-image').setAttribute('src', `${moonicon}`)
            document.querySelector('.theme-mode-image').setAttribute('alt', 'Moon Icon')
            document.querySelector('.logo-img').setAttribute('src', `${blacklogo}`)
        }
    },[darkMode])
    
  return (
    <div className="header">
        <button className='header-menu-button center-flex' onClick={() => setShowDropdownPage(!showDropdownPage)}>
            {darkMode ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="510" height="511" fill="none" viewBox="0 0 510 511" id="menu" className='white-hamburger h-[40px] w-[40px] ml-[-1px]'>
                    <path fill="#fff" fillRule="evenodd" d="M171 171V191H191V171H171zM166 156C160.477 156 156 160.477 156 166V196C156 201.523 160.477 206 166 206H196C201.523 206 206 201.523 206 196V166C206 160.477 201.523 156 196 156H166zM171 246V266H191V246H171zM166 231C160.477 231 156 235.477 156 241V271C156 276.523 160.477 281 166 281H196C201.523 281 206 276.523 206 271V241C206 235.477 201.523 231 196 231H166zM171 321V341H191V321H171zM166 306C160.477 306 156 310.477 156 316V346C156 351.523 160.477 356 166 356H196C201.523 356 206 351.523 206 346V316C206 310.477 201.523 306 196 306H166zM246 171V191H266V171H246zM241 156C235.477 156 231 160.477 231 166V196C231 201.523 235.477 206 241 206H271C276.523 206 281 201.523 281 196V166C281 160.477 276.523 156 271 156H241zM246 246V266H266V246H246zM241 231C235.477 231 231 235.477 231 241V271C231 276.523 235.477 281 241 281H271C276.523 281 281 276.523 281 271V241C281 235.477 276.523 231 271 231H241zM246 321V341H266V321H246zM241 306C235.477 306 231 310.477 231 316V346C231 351.523 235.477 356 241 356H271C276.523 356 281 351.523 281 346V316C281 310.477 276.523 306 271 306H241zM321 171V191H341V171H321zM316 156C310.477 156 306 160.477 306 166V196C306 201.523 310.477 206 316 206H346C351.523 206 356 201.523 356 196V166C356 160.477 351.523 156 346 156H316zM321 246V266H341V246H321zM316 231C310.477 231 306 235.477 306 241V271C306 276.523 310.477 281 316 281H346C351.523 281 356 276.523 356 271V241C356 235.477 351.523 231 346 231H316zM321 321V341H341V321H321zM316 306C310.477 306 306 310.477 306 316V346C306 351.523 310.477 356 316 356H346C351.523 356 356 351.523 356 346V316C356 310.477 351.523 306 346 306H316z" clipRule="evenodd"></path>
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="510" height="511" fill="none" viewBox="0 0 510 511" id="menu" className='black-hamburger h-[40px] w-[40px] ml-[-1px]'>
                    <path fill="#000" fillRule="evenodd" d="M171 171V191H191V171H171zM166 156C160.477 156 156 160.477 156 166V196C156 201.523 160.477 206 166 206H196C201.523 206 206 201.523 206 196V166C206 160.477 201.523 156 196 156H166zM171 246V266H191V246H171zM166 231C160.477 231 156 235.477 156 241V271C156 276.523 160.477 281 166 281H196C201.523 281 206 276.523 206 271V241C206 235.477 201.523 231 196 231H166zM171 321V341H191V321H171zM166 306C160.477 306 156 310.477 156 316V346C156 351.523 160.477 356 166 356H196C201.523 356 206 351.523 206 346V316C206 310.477 201.523 306 196 306H166zM246 171V191H266V171H246zM241 156C235.477 156 231 160.477 231 166V196C231 201.523 235.477 206 241 206H271C276.523 206 281 201.523 281 196V166C281 160.477 276.523 156 271 156H241zM246 246V266H266V246H246zM241 231C235.477 231 231 235.477 231 241V271C231 276.523 235.477 281 241 281H271C276.523 281 281 276.523 281 271V241C281 235.477 276.523 231 271 231H241zM246 321V341H266V321H246zM241 306C235.477 306 231 310.477 231 316V346C231 351.523 235.477 356 241 356H271C276.523 356 281 351.523 281 346V316C281 310.477 276.523 306 271 306H241zM321 171V191H341V171H321zM316 156C310.477 156 306 160.477 306 166V196C306 201.523 310.477 206 316 206H346C351.523 206 356 201.523 356 196V166C356 160.477 351.523 156 346 156H316zM321 246V266H341V246H321zM316 231C310.477 231 306 235.477 306 241V271C306 276.523 310.477 281 316 281H346C351.523 281 356 276.523 356 271V241C356 235.477 351.523 231 346 231H316zM321 321V341H341V321H321zM316 306C310.477 306 306 310.477 306 316V346C306 351.523 310.477 356 316 356H346C351.523 356 356 351.523 356 346V316C356 310.477 351.523 306 346 306H316z" clipRule="evenodd"></path>
                </svg>
            }
            
        </button>
        <Link onClick={() => {localStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/' className='header-logo-link block-interactive' aria-label="Navigate to home page"><img src={whitelogo} className="logo-img h-[30px] w-[30px]" alt="Aria Ease Logo"></img></Link>
        <div className='header-nav-link-div' id="header-nav-link-div">
            <Link onClick={() => {localStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/docs' className='header-nav-link block-interactive' aria-label='Navigate to the documentation page'>Documentation</Link>
            <Link onClick={() => {localStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/examples/accordion' aria-label="View examples of package implementation" className='header-nav-link block-interactive'>Examples</Link>
            <Link onClick={() => {localStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='https://github.com/aria-ease/aria-ease' aria-label="Navigate to project's GitHub repository" className='header-nav-link block-interactive'>Github</Link>
            <Link onClick={() => {localStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/blog/main' className='header-nav-link block-interactive' aria-label='Navigate to blog articles page'>Blog</Link>
        </div>
        <div className="header-search-div">
            <svg fill="rgba(181, 181, 181, 1)" height="18" viewBox="0 0 13 14" width="18" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="m8.82264 10.3833c-.92307.7008-2.07429 1.1167-3.32264 1.1167-3.03757 0-5.5-2.46243-5.5-5.5s2.46243-5.5 5.5-5.5 5.5 2.46243 5.5 5.5c0 1.24835-.4159 2.39957-1.1167 3.32264l2.897 2.89706c.2929.2929.2929.7677 0 1.0606s-.7677.2929-1.0606 0zm.67736-4.3833c0 2.20914-1.79086 4-4 4s-4-1.79086-4-4 1.79086-4 4-4 4 1.79086 4 4z" fillRule="evenodd"/></svg>
            <input type="text" placeholder="Search" className='block-interactive'/>
        </div>
        <div className='header-buttons-grid-div' id="header-buttons-grid-div">
            <a onClick={() => {localStorage.setItem(`scroll-position-${page}`, window.scrollY)}} href="https://github.com/aria-ease/aria-ease" aria-label="Navigate to project's GitHub repository" className='header-button block-interactive center-flex'><FaGithub className='header-button-icon'/></a>
            <button className='header-button block-interactive center-flex' onMouseDown={() => {setDarkMode((prevDarkMode) => !prevDarkMode)}} onKeyDown={(event) => {if(event.key === 'Enter' || event.key === " ") {event.preventDefault(); event.stopPropagation(); setDarkMode((prevDarkMode) => !prevDarkMode)}}} aria-label='Toggle dark mode'>
                <img src={sunicon} alt='Sun Icon' id='Sun' className='theme-mode-image'></img>
            </button>
        </div>
    </div>
  )
}

export default Header