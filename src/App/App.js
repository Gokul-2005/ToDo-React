import Body from '../Body/Body';
import Header from '../Header/Header';
import style from './App.module.css';
import React , {createContext, useState} from 'react'
import NavBar from '../NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';

export const wholeThemeContext = createContext(null);


function App() {
  const [wholeTheme , setWholeTheme] = useState("");
  if(!localStorage.getItem("tasks")){
    localStorage.setItem("tasks",JSON.stringify([]));
  }
  return (
    <div className={style.App}>
      <wholeThemeContext.Provider value={{wholeTheme,setWholeTheme}}>
        {/* <NavBar />
        <Routes>
          <Route path='/Home' element={<Header/>} />
          <Route path='/page2' element={<Body/>} />
        </Routes> */}
      <Header/>
      <Body/>
      </wholeThemeContext.Provider>
    </div>
  );
}

export default App;
