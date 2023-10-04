const SearchBar = ({handleSearch, searchQuery}) => {
    return (
        <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            value={searchQuery}
        />
    )
}

export default SearchBar