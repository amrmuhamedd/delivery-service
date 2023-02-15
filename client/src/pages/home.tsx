import { Button } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ParcelTable from '../components/parcelsTable/parcels-table'
import Logo from '../components/ui/logo/logo'
import { remove } from '../redux/reducers/userSlice'
import { RootState } from '../redux/store'

function Home() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    localStorage.clear()
    dispatch(remove())
  }
  return (
    <div className='home-page'>
      <div className='logout-btn'><span className='name'>{user.username}</span>  <Button  type='primary' onClick={handleLogout}>Logout</Button></div>
      <Logo />
      <ParcelTable />
    </div>
  )
}

export default Home