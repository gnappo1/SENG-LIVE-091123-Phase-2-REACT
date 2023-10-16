import { useOutletContext } from "react-router-dom"

const SearchBar = () => {
    const {handleSearch, searchQuery} = useOutletContext()
    return (
        <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={handleSearch}
            value={searchQuery}
        />
    )
}

export default SearchBar