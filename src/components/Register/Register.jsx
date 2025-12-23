import React from  "react";
import { useState } from "react";
import {useForm} from 'react-hook-form';
import './register.css';
import { Link } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Zod Schema (Strong + Clean Validation)
const registerSchema = z.object({
  name: z
  .string()
  .min(2, 'Name must be at least 2 characters'),
  email: z
  .string().
  email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  password1: z.string(),
  role: z.enum(['user', 'owner', 'admin']).default('user'),
}).refine((data) => data.password === data.password1, {
    message: "Passwords don't match",
    path: ['password2'],
  });
const Register=()=>{
  const [serverError, setServerError] = useState('');
  const navigate=useNavigate();
  const{
    register,handleSubmit,formState:{errors}} = useForm({
    resolver: zodResolver(registerSchema),
    mode:"onBlur",
    defaultValues: {
      name:"",
      email:"",
      password:"",
      password1:"",
      role: 'user',
    },
  });
const onSubmit=async(data)=>{

  
  try{
    const res=await axios.post('http://localhost:5000/api/user/register',{
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
    });
    localStorage.setItem('token', res.data.token);
    //console.log(res.data);
    const redirectPath = res.data.redirectTo || "/home";
    const fallbackRedirect = {
        admin: "/admin/dashboard",
        owner: "/owner/dashboard",
        user: "/home",
      }[data.role];
    navigate(redirectPath || fallbackRedirect);

  }
  catch(err){ 
console.error("register error:",err.message);
setServerError(err.response?.data?.msg || 'Registration failed');
  }

}
return (
<div>

      <div className="login-container" >
        {serverError && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm text-center font-medium">
            {serverError}
          </div>
        )}

		<div className="container">
			<form  onSubmit={handleSubmit(onSubmit)}>
				<div className="login-box rounded-2 p-5">
					<div className="login-form">
					
						<h5 className="fw-light mb-5">Sign in to access dashboard.</h5>
            <div className="mb-3">
							<label className="form-label">Your Name</label>
							<input type="text"  {...register('name')} className="form-control"/>
             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}						
             </div>
						<div className="mb-3">
							<label className="form-label">Your Email</label>
							<input type="email" {...register('email')}  className="form-control"/>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
						</div>
						<div className="mb-3">
							<label className="form-label">Your Password</label>
							<input type="password" {...register('password')}   className="form-control"/>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}

						</div>
	         <div className="mb-3">
							<label className="form-label">Your Confirm Password</label>
							<input type="password"{...register('password1')} className="form-control"/>
              {errors.password1 && <p className="text-red-500 text-sm mt-1">{errors.password1.message}</p>}

						</div>

            <div className="mb-3">
							<label className="form-label">Your Role</label>
							<select type="password" {...register('role')} className="form-control">
                <option value="user">User</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
                </select>
						</div>
						<div className="d-flex align-items-center justify-content-between">
							<div className="form-check m-0">
								<input className="form-check-input" type="checkbox" value="" id="rememberPassword" />
								<label className="form-check-label" htmlFor="rememberPassword">Remember</label>
							</div>
							<a href="forgot-password.html" className="text-blue text-decoration-underline">Lost password?</a>
						</div>
						<div className="d-grid py-3">
							<button type="submit" className="btn btn-lg btn-primary" >Register
							</button>
						</div>
            Already have an account? <Link to="/login"  className="text-center py-3">Login here</Link>
				
					
					</div>
				</div>
			</form>
		</div>
</div>
</div>
    

  
  )
}
export default Register;