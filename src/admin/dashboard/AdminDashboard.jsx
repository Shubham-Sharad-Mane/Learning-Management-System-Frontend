import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import axios from "axios";
import { server } from "../../main";
import Layout from "../utils/Layout";

export default function AdminDashboard( {user}){
    const navigate=useNavigate();

    if(user && user.role !=="admin") return navigate("/");

    const [stats , setStats]=useState([]);

    async function fetchStats(){
        try{

            const {data}=await axios.get(`${server}/api/stats`,{
                headers:{
                    token:localStorage.getItem("token"),
                }
            });

            setStats(data.stats);

        }
        catch(error){
            console.log(error);
        }
    }

        useEffect(()=>{
            fetchStats();
        },[]);

    return( <div>
        
        
            <Layout>
                <div className="main-content">
        
                    <div className="box">
                        <p>Total Coursses</p>
                        <p>{stats.totalCourses}</p>
                    </div>
                    <div className="box">
                        <p>Total Lectures</p>
                        <p>{stats.totalLectures}</p>
                    </div>
                    <div className="box">
                        <p>Total Users</p>
                        <p>{stats.totalUsers}</p>
                    
                    </div>
                    </div>
                  </Layout>
           
        </div>
     
    );
}