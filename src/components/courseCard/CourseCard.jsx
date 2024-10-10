import React, { useContext } from "react";
import "./courseCard.css";
import { UserContext, UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { server } from "../../main";
import toast from "react-hot-toast";
import axios from "axios";
import { CourseContext } from "../../context/CourseContext";

    const CourseCard=({course})=>{
        //console.log(course);
        const navigate=useNavigate();
        const {isAuth,user}=useContext(UserContext);
        const {featchCourses}=useContext(CourseContext);
        //const {user}=UserData();
        console.log(user);

        const deleteHandeler =async (id)=>{

            if(confirm("Are You Sure You Want To Delete This Course ! ")){ //this is javaScript methos for confirm message 

                try{

                    const {data}=await axios.delete(`${server}/api/course/${id}`,{
                        headers:{
                            token:localStorage.getItem("token"),
                        }
                    });
    
                    toast.success(data.message);
                    featchCourses();
    
                }catch(error){
                    toast.error(error.response.data.message);
                }
        }
    }

        return (
            <div className="course-card">
                <img src={`${server}/${course.image}`} className="course-image" alt=""/>
                <h3>{course.title}</h3>
                <p>Instructor- {course.createdBy}</p>
                <p>Duration- {course.duration} weeks</p>
                <p>Price- ₹{course.price}</p>
                {
                    isAuth?
                    
                    
                    ( <>
                    {user && user.role !== "admin"?<>
                    {
                        user.subscription.includes(course._id)? (<button onClick={()=>navigate(`/course/study/${course._id}`)}  className="comman-btn" > Study  </button>)
                        :( <button onClick={()=>navigate(`/course/${course._id}`)}  className="comman-btn" >Get Started </button>)
                    }
                     </>:<button onClick={()=>navigate(`/course/study/${course._id}`)} className="comman-btn" > Study </button>}
                      </>)
                    :(
                        <button onClick={()=>navigate("/login")}  className="comman-btn" >Get Started </button>
                    )
                }
                <br/>

                {
                    user && user.role === "admin" && <button onClick={()=>deleteHandeler(course._id)} className="comman-btn" style={{background: "red"}}> Delete </button>
                }
                
            </div>
        );
    };

    export default CourseCard;
    