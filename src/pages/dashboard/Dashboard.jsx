import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useContext } from "react";
import { CourseContext } from "../../context/CourseContext";
import CourseCard from "../../components/courseCard/CourseCard";
export default function Dashboard(){

    const {mycourse}=useContext(CourseContext);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        if (mycourse) {
            setLoading(false); // Stop loading once courses are fetched
        }
    }, [mycourse]);
    //console.log(mycourse);
    return(
        <div className="student-dashboard">
        <h2>All Enrolled Courses</h2>
        <div className="dashboard-content">
            {loading ? (
                <p>Loading...</p> // Loading indicator
            ) : mycourse && mycourse.length > 0 ? (
                mycourse.map((e) => <CourseCard key={e._id} course={e} />)
            ) : (
                <p>No Course Enrolled Yet</p>
            )}
        </div>
    </div>
    );
}
