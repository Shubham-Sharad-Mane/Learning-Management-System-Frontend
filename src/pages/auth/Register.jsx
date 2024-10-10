import React, { useContext, useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
export default function Register(){
    const navigate =useNavigate();
    const {btnLoading , registerUser}= useContext(UserContext)//UserData();
    const [email ,setEmail]=useState(""); //create the use state and set the empty string for email
    const [password ,setPassword]=useState(""); //create the use state and set the empty string
    const [name ,setName]=useState("");

        const submitHandeler=async(e)=>{
            e.preventDefault(); //because we dont want to reload the page after submit
            await registerUser(name,email,password,navigate);

        }
    return(
        <div className="auth-page">

        <div className="auth-form">
            <h2>Register</h2>
            <form onSubmit={submitHandeler}>
                <label htmlFor="name">Name</label>
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)}required />

                <label htmlFor="email">Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />

                <label htmlFor="password">password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}required />

                <button  type="submit" disabled={btnLoading} className="comman-btn">{btnLoading?"Please wait ...":"Register"}</button>
            </form>
            <p>
                Have an Account? <Link to={"/login"}>Login</Link>
            </p>
        </div>

        </div>
    );
};