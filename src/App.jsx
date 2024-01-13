import { useState } from 'react';
import './App.css'
// react icons
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function App() {
  let now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let currentTime = hour + ":" + minute

  const [todoItems , setTodoItems] = useState([])
  const [taskCreateAreaShow , setTaskCreateAreaShow] = useState(false)
  const [taskTitle , setTaskTitle] = useState("")
  const [taskDescription , setTaskDescription] = useState("")
  const [taskDate , setTaskDate] = useState("")
  const [taskTime , setTaskTime] = useState("")

  const [taskEditAreaShow , setTaskEditAreaShow] = useState(false)
  const [taskIndexIdForEdit , setTaskIndexIdForEdit] = useState("")
  const [inputValueForEditTask , setInputValueForEditTask] = useState("")
  const [textAreaValueForEditTask , setTextAreaValueForEditTask] = useState("")
  const [dateValueForEditTask , setDateValueForEditTask ] = useState("")
  const [timeValueForEditTask , setTimeValueForEditTask ] = useState("")

  const [completedTodoItems , setCompletedTodoItems] = useState("")
  console.log(completedTodoItems);
  const [completedTaskShow , setCompletedTaskShow] = useState(false)

  const handleTaskCreateFunc = () => {
    if (taskTitle != "") {
      let newTodoItem = {
        taskTitle: taskTitle,
        taskDescription: taskDescription,
        taskDate: taskDate,
        taskTime: taskTime,
      }
  
      let arrayOfTodoItems = [...todoItems]
      arrayOfTodoItems.push(newTodoItem)
      setTodoItems(arrayOfTodoItems)
  
      setTaskCreateAreaShow(false)
    }
    
  }

  const handleTaskDelete = (index) => {
    let allTodosForDelete = [...todoItems]
    allTodosForDelete.splice(index , 1)
    setTodoItems(allTodosForDelete)
  }

  const handleTaskEditAreaShow = (item , index) => {
    setInputValueForEditTask(item.taskTitle)
    setTextAreaValueForEditTask(item.taskDescription)
    setDateValueForEditTask(item.taskDate)
    setTimeValueForEditTask(item.taskTime)

    setTaskIndexIdForEdit(index)
    setTaskEditAreaShow(true)
  }

  const handleTaskEdit = () => {
    if (inputValueForEditTask != "") {
      let editTodoItem = {
        taskTitle: inputValueForEditTask,
        taskDescription: textAreaValueForEditTask,
        taskDate: dateValueForEditTask,
        taskTime: timeValueForEditTask,
      }
  
      let arrayOfTodoItems = [...todoItems]
      arrayOfTodoItems[taskIndexIdForEdit] = editTodoItem
      setTodoItems(arrayOfTodoItems)
  
      setTaskEditAreaShow(false)
    }
  }

  const handleTaskComplete = (index) => {
    let now = new Date();
    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let taskCompletedOn = date + "-" + month + "-" + year + " at " + hour + ":" + minute + ":" + second;

    let completedItem = {
      ...todoItems[index],
      completedOn: taskCompletedOn,
    }
    let arrayOfCompletedTodoItem = [...completedTodoItems]
    arrayOfCompletedTodoItem.push(completedItem)
    setCompletedTodoItems(arrayOfCompletedTodoItem)

    handleTaskDelete(index)
  }
  
  const handleCompletedTaskDelete = (index) => {
    let arrayOfCompletedTodoItems = [...completedTodoItems]
    arrayOfCompletedTodoItems.splice(index , 1)
    setCompletedTodoItems(arrayOfCompletedTodoItems)
  }

  return (
    <section className='todo-application'>
      <div className="status-bur">
        <h1>{currentTime}</h1>
        <img src="../src/assets/status-bar-icon.png" alt="icons" />
      </div>

      <div className="header">
        <div className="text-icon">
          <img src="../src/assets/check-img.png" alt="checkbox-imge" />
          <h1>To-do</h1>
        </div>
        <p>The Compleate Todo App you need!</p>
      </div>

      <div className="button-area">
        <div className="left-side">
          <button
            className={`${completedTaskShow === false && `active-button`}`}
            onClick={ () => setCompletedTaskShow(false)}
          >
            On Going
          </button>
          <button
            className={`${completedTaskShow === true && `active-button`}`}
            onClick={ () => setCompletedTaskShow(true)}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="todo-show-area">
        {
          completedTaskShow ? (
            completedTodoItems.map( (item , index) => {
              return (
                <div className='completed-todo-item todo-item' key={index}>
                  <h2>{item.taskTitle}</h2>
                  <button onClick={ () => handleCompletedTaskDelete(index)} className='complate-button delete-button'>Delete</button>
                  <p className='task-description'>{item.taskDescription}</p>
                  <div className="bottom">
                    <div className='time-and-date'>
                      <p className='completed-time'>Task Completed :</p>
                      <p>{item.completedOn}</p>
                    </div>
                    <div className='deadline-time time-and-date'>
                      <p>The Deadline was :</p>
                      <p>{item.taskDate} at {item.taskTime}</p>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            todoItems.map( (item , index) => {
              return (
                <div className='todo-item' key={index}>
                    <h2>{item.taskTitle}</h2>
                    <button onClick={ () => handleTaskComplete(index)} className='complate-button'>complete</button>
                  <p className='task-description'>{item.taskDescription}</p>
                  <div className="bottom">
                    <div className='time-and-date'>
                      <p>Deadline:</p>
                      <p>{item.taskDate} at {item.taskTime}</p>
                    </div>
                    <div className='buttons'>
                      <button  onClick={ () => handleTaskEditAreaShow(item ,index)}>
                        <CiEdit className='edit icon'/>
                      </button>
                      <button  onClick={ () => handleTaskDelete(index)}>
                        <MdDeleteOutline className='delete icon'/>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )
        }
      </div>

      {
        taskCreateAreaShow ? (
          <div className="task-create-area">
            <div className="input-area">
              <h3>New Task</h3>
              <div className="task-title">
                <label htmlFor="task-name">Task Title</label>
                <input onChange={ (data) => setTaskTitle(data.target.value)} type="text" id="task-name" placeholder='Add Task Name....'/>
              </div>

              <div className="task-description">
                <label htmlFor="task-description">Description</label>
                <textarea onChange={ (data) => setTaskDescription(data.target.value)}  id="task-description" placeholder="Add Description"></textarea>
              </div>

              <div className="date-and-time">
                <div className="date">
                  <label htmlFor="date">Date</label>
                  <input onChange={ (data) => setTaskDate(data.target.value)}  type="date" />
                </div>

                <div className="time">
                  <label htmlFor="time">Time</label>
                  <input onChange={ (data) => setTaskTime(data.target.value)}  type="time" name="" id="" />
                </div>
              </div>

              <div className="buttons">
                <button onClick={ () => setTaskCreateAreaShow(false)}>
                  Cancel
                </button>
                <button onClick={handleTaskCreateFunc}>
                  Create
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="add-task-button">
            <button onClick={ () => setTaskCreateAreaShow(true)}>
              Add new Task
            </button>
          </div>
        )
      }

      {
        taskEditAreaShow === true && <div className="task-create-area task-edit-area">
          <div className="input-area">
            <h3>Edit Task</h3>
            <div className="task-title">
              <label htmlFor="task-name">Task Title</label>
              <input onChange={ (data) => setInputValueForEditTask(data.target.value)} value={inputValueForEditTask} type="text" id="task-name" placeholder='Add Task Name....'/>
            </div>

            <div className="task-description">
              <label htmlFor="task-description">Description</label>
              <textarea onChange={ (data) => setTextAreaValueForEditTask(data.target.value)} value={textAreaValueForEditTask} id="task-description" placeholder="Add Description"></textarea>
            </div>

            <div className="date-and-time">
              <div className="date">
                <label htmlFor="date">Date</label>
                <input onChange={ (data) => setDateValueForEditTask(data.target.value)} value={dateValueForEditTask} type="date" />
              </div>

              <div className="time">
                <label htmlFor="time">Time</label>
                <input onChange={ (data) => setTimeValueForEditTask(data.target.value)} value={timeValueForEditTask} type="time" name="" id="" />
              </div>
            </div>

            <div className="buttons">
              <button onClick={ () => setTaskEditAreaShow(false)}>
                Cancel
              </button>
              <button onClick={handleTaskEdit}>
                Conform
              </button>
            </div>
          </div>
        </div>
      }
    </section>
  )
}

export default App