import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SongDashboard from './pages/SongDashboard'
import SongDetail from './pages/SongDetail'
import { theme as customTheme } from './utils/constants'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={customTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/song-dashboard" replace />} />
            <Route path="/song-dashboard" element={<SongDashboard />} />
            <Route path="/song-detail/:id" element={<SongDetail />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
