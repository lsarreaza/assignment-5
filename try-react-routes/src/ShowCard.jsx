import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatDate, showValue, stripHtml } from './utils.js'

function ShowCard({ show }) {
  const [cast, setCast] = useState([])
  const [castStatus, setCastStatus] = useState('loading')
  const [castError, setCastError] = useState('')

  useEffect(() => {
    async function fetchCast() {
      try {
        const response = await fetch(
          `https://api.tvmaze.com/shows/${show.id}/cast`,
        )

        if (!response.ok) {
          throw new Error(
            response.status === 429
              ? 'Too many requests. Please try again later.'
              : 'Cast unavailable',
          )
        }

        const data = await response.json()
        setCast(data.slice(0, 5))
        setCastStatus('ready')
      } catch (error) {
        setCastError(error.message)
        setCastStatus('error')
      }
    }

    fetchCast()
  }, [show.id])

  return (
    <article className="show-card">
      {show.image?.medium ? (
        <img src={show.image.medium} alt={`${show.name} poster`} />
      ) : (
        <div className="image-fallback">No poster</div>
      )}
      <div className="show-card-content">
        <h2>
          <Link to={`/shows/${show.id}`}>{showValue(show.name)}</Link>
        </h2>
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
        </dl>
        <h3>Cast</h3>
        {castStatus === 'loading' && <p>Loading cast...</p>}
        {castStatus === 'error' && <p>{castError}</p>}
        {castStatus === 'ready' && (
          <ul>
            {cast.length ? (
              cast.map(({ person, character }) => (
                <li key={person.id}>
                  {showValue(person.name)} as {showValue(character.name)}
                </li>
              ))
            ) : (
              <li>Not available</li>
            )}
          </ul>
        )}
        {show.url && (
          <a href={show.url} target="_blank" rel="noreferrer">
            View on TVmaze
          </a>
        )}
      </div>
    </article>
  )
}

export default ShowCard
