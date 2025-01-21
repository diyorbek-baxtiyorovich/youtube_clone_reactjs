import { Box } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Main, Channel, VideoDetails, Navbar, Search } from '../index';
import "./App.css"

const App = () =>{
  return (
    <Box>
      <Navbar />
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/channel/:id" element={<Channel />} />
          <Route path="/video-details/:id" element={<VideoDetails />} />
          <Route path="/search/:id" element={<Search />} />
          <Route path="*" element={<h2>404 - Page Not Found this page does not exist</h2>} />
      </Routes>
    </Box>
  )
}

export default App