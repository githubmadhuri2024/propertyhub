import react from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as  yup from 'yup';
import { toast } from "react-toastify";
import { useForm }  from 'react-hook-form';
import { Link } from "react-router-dom";
import axios from "axios";
const Schema=yup.object().shape({
  name:yup.string().required("name is required"),
  email:yup.string().required("email is required"),
  password:yup.string().required("password is required"),
   status:yup.string().required("status ts required")
});

const Createowner=()=>{
  const{
    register,handleSubmit,formState:{errors}}=useForm({
      resolver:yupResolver(Schema),
      mode:"onBlur",
      defaultValues:{
        name:"",
        email:"",
        password:"",
        status:""

      }

    });

  

  const onSubmit=async(data)=>{
    const formData=new FormData();
    formData.append("name",data.name);
    formData.append("email",data.name);
    formData.append("password",data.name);
    formData.append("status",data.status);

    await axios.post('http://localhost:5000/api/property/addOwner',formData);
    toast.success("Owner added successfully");


  }
  return (
    <div>
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
                    <div className="card-title">Create Category</div>
                  </div>
                  <div className="card-body">
                  <form  onSubmit={handleSubmit(onSubmit)}>
                      <div className="row gx-3">
                      <div className="col-lg-3 col-sm-4 col-12">
                        <div className="mb-3">
                          <label className="form-label">Name</label>
                          <input type="text" className="form-control"  id="name"  {...register("name")}/>
                           {errors.name && <p   className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

                        </div>
                      </div>
                       <div className="col-lg-3 col-sm-4 col-12">
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                           <input type="text" className="form-control"  id="email"    {...register("email")}/>
                          {errors.email && <p   className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

                           </div>
                         </div>
                        <div className="col-lg-3 col-sm-4 col-12">
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <input type="password" className="form-control"  id="password"   {...register("password")}/>
                          {errors.password && <p   className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

                        </div>
                      </div>

                    <div className="col-lg-3 col-sm-4 col-12">
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <select className="form-control"   id="status"  {...register("status")}>
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                             <option value="inactive">Inactive</option>
                            </select>

                          {errors.status && <p   className="text-red-500 text-sm mt-1">{errors.status.message}</p>}

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


    </div>
  )
}
export default Createowner;