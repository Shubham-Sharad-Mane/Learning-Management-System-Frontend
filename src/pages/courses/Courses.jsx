import React, { useContext } from "react";
import "./courses.css";
import { CourseContext } from "../../context/CourseContext";
import CourseCard from "../../components/courseCard/CourseCard"; //importing the course card for showing the all courses and its layout formate
export default function Courses(){
    const {courses}=useContext(CourseContext);
   // console.log(courses.length);
    return(
        <div className="courses">
            <h2>Available Courses</h2>
            <div className="course-container">
                {
                    courses && courses.length>0?courses.map((e)=>(
                        <CourseCard key={e._id} course={e}/>
                    )):<p>No Courses Yet!</p>
                }
            </div>
        </div>
    );
}