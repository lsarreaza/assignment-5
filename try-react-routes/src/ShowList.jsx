import ShowCard from './ShowCard.jsx'

function ShowList({ shows }) {
  return (
    <section className="show-list" aria-label="TV show results">
      {shows.map(({ show }) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </section>
  )
}

export default ShowList
