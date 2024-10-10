import React from "react";
import { useNavigate } from "react-router-dom"; //import the useNavigate for navigate after clicking the button
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";
 const Home=()=>{
    const navigate=useNavigate();  //add useNavigate() method to the navigate and pass in the onchange handeler
    return (
        <div>
            <div className="home">
                <div className="home-content">
                    <h1>Wellcome to E-Learning Platform</h1>
                    <p>Learn , Grow , Excel</p>
                    <button onClick={()=>navigate("/courses")}className="comman-btn">Get Started</button> 
                </div>
            </div>
            <Testimonials/>
        </div>
    );
};
export default Home;