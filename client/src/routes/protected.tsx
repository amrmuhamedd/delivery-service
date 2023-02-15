import React from 'react'
import { Routes , Route, Navigate} from 'react-router-dom';
import Home from '../pages/home';
function ProtectedRoute() {
  return (
    <Routes>
    <Route  path='/'  element ={<Home />}></Route>
    <Route path='/home' element ={<Home />}></Route>
   </Routes>
  )
}

export default ProtectedRoute