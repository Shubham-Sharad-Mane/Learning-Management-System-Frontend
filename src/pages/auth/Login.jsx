//import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext"; 
import { CourseContext } from "../../context/CourseContext";
// import { UserData } from "../../context/UserContext";
export default function Login(){
    const navigate =useNavigate();
    const {btnLoading , loginUser}= useContext(UserContext)//UserData();
    const [email ,setEmail]=useState(""); //create the use state and set the empty string for email
    const [password ,setPassword]=useState(""); //create the use state and set the empty string

        const {featchCourses}=useContext(CourseContext);

        const submitHandeler=async(e)=>{
            e.preventDefault() //because we dont want to reload the page after submit
            await loginUser(email,password,navigate,featchCourses);

        }

    return(
        <div className="auth-page">

        <div className="auth-form">
            <h2>Login</h2>
            <form onSubmit={submitHandeler}>
                <label htmlFor="email">Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}required />

                <label htmlFor="password">password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}required />

                <button disabled={btnLoading} className="comman-btn" type="submit">{btnLoading? "please wait ..." : "Login"}</button>
            </form>
            <p>
                Don't Have an Account? <Link to={"/register"}>Register</Link>
            </p>
            <p>
                <Link to={"/forgot"}>Forgot Password ? </Link>
            </p>
        </div>

        </div>
    );
};