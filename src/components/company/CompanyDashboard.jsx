
import React from 'react'
import { NavLink } from 'react-router-dom'
import { HiOutlineHome } from "react-icons/hi";


const CompanyDashboard = () => {
  return (
    <div className="companyDashboard">
      <div className="companyDashboard__list">
         <NavLink to='/dashboard-particular' className="companyDashboard__link">
          <HiOutlineHome className="companyDashboard__icon" />
          <span>Dashboard</span>
         </NavLink>
         <NavLink to='/profile-manager' className="companyDashboard__link">
          <HiOutlineHome className="companyDashboard__icon" />
          <span>Créer et gérer ma carte</span>
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

export default CompanyDashboard