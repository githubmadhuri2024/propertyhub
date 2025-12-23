import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
const Property=()=>{
const [property,setProperty]=useState([]);

	const FetchProperty=async(data)=>{
		try{

		const response=await axios.get('http://localhost:5000/api/property/getProperty');
        setProperty(response.data);  // Now each has image as array
        console.log('Fetched properties:', data);  // Debug: Check image arrays
	
		}
		catch(err){
			console.error("Fetch error:", err);
			setProperty([]);                        
		}
		finally {
        //setLoading(false);
      }

	}


	useEffect(()=>{
   FetchProperty();

	},[]);
const deleteProperty=async(id)=>{
await axios.delete(`http://localhost:5000/api/property/deleteProperty/${id}`);
	console.log("deleted successfully");
}
  return(
    <div>
      	 <div className="page-wrapper">

   <Header/>
    
      <div className="main-container">

      <Sidebar/>
        <div className="content-wrapper-scroll">
 <div className="d-flex justify-content-end mb-3"  style={{marginTop:'20px'}}>
       <Link   className="btn btn-primary"  to="/createproperty">Create Property</Link>
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
														<th>Type</th>
														<th>Description</th>
                            <th>Location</th>
														<th>Price</th>
														<th>Image</th>
														<td>Created At</td>
														<th>Status</th>
													</tr>
												</thead>
										<tbody>{
											property.map((p,index)=>(
												 <tr key={p._id}>
											    <td>{index+1}</td>
													<td>{p.title}</td>
													<td>{p.type}</td>
													<td>{p.description}</td>
													<td>{p.location}</td>
													<td>{p.price}</td>
												   <td style={{ verticalAlign: "middle" }}>
                           {property.images && property.images.length > 0 ? (
                       <div className="d-flex gap-2 align-items-center flex-nowrap overflow-auto">
              {property.images.slice(0, 5).map((img, i) => {
        const src = img.startsWith('uploads/') ? `http://localhost:5000/${img}` : `http://localhost:5000/uploads/${img}`;
        return (
          <img
            key={i}
            src={src}
            alt={`Image ${i+1}`}
            className="rounded border shadow-sm"
            style={{ width: "80px", height: "60px", objectFit: "cover" }}
            onError={(e) => e.target.src = "https://via.placeholder.com/80x60?text=No+Img"}
          />
        );
      })}
      {property.images.length > 5 && <small className="text-muted">+{property.images.length - 5} more</small>}
    </div>
  ) : (
    <span className="text-muted small">No images uploaded yet</span>
  )}
</td>
													<td>{p.createdAt}</td>
													<td><Link className="btn btn-primary"   to={`/updateProperty/${p._id}`}>Edit</Link>
													<button   onClick={()=>deleteProperty(p._id)}  className="btn btn-danger">Delete</button></td>
											    </tr>
))}
                     
                    
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

export default Property;