import React from 'react'
import { IoNotificationsOutline } from "react-icons/io5";

const PrivateHeader = () => {
  return (
    <div className="privateHeader">
        <div className="privateHeader__container container">
           <div className="privateHeader__profile">
            <h2 className="privateHeader__name">Doordashb Inc.</h2>
           </div>
           <div className="privateHeader__users">
            <div className="privateHeader__notification">
                <span className="privateHeader__notification-badge">2</span>
                <IoNotificationsOutline className="privateHeader__notification-icon" />
            </div>
            <div className="privateHeader__user">
                <div className="privateHeader__image">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLe5PABjXc17cjIMOibECLM7ppDwMmiDg6Dw&s" 
                      alt="User profile" 
                      className="privateHeader__img" 
                    />
                </div>
                <div className="privateHeader__text">
                    <h3 className="privateHeader__username">Jeancy Dalos</h3>
                    <span>Premium</span>
                </div>
            </div>
           </div>
        </div>
    </div>
  )
}

export default PrivateHeader