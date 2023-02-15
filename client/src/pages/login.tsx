import { notification } from 'antd'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import LoginForm from '../components/loginform/loginForm'
import { add } from '../redux/reducers/userSlice'
function Login() {
  const dispatch = useDispatch()

  const login =(values : {name : string , password : string}) => {
    axios({
      method : "POST",
      url : '/auth/login',
      data : values,
    }).then((res) => {
      localStorage.setItem('token' , res.data.access_token)
      dispatch(add({...res.data.user , isValidUser : true}))
    }).catch(err => {
      notification.error({message : err.response.data.message})
    })
  }
  return (
    <div className='auth-page'>
        <LoginForm handleFinish={login}/>
    </div>
  )
}

export default Login