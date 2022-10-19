import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './Pages/Home';
import Create from './Pages/Create';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
    </Router>
  )
}

export default App