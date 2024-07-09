const express = require("express");
const cors = require("cors");
const app = express();

const {createTodoSchema, completedTodo} = require("./types.js");
const { todo } = require("./db.js");
const { default: mongoose } = require("mongoose");
const ObjectId = require('mongodb').ObjectId;
const port = 5000;

app.use(express.json());
app.use(cors({}));

app.post("/todo", async (req, resp) => {
    const createPayload = req.body;
    const parsedPayload = createTodoSchema.safeParse(createPayload);
    if (!parsedPayload.success){
        resp.status(411).json({
            msg: "Invalid Input: Create todo",
        })
        return;
    }

    // put data in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    resp.status(200).json({
        msg: "ToDo created successfully."
    })

})

app.get("/todos", async (req, resp) => {
    // extract todos from DB
    let todos = await todo.find({}); //array
    // console.log(todos);

    resp.json({
        todos: todos
    });
})

app.put("/completed", async (req, resp) => {
    const completedPayload = req.body;
    const parsedCompletedPayload = completedTodo.safeParse(completedPayload);
    if (!parsedCompletedPayload.success){
        resp.status(411).json({
            msg: "Invalid Input: ID"
        })
        return;
    }

    // convert ID from string to ObjectId
    // const objectId = new mongoose.Types.ObjectId(completedPayload.id)
    // console.log(objectId)

    // flag to mark todo as completed
    const respUpdate = await todo.updateOne({
        _id: new ObjectId(completedPayload.id)
    }, {
        completed: true
    });

    if (!respUpdate){
        console.log("Id not found error: ", respUpdate);
        resp.status(500).json({
            msg: "Todo not found."
        })
        return;
    }
    resp.status(200).json({
        msg: "ToDo marked as completed."
    });
})

app.listen(port, () => {
    console.log("Server started at port ", port);
})