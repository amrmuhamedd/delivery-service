import { notification } from 'antd'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import SignupForm from '../components/signupForm/signupForm'
import { add } from '../redux/reducers/userSlice'

function SignUp() {
  const dispatch = useDispatch()

  const signUp =(values : {name : string , password : string}) => {
    axios({
      method : "POST",
      url : '/auth/register',
      data : {...values , roles : "sender"},
    }).then((res) => {
      localStorage.setItem('token' , res.data.access_token)
      dispatch(add({...res.data.user , isValidUser : true}))
    }).catch(err => {
      notification.error({message : err.response.data.message})
    })
  }
  return (
    <div className='auth-page'>
    <SignupForm handleFinish={signUp}/>
</div>
  )
}

export default SignUp