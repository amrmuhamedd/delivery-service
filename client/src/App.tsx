import {useEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import { add, remove } from './redux/reducers/userSlice';
import Public from './routes/public';
import { RootState } from './redux/store';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './routes/protected';
import './assets/style/index.scss'
function App() {
  const navigate = useNavigate()
  axios.defaults.baseURL = process.env.REACT_APP_baseUrl
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  useEffect(()=> {
    if(user.roles === 'sender'){
      notification.error({
        message : 'you cant login to client please go to dashboard app'
      })
      localStorage.clear()
      dispatch(remove())
    }
    axios({
      method : 'GET',
      url : '/auth/me',
      headers : {
        Authorization : `bearer ${localStorage.getItem('token')}`
      }
    }).then((res => dispatch(add({...res.data , isValidUser : true})))).catch(err => {
      if(err.response.data.statusCode === 401){
        localStorage.clear()
        dispatch(remove())
      }
    })
    if(user.isValidUser) {
      navigate('/')
    }
  } , [user.isValidUser , user.username])
  
  return (
    <div className="App">
  { user.isValidUser ?  <ProtectedRoute /> : <Public />}
    </div>
  );
}

export default App;
