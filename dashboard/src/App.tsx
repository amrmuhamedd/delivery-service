import './App.css';
import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { RootState } from './redux/store';
import { add, remove } from './redux/reducers/userSlice';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Public from './routes/public';
function App() {
  axios.defaults.baseURL = process.env.REACT_APP_baseUrl
  const dispatch = useDispatch()
  const [isAuthenticated , setIsAuthenticated] = useState(false)
  useEffect(()=> {
    axios({
      method : 'GET',
      url : '/auth/me',
      headers : {
        Authorization : `bearer ${localStorage.getItem('token')}`
      }
    }).then((res => dispatch(add(res.data)))).then(() => setIsAuthenticated(true)).catch(err => {
      if(err.response.data.statusCode === 401){
        setIsAuthenticated(false)
        localStorage.clear()
        dispatch(remove())
      }
    })
  } , [])
  
  return (
    <div className="App">
    <Public />
    </div>
  );
}

export default App;
