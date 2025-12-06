import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import SongDashboard from './pages/SongDashboard'
import SongDetail from './pages/SongDetail'
import { theme as customTheme } from './utils/constants'


function App() {
  return (
    <ConfigProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/song-dashboard" replace />} />
          <Route path="/song-dashboard" element={<SongDashboard />} />
          <Route path="/song-detail/:id" element={<SongDetail />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  )
}

export default App
