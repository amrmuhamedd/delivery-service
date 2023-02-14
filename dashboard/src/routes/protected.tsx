import React from 'react'
import { Routes , Route, Navigate} from 'react-router-dom';
import Home from '../pages/home';
function ProtectedRoute() {
  return (
    <Routes>
    <Route path='/dashboard' element ={<Home />}></Route>
    <Route
        path="/dashboard"
        element={<Navigate to="/login" replace />}
    />
   </Routes>
  )
}

export default ProtectedRoute