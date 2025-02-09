import { TodosInterface } from "../interface/TodosInterface"
import TodosList from "./TodosList"

interface todoCardInterface {
  filteredTodos: TodosInterface[];
  deleteItem: (id: number) => void;
  completeTask: (id: number) => void;
}

export const TodosCard = ({ filteredTodos, deleteItem, completeTask }: todoCardInterface) => {
  return (
    <ul className="card p-3 bg-gray-500 rounded shadow">
    {filteredTodos.map((item: TodosInterface) => (
      <TodosList key={item.id} item={item}  deleteItem={deleteItem} completeTask={completeTask} />
    ))}
</ul>
  )
}
