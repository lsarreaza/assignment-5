import { Route, Routes } from 'react-router-dom'
import Gallery from './Gallery.jsx'
import ShowDetail from './ShowDetail.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/shows/:id" element={<ShowDetail />} />
    </Routes>
  )
}

export default App
