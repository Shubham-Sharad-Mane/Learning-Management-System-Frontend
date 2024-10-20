import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./auth.css";
import {server} from "../../main"
import axios from "axios";
import toast from 'react-hot-toast';
export default function ForgotPassword() {
  const [email ,setEmail]=useState("");
  const [btnLoading,setBtnLoading]=useState(false);
  const navigate=useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setBtnLoading(true);
    try{

      const {data}=await axios.post(`${server}/api/user/forgot`,{email});
      console.log('Response data:', data);
      toast.success(data.message);
      navigate("/login");
      setBtnLoading(false);
    }catch(error){
      console.error("Error response:", error.response);
      const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
      // toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }
  return (
    <div className='auth-page'>
      <div className="auth-form">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Enter Email</label>
          <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} required />
          <button  disabled={btnLoading} className='comman-btn'>{btnLoading? "please wait ...": "Forgot Password"}</button>
        </form>
      </div>
    </div>
  )
}
