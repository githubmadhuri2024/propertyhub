import React from "react";
import { useNavigate } from "react-router-dom";
const Header=()=>{
  const navigate=useNavigate();
  const handleClick=()=>{
   sessionStorage.removeItem("email");
   alert('Logged out successfully!');
    navigate('/login');

  }
  return (
    <div>
           <div className="page-header">

        <div className="toggle-sidebar" id="toggle-sidebar">
          <i className="bi bi-list"></i>
        </div>

        <div className="header-actions-container">

        
      
          <div className="header-profile d-flex align-items-center">
            <div className="dropdown">
              <a href="#" id="userSettings" className="user-settings" data-toggle="dropdown" aria-haspopup="true">
                <span className="avatar">
                  <img  alt="Admin Templates" />
                </span>
              </a>
              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="userSettings">
                <div className="header-profile-actions">
                  <a href="profile.html">Profile</a>
                  <button  type="submit" onClick={handleClick}>Logout</button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
export default Header;