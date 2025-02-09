interface deleteItem {
    deleteItem: (id: number) => void;
    id: number;
}
const DeleteButton = ({ deleteItem, id }: deleteItem) => {
  return (
    <button 
        onClick={() => deleteItem(id)}
        className="cursor-pointer text-red-800 hover:text-red-600 duration-500">
        Delete
    </button>
  )
}

export default DeleteButton