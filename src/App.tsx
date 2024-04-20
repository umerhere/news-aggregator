import React, {useState} from 'react';
import './App.css';
import { NavBar } from './layouts/NavBar'
import { Home } from './pages/Home'
import { CONSTANTS } from './core/constants'

function App() {
  const randomKeywordIndex = Math.floor(Math.random() * CONSTANTS.INITIAL_KEYWORDS.length);
  const initialKeyword = CONSTANTS.INITIAL_KEYWORDS[randomKeywordIndex];
  const [searchedValue, setSearchedValue] = useState(initialKeyword)

  return (
    <>
    <NavBar setSearchedValue={setSearchedValue} />
    <Home searchedValue={searchedValue} />
    </>
  );
}

export default App;
