import React, { useContext, useState } from "react";
import Layout from "../utils/Layout";
import { useNavigate } from "react-router-dom";
import { CourseContext } from "../../context/CourseContext";
import CourseCard from "../../components/courseCard/CourseCard";
import "./admincourses.css";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";

const categories=[
    "Web Development",
    "App Development",
    "Game Development",
    "Data Science",
    "Programming",
    "Artificial Intelligency",
    "Python Development",
    "java Developer",
]

export default function AdminCourses({user}){
    const navigate=useNavigate();

    if(user && user.role !=="admin") return navigate("/");

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [createdBy,setCreatedBy]=useState("");
    const [category,setCategory]=useState("");
    const [price,setPrice]=useState("");
    const [duration,setDuration]=useState("");
    const [image,setImage]=useState("");
    const [imagePrev,setImagePrev]=useState("");
    const [btnLoading,setBtnLoading]=useState(false);

    const imageHandeler=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend=()=>{
            setImagePrev(reader.result);
            setImage(file);
        }
    }
    const{featchCourses,courses}=useContext(CourseContext);

    const sumbitHandeler=async(e)=>{

        e.preventDefault();
        setBtnLoading(true);

        const myForm=new FormData();

        myForm.append("title",title);
        myForm.append("description",description)
        myForm.append("category",category)
        myForm.append("price",price)
        myForm.append("createdBy",createdBy)
        myForm.append("duration",duration)
        myForm.append("image",image)

        try{

            const {data}=await axios.post(`${server}/api/course/new`,myForm,{
                headers:{
                    token:localStorage.getItem("token"),
                }
            });

            toast.success(data.message);
            setBtnLoading(false);
            await featchCourses();
            setImage("");
            setDescription("");
            setCategory("");
            setDuration("");
            setTitle("");
            setPrice("");
            setCreatedBy("");
            setImagePrev("");

        }catch(error){
            toast.error(error.response.data.message);
        }

    }

   

    return <Layout>
        <div className="admin-courses"> 
            <div className="left">
                <h1>All Courses</h1>
                <div className="dashboard-Content">
                    {
                        courses && courses.length>0? courses.map((e)=>{
                            return <CourseCard key={e._id} course={e}/>
                        }) : <p>No Course Yet</p>
                    }
                </div>
            </div>

            <div className="right">
                <div className="add-course">
                    <div className="course-form">
                        <h2>Add Course</h2>
                        <form onSubmit={sumbitHandeler}>
                            <label htmlFor="title"> Title </label>
                            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required/>

                            <label htmlFor="title"> Description </label>
                            <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} required/>

                            <label htmlFor="title"> Price </label>
                            <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} required/>

                            <label htmlFor="title"> CreatedBy </label>
                            <input type="text" value={createdBy} onChange={(e)=>setCreatedBy(e.target.value)} required/>

                            <select value={category} onChange={(e)=>setCategory(e.target.value)}>

                                <option value={""}>Select Category</option> 
                                {
                                    categories.map((e)=>(
                                        <option value={e} key={e}>{e}</option>
                                    ))
                                }

                            </select>

                            <label htmlFor="title"> Duration </label>
                            <input type="text" value={duration} onChange={(e)=>setDuration(e.target.value)} required/>

                            <input type="file" required onChange={imageHandeler}/>    
                                {
                                    imagePrev && <img src={imagePrev} alt="" width={300}/>
                                }

                                <button type="submit" disabled={btnLoading} className="comman-btn" >{btnLoading? "Please Wait...":"Add"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
}