import React, { useContext, useEffect } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseContext } from "../../context/CourseContext";
import { server } from "../../main";

export default function CourseStudy({user}){
    const params=useParams();
    const {fetchCourse , course}=useContext(CourseContext);
    console.log(course);
    const navigate=useNavigate();

    if(user && user.role !== "admin" && !user.subscription.includes(params.id))
         navigate("/");

    useEffect(()=>{
        fetchCourse(params.id);
    },[]);
    return(
       <>
    {course && <div className="course-study-page">
        <img src={`${server}/${course.image}`} alt="" />
        <h2>{course.title}</h2>
        <h4>{course.description}</h4>
        <h5>by - {course.createdBy}</h5>
        <h5>Duration- {course.duration} weeks</h5>
        <Link to={`/lectures/${course._id}`}><h2> Lectures </h2></Link>
         </div>}
       </>
    );
}