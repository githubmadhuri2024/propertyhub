import React, { useEffect,useState} from "react";
import Header from "../Header/Header";
import Footer from  "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";

const User=()=>{
  const[user,setUser]=useState([]);
  const fetchUser=async()=>{
    try{
    const response=await axios.get('http://localhost:5000/api/user/getUser');
    console.log("Api response:",response.data);
    setUser(response.data);

    }
    catch(err){
    console.error("Fetch error:", err);
   }
		

  }
  
  useEffect(()=>{
   fetchUser();
  },[]);
  const deleteUser=async(id)=>{
  //  //console.log(id);
  //  if(!id){
  //  toast.error("Invalid Id Provided");
  //  return;
  //  }

  //  const confirmed = window.confirm("Are you sure you want to delete this property? This action cannot be undone.");
  //  if (!confirmed) return;
   try{
    //  console.log("delete user");
     // console.log("id:",id);
     const response= await axios.delete(`http://localhost:5000/api/user/deleteUser/${id}`);
     console.log("property deleted sussessfully:",response.data);

   }
   catch(error){
    console.error("Error deleting property:", error);
   }
  
  }
  return (
    <div>
  <div className="page-wrapper">

   <Header/>
    
      <div className="main-container">

      <Sidebar/>
        <div className="content-wrapper-scroll">
 <div className="d-flex justify-content-end mb-3"  style={{marginTop:'20px'}}>
       <Link   className="btn btn-primary"  to="/createuser">Create Property</Link>
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
														<th>Role</th>
                            <th>Created At</th>
														<th>Status</th>
													</tr>
												</thead>
										<tbody>{
                     Array.isArray(user)&& user.map((u,index)=>(
                        <tr key={u._id}>
                          <td>{index+1}</td>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                           <td>{u.role}</td>
                           <td>{u.createdAt}</td>
                           <td><Link to={`/updateuser/${u._id}`}  className="btn btn-primary">Edit</Link>
                           <button onClick={()=>deleteUser(u._id)}  className="btn btn-danger">Delete</button></td>

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
export default  User;
