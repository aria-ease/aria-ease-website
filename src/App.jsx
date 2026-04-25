import './theme/style/styles.css';
import './theme/style/design-system.css';
import './theme/color/dark-mode.css';
import './theme/color/light-mode.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/firestore";
import { HelmetProvider } from 'react-helmet-async';



import Homepage from './pages/Homepage';
import Documentation from './pages/getting-started/Documentation';
import ApiReference from './pages/getting-started/ApiReference';
import Menu from './pages/components/Menu';
import BlockExample from  './pages/components/Block';
import Accordions from './pages/components/Accordions';
import Checkbox from './pages/components/Checkbox';
import Radio from  './pages/components/Radio';
import Toggle from './pages/components/Toggle';
import Changelog from './pages/Changelog';
import Audit from './pages/testing/Audit';
import Testing from './pages/testing/Testing';
import Combobox from './pages/components/Combobox';
import ContractOverview from './pages/contracts/ContractOverview';
import ComponentTestHarness from './pages/ComponentTestHarness';
import Tabs from './pages/components/Tabs';
import DslOverview from './pages/contracts/DSL';
import UtilityOverview from './pages/components/UtilityOverview';
import AriaEaseGlossary from './pages/getting-started/AriaEaseGlossary';
import ComboboxContract from './pages/contracts/ComboboxContract';
import ComboboxDsl from './pages/dsl/ComboboxDsl';
import MenuContract from './pages/contracts/MenuContract';
import TabsContract from './pages/contracts/TabsContract';

import ConceptsOverview from './pages/concepts/ConceptsOverview';
import StatePack from './pages/concepts/StatePack';
 

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
            <Route path="/getting-started" element={<Documentation darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/api" element={<ApiReference darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/glossary" element={<AriaEaseGlossary darkMode={darkMode} setDarkMode={setDarkMode}/>}/>

            <Route path="/concepts/state-pack" element={<StatePack darkMode={darkMode} setDarkMode={setDarkMode}/>}/>

            <Route path="/components/overview" element={<UtilityOverview darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/components/menu" element={<Menu darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/components/block" element={<BlockExample darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/components/accordion" element={<Accordions darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/components/checkbox" element={<Checkbox darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/components/radio" element={<Radio darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/components/toggle-button" element={<Toggle darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/components/combobox" element={<Combobox darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/components/tabs" element={<Tabs darkMode={darkMode} setDarkMode={setDarkMode}/>}/>

            <Route path="/changelog" element={<Changelog darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            
            <Route path="/testing/static-audit" element={<Audit darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/testing/component-testing" element={<Testing darkMode={darkMode} setDarkMode={setDarkMode}/>}/>

            
            <Route path="/contracts/overview" element={<ContractOverview darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/contracts/combobox" element={<ComboboxContract darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/contracts/menu" element={<MenuContract darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/contracts/tabs" element={<TabsContract darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            <Route path="/contracts/dsl" element={<DslOverview darkMode={darkMode} setDarkMode={setDarkMode}/>}/> 

            
            <Route path="/test-harness" element={<ComponentTestHarness/>}/>
            
            <Route path="/dsl/overview" element={<DslOverview darkMode={darkMode} setDarkMode={setDarkMode}/>}/>      
            <Route path="/dsl/combobox" element={<ComboboxDsl darkMode={darkMode} setDarkMode={setDarkMode}/>}/>
            
          </Routes>
      </Router>
    </div>
  )
}

export default App