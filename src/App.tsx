import React, {useState} from 'react';
import './App.css';
import { NavBar } from './layouts/NavBar'
import { Home } from './pages/Home'
import { Custom } from './pages/Custom'
import { Settings } from './pages/Setting'
import { CONSTANTS } from './core/constants'
import { Protected } from './Auth/Protected'
import { Anonymous } from './Auth/Anonymous'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from 'react';

function App() {
  const randomKeywordIndex = Math.floor(Math.random() * CONSTANTS.INITIAL_KEYWORDS.length);
  const initialKeyword = CONSTANTS.INITIAL_KEYWORDS[randomKeywordIndex];
  const [searchedValue, setSearchedValue] = useState(initialKeyword)

  useEffect(() => {
    // Uncomment it to test Routes Authentication
    localStorage.setItem('token', "testing");
  }, [])
  
  return (
    <BrowserRouter>
      <NavBar setSearchedValue={setSearchedValue} />
      <Routes>
          <Route element={<Anonymous />}>
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/" element={<Home searchedValue={searchedValue} />} />
          <Route element={<Protected />}>
            <Route path="/for-you" element={<Custom />} />
          </Route>
          
          
          {/* <Route path="/settings" element={<Settings />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
