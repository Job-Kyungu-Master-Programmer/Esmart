import React, { useState } from 'react'
import PublicNavbar from './PublicNavbar'
import PrivateHeader from './PrivateHeader'

const Navbar = () => {
  const [user, setUser] = useState(true)
  return (
    <div className='navbar'>
      {user  ? 
      <PrivateHeader />
    :
    <PublicNavbar />
    }
    </div>
  )
}

export default Navbar