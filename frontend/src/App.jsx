
import {BrowserRouter as Router, Routes, Route} from 'react-router'
import HomePage from './pages/HomePage'
import TopAnime from './pages/TopAnime'
import Recommendations from './pages/Recommendations'

function App() {


  return <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/top-anime" element={<TopAnime/>} />
      <Route path="/recommendations" element={<Recommendations/>} />
    </Routes>
  </Router>
}

export default App
