import {useEffect, useState} from 'react';
import {useDispatch } from 'react-redux';
import axios from 'axios'
import { add, remove } from './redux/reducers/userSlice';
import Public from './routes/public';
import './assets/style/index.scss'
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
