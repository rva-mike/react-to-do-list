import TodoList from "./components/TodoList";
import { useState } from "react"

function App() {
  const [todos, setTodos] = useState([])

  return (
    <>
      <TodoList todos={todos}/>
      <input type='text' />
      <button>Add Todo</button>
      <button>Clear</button>
      <div>0 left to do</div>
    </>
  )
}

export default App;
