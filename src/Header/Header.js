import React , {createContext, useState, useContext, useEffect, useRef} from 'react'
import Input from '../Input/Input'
import { wholeThemeContext } from '../App/App'
import Title from '../Title/Title'
import style from './Header.module.css'
 
export const themeContext = createContext(null);

export default function Header(props) {
  const {setWholeTheme} = useContext(wholeThemeContext);
  const mainSortRef = useRef(null)
  // const [stats,setStats] = useState('');
  const [task,setTask] = useState('');
  const [Tasks,setTasks] = useState('');
  const [sort,setSort] = useState("All");
  const [themeName,setThemeName] = useState("light");
  setWholeTheme(themeName);

  useEffect( () => {
    if(sort==="All"){
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
    else if(sort==="Active"){
      let arr = [];
      const JSONdata = JSON.parse(localStorage.getItem("tasks"));
      for (let j = 0; j < JSONdata.length; j++) {
          if(JSONdata[j].status==="Pending"){
            arr.push(JSONdata[j]);
          }
      }
      console.log(arr);
      setTasks(arr);
    }
    else if(sort==="Completed"){
      let arr = [];
      const JSONdata = JSON.parse(localStorage.getItem("tasks"));
      for (let j = 0; j < JSONdata.length; j++) {
          if(JSONdata[j].status==="Done"){
            arr.push(JSONdata[j]);
          }
      }
      setTasks(arr);
    }
  }, [task,sort] )

  const headerStyle = {
    backgroundImage : themeName==="dark"?"url('/Assets/bg-desktop-dark.jpg')":"url('/Assets/bg-desktop-light.jpg')"
  }

  const taskBoxStyle = {
    backgroundColor : themeName==="dark" ? "#25273D" : "#FFFFFF",
    boxShadow : themeName==="dark" ? "0px 0px 0px -2.5vh rgba(218, 218, 218, 0)" : "0px 50px 35px 5px rgb(212, 211, 211)",
  }

  const taskBarStyle = {
    borderBottom : themeName==="dark" ? "0.1vh solid #393A4B" : "0.1vh solid #D6D7E4",
  }
  const sortOptionStyle = {
    backgroundColor : themeName==="dark" ? "#25273D" : "#FFFFFF",
    boxShadow : themeName==="dark" ? "0px 0px 0px -2.5vh rgba(218, 218, 218, 0)" : "0px 5vh 3.5vh 0.5vh rgb(212, 211, 211)",
    borderTop : themeName==="dark" ? "0.1vh solid #393A4B" : "0.1vh solid #E3E4F1",
  }

  const mainTaskDivStyle = {
    color : themeName==="dark" ? "#C8CBE7" : "#494C6B",
  }
  const mainTaskDivDoneStyle = {
    color: '#D1D2DA',
    textDecoration: 'line-through',
  }
  const tickButtonStyle ={
    border : themeName==="dark" ? "0.1vh solid #393A4B" : "0.1vh solid #D6D7E4",
  }

  const tickButtonDoneStyle ={
  background: "linear-gradient(135deg, #55DDFF 0%, #C058F3 100%)",
  border : 'none',
  }

  const statusDone = (e) => {
    Tasks.forEach( (ele) => {
      if(ele.task === e.target.parentNode.parentNode.children[1].innerText){
        if(ele.status==='Done'){
          ele.status="Pending"
        }
        else{
          ele.status="Done"
        }
      }
    } )
    localStorage.setItem("tasks",JSON.stringify(Tasks));
    setTask(Math.floor(Math.random()*101))
  }

  const deleteTask = (e) => {
    Tasks.forEach( (ele,index) => {
      if(ele.task===e.target.parentNode.parentNode.children[1].innerText){
        console.log(index);
        console.log(typeof Tasks);
        Tasks.splice(index,1);
        localStorage.setItem("tasks",JSON.stringify(Tasks));
        setTask(Math.floor(Math.random()*101))
      }
    } )
  }

  const checkItemsLeft = () => {
    let count = 0 ;
    for (let i = 0; i < Tasks.length; i++) {
      if(Tasks[i].status === "Pending"){
        count++;
      }
    }
    return count ;
  }

  const selectSort = (event,sortType) => {
    for (let i = 0; i < mainSortRef.current.children.length; i++) {
      if(mainSortRef.current.children[i].innerText===sortType){
        mainSortRef.current.children[i].className= style["selectedSort"]
      }
      else{
        mainSortRef.current.children[i].className= style["SortButtonClass"]
      }
    }
    setSort(sortType);
    setTask(Math.floor(Math.random()*101))
  }

  const clearCompleted = () => {
    let arr = [] ;
    let JSONdata = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < JSONdata.length; i++) {
        if(JSONdata[i].status!=="Done"){
          arr.push(JSONdata[i]);
        }
    }
    localStorage.setItem("tasks",JSON.stringify(arr));
    setTask(Math.floor(Math.random()*101))
  }

  return (
    <div className={style.Header} style={headerStyle} draggable={false} >
      <themeContext.Provider value={{themeName , setThemeName}} >
      <Title />
      <Input setTask={setTask}/>
      <div className={style.taskBox} style={taskBoxStyle} >
        {
          Tasks ? (
           Tasks.map( (ele) => {
              return(
            <div className={style.taskBar} style={taskBarStyle}>
                <div className={style.tickDiv}>
                  {ele.status==='Done' ? <button className={style.tickButton} style={tickButtonDoneStyle}  onClick={statusDone} ><img src='/Assets/icon-check.svg' alt='' /></button>:<button className={style.tickButton} style={tickButtonStyle}  onClick={statusDone}></button> }
                </div>
                {ele.status==='Done'?<div className={style.mainTaskDiv} style={mainTaskDivDoneStyle}> {ele.task} </div>:<div className={style.mainTaskDiv} style={mainTaskDivStyle}> {ele.task} </div>}   
                <button className={style.DeleteButton} onClick={deleteTask} > <img src='/Assets/icon-cross.svg' alt='' /> </button>
          </div>
              )
            } )
          ):null
        }
        
      </div>
      </themeContext.Provider>
      <div className={style.sortOptions} style={sortOptionStyle} > <div className={style.itemLeft}>{checkItemsLeft()} items left</div> <div ref={mainSortRef} className={style.sortMain} > <button onClick={(event) => selectSort(event, 'All')} className={style.selectedSort}>All</button> <button onClick={(event) => selectSort(event, 'Active')} className={style.SortButtonClass}>Active</button> <button onClick={(event) => selectSort(event, 'Completed')} className={style.SortButtonClass}>Completed</button> </div> <button onClick={clearCompleted} className={style.clearCompleted}> Clear Completed</button> </div>
        
    </div>
  )
}
