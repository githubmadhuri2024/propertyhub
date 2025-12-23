import React from "react";

import "./PayFee.css";
const PayFee=()=>{
  return (

  <div>

     <section id="properties" className="py-5">
    <div className="container">
      <h2 className="text-center mb-5 fw-bold text-primary">Available Properties</h2>


      <h4 className="mt-5 mb-3">Properties List View</h4>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>S.No</th>
              <th>Property Name</th>
              <th>Location</th>
              <th>Type</th>
              <th>Maintenance</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Sunshine Apartments</td>
              <td>Vijayawada</td>
              <td>2 BHK</td>
              <td>₹3,500</td>
              <td><span className="badge bg-success">Active</span></td>
              <td><button className="btn btn-sm btn-outline-primary">Pay Fee</button></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Green Valley Villas</td>
              <td>Guntur</td>
              <td>3 BHK Villa</td>
              <td>₹5,000</td>
              <td><span className="badge bg-success">Active</span></td>
              <td><button className="btn btn-sm btn-outline-primary">Pay Fee</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>

<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div className="container">
      <a className="navbar-brand fw-bold" href="#"><i className="fas fa-home"></i> PropertyHub</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><a className="nav-link" href="#properties">Properties</a></li>
          <li className="nav-item"><a className="nav-link" href="#pay-fee">Pay Fee</a></li>
          <li className="nav-item"><a className="nav-link" href="#">Contact</a></li>
          <li className="nav-item"><a className="nav-link btn btn-outline-light px-4 ms-3" href="#">Login</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <section className="hero-section">
    <div className="container">
      <h1 className="display-4 fw-bold">Welcome to PropertyHub</h1>
      <p className="lead">Manage your properties & pay maintenance/convenience fees easily</p>
      <a href="#properties" className="btn btn-warning btn-lg mt-3">View Properties</a>
    </div>
  </section>



  <section id="pay-fee" className="py-5 bg-light">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="fee-box shadow-lg">
            <h2 className="mb-4"><i className="fas fa-credit-card"></i> Pay Maintenance / Convenience Fee</h2>
            <form>
              <div className="mb-3">
                <label className="form-label">Property</label>
                <select className="form-select form-select-lg">
                  <option>Sunshine Apartments - Flat 302</option>
                  <option>Green Valley Villas - Villa 12</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Amount</label>
                <input type="text" className="form-control form-control-lg text-center" value="₹3,500" readonly/>
              </div>
              <div className="mb-3">
                <label className="form-label">Payment Method</label>
                <div className="d-grid gap-2">
                  <button type="button" className="btn btn-light btn-lg"><i className="fab fa-google-pay"></i> Google Pay</button>
                  <button type="button" className="btn btn-light btn-lg"><i className="fas fa-mobile-alt"></i> PhonePe / Paytm</button>
                  <button type="button" className="btn btn-light btn-lg"><i className="fas fa-credit-card"></i> Card / Net Banking</button>
                </div>
              </div>
              <button type="submit" className="btn btn-warning btn-lg w-100 mt-4 fw-bold">
                Pay ₹3,500 Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer className="text-center">
    <div className="container">
      <p>&copy; 2025 PropertyHub. All rights reserved. | Made with <i className="fas fa-heart text-danger"></i> in Andhra Pradesh</p>
    </div>
  </footer>



    </div>
  )
}
export default PayFee;