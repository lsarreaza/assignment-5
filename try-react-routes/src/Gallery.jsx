import { useEffect, useState } from 'react'
import './App.css'
import SearchForm from './SearchForm.jsx'
import ShowList from './ShowList.jsx'

function Gallery() {
  const defaultQuery = 'batman'
  const [query, setQuery] = useState(defaultQuery)
  const [submittedQuery, setSubmittedQuery] = useState(defaultQuery)
  const [results, setResults] = useState([])
  const [requestStatus, setRequestStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!submittedQuery) {
      setResults([])
      setErrorMessage('')
      setRequestStatus('empty')
      return
    }

    async function fetchShows() {
      setRequestStatus('loading')
      setErrorMessage('')

      try {
        const response = await fetch(
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(submittedQuery)}`,
        )

        if (!response.ok) {
          throw new Error(
            response.status === 429
              ? 'Too many requests. Please try again later.'
              : 'Unable to load shows.',
          )
        }

        const data = await response.json()
        setResults(data.slice(0, 10))
        setRequestStatus(data.length ? 'results' : 'no-results')
      } catch (error) {
        setResults([])
        setErrorMessage(error.message)
        setRequestStatus('error')
      }
    }

    fetchShows()
  }, [submittedQuery])

  function handleSearch(searchTerm) {
    setSubmittedQuery(searchTerm)
  }

  return (
    <main>
      <h1>TV Show Search</h1>
      <SearchForm
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />
      <p>Current search: {submittedQuery || 'None'}</p>
      <p>Results: {results.length}</p>
      {requestStatus === 'loading' && <p>Loading shows...</p>}
      {requestStatus === 'empty' && <p>Please enter a show title or keyword.</p>}
      {requestStatus === 'error' && <p>{errorMessage}</p>}
      {requestStatus === 'no-results' && <p>No shows found.</p>}
      {requestStatus === 'results' && <ShowList shows={results} />}
      <p>
        <a href="https://www.tvmaze.com" target="_blank" rel="noreferrer">
          Data provided by TVmaze
        </a>
      </p>
    </main>
  )
}

export default Gallery
