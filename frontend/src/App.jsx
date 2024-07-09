import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    
    axios.get("http://localhost:5000/todos").then((response) => {
      const data = response.data;
      setTodos(data.todos);
    })
  }, []) // empty dependency array to avoid infinite re rendering
  
  return (
    <>
      <CreateTodo todos={todos} setTodos={setTodos} />
      <Todos todos={todos} setTodos={setTodos} />
    </>
  )
}

export default App
