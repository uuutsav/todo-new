import axios from "axios";
import { useEffect, useState } from "react"

export function Todos({ todos, setTodos }) {
    const [id, setId] = useState("");

    useEffect(() => {
        console.log("Refreshed?")
    })
    async function handleTodoCompleted(_id) {

        const data = {
            id: _id
        }
        try {
            const respnse = await axios.put("http://localhost:5000/completed", data);
            console.log(respnse.data.msg);
            setId(_id);
        } catch (error) {
            console.log("Error updating todo complete status: ", error);
        }
    }
    return <>
        {/* {JSON.stringify(todos)} */}
        {
            todos.map(function (todo) {
                return <div key={todo._id}>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    <button onClick={() => handleTodoCompleted(todo._id)}>{todo.completed ? "Mark as uncomplete" : "Mark as complete"}</button>
                </div>
            })
        }
    </>
}