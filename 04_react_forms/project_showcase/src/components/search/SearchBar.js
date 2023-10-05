const SearchBar = ({handleSearch, searchQuery}) => {
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