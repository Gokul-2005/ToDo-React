import React, {useContext, useRef} from 'react'
import { themeContext } from '../Header/Header'
import style from './Title.module.css'
export default function Title() {
  const themeRef = useRef(null);
  const {setThemeName} = useContext(themeContext);
  const checkTheme = () => {
    if((themeRef.current.src).endsWith("moon.svg")){
      setThemeName("dark");
      themeRef.current.src="/Assets/icon-sun.svg";
    }  
    else{ 
      setThemeName("light");
      themeRef.current.src="/Assets/icon-moon.svg";
    }    
  }
  return (
    <div className={style.Title}>
      <h1 id={style.todo}>TODO</h1>
      <button id={style.themeButton} onClick={checkTheme} > <img id={style.themeImg} src='/Assets/icon-moon.svg' alt='' ref={themeRef} /> </button>
    </div>
  )
}
