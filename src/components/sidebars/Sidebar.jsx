import React from 'react'
import CompanyDashboard from '../company/CompanyDashboard'
import RestaurantDashboard from '../restaurant/RestaurantDashboard'
import ProfileDashboard from '../profiles/ProfileDashboard'
import logo from '../../assets/images/logo.svg'
import ProfileSidebar from './ProfileSidebar'
const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="sidebar__top">
          <a href="./" className="sidebar__logo">
            <img src={logo} alt="" className="sidebar__logo__img" />
          </a>
          <div className="sidebar__btn">

          </div>
        </div>
       <div className="sidebar__bottom">
       <ProfileSidebar />
       {/* <RestaurantDashboard />
       <ProfileDashboard /> */}
       </div>
    </div>
  )
}

export default Sidebar