import './App.css';
import React, { useState, useEffect } from 'react';

import Header from "./myComponents/Header";
import Footer from "./myComponents/Footer";
import { AddToDo } from './myComponents/AddToDo';
import { Todos } from "./myComponents/Todos";
import { About } from "./myComponents/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo) => {
    console.log("Dekete Delete Todo ", todo);
    // Deleting doesn't work in this way in react.
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);

    setTodos(todos.filter((todos) => {
      return todos !== todo;
    }));

    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addToDo = (title, desc) => {
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);

  }

  const [todos, setTodos] = useState(
    initTodo,
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <Router>
        <Header title="ToDo List" searchBar={false} />
        <Routes>
          <Route path="/" element={<>
                <AddToDo addToDo={addToDo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>} ></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;


// render={() => {
//   return (
//     <>
//       <AddToDo addToDo={addToDo} />
//       <Todos todos={todos} onDelete={onDelete} />
//     </>)
// }}>