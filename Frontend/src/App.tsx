import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ShortURL } from './pages/ShortURL'
import { FetchURL } from './pages/FetchURL'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<ShortURL />} />
          <Route path='/:id' element={<FetchURL />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
