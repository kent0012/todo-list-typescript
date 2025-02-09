import axios from "axios";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";

import { TodosInterface } from "./interface/TodosInterface";
import { TodosCard } from "./components/TodosCard";
import SearchField from "./components/SearchField";
import InputField from "./components/InputField";

import FormBox from "./components/FormBox";
import CreateButton from "./components/CreateButton";

const App = () => {
  const todosAPI = import.meta.env.VITE_BASE_URL;

  const [todos, setTodos] = useState<TodosInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  });

  // fetch all todos list from API

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


  // filtered data or search data

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


// Delete Todo Function

const deleteItem = async (id: number) => {

  const isConfirmed = window.confirm("Are you sure you want to delete this data?");
  if (!isConfirmed) return;

  try {
    await axios.delete(`${todosAPI}${id}/`);
    alert("Are you sure you want to delete this data?")
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // ✅ Remove deleted todo from state
  } catch (error) {
    setError("Failed to delete todo");
  }
};

// Toggle isCompleted 

const completeTask = async (id: number) => {
  try {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) {
      setError("Todo not found");
      return;
    }

    const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
    await axios.put(`${todosAPI}${id}/`, updatedTodo);

    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
    );
  } catch (error) {
    setError("Failed to complete todo");
  }
};


// Handle Input Field 

const handleInputChange = (field: keyof typeof formData, e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData((prev) => ({
    ...prev,
    [field]: e.target.value,
  }));
};


// handle submit todos

const submitForm = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formData.first_name.trim()) return setError("Task cannot be empty!");

  try {
    const { data } = await axios.post(todosAPI, { task: formData.first_name, completed: false });
    setTodos((prev) => [...prev, data]);
    setFormData({ first_name: "", last_name: "" });
  } catch (error: any) {
    setError(error.response?.data || "Unable to add a task!");
  }
};




  return (
    <div className="bg-black p-4 h-dvh w-full text-white">
      <section className="max-w-4xl h-full flex-col mx-auto flex justify-center items-center">
        <div className="bg-gray-700 p-4 flex-col gap-3 w-lg flex rounded">
        <FormBox submitForm={submitForm}>
         <div className="flex items-center justify-between gap-3">
          <InputField
            inputFieldValue={formData.first_name}
            handleInputField={(e) => handleInputChange("first_name", e)}
            placeholder="Add Task"
          />
        <CreateButton />
         </div>
        </FormBox>

          <div className="flex items-center justify-between gap-5">
            <h3 className="md:text-3xl text-1xl">Todos</h3>
              <SearchField search={search} handleSearch={handleSearch} />
          </div>
          {isLoading ? (
            <p className="text-gray-400 text-center">Loading...</p>
          ) : error ? (
            <p className="text-gray-400 text-center">Error: {error}</p>
          ) : filteredTodos.length === 0 ? (
            <p className="text-gray-400 text-center">No todos found</p>
          ) : (
            <TodosCard completeTask={completeTask} deleteItem={deleteItem} filteredTodos={filteredTodos} /> 
          )}
        </div>
      </section>
    </div>
  );
};

export default App;
