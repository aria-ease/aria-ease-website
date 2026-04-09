import DocsFrame from "../../components/DocsFrame";
import { useState, useEffect } from 'react';
import SlideOutNav from "../../components/SlideOutNav";
import { Helmet } from 'react-helmet-async';
import { ChevronRightCircleIcon } from "lucide-react";
import Fuse from "fuse.js";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AriaEaseGlossary = ({ darkMode, setDarkMode }) => {
    const[showDropdownPage, setShowDropdownPage] = useState(false);
    const page = 'glossary';

    const[query, setQuery] = useState("");
    const[terms, setTerms] = useState([]);
    const[results, setResults] = useState([]);
    const[announce, setAnnounce] = useState("");

  useEffect(() => {
    fetch('/terms.json')
    .then((res) => res.json())
    .then((data) => {setTerms(data); setResults(data)});
  }, []);

  useEffect(() => {
    const fuse = new Fuse(terms, {
      keys: ['term', 'definition'],
      threshold: 0.5
    })
  
    let results = fuse.search(query).map((r) => r.item);
  
    let timeout;

    if(!query) setResults(terms);
  
    if(query && query !== "" && results.length === 0) {
      setResults(terms);
      setAnnounce("");
      timeout = setTimeout(() => {
        setAnnounce(`0 result${results.length !== 1 ? "s" : ""} found.`);
      }, 50);
    } else if(query && query !== "" && results.length > 0) {
      setResults(results);
      setAnnounce("");
      timeout = setTimeout(() => {
        setAnnounce(`${results.length} result${results.length !== 1 ? "s" : ""} found.`);
      }, 50);
    }
      return () => clearTimeout(timeout);
  }, [query, terms]);

  return (
    <div id="inner-body-div">
      <Helmet>
        <title>Glossary | Aria-Ease</title>
        <meta name="description" content="Learn about the terminologies we use at Aria-Ease." />
        <meta name="keywords" content="aria-ease, glossary, documentation, accessible components, JavaScript library" />
        <meta name="og:title" content="Glossary | Aria-Ease" />
        <meta name="og:description" content="Learn about the terminologies we use at Aria-Ease." />
        <meta name="og:url" content="https://ariaease.site/glossary" />
        <meta name="twitter:title" content="Glossary | Aria-Ease" />
        <meta name="twitter:description" content="Learn about the terminologies we use at Aria-Ease." />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
        
      <DocsFrame
        page={page}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showDropdownPage={showDropdownPage}
        setShowDropdownPage={setShowDropdownPage}
      >
        <div className='side-body-div docs-flow'>
          <div className='side-body-sections-div tone-card tone-card-emphasis docs-hero-card'>
            <span className='docs-kicker black-grey-text'>Getting Started</span>
            <h1 className='introduction-heading black-white-text'>Aria-Ease <span className='text-gradient'>Glossary</span></h1>
            <p className='mt-2'>Learn about the terms we use at Aria-Ease.</p>
          </div>

          <section className='side-body-sections-div docs-section-card'>
            <h2>Terms</h2>
            <p className="my-4">Here is a list of the terms we use:</p>
            <form className="search-div focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-150 shadow-sm mb-1">
              <svg fill="rgba(181, 181, 181, 1)" height="18" viewBox="0 0 13 14" width="18" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="m8.82264 10.3833c-.92307.7008-2.07429 1.1167-3.32264 1.1167-3.03757 0-5.5-2.46243-5.5-5.5s2.46243-5.5 5.5-5.5 5.5 2.46243 5.5 5.5c0 1.24835-.4159 2.39957-1.1167 3.32264l2.897 2.89706c.2929.2929.2929.7677 0 1.0606s-.7677.2929-1.0606 0zm.67736-4.3833c0 2.20914-1.79086 4-4 4s-4-1.79086-4-4 1.79086-4 4-4 4 1.79086 4 4z" fillRule="evenodd" aria-hidden="true" /></svg>
              <input
                type="text"
                name="filter"
                aria-label="Filter glossary terms"
                placeholder="Filter terms..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full max-w-md text-xs"
              />
            </form>
            <div className='docs-table-wrap mb-4'>
              <div className='sr-only' aria-live='polite' aria-atomic='true' role='status'>{announce}</div>
              <table className='docs-table'>
                <thead className='docs-thead'>
                  <tr>
                    <th className='docs-th whitespace-nowrap'>Glossary Term</th>
                    <th className='docs-th'>Definition</th>
                  </tr>
                </thead>
                <tbody>
                  {results && results.length > 0 && results.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className='docs-td whitespace-nowrap'>{item.term}</td>
                        <td className='docs-td'>{item.definition}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <div className='flex flex-wrap gap-2 py-4 max-w-7xl md:py-12 justify-between mt-[100px]'>
            <Link to='/api' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
              <ChevronRightCircleIcon className='rotate-180'/>
                      <div className='flex flex-col w-full'>
                        <span className='text-sm black-white-text'>Prev</span>
                        <span className='next-link-text text-md'>API Reference</span>
                      </div>
            </Link>
            <Link to='/concepts/state-pack' className='block-interactive next-link docs-next-link rounded-lg md:min-w-80 md:max-w-md w-full md:w-auto flex gap-6 items-center px-4 py-6 md:px-5'>
              <div className='flex flex-col w-full items-end'>
                <span className='text-sm black-white-text'>Next</span>
                <span className='next-link-text text-md'>State Pack</span>
              </div>
              <ChevronRightCircleIcon/>
            </Link>
          </div>
        </div>
      </DocsFrame>

       <SlideOutNav page={page} showDropdownPage={showDropdownPage}/>
    </div>
  )
}

export default AriaEaseGlossary