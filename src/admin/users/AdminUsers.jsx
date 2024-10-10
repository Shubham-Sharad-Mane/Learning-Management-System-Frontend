import React, { useEffect, useState } from "react";
import "./users.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../utils/Layout";
import toast from "react-hot-toast";
export default function AdminUsers({user}){

    const navigate=useNavigate();

    if(user && user.role !== "admin")return navigate("/");

    const [users,setUsers]=useState([]);

    async function fetchUsers(){
        try{

            const {data}=await axios.get(`${server}/api/users`,{
                headers:{
                    token:localStorage.getItem("token"),
                }
            });

            setUsers(data.users);


        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchUsers();
    },[]); 

    const updateRole=async(id)=>{
        if(confirm("Are You Sure You Want To Update This User Role !")){
            try{

                const {data}=await axios.put(`${server}/api/user/${id}`,{},{ //this empty bracket is request body and this is empty because we dont send any data 
                    headers:{
                        token:localStorage.getItem("token"),
                    }
                });

                toast.success(data.message);
                fetchUsers();

            }catch(error){
                toast.error(error.response.data.message);
            }
        }
    }

    return(
       <Layout>
        <div className="users">
            <h1>All Users</h1>
            <table border={"black"}>

            <thead>
                <tr>
                    <td>#</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Role</td>
                    <td>Update Role</td>
                </tr>
            </thead>

            {
                users && users.map((e,i)=>(
                    <tbody>
                        <tr>
                            <td>{i+1}</td>
                            <td>{e.name}</td>
                            <td>{e.email}</td>
                            <td>{e.role}</td>
                            <td>
                                <button onClick={()=>updateRole(e._id)} className="comman-btn">Update Role</button>
                            </td>
                        </tr>
                    </tbody>
                ))
            }

            </table>
        </div>
       </Layout>
    );
}