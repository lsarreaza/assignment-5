import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CastList from './CastList.jsx'
import { formatDate, showValue, stripHtml } from './utils.js'

function ShowDetail() {
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [cast, setCast] = useState([])
  const [requestStatus, setRequestStatus] = useState('loading')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const showId = Number(id)

    if (!Number.isInteger(showId) || showId < 1) {
      setErrorMessage('That show ID is not valid.')
      setRequestStatus('error')
      return
    }

    async function fetchShowDetails() {
      try {
        const showResponse = await fetch(
          `https://api.tvmaze.com/shows/${showId}`,
        )

        if (!showResponse.ok) {
          throw new Error(
            showResponse.status === 429
              ? 'Too many requests. Please try again later.'
              : 'Show not found.',
          )
        }

        const showData = await showResponse.json()
        setShow(showData)

        const castResponse = await fetch(
          `https://api.tvmaze.com/shows/${showId}/cast`,
        )

        if (!castResponse.ok) {
          throw new Error(
            castResponse.status === 429
              ? 'Too many requests. Please try again later.'
              : 'Cast information is unavailable.',
          )
        }

        setCast(await castResponse.json())
        setRequestStatus('ready')
      } catch (error) {
        setErrorMessage(error.message)
        setRequestStatus('error')
      }
    }

    fetchShowDetails()
  }, [id])

  if (requestStatus === 'loading') {
    return <main><p>Loading show details...</p></main>
  }

  if (requestStatus === 'error') {
    return (
      <main>
        <p>{errorMessage}</p>
        <Link to="/">Back to gallery</Link>
      </main>
    )
  }

  return (
    <main className="show-detail">
      <Link to="/">Back to gallery</Link>
      <h1>{showValue(show.name)}</h1>
      {show.image?.original && (
        <img src={show.image.original} alt={`${show.name} poster`} />
      )}
      <p>{showValue(stripHtml(show.summary))}</p>
      <dl>
        <dt>Premiered</dt>
        <dd>{formatDate(show.premiered)}</dd>
        <dt>Updated</dt>
        <dd>{formatDate(show.updated)}</dd>
        <dt>Genres</dt>
        <dd>{show.genres?.length ? show.genres.join(', ') : 'Not available'}</dd>
        <dt>Rating</dt>
        <dd>{show.rating?.average ?? 'Not available'}</dd>
        <dt>Status</dt>
        <dd>{showValue(show.status)}</dd>
        <dt>Network or channel</dt>
        <dd>{show.network?.name || show.webChannel?.name || 'Not available'}</dd>
      </dl>
      <CastList cast={cast} />
      <a href={show.url} target="_blank" rel="noreferrer">
        View on TVmaze
      </a>
      <p>
        <a href="https://www.tvmaze.com" target="_blank" rel="noreferrer">
          Data provided by TVmaze
        </a>
      </p>
    </main>
  )
}

export default ShowDetail
