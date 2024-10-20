import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./auth.css";
import {server} from "../../main"
import axios from "axios";
import toast from 'react-hot-toast';

export default function ResetPassword() {
    const [password , setPassword]=useState("");
    const [btnLoading,setBtnLoading]=useState(false);
    const params=useParams();
  const navigate=useNavigate();

  const handleSubmit=async (e)=>{
    e.preventDefault();
    setBtnLoading(true);
    try{

      const {data}=await axios.post(`${server}/api/user/reset?token=${params.token}`,{password});

      toast.success(data.message);
      navigate("/login");
      setBtnLoading(false);
    }catch(error){
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }
  return (
    <div className='auth-page'>
      <div className="auth-form">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='password'>Enter Password</label>
          <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
          <button  disabled={btnLoading} className='comman-btn'>{btnLoading? "please wait ...": "Set Password"}</button>
        </form>
      </div>
    </div>
  )
}
