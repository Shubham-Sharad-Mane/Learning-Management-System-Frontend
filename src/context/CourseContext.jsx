import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios"; 
import { server } from "../main";
const CourseContext=createContext();

const CourseContextProvider=({children})=>{
    const [courses,setCourses]=useState([]); //for featching the courses
    const [course,setCourse]=useState([]); //for the featchCourse description
    const [mycourse,setMycourse]=useState([]);//for the all courses in the dashboard
    async function featchCourses(){
        try{
            const {data}=await axios.get(`${server}/api/course/all`); //featching the get all courses route 
            console.log("API Response:", data);
            // const courses=data.allcourses;
            // console.log(courses);

            if (data && data.courses) {
                setCourses(data.courses); // Setting courses state
                console.log("Courses fetched:", data.courses);
            } else {
                console.log("No courses found in API response:", data);
            }
        }catch(err){
            console.error("Error fetching courses:", err);
        }

       // console.log(courses ? courses.length : "courses is undefined");
    }
    //create the route when user click on the get started button
    async function fetchCourse(id){

        try{
            const {data}=await axios.get(`${server}/api/course/${id}`);
            setCourse(data.course);
            console.log(data.course);

        }catch(err){
            console.log(err);
        }

    }
    
    //we create the function for the dashboard courses
     async function fetchMyCourse(){
        try{

            const token = localStorage.getItem("token");
            if (!token) {
                console.log("No token found in localStorage");
                return;
            }
            console.log(token);
            const {data}=await axios.get(`${server}/api/mycourses`,{
                headers:{
                     token:localStorage.getItem("token"),
                },
            });
            console.log(data);
            console.log("Fetched courses:", data.courses);
            setMycourse(data.courses);

            console.log(data.courses);
            


        }catch(error){
            console.log(error);
        }
     } 

    useEffect(()=>{
        featchCourses();
        fetchMyCourse();
    },[]);
    return <CourseContext.Provider value={{courses, featchCourses , fetchCourse,course , mycourse , fetchMyCourse}}>{children}</CourseContext.Provider>;
};

const CourseData =()=>useContext(CourseContext);
export { CourseContextProvider , CourseData , CourseContext};