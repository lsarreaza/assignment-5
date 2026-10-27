import { useState } from 'react'
import './App.css'

function App() {
  const [query, setQuery] = useState('')

  return (
    <main>
      <h1>TV Show Search</h1>
      <label htmlFor="search-input">Search for a show</label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </main>
  )
}

export default App
