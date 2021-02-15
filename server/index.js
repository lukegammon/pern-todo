const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");


// Middleware

app.use(cors());
app.use(express.json()); // gain access to req.body

//ROUTES//

//create a todo:
app.post("/todos", async(req,res) => {
  try {
    const {description} = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]);
      res.json(newTodo.rows[0]);
  } catch (e) {
    console.error(e.message);
  }
});

//get all todos
app.get("/todos", async(req,res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (e) {
    console.error(e.message);
  }
});

//get a todo
//https://youtu.be/ldYcgPKEZC8?t=1437
//update a todo

//delete a todo

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
