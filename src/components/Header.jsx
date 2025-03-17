import { FaGithub } from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';
import sunicon from '../assets/sun.png';
import moonicon from '../assets/moon.png';
import { Link } from 'react-router-dom';
import blacklogo from '../assets/black-logo.png';
import whitelogo from '../assets/white-logo.png';
import Fuse from 'fuse.js';
import { X } from 'lucide-react';
import { makeBlockAccessible } from 'aria-ease';


// eslint-disable-next-line react/prop-types
const Header = ({page, darkMode, setDarkMode, showDropdownPage, setShowDropdownPage}) => {
    const searchInputRef = useRef(null);
    const searchContainerFocusRef = useRef(null)

    const[query, setQuery] = useState("");
    const[docs, setDocs] = useState([]);
    const[results, setResults] = useState([]);
    const[resultsVisible, setResultsVisible] = useState(false);

    useEffect(() => {
        fetch('/docs.json')
        .then((res) => res.json())
        .then((data) => setDocs(data));

        if(darkMode) {
            document.querySelector('.theme-mode-image').setAttribute('src', `${sunicon}`)
            document.querySelector('.theme-mode-image').setAttribute('alt', 'Sun Icon')
            document.querySelector('.logo-img').setAttribute('src', `${whitelogo}`)
        } else {
            document.querySelector('.theme-mode-image').setAttribute('src', `${moonicon}`)
            document.querySelector('.theme-mode-image').setAttribute('alt', 'Moon Icon')
            document.querySelector('.logo-img').setAttribute('src', `${blacklogo}`)
        }
    },[darkMode]);

    useEffect(() => {
        if(!query) {
            document.body.style.overflow = 'unset';
            setResultsVisible(false);
            setResults([]);
            return;
        }

        const fuse = new Fuse(docs, {
            keys: ['title', 'content'],
            threshold: 0.5
        })

        //console.log(fuse.search(query));
        document.body.style.overflow = 'hidden';
        setResults(fuse.search(query).map((r) => r.item));
        setResultsVisible(true);
    }, [query, docs]);
  

    useEffect(() => {
        const handleGlobalKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                searchInputRef.current?.focus();
            }
            if(resultsVisible) {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    setResultsVisible(false);
                    return;
                }
                if (event.key === 'Tab') {
                    const focusedElement = document.activeElement;
                    if(focusedElement?.classList.contains('search-container-items')) {
                        event.preventDefault();
                        const searchItems = document.querySelectorAll('.search-container-items');
                        const currentIndex = Array.from(searchItems).indexOf(document.activeElement);
                        if (event.shiftKey) {
                            // Tab backwards
                            if (currentIndex <= 0 || currentIndex === -1) {
                                searchItems[searchItems.length - 1]?.focus();
                            } else {
                                searchItems[currentIndex - 1]?.focus();
                            }
                        } else {
                            // Tab forwards
                            if (currentIndex === searchItems.length - 1 || currentIndex === -1) {
                                searchItems[0]?.focus();
                            } else {
                                searchItems[currentIndex + 1]?.focus();
                            }
                        }
                    }
                }
            }
        };
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [resultsVisible, results]);

    const handleKeyDown = (event) => {
        if (resultsVisible) {
            setTimeout(() => {
                const focusedElement = document.activeElement;
                if(focusedElement?.classList.contains('search-container-items')) {
                    focusedElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }
            }, 10);
            return event;
        }
    }

    useEffect(() => {
        if(query !== '' && query.length > 0 && results.length > 0 && resultsVisible) {
            const accessibleBlock = makeBlockAccessible('search-container', 'search-container-items');
            return accessibleBlock;
        }
        if(query !== '' && query.length > 0 && resultsVisible) {
            const accessibleBlock = makeBlockAccessible('search-container', 'search-container-items');
            return accessibleBlock;
        }
    }, [results, resultsVisible, query]);
    
    useEffect(() => {
        if(!resultsVisible) {
            document.body.style.overflow = 'unset';
        }
    }, [resultsVisible])
    
  return (
    <div className="header">
        <button className='header-menu-button center-flex' onClick={() => {setResultsVisible(false); setShowDropdownPage(!showDropdownPage);}} aria-label={`${showDropdownPage ? 'Collapse slide out navigation' : 'Expand slide out navigation'}`}>
            {darkMode ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="510" height="511" fill="none" viewBox="0 0 510 511" id="menu" className='white-hamburger h-[40px] w-[40px] ml-[-1px]'>
                    <path fill="#fff" fillRule="evenodd" d="M171 171V191H191V171H171zM166 156C160.477 156 156 160.477 156 166V196C156 201.523 160.477 206 166 206H196C201.523 206 206 201.523 206 196V166C206 160.477 201.523 156 196 156H166zM171 246V266H191V246H171zM166 231C160.477 231 156 235.477 156 241V271C156 276.523 160.477 281 166 281H196C201.523 281 206 276.523 206 271V241C206 235.477 201.523 231 196 231H166zM171 321V341H191V321H171zM166 306C160.477 306 156 310.477 156 316V346C156 351.523 160.477 356 166 356H196C201.523 356 206 351.523 206 346V316C206 310.477 201.523 306 196 306H166zM246 171V191H266V171H246zM241 156C235.477 156 231 160.477 231 166V196C231 201.523 235.477 206 241 206H271C276.523 206 281 201.523 281 196V166C281 160.477 276.523 156 271 156H241zM246 246V266H266V246H246zM241 231C235.477 231 231 235.477 231 241V271C231 276.523 235.477 281 241 281H271C276.523 281 281 276.523 281 271V241C281 235.477 276.523 231 271 231H241zM246 321V341H266V321H246zM241 306C235.477 306 231 310.477 231 316V346C231 351.523 235.477 356 241 356H271C276.523 356 281 351.523 281 346V316C281 310.477 276.523 306 271 306H241zM321 171V191H341V171H321zM316 156C310.477 156 306 160.477 306 166V196C306 201.523 310.477 206 316 206H346C351.523 206 356 201.523 356 196V166C356 160.477 351.523 156 346 156H316zM321 246V266H341V246H321zM316 231C310.477 231 306 235.477 306 241V271C306 276.523 310.477 281 316 281H346C351.523 281 356 276.523 356 271V241C356 235.477 351.523 231 346 231H316zM321 321V341H341V321H321zM316 306C310.477 306 306 310.477 306 316V346C306 351.523 310.477 356 316 356H346C351.523 356 356 351.523 356 346V316C356 310.477 351.523 306 346 306H316z" clipRule="evenodd"></path>
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="510" height="511" fill="none" viewBox="0 0 510 511" id="menu" className='black-hamburger h-[40px] w-[40px] ml-[-1px]'>
                    <path fill="#000" fillRule="evenodd" d="M171 171V191H191V171H171zM166 156C160.477 156 156 160.477 156 166V196C156 201.523 160.477 206 166 206H196C201.523 206 206 201.523 206 196V166C206 160.477 201.523 156 196 156H166zM171 246V266H191V246H171zM166 231C160.477 231 156 235.477 156 241V271C156 276.523 160.477 281 166 281H196C201.523 281 206 276.523 206 271V241C206 235.477 201.523 231 196 231H166zM171 321V341H191V321H171zM166 306C160.477 306 156 310.477 156 316V346C156 351.523 160.477 356 166 356H196C201.523 356 206 351.523 206 346V316C206 310.477 201.523 306 196 306H166zM246 171V191H266V171H246zM241 156C235.477 156 231 160.477 231 166V196C231 201.523 235.477 206 241 206H271C276.523 206 281 201.523 281 196V166C281 160.477 276.523 156 271 156H241zM246 246V266H266V246H246zM241 231C235.477 231 231 235.477 231 241V271C231 276.523 235.477 281 241 281H271C276.523 281 281 276.523 281 271V241C281 235.477 276.523 231 271 231H241zM246 321V341H266V321H246zM241 306C235.477 306 231 310.477 231 316V346C231 351.523 235.477 356 241 356H271C276.523 356 281 351.523 281 346V316C281 310.477 276.523 306 271 306H241zM321 171V191H341V171H321zM316 156C310.477 156 306 160.477 306 166V196C306 201.523 310.477 206 316 206H346C351.523 206 356 201.523 356 196V166C356 160.477 351.523 156 346 156H316zM321 246V266H341V246H321zM316 231C310.477 231 306 235.477 306 241V271C306 276.523 310.477 281 316 281H346C351.523 281 356 276.523 356 271V241C356 235.477 351.523 231 346 231H316zM321 321V341H341V321H321zM316 306C310.477 306 306 310.477 306 316V346C306 351.523 310.477 356 316 356H346C351.523 356 356 351.523 356 346V316C356 310.477 351.523 306 346 306H316z" clipRule="evenodd"></path>
                </svg>
            }
            
        </button>
        <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/' className='header-logo-link block-interactive' aria-label="Navigate to home page"><img src={whitelogo} className="logo-img h-[30px] w-[30px]" alt="Aria Ease Logo"></img></Link>
        <div className='header-nav-link-div' id="header-nav-link-div">
            <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/docs' className='header-nav-link block-interactive' aria-label='Navigate to the documentation page'>Documentation</Link>
            <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/examples/accordion' aria-label="View examples of package implementation" className='header-nav-link block-interactive'>Examples</Link>
            <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='https://github.com/aria-ease/aria-ease' aria-label="Navigate to project's GitHub repository" className='header-nav-link block-interactive'>Github</Link>
            <Link onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} to='/blog/main' className='header-nav-link block-interactive' aria-label='Navigate to blog articles page'>Blog</Link>
        </div>
        <div className="header-search-div">
            <svg fill="rgba(181, 181, 181, 1)" height="18" viewBox="0 0 13 14" width="18" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="m8.82264 10.3833c-.92307.7008-2.07429 1.1167-3.32264 1.1167-3.03757 0-5.5-2.46243-5.5-5.5s2.46243-5.5 5.5-5.5 5.5 2.46243 5.5 5.5c0 1.24835-.4159 2.39957-1.1167 3.32264l2.897 2.89706c.2929.2929.2929.7677 0 1.0606s-.7677.2929-1.0606 0zm.67736-4.3833c0 2.20914-1.79086 4-4 4s-4-1.79086-4-4 1.79086-4 4-4 4 1.79086 4 4z" fillRule="evenodd"/></svg>
            <input ref={searchInputRef} type="text" placeholder="Search documentation" className='block-interactive search-container-items' aria-label='Search documentation' value={query} onChange={(event) => setQuery(event.target.value)}/>
            <div className='flex items-center'>
                <span className="text-xs search-text">⌘</span>
                <span className="text-xs search-text">k</span>
            </div>
        </div>
        <div className='header-buttons-grid-div' id="header-buttons-grid-div">
            <a onClick={() => {sessionStorage.setItem(`scroll-position-${page}`, window.scrollY)}} href="https://github.com/aria-ease/aria-ease" aria-label="Navigate to project's GitHub repository" className='header-button block-interactive center-flex'><FaGithub className='header-button-icon'/></a>
            <button className='header-button block-interactive center-flex' onMouseDown={() => {setDarkMode((prevDarkMode) => !prevDarkMode)}} onKeyDown={(event) => {if(event.key === 'Enter' || event.key === " ") {event.preventDefault(); event.stopPropagation(); setDarkMode((prevDarkMode) => !prevDarkMode)}}} aria-label='Toggle dark mode'>
                <img src={sunicon} alt='Sun Icon' id='Sun' className='theme-mode-image'></img>
            </button>
        </div>

        {query !== '' && query.length > 0 && resultsVisible && (
            <div aria-live='polite' className='search-result-container-overlay fixed top-[56px] left-0 right-0 bottom-0 animate-fadeIn'>
                <div id='search-container' className='search-result-container fixed max-h-[350px] rounded-md z-[999] m-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 slideDown' tabIndex="0" role="dialog" aria-modal="true" aria-label="Search results">
                    <div className='flex justify-end bg-transparent p-2 search-close-button-div'>
                        <button className='search-close-button search-container-items rounded-md p-1' onClick={() => {setResultsVisible(false)}} ref={searchContainerFocusRef} aria-label='Close search result modal'>
                            <X className={`h-4 w-4 ${darkMode ? 'text-white' : 'text-black'}`}/>
                        </button>
                    </div>
                    {results && results.length > 0 ? 
                        <div className='h-full px-2 py-4 overflow-y-auto max-h-[305px]'>
                            {results.some(doc => doc.title.includes('Getting Started')) && (
                                <>
                                    <h1 className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Getting Started</h1>
                                    <ul>
                                        {results.filter(doc => doc.title.includes('Getting Started')).map((doc, index) => (
                                            <li key={index}>
                                                <a href={doc.url} className='search-result-link search-container-items text-sm px-3 py-2 rounded-md w-full block' onKeyDown={handleKeyDown} aria-label={`Navigate to ${doc.title} page`}>{doc.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {results.some(doc => doc.content.includes('component')) && (
                                <>
                                    <h1 className={`text-sm mb-2 mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Components</h1>
                                    <ul>
                                        {results.filter(doc => doc.content.includes('component')).map((doc, index) => (
                                            <li key={index}>
                                                <a href={doc.url} className='search-result-link search-container-items text-sm px-3 py-2 rounded-md w-full block' onKeyDown={handleKeyDown} aria-label={`Navigate to ${doc.title} page`}>{doc.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div> :
                        <div className='py-4 px-2'>
                            <p className={`text-center text-sm mb-1 mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>No results found for &#34;{query}&#34;</p>
                            <div className='mt-10'>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Go to</p>
                                <a href='/docs' className='search-result-link search-container-items text-sm px-3 py-2 rounded-md w-full block mt-[10px]' onKeyDown={handleKeyDown} aria-label='Navigate to getting started page'>Installation</a>
                                <a href='/docs' className='search-result-link search-container-items text-sm px-3 py-2 rounded-md w-full block mt-[10px]' onKeyDown={handleKeyDown} aria-label='Navigate to getting started page'>Features</a>
                                <a href='/blog/main' className='search-result-link search-container-items text-sm px-3 py-2 rounded-md w-full block mt-[10px]' onKeyDown={handleKeyDown} aria-label='Navigate to getting started page'>Blog Articles</a>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )}
    </div>
  )
}

export default Header