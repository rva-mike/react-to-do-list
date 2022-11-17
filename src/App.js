import TodoList from "./components/TodoList";
import { useState, useRef, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  const LOCAL_STORAGE_KEY = 'todoApp.todos'


  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    setTodos( prevTodos => [...prevTodos, ...storedTodos] );

  }, [])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function handleAddToDo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    // console.log(name)
    setTodos(prevTodos =>{
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  return (
    <>
      <TodoList todos={todos}/>
      <input ref={todoNameRef} type='text' />
      <button onClick={handleAddToDo}>Add Todo</button>
      <button>Clear</button>
      <div>0 left to do</div>
    </>
  )
}

export default App;
