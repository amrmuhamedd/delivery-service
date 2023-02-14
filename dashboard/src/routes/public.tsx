import React from 'react'
import { Routes , Route, Navigate} from 'react-router-dom';
import Login from '../pages/login';
import SignUp from '../pages/signup';
function Public() {
  return (
    <Routes>
    <Route path='/login' element ={<Login />}></Route>
    <Route path='/signup' element ={<SignUp />}></Route>
    <Route
        path="*"
        element={<Navigate to="/login" replace />}
    />
   </Routes>
  )
}

export default Public