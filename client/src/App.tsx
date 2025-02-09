
import axios from "axios";
import { useState, useEffect } from "react";

import { TodosInterface } from "./interface/TodosInterface";

const App = () => {

 const todosAPI = import.meta.env.VITE_BASE_URL;

 const [todos, setTodos] = useState<TodosInterface[]>([]);
 const [isLoading, setiIsLoading] = useState<boolean>(true);
 const [error, setError] = useState<string>("");

useEffect(() => {
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${todosAPI}`);
      setTodos(response.data);
      setiIsLoading(false);
    } catch (err) {
      setError("Failed to fetch todos");
      setiIsLoading(false);
    }
  };

  fetchTodos();
}, []);


if (isLoading) return <p>Loading...</p>
if (error) return <p>{`Error: ${error}`}</p>


  return (
    <div className="bg-black p-4 h-dvh w-full text-white">
        <section className="max-w-4xl h-full flex-col mx-auto flex justify-center items-center">
          <div className="bg-gray-700 p-4 flex-col gap-3 w-lg flex rounded">
            <h3 className="md:text-3xl text-1xl">Todo List</h3>
            <ul className="card p-3 bg-gray-500 rounded shadow">
                {todos.map((item: TodosInterface) => (
                  <li key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-lg flex-[1]">
                      <input id={`${item.id}`} type="checkbox" />
                      <label className="w-full" htmlFor={`${item.id}`}>
                        {item.task} 
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                      className="cursor-pointer text-red-800 hover:text-red-600 duration-500">
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </section>
    </div>
  )
}

export default App