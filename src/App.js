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


  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddToDo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    // console.log(name)
    setTodos(prevTodos =>{
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input ref={todoNameRef} type='text' />
      <button onClick={handleAddToDo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Selected</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;
