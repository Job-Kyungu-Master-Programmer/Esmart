import React from 'react'
import { NavLink } from 'react-router-dom'
import { HiOutlineHome } from "react-icons/hi";

const ProfileSidebar = () => {
  return (
   <div className="companyDashboard">
        <div className="companyDashboard__list">
           <NavLink to='/dashboard-particular' className="companyDashboard__link">
            <HiOutlineHome className="companyDashboard__icon" />
            <span>Dashboard</span>
           </NavLink>
           <NavLink to='/profile-manager' className="companyDashboard__link">
            <HiOutlineHome className="companyDashboard__icon" />
            <span>Créer ma carte</span>
           </NavLink>
           <NavLink to='/profileviewer' className="companyDashboard__link">
            <HiOutlineHome className="companyDashboard__icon" />
            <span>Vue du profile</span>
           </NavLink>
           <NavLink to='/gestion' className="companyDashboard__link">
            <HiOutlineHome className="companyDashboard__icon" />
            <span>Analytics du restaurant</span>
           </NavLink>
           <NavLink to='/gestion' className="companyDashboard__link">
            <HiOutlineHome className="companyDashboard__icon" />
            <span>Dashboard</span>
           </NavLink>
        </div>
      </div>
  )
}

export default ProfileSidebar