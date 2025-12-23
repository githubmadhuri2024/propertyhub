import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Schema=yup.object().shape({
  title:yup.string().required("Title is required"),
  type:yup.string().required("Type is required"),
  description:yup.string().required("Description is required"),
  location:yup.string().required("location is required"),
  price:yup.string().required("price is required"),
  ownerId:yup.string().required("Owner is required"),
  
  status:yup.string().required("status is required"),
});
const Createproperty=()=>{
  const navigate=useNavigate();
  const [owners, setOwners] = useState([]);   
  const [images, setImages] = useState([]);           // For file objects

  const [imagePreviews, setImagePreviews] = useState([]); // For preview URLs
 const fetchOwner=async()=>{
const response=await axios.get('http://localhost:5000/api/user/getOwner');
setOwners(response.data);
}
useEffect(()=>{
   fetchOwner();
  },[]);


  const handleImageChange=(e)=>{
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);

  }
  const {
    register,handleSubmit,formState:{errors}}=useForm({
    resolver:yupResolver(Schema),
    mode:"onBlur",
     defaultValues: {
      title:"",
      type:"",
      description:"",
      price:"",
      location:"",
      ownerId:"",
      status:"",
   
    },

  });

  const onSubmit=async(data)=>{
    try{
    const formData=new FormData();
    formData.append("title", data.title);

    formData.append("type", data.type);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("price", data.price);
    formData.append("ownerId", data.ownerId);
    formData.append("status", data.status);
    // Append multiple images
    images.forEach((image) => {
      formData.append("images", image); // "images" must match backend field name
    });
    await axios.post('http://localhost:5000/api/property/addProperty',
      formData,
      {
    headers: {
          "Content-Type": "multipart/form-data",
        },
    });
toast.success("Property created successfully!");

navigate('/property');
} catch (error) {
  console.error(error);

  toast.error(
   

  error.response?.data?.message || 
  error.response?.data?.errors?.[0]?.msg || 
  error.message || 
  "Something went wrong!"
);
    }

  }
  return(
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
                          <label className="form-label">Title</label>
                          <input type="text" className="form-control"  id="title" {...register("title")}/>
                          {errors.title && <p   className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>
                      </div>
                 <div className="col-lg-3 col-sm-4 col-12">
                        <div className="mb-3">
                          <label className="form-label">Type(e.g., house, land)</label>
                    <input type="text" className="form-control"  id="type"   {...register("type")}/>
                        {errors.type && <p   className="text-red-500 text-sm mt-1">{errors.type.message}</p>}

                        </div>
                      </div>


                      <div className="col-lg-3 col-sm-4 col-12">
                        <div className="mb-3">
                          <label className="form-label">Description</label>
                          <input type="text" className="form-control"  id="description"   {...register("description")}/>
                          {errors.description &&  <p  className="text-red-500 text-sm mt-1">{errors.description.message}</p>}

                        </div>
                      </div>

                        <div className="col-lg-3 col-sm-4 col-12">
                        <div className="mb-3">
                          <label className="form-label">Price</label>
                          <input type="text" className="form-control"  id="price"   {...register("price")}/>
                          {errors.price &&  <p  className="text-red-500 text-sm mt-1">{errors.price.message}</p>}

                        </div>
                      </div>


                         <div className="col-lg-3 col-sm-4 col-12">
                        <div className="mb-3">
                          <label className="form-label">Location</label>
                          <input type="text" className="form-control"  id="location"   {...register("location")}/>
                          {errors.location &&  <p  className="text-red-500 text-sm mt-1">{errors.location.message}</p>}

                        </div>
                      </div>

                         <div className="col-lg-3 col-sm-4 col-12">
                        <div className="mb-3">
                          <label className="form-label">Image</label>
                          <input type="file" className="form-control" id="images" name="images"  multiple    accept="image/*"     onChange={handleImageChange}/>
                          <small className="text-muted">
                              {images.length > 0
                                ? `${images.length} image(s) selected`
                                : "Choose one or more images"}
                            </small>  

                            {/* Image Previews */}
                          {imagePreviews.length > 0 && (
                            <div className="row g-3 mt-2">
                              {imagePreviews.map((preview, index) => (
                                <div key={index} className="col-lg-2 col-md-3 col-4 position-relative">
                                  <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="img-fluid rounded shadow-sm"
                                    style={{ height: "120px", width: "100%", objectFit: "cover" }}
                                  />
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1"
                                    onClick={() => removeImage(index)}
                                    style={{ fontSize: "10px" }}
                                  >
                                    X
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                      

                        </div>
                      </div>



                       <div className="col-lg-3 col-sm-4 col-12">
                        <div className="mb-3">
                          <label className="form-label">Owner</label>
                          <select className="form-control"   id="ownerId"  {...register("ownerId")}>
                            <option value="">Select Owner</option>
                            {owners.map((o)=>(
                         <option key={o._id} value={o._id}>
                             {o.name} ({o.email})
                            </option>
                           ) )}
                           
                            </select>

                          {errors.ownerId &&  <p className="text-red-500 text-sm mt-1">{errors.ownerId.message}</p>}

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

                          {errors.status &&  <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}

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

export default Createproperty;