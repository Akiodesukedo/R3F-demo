import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Basic from './pages/Basic'
import Room from './pages/Room'
import Car from './pages/Car'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Basic />}/>
        <Route path='/room' element={<Room />} />
        <Route path="car" element={<Car />}/>
      </Routes>
    </Router>
  )
}

export default App
