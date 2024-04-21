import React, {useState} from 'react';
import './App.css';
import { NavBar } from './layouts/NavBar'
import { Home } from './pages/Home'
import { Custom } from './pages/Custom'
import { Settings } from './pages/Setting'
import { CONSTANTS } from './core/constants'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const randomKeywordIndex = Math.floor(Math.random() * CONSTANTS.INITIAL_KEYWORDS.length);
  const initialKeyword = CONSTANTS.INITIAL_KEYWORDS[randomKeywordIndex];
  const [searchedValue, setSearchedValue] = useState(initialKeyword)

  return (
    <BrowserRouter>
      <NavBar setSearchedValue={setSearchedValue} />
      <Routes>
          <Route path="/" element={<Home searchedValue={searchedValue} />} />
          <Route path="/for-you" element={<Custom searchedValue={searchedValue} />} />
          <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
