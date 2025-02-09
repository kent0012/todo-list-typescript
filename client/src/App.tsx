import axios from "axios";
import { useState, useEffect, ChangeEvent } from "react";

import { TodosInterface } from "./interface/TodosInterface";
import { TodosCard } from "./components/TodosCard";

const App = () => {
  const todosAPI = import.meta.env.VITE_BASE_URL;

  const [todos, setTodos] = useState<TodosInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Fixed typo
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${todosAPI}`);
        setTodos(response.data);
      } catch (err) {
        setError("Failed to fetch todos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500); 

    return () => clearTimeout(handler); 
  }, [search]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    Object.values(todo).some((value) =>
      String(value).toLowerCase().includes(debouncedSearch.toLowerCase()) // Use debouncedSearch
    )
  );

  return (
    <div className="bg-black p-4 h-dvh w-full text-white">
      <section className="max-w-4xl h-full flex-col mx-auto flex justify-center items-center">
        <div className="bg-gray-700 p-4 flex-col gap-3 w-lg flex rounded">
          <div className="flex items-center justify-between gap-5">
            <h3 className="md:text-3xl text-1xl">Todos</h3>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              className="p-2 border rounded w-full"
              placeholder="Search"
            />
          </div>
          {isLoading ? (
            <p className="text-gray-400 text-center">Loading...</p>
          ) : error ? (
            <p className="text-gray-400 text-center">Error: {error}</p>
          ) : filteredTodos.length === 0 ? (
            <p className="text-gray-400 text-center">No todos found</p>
          ) : (
            <TodosCard filteredTodos={filteredTodos} /> // Fixed prop name
          )}
        </div>
      </section>
    </div>
  );
};

export default App;
