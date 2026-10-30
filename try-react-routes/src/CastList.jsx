function CastList({ cast }) {
  return (
    <section>
      <h2>Full cast</h2>
      {cast.length ? (
        <ul>
          {cast.slice(0, 15).map(({ person, character }) => (
            <li key={person.id}>
              {person.name} as {character.name || 'Not available'}
            </li>
          ))}
        </ul>
      ) : (
        <p>Cast not available.</p>
      )}
    </section>
  )
}

export default CastList
