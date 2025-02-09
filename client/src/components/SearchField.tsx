import { ChangeEvent } from "react";


interface SearchField {
    search: string,
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

 
  
const SearchField = ({ search, handleSearch }: SearchField) => {
  return (
    <input
        type="text"
        value={search}
        onChange={handleSearch}
        className="p-2 border rounded w-full"
        placeholder="Search"
    />
  )
}

export default SearchField