import { useOutletContext } from "react-router-dom"

const SearchBar = () => {
    const {handleSearch, searchQuery} = useOutletContext()
    console.log(searchQuery)
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