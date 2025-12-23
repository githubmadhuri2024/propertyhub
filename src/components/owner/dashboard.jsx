import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Sidebar from "./Sidebar/Sidebar";
const Ownerdashboard=()=>{

  const email= sessionStorage.getItem('email');
const name= sessionStorage.getItem('name');
sessionStorage.getItem('role');
  return (
<div>

<div className="page-wrapper">

<Header/>

  <div className="main-container">

<Sidebar/>				
    
  <div className="content-wrapper-scroll">

      <div className="main-header d-flex align-items-center justify-content-between position-relative">
        <div className="d-flex align-items-center justify-content-center">
          <div className="page-icon">
            <i className="bi bi-house"></i>
          </div>
          <div className="page-title d-none d-md-block">
            <h5>{email} && {name}</h5>
          </div>
        </div>
    
      </div>
    
      <div className="content-wrapper">

      
        <div className="row gx-3">
          <div className="col-lg-3 col-sm-6 col-12">
            <div className="stats-tile d-flex align-items-center position-relative tile-red">
              <div className="sale-icon icon-box xl rounded-5 me-3">
                <i className="bi bi-pie-chart font-2x text-red"></i>
              </div>
              <div className="sale-details text-white">
                <h6>Total Payment</h6>
                <h2 className="m-0">296</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 col-12">
            <div className="stats-tile d-flex align-items-center position-relative tile-blue">
              <div className="sale-icon icon-box xl rounded-5 me-3">
                <i className="bi bi-sticky font-2x text-blue"></i>
              </div>
              <div className="sale-details text-white">
                <h6>Successfull Payments</h6>
                <h2 className="m-0">368</h2>
              </div>
            </div>
          </div>
       
        </div>
        
      
        

      </div>

    </div>

  <Footer/>

  </div>
  <Footer/>

</div>
</div>
  )
}
export default Ownerdashboard;