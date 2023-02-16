import React, {useRef, useContext } from 'react'
import style from'./Input.module.css';
import { themeContext } from '../Header/Header'
export default function Input(props) {
  const {themeName} = useContext(themeContext);
  const inputRef = useRef(null);  
  const inputStyle = {
    backgroundColor : themeName=== "dark"?"#25273D":"#FFFFFF",
  }

  const dummyButtonStyles = {
    border: themeName=== "dark" ?"1px solid #393A4B":"1px solid #E3E4F1",
  }
  
  const inputBoxStyle = {
    color: themeName=== "dark" ?"#C8CBE7":"#393A4B",
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      task : inputRef.current.value,
      status : "Pending",
    };
    props.setTask(inputRef.current.value);
  if(inputRef.current.value !== ''){  
  console.log(newTask);
  let JSONdata = JSON.parse(localStorage.getItem("tasks"));
  console.log(JSONdata);
  JSONdata.push(newTask);
  localStorage.setItem("tasks",JSON.stringify(JSONdata));
  inputRef.current.value="";
  }
}


  return (
    <div className={style.Input} style={inputStyle}>
        <form onSubmit={handleSubmit} id={style.formTag}>
        <div id={style.dummyButtonDiv}> <input type="submit" id={style.dummyButton} style={dummyButtonStyles} value=""  /> </div>
        <input type="text" style={inputBoxStyle} className={style.InputBox} placeholder="Create a new todo..." ref={inputRef} />
        </form>
    </div>
  )
}
