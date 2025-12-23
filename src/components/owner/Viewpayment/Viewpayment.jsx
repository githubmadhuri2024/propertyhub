import React, { useState,useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
const Viewpayment=()=>{
const[payment,setPayment]=useState([]);
const fetchPayment=async()=>{
  try{
  const response=await axios.get('http://localhost:5000/api/payment/getPayment');
  setPayment(response.data);
  //console.log(response.data);

  }
  catch(error){
    console.error("error fething payment:",error.message)
  }
 

}

 useEffect(()=>{
  fetchPayment();

},[]);
  return (
    <div>
<div className="page-wrapper">

   <Header/>
    
      <div className="main-container">

      <Sidebar/>
        <div className="content-wrapper-scroll">
 <div className="d-flex justify-content-end mb-3"  style={{marginTop:'20px'}}>
       {/* <Link   className="btn btn-primary"  to="/createproperty">Create Property</Link> */}
			 </div>
			 <div className="content-wrapper">

            <div className="row gx-3">
              <div className="col-sm-12 col-12">
								<div className="card">
									<div className="card-header">
										<div className="card-title">View Payment</div>
									</div>
									<div className="card-body">
										<div className="table-responsive">
											<table id="basicExample" className="table custom-table">
												<thead>
													<tr>
														<th>S.No</th>
                            <th>Property Name</th>
                            <th>Property Type</th>
                            <th>Location</th>
                            <th>Tenant Name</th>     
                           <th>Tenant Email</th>     
                            <th>Amount</th>
                           <th>For Month</th>
                           <th>Payment Date</th>
                          <th>Status</th>
                          <th>View Details</th>
													</tr>
												</thead>
										<tbody>
                      { payment.length ===0 ?(
                        <tr>
                              <td colSpan="9" className="text-center py-4">
                                No payments found.
                              </td>
                            </tr>
                        
                      ):(
                         payment.map((pay,index)=>(
                          <tr key={pay._id}>
                            <td>{index+1}</td>
                            <td>{pay.propertyDetails?.title || "N/A"}</td>                        
                            <td>{pay.propertyDetails?.type || "N/A"}</td>    
                            <td>{pay.propertyDetails?.location}</td>  
                            <td>{pay.userDetails?.name}</td> 
                            <td>{pay.userDetails?.email}</td> 
                            <td>{pay.amount}</td>
                            <td>{pay.createdAt}</td>
                            <td>{pay.paymentMethod}</td>
                            <td><button
                             className={`btn btn-sm ${
                              pay.status === 'success' ? 'btn-success' : 'btn-danger'
                               }`}>
                              {pay.status === 'success' ? 'Success' : 'Failed'}
                         </button></td>
                            <td><Link to={`/viewpaymentdetails/${pay._id}`}    className="btn btn-primary">View details</Link></td>




                          </tr>
                        ))
                      )
                       
                      }
                     
                    
                    </tbody>
											</table>
										</div>
									</div>


					
         
								</div>
								</div>
            </div>

          </div>

        </div>
     
       <Footer/>

      </div>

    </div>
    </div>
  )
}
export default Viewpayment;