import React from 'react'
import ParcelTable from '../components/parcelsTable/parcels-table'
import Logo from '../components/ui/logo/logo'

function Home() {
  return (
    <div className='home-page'>
      <Logo />
      <ParcelTable />
    </div>
  )
}

export default Home