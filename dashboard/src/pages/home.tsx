import { Button } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import ParcelTable from '../components/parcelsTable/parcels-table'
import Logo from '../components/ui/logo/logo'
import { remove } from '../redux/reducers/userSlice'

function Home() {
  const dispatch = useDispatch()
  const handleLogout = () => {
    localStorage.clear()
    dispatch(remove())
  }
  return (
    <div className='home-page'>
      <Button className='logout-btn' type='primary' onClick={handleLogout}>Logout</Button>
      <Logo />
      <ParcelTable />
    </div>
  )
}

export default Home