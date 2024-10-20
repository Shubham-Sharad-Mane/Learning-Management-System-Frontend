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
      console.log("hi");
      const {data}=await axios.post(`${server}/api/user/forgot`,{email});
      console.log('Response data:', data);
      toast.success(data.message);
      navigate("/login");
      setBtnLoading(false);
    }catch(error){
      if (error.response) {
        // Server responded with a status code out of the range of 2xx
        console.error("Error response:", error.response);
        const errorMessage = error.response.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMessage);
     } else if (error.request) {
        // Request was made but no response was received
        console.error("Error request:", error.request);
        toast.error("No response from the server. Please check your network connection.");
     } else {
        // Something else happened while setting up the request
        console.error("Error message:", error.message);
        toast.error(error.message);
     }
      // console.error("Error response:", error.response);
      // const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
      // toast.error(errorMessage);
      // // toast.error(error.response.data.message);
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
