import React from "react";
import { Link } from "react-router-dom";
const Sidebar=()=>{
  return (
    <div>
        <div>
        <nav className="sidebar-wrapper">

          <div className="brand">
            <a href="index.html" className="logo">
              <img src="assets/images/logo.svg" className="d-none d-md-block me-4" alt="Rapid Admin Dashboard" />
              <img src="assets/images/logo-sm.svg" className="d-block d-md-none me-4" alt="Rapid Admin Dashboard" />
            </a>
          </div>
          
          <div className="sidebar-menu">
            <div className="sidebarMenuScroll">
              <ul>
                <li className="active-page-link">
                  <Link to='admin/dashboard'>
                    <i className="bi bi-house"></i>
                    <span className="menu-text">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to='/property'>
                    <i className="bi bi-box"></i>
                    <span className="menu-text">Properties</span>
                  </Link>
                </li>
                <li className="sidebar-dropdown">
                  <Link to='/users'>
                    <i className="bi bi-collection"></i>
                    <span className="menu-text">Users</span>
                  </Link>
                 
                </li>

                   <li>
                  <Link to='/products'>
                    <i className="bi bi-box"></i>
                    <span className="menu-text">Owners</span>
                  </Link>
                </li>

              

                  <li>
                  <Link to='/review'>
                    <i className="bi bi-box"></i>
                    <span className="menu-text">Logout</span>
                  </Link>
                </li>
          
              </ul>
            </div>
          </div>

        </nav>

    </div>

    </div>
  )

}
export default Sidebar;