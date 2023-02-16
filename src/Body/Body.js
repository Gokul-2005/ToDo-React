import React ,{useContext} from 'react'
import { wholeThemeContext } from '../App/App'
import style from './Body.module.css'
export default function Body() {
  const {wholeTheme} = useContext(wholeThemeContext);

  

//  setData(tasks);

  const bodyStyle = {
    backgroundColor: wholeTheme==="dark" ? "#171823":"#F2F2F2",
  }

  return (
    <div className={style.Body} style={bodyStyle}>   
    </div>
  )
}
