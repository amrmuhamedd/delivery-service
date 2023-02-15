import React from 'react'
import { Routes , Route} from 'react-router-dom';
import Home from '../pages/home';
function ProtectedRoute() {
  return (
    <Routes>
    <Route path='/dashboard' element ={<Home />}></Route>
   </Routes>
  )
}

export default ProtectedRoute