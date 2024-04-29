import './components/styles.css'
import './components/dark-mode.css'
import './components/light-mode.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Documentation from './pages/Documentation'
import Menu from './pages/Menu'
import Block from './pages/Block'
import Accordions from './pages/Accordions'
import Checkbox from './pages/Checkbox'
import Radio from './pages/Radio'
import Toggle from './pages/Toggle'
import { inject } from '@vercel/analytics';
 

inject();

const App = () => {
  const[darkMode, setDarkMode] = useState(true)

  return (
    <div className={`body-div ${darkMode ? 'dark-body' : 'light-body'}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/docs" element={<Documentation darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/examples/menu" element={<Menu darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/examples/block" element={<Block darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/examples/accordion" element={<Accordions darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/examples/checkbox" element={<Checkbox darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/examples/radio" element={<Radio darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/examples/toggle-button" element={<Toggle darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App