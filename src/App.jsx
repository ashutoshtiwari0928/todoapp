import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Navbar from "./Components/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const saveToLS = (item) => {
    localStorage.setItem("todos", JSON.stringify(item));
  };
  useEffect(() => {
    let localTodosString = localStorage.getItem("todos");
    if (localTodosString !== "undefined") {
      let localTodos = JSON.parse(localTodosString);
      setTodos(localTodos);
    }
  }, []);

  const handleEdit = (e) => {
    let id = e.target.name;
    let newTodo = todos.filter((item) => item.id === id)[0].todo;
    setTodo(newTodo);
    let newTodos = todos.filter((item) => item.id != id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };
  const handleDelete = (e) => {
    let id = e.target.name;
    let newTodos = todos.filter((item) => item.id != id);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleAdd = () => {
    let newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    saveToLS(newTodos);
    setTodo("");
  };
  const handleKeyDown = (e) => {
    if (e.key == "Enter") handleAdd();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="bg-violet-10 container mx-auto my-5 bg-violet-100 rounded-xl p-5 min-h-[70vh] w-1/2">
        <div className="addTodo my-5">
          <h2 className="text-lg font-bold">Add todos</h2>
          <input
            type="text"
            className="bg-white w-1/2"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={todo}
          />
          <button
            className="bg-slate-700 text-sm font-bold shadow-lg hover:bg-slate-800 px-2 py-0.5 rounded-md mx-4 text-white "
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
        <h2 className="m-2 font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No todos to display</div>}
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo flex w-3/4 my-3 justify-between bg-slate-300"
              >
                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    name={item.id}
                    value={item.isCompleted}
                    id=""
                    onChange={handleCheckbox}
                  />
                  <div
                    name={item.id}
                    className={item.isCompleted ? "line-through" : ""}
                  >
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    name={item.id}
                    className="bg-slate-700 text-sm font-bold shadow-lg hover:bg-slate-800 px-2 py-0.5 rounded-md mx-1 text-white "
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    name={item.id}
                    className="bg-slate-700 text-sm font-bold shadow-lg hover:bg-slate-800 px-2 py-0.5 rounded-md mx-1 text-white "
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
