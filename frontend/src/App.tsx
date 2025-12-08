import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SongDashboard from './pages/SongDashboard'
import SongDetail from './pages/SongDetail'
import { theme as customTheme } from './utils/constants'
import NotificationProvider from './context/Notification/NotificationProvider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={customTheme}>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/song-dashboard" replace />} />
              <Route path="/song-dashboard" element={<SongDashboard />} />
              <Route path="/song-detail/:id" element={<SongDetail />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </ConfigProvider>
    </QueryClientProvider>
  )
}

export default App
