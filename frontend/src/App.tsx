import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SongDashboard from './pages/SongDashboard'
import SongDetail from './pages/SongDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/song-dashboard" replace />} />
        <Route path="/song-dashboard" element={<SongDashboard />} />
        <Route path="/song-detail/:id" element={<SongDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
