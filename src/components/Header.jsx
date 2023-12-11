import { FaGithub } from 'react-icons/fa'
import { makeTabAccessible } from 'aria-ease'
import { useEffect } from 'react'

// eslint-disable-next-line react/prop-types
const Header = ({darkMode, setDarkMode}) => {
    useEffect(() => {
        makeTabAccessible('header-buttons-grid-div', 'header-button')
    }, [])
  return (
    <div className="header">
        <span className="logo-span">aria-ease</span>
        <div className="header-search-div">
            <svg fill="rgba(181, 181, 181, 1)" height="14" viewBox="0 0 13 14" width="13" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="m8.82264 10.3833c-.92307.7008-2.07429 1.1167-3.32264 1.1167-3.03757 0-5.5-2.46243-5.5-5.5s2.46243-5.5 5.5-5.5 5.5 2.46243 5.5 5.5c0 1.24835-.4159 2.39957-1.1167 3.32264l2.897 2.89706c.2929.2929.2929.7677 0 1.0606s-.7677.2929-1.0606 0zm.67736-4.3833c0 2.20914-1.79086 4-4 4s-4-1.79086-4-4 1.79086-4 4-4 4 1.79086 4 4z" fillRule="evenodd"/></svg>
            <input type="text" placeholder="Search"/>
        </div>
        <div className='header-buttons-grid-div' id="header-buttons-grid-div">
            <a href="https://github.com/Scriptkidd98/aria-ease" className='header-button center-flex'><FaGithub className='header-button-icon'/></a>
            {/* <button className='header-button center-flex' onClick={() => {setDarkMode(!darkMode)}}>
                {darkMode ? 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Sun">
                        <path d="M5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12ZM5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM12,5a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5Zm5.66,2.34a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34Zm-12-.29a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5ZM12,19a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19Z" fill="#c0c0c0" className="color000000 svgShape"></path>
                    </svg> : 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="Moon">
                        <g fill="#000000" className="color000000 svgShape">
                        <g fill="#000000" className="color000000 svgShape">
                        <path fill="#808080" d="M40.8 28.4C43.5 18 38.1 7 28.2 2.7c-2.6-1.1-5.4-1.7-8-1.8-.9 0-1.4 1-.8 1.7 4.5 4.7 6.8 11 5.8 17.8-.9 3.6-6.2 2.7-8 4.4-1.9 1.8 4.2 5.1 4.2 5.1-3.3 4.7-8.5 8.2-14.1 9.4-.9.2-1.1 1.3-.3 1.8 1.7 1.2 3.6 2.1 5.6 2.8 12 3.9 24.9-3.1 28.2-15.5z" className="colorffe500 svgShape"></path>
                        <ellipse cx="24" cy="45.6" fill="#404040" opacity=".15" rx="11.5" ry="1.5" className="color45413c svgShape"></ellipse>
                        <g fill="#000000" className="color000000 svgShape">
                            <path fill="#c5c5c5" d="M18.1 27.6c2.3-.7 5.7-.8 6.4-3.6.1-.9.2-1.7.2-2.6-1.6 2.4-5.9 1.8-7.6 3.4-.8.8-.1 1.9 1 2.8zM28.2 2.7c-2.6-1.1-5.4-1.7-8-1.8-.9 0-1.4 1-.8 1.7.6.7 1.2 1.3 1.7 2 9.4 1 17.2 8 19.2 17.4.5 2.3.6 4.6.3 6.8 0-.1.1-.3.1-.4C43.5 18 38.1 7 28.2 2.7zM7 41.1c.6.4 1.3.8 2 1.2 3.4-1.1 8.1-5.3 10.4-7.4.7-.6.6-1.7-.2-2.2-3.2 3.3-7.3 5.8-11.8 6.7-.9 0-1.2 1.2-.4 1.7z" className="colorfff48c svgShape"></path>
                        </g>
                        <path fill="none" stroke="#404040" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M40.8 28.4C43.5 18 38.1 7 28.2 2.7c-2.6-1.1-5.4-1.7-8-1.8-.9 0-1.4 1-.8 1.7 4.5 4.7 6.8 11 5.8 17.8-.9 3.6-6.2 2.7-8 4.4-1.9 1.8 4.2 5.1 4.2 5.1-3.3 4.7-8.5 8.2-14.1 9.4-.9.2-1.1 1.3-.3 1.8 1.7 1.2 3.6 2.1 5.6 2.8 12 3.9 24.9-3.1 28.2-15.5zM21.4 29.9c1.9 1.1 3.4 1.4 3.8-.4" className="colorStroke45413c svgStroke"></path><circle cx="30.3" cy="23.5" r="1.1" fill="#404040" stroke="#404040" strokeMiterlimit="10" transform="rotate(-71.893 30.32 23.481)" className="color45413c svgShape colorStroke45413c svgStroke"></circle><circle cx="32.1" cy="33.6" r="1.3" fill="#c0c0c0" transform="rotate(-71.899 32.132 33.616)" className="colorfffacf svgShape"></circle><path fill="none" stroke="#404040" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M17.9 33.9s3.4 3.6 8.3 2.3M26.9 33.9s-1 1-.7 2.2c.4 1.5 1.9 1.7 1.9 1.7" className="colorStroke45413c svgStroke"></path></g></g>
                    </svg>
                }
            </button> */}
            <button className='header-button center-flex' onClick={() => {setDarkMode(!darkMode)}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Sun">
                    <path d="M5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12ZM5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM12,5a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5Zm5.66,2.34a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34Zm-12-.29a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5ZM12,19a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19Z" fill="#c0c0c0" className="color000000 svgShape"></path>
                </svg>
            </button>
        </div>
    </div>
  )
}

export default Header