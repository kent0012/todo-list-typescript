import { TodosInterface } from "../interface/TodosInterface"

interface todoCardsInterface {
  filteredTodos: TodosInterface[],

}

export const TodosCard = ({ filteredTodos }: todoCardsInterface) => {
  return (
    <ul className="card p-3 bg-gray-500 rounded shadow">
    {filteredTodos.map((item: TodosInterface) => (
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
  )
}
