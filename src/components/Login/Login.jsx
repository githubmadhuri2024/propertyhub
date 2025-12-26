import React from  "react";
import './Login.css';
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const loginSchema=z.object({
	email:z
	.string()
	.email('Invalid email address'),
	password:z
	.string().min(6,'password must be 6 characters')

});
const Login=({ onLoginSuccess })=>{
	const navigate=useNavigate();
 const{
		register,
		handleSubmit,
		formState:{errors},
		setError
	}
		 = useForm({
		resolver: zodResolver(loginSchema),
		mode:"onBlur",
		defaultValues: {
      email:"",
      password:"",
   
    },
			
		});
 

 const onSubmit=async(data)=>{
	try {
      const res = await axios.post('http://localhost:5000/api/user/login', {
        email: data.email,
        password: data.password,
      });
      console.log(res.data);

      // FIXED: Use res.status and res.data (axios style), not res.ok/response.json()
      if (res.status === 200) {
        // FIXED: Call the prop with the token
        if (onLoginSuccess) {
          onLoginSuccess(res.data.token);  // ← THIS MAKES SUCCESS TEST PASS
        }

        const redirectPath = res.data.redirectTo || "/home";
        const fallbackRedirect = {
          admin: "/admin/dashboard",
          owner: "/owner/dashboard",
          user: "/home",
        }[res.data.user.role];  // ← FIXED: res.data.user.role

        navigate(redirectPath || fallbackRedirect);

        sessionStorage.setItem("email", res.data.user.email);
        sessionStorage.setItem("name", res.data.user.name);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("id", res.data.user.id);
        sessionStorage.setItem("role", res.data.user.role);
      } else {
        // FIXED: Show server error
        setError('root.serverError', { 
          message: err.response?.data?.error || 'Invalid credentials. Please try again.'        });
      }
    }
catch(err){ 
console.error("register error:",err.message);
setError('root.serverError', { 
        message: err.response?.data?.error || 'Network error. Please try again.' 
      });


			{errors.root?.serverError && (
  <p data-testid="login-error" className="text-red-500 text-sm mt-3">
    {errors.root.serverError.message}
  </p>
)}
  }

 }
  return (
    <div>

      <div className="login-container" >

		<div className="container">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="login-box rounded-2 p-5">
					<div className="login-form">
					
						<h5 className="fw-light mb-5">Sign in to access dashboard.</h5>
						<div className="mb-3">
							<label className="form-label">Your Email</label>
							<input type="email" {...register("email")}  id="email-input"   className="form-control"  placeholder="name@example.com"    data-testid="email"/>
							{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}						

						</div>
						<div className="mb-3">
							<label className="form-label">Your Password</label>
							<input type="password"    id="password-input"  {...register('password')} className="form-control"    data-testid="password"/>
							{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}						

						</div>
						<div className="d-flex align-items-center justify-content-between">
							<div className="form-check m-0">
								<input className="form-check-input" type="checkbox" value="" id="rememberPassword" />
								<label className="form-check-label" htmlFor="rememberPassword">Remember</label>
							</div>
							<a href="forgot-password.html" className="text-blue text-decoration-underline">Lost password?</a>
						</div>
						<div className="d-grid py-3">
							<button type="submit" className="btn btn-lg btn-primary">Login
							</button>
						</div>
						<Link to="/register" className="text-center py-3">New to Proprtymangement ?Create an account</Link>
				
					
					</div>
				</div>
			</form>
		</div>
</div>
</div>
    

  
  )
}
export default Login;