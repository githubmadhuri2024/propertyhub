import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Schema=yup.object().shape({
  name:yup.string().required("name is required"),
  email:yup.string().required("email is required"),
  password:yup.string().required("password is required")
});
const Createuser=()=>{
const{
  register,handleSubmit,formState:{errors}
}=useForm({
 resolver:yupResolver(Schema),
 mode:"onBlur",
  defaultValues: {
      name:"",
      email:"",
      password:""
   
    },

});

const navigate=useNavigate();
const onSubmit=async (data) =>{
  try{
const formData=new FormData();
  formData.append("name",data.name);
  formData.append("email",data.email);
  formData.append("password",data.password);

  const response=await axios.post("http://localhost:5000/api/user/register",{
    name:data.name,
    email:data.email,
    password:data.password
  });
  navigate('/users');

  console.log(response.data);

  }
  catch(error){
   console.log("Backend error:",error.response?.data ||error.message);
  }
  
}
  return (
    <div>

           <div className="page-wrapper">
      
         <Header/>
          
            <div className="main-container">
      
            <Sidebar/>
              <div className="content-wrapper-scroll" >
       
                <div className="content-wrapper">
      
                  <div className="row gx-3">
                    <div className="col-xxl-12">
                      <div className="card">
                        <div className="card-header">
                          <div className="card-title">Create User</div>
                        </div>
                        <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row gx-3">
                            <div className="col-lg-3 col-sm-4 col-12">
                              <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control"  id="name"  {...register('name')}/>
                                {errors.name && <p   className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                </div>
                            </div>
                             <div className="col-lg-3 col-sm-4 col-12">
                              <div className="mb-3">
                               <label className="form-label">Email</label>
                                 <input type="text" className="form-control"  id="email"  {...register('email')}/>
                                    {errors.email && <p   className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

                              </div>
                            </div>
      
      
                            <div className="col-lg-3 col-sm-4 col-12">
                              <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control"  id="password"  {...register('password')}   autoComplete="new-password"/>
                                {errors.password && <p  className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      
                              </div>
                            </div>
                             </div>
                          <hr />
                          <div className="row gx-3">
                            <div className="col-xxl-12">
                              <div className="d-flex gap-2 justify-content-end">
                                <Link to='' className="btn btn-outline-secondary">
                                  Cancel
                                </Link>
                                <button type="submit" className="btn btn-success">
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
      
                          </form>
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
export default Createuser;