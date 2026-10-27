function SearchForm({ query, setQuery, onSearch }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSearch(query.trim())
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search-input">Search for a show</label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchForm
