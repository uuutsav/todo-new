import { useEffect, useState } from "react"
import axios from "axios";

export function CreateTodo({todos, setTodos}) {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    async function addTodoHandler() {
        const data = {
            title: title,
            description: desc,
            completed: false
        }

        const response = await axios.post("http://localhost:5000/todo", data);
        console.log(Array.isArray(todos));

        setTodos([...todos, {
            title: title,
            description: desc,
            completed: false
        }])

    }
    return <>
        <input type="text" placeholder="Title" onChange={(e) => {
            setTitle(e.target.value);
        }}></input> <br />
        <input type="text" placeholder="Description" onChange={(e) => {
            setDesc(e.target.value)
        }}></input> <br />

        <button onClick={addTodoHandler}>Add a todo</button>
    </>
}