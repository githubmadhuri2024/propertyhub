import react, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
const Owners=()=>{
  const [owner,setOwner]=useState([]);
  const fetchOwner=async()=>{
    try{
    const response=await axios.get('http://localhost:5000/api/user/getowner');
    setOwner(response.data);
    }
    catch(error){
      console.error(error.message);

    }
   
  }
  useEffect(()=>{
  fetchOwner();
  },[]);
  return (
    <div>
  <div className="page-wrapper">

   <Header/>
    
      <div className="main-container">

      <Sidebar/>
        <div className="content-wrapper-scroll">
 <div className="d-flex justify-content-end mb-3"  style={{marginTop:'20px'}}>
       <Link  to="/createowner" className="btn btn-primary">Create Owner</Link>
			 </div>
			 <div className="content-wrapper">

            <div className="row gx-3">
              <div className="col-sm-12 col-12">
								<div className="card">
									<div className="card-header">
										<div className="card-title">Property</div>
									</div>
									<div className="card-body">
										<div className="table-responsive">
											<table id="basicExample" className="table custom-table">
												<thead>
													<tr>
														<th>S.No</th>
														<th>Name</th>
														<th>Email</th>
                            <th>Created At</th>
														<th>Status</th>
													</tr>
												</thead>
                        <tbody>
                          {owner.map((o,index)=>(
                           <tr key={o._id}>
                            <td>{index+1}</td>
                            <td>{o.name}</td>
                            <td>{o.email}</td>
                            <td>{o.createdAt}</td>
                            <td>
                              <Link  to={`editOwner/${o._id}`}  className="btn btn-primary">Edit</Link>
                               <button  className="btn btn-danger">Delete</button>
                            </td>
                              </tr>
                            ))
                          

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
export default Owners;