import React from "react";
import './Home.css';
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import Footer from '../Footer/Footer';
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Home=()=>{
   const[property,setProperty]=useState([]);
  const fetchProprty=async()=>{
    const response= await axios.get('http://localhost:5000/api/property/getProperty');
    setProperty(response.data);
  }
  useEffect(()=>{
  fetchProprty();
  },[])
  return (

  <div>
<Header/>
 <Navbar/>

  <section id="properties" className="py-5">
    <div className="container">
      <h2 className="text-center mb-5 fw-bold text-primary">Available Properties</h2>

      <div className="row g-4 mb-5">
                  {property.map((p)=>(

        <div className="col-lg-4 col-md-6">
          <div className="card property-card h-100">
             <img src={`http://localhost:5000/uploads/${p.image[0]}`} className="card-img-top property-img" alt="Flat"/>
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{p.title}</h5>
              <p className="text-muted"><i className="fas fa-map-marker-alt"></i> {p.type}</p>
              <ul className="list-unstyled">
                <li><strong>{p.description}</strong></li>
                <li>Maintenance: {p.price}</li>
                <li>Location: {p.location}</li>

                <li>Status: <span className="badge bg-warning">{p.status}</span></li>
              </ul>
              <div className="mt-auto">
                <Link  to={`/viewdetials/${p._id}`}   className="btn btn-primary w-100">View Details</Link>
              </div>
            </div>
          </div>
        </div>

                  ))}
      
      
      
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
export default Home;