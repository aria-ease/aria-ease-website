import './theme/style/styles.css';
import './theme/style/design-system.css';
import './theme/color/dark-mode.css';
import './theme/color/light-mode.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Documentation from './pages/Documentation';
import ApiReference from './pages/ApiReference';
import MigrationGuide from './pages/MigrationGuide';
import Examples from './pages/Examples';
import Menu from './pages/Menu';
import BlockExample from './pages/Block'
import Accordions from './pages/Accordions';
import Checkbox from './pages/Checkbox';
import Radio from './pages/Radio';
import Toggle from './pages/Toggle';
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
//import BlogMain from './pages/BlogMain';
//import BlogSingle from './pages/BlogSingle';
import "firebase/compat/firestore";
//import Admin from './pages/Admin';
import Changelog from './pages/Changelog';
import Audit from './pages/Audit';
import Testing from './pages/Testing';
import Combobox from './pages/Combobox';
import UtilityPhilosophy from './pages/UtilityPhilosophy';
import ContractPhilosophy from './pages/ContractPhilosophy';
//import Services from './pages/Services';
import ComponentTestHarness from './pages/ComponentTestHarness';
import { HelmetProvider } from 'react-helmet-async';
import Tabs from './pages/Tabs';
import ContractDSL from './pages/ContractDSL';
 

const firebaseConfig = {
  apiKey: "AIzaSyDdQrigZcoX9f016GXnL3IKHNpl2PYvUh4",
  authDomain: "ariaease.firebaseapp.com",
  projectId: "ariaease",
  storageBucket: "ariaease.appspot.com",
  messagingSenderId: "2526652663",
  appId: "1:2526652663:web:dfc342e913a4cd73554bf2",
  measurementId: "G-J2FNS4SBDN"
};

firebase.initializeApp(firebaseConfig);
const app = firebase.initializeApp(firebaseConfig);
getAnalytics(app);


const App = () => {
  const[darkMode, setDarkMode] = useState(true);

  return (
    <HelmetProvider>
      <InnerApp darkMode={darkMode} setDarkMode={setDarkMode}/>
    </HelmetProvider>
  )
}

// eslint-disable-next-line react/prop-types
const InnerApp = ({darkMode, setDarkMode}) => {
  return (
    <div className={`body-div ${darkMode ? 'dark-body' : 'light-body'}`}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/docs" element={<Documentation darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/api" element={<ApiReference darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/migration" element={<MigrationGuide darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/examples" element={<Examples darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/utilities/menu" element={<Menu darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/utilities/block" element={<BlockExample darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/utilities/accordion" element={<Accordions darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/utilities/checkbox" element={<Checkbox darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/utilities/radio" element={<Radio darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/utilities/toggle-button" element={<Toggle darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          {/* <Route path="/blog/main" element={<BlogMain darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/blog/single" element={<BlogSingle darkMode={darkMode} setDarkMode={setDarkMode}/>}/> */}
          {/* <Route path="/clandestine/admin/" element={<Admin/>}/> */}
          <Route path="/changelog" element={<Changelog darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/static-audit" element={<Audit darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/component-testing" element={<Testing darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/philosophy/utilities" element={<UtilityPhilosophy darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/philosophy/contracts" element={<ContractPhilosophy darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/utilities/combobox" element={<Combobox darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          {/* <Route path="/services" element={<Services darkMode={darkMode} setDarkMode={setDarkMode}/>}/> */}
          <Route path="/test-harness" element={<ComponentTestHarness/>}/>
          <Route path="/utilities/tabs" element={<Tabs darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
          <Route path="/contract/dsl" element={<ContractDSL darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App