import React from 'react'
import LoginForm from '../components/loginform/loginForm'
import Logo from '../components/ui/logo/logo'
import './login.scss'
function Login() {
  return (
    <div className='login-page'>
     
       
        <LoginForm handleFinish={(values :any) => console.log(values)}/>
     
    </div>
  )
}

export default Login