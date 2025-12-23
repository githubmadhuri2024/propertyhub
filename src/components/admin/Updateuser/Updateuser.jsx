import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Username is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Updateuser =()=> {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();

  const { register, handleSubmit, reset,  formState: { errors },
} = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Fetch single user
  const fetchSingleUser = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/user/singleUser/${id}`
    );
    setUser(response.data);
  };

  useEffect(() => {
    fetchSingleUser();
  }, [id]);

  // Reset form when user data is loaded
  useEffect(() => {
    if (user && user._id) {
      reset({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
  }, [user, reset]);

  const onSubmit = async(data) => {
    // Handle form submission here
    console.log("Form data submitted:", data);
    try{
       const formData=new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
       
      const response=await axios.post(`http://localhost:5000/api/user/updateuser/${id}`,formData,{
          headers: {
            "Content-Type": "application/json",
          },
        });
      console.log(response.data);
      navigate('/users');
      toast.success("Property created successfully!");
      

    }
    catch(error){
      console.error("while updateing user:",error.message);
      toast.error(
        error.response?.data?.message,
        error.response?.data?.errors?.[0]?.msg || 
        error.message || 
        "Something went wrong!"

      );

    }
  };

  return (
    <div className="page-wrapper">
      <Header />
      <div className="main-container">
        <Sidebar />
        <div className="content-wrapper-scroll">
          <div className="content-wrapper">
            <div className="row gx-3">
              <div className="col-xxl-12">
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Update User</div>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row gx-3">
                        <div className="col-lg-3 col-sm-4 col-12">
                          <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              {...register("name")}
                            />
                             {errors.name && <p   className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

                          </div>
                        </div>

                        <div className="col-lg-3 col-sm-4 col-12">
                          <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              {...register("email")}
                            />
                        {errors.email && <p   className="text-red-500 text-sm mt-1">{errors.email.message}</p>}

                          </div>
                        </div>

                        <div className="col-lg-3 col-sm-4 col-12">
                          <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="d-flex">
                              <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                id="password"
                                {...register("password")}
                              />
                    {errors.password && <p   className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

                              <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                  setShowPassword(!showPassword)
                                }
                                aria-label={
                                  showPassword
                                    ? "Hide password"
                                    : "Show password"
                                }
                              >
                                <i
                                  className={`fa ${
                                    showPassword ? "fa-eye-slash" : "fa-eye"
                                  }`}
                                  aria-hidden="true"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr />

                      <div className="row gx-3">
                        <div className="col-xxl-12">
                          <div className="d-flex gap-2 justify-content-end">
                            <Link to="" className="btn btn-outline-secondary">
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
        <Footer />
      </div>
    </div>
  );
};

export default Updateuser;
