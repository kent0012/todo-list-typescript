import { TodosInterface } from "../interface/TodosInterface";
import DeleteButton from "./DeleteButton";

interface TodoCardsInterface {
  item: TodosInterface;
  deleteItem: (id: number) => void
  completeTask: (id: number) => void
}


const TodosList = ({ item, deleteItem, completeTask }: TodoCardsInterface) => {

  return (
    <li key={item.id} className="flex items-center justify-between">
      <div className={`flex items-center gap-2 text-lg flex-[1] ${item.completed ? "line-through text-gray-300" : ""}`}>
        <input onChange={(e) => e.target.value} value={item.id} checked={item.completed} id={`${item.id}`} type="checkbox" />
        <label onClick={() => completeTask(item.id)} className="w-full" htmlFor={`${item.id}`}>
          {item.task}
        </label>
      </div>
      <div className="flex items-center gap-2">
        <DeleteButton deleteItem={deleteItem} id={item.id} />
      </div>
    </li>
  );
};

export default TodosList;
