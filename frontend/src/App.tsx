import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import SongDashboard from './pages/SongDashboard'
import SongDetail from './pages/SongDetail'

const colorPalette = ["#ffffff", "#A81DB6", "#C3C0CC", "#E92384", '#9307BD']

const theme = {
  token: {
    colorPrimary: colorPalette[1], // #A81DB6 - Purple as primary
    colorSuccess: colorPalette[4], // #9307BD - Darker purple for success
    colorWarning: '#faad14',
    colorError: colorPalette[3], // #E92384 - Pink for error/danger
    colorInfo: colorPalette[1], // #A81DB6 - Purple for info
    colorTextBase: '#1f1f1f',
    colorBgBase: colorPalette[0], // #ffffff - White background
    borderRadius: 8,
    colorBorder: colorPalette[2], // #C3C0CC - Light gray for borders
  },
  components: {
    Button: {
      colorPrimary: colorPalette[1],
      algorithm: true,
    },
    Layout: {
      colorBgHeader: colorPalette[0],
      colorBgBody: '#fafafa',
    },
    List: {
      colorBgContainer: colorPalette[0],
    },
  },
}

function App() {
  return (
    <ConfigProvider theme={theme}>
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
