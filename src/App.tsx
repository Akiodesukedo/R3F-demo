import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Basic from './pages/Basic'
import Room from './pages/Room'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Basic />}/>
        <Route path='/room' element={<Room />} />
      </Routes>
    </Router>
  )
}

export default App
