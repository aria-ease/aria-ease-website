import './components/styles.css'
import './components/dark-mode.css'
import './components/light-mode.css'
import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Documentation from './pages/Documentation'
import Examples from './pages/Examples'
import TabExamples from './pages/TabExamples'


const App = () => {
  const[darkMode, setDarkMode] = useState(true)
  return (
    <div className={`body-div ${darkMode ? 'dark-body' : 'light-body'}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/docs" element={<Documentation darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/examples/menu" element={<Examples darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/examples/tab" element={<TabExamples darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App