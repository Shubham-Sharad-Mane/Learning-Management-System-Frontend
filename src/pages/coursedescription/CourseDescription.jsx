import React, { useContext, useEffect, useState } from "react"; //imorting from the react
import "./courseDescription.css"; //import the css for the coursedescription
import { useNavigate, useParams } from "react-router-dom"; 
import { CourseContext, CourseData } from "../../context/CourseContext";
import {server} from "../../main"; //importing the server api from the main file
import axios from "axios"; //importing the axious for the featchin the apis 
import toast from "react-hot-toast"; //importing the toast for the flash messages
import { UserContext, UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription=({user})=>{
    const [loading,setLoading]=useState(false); //useState for loading at the time of payment
    // const {featchUser}=UserData();
    const {featchUser}=useContext(UserContext); //getting the all information about the user
    const params=useParams(); //using the params 
    const navigate=useNavigate(); //use the navigate
    const {fetchCourse,course,featchCourses,fetchMyCourse}=useContext(CourseContext);

    useEffect(()=>{
        fetchCourse(params.id) //all courses ae featched from the id of user
    },[]);

    const checkoutHandeler= async()=>{
        const token=localStorage.getItem("token");
        setLoading(true);
        const {data:{order}}=await axios.post(`${server}/api/course/checkout/${params.id}`,{},{
            headers:{
                token,
            }
        });

        const options={
            key: process.env.Razorpay_key, // Enter the Key ID generated from the Dashboard
    amount: order.price, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "E Learning", //your business name
    description: "Learn With Us",
    //image: "https://example.com/your_logo",
    order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

    handler: async function(response){
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=response;
        try{
            const {data}= await axios.post(`${server}/api/verification/${params.id}`,{
                razorpay_order_id,razorpay_payment_id,razorpay_signature, 
            },{
                headers:{
                    token,
                },
            });

            await featchUser();
            await featchCourses();
            await fetchMyCourse();
            toast.success(data.message);
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`)
        }catch(error){
            toast.error(error.response.data.message);
            setLoading(false);
        }

    },

    theme:{
        color: "#8a4baf",
    },
        };

        const razorpay=new window.Razorpay(options);
        razorpay.open();
    }
    return (
        <>
     {
        loading ? (<Loading/>) : (
            <>
            {
             course && <div className="course-description">
                 <div className="course-header">
                     <img src={`${server}/${course.image}`} alt="" className="course-image"/>
                     <div className="course-info">
                         <h2>{course.title}</h2>
                         <p>Instructor - {course.createdBy}</p>
                         <p>Duration -{course.duration} weeks </p>
     
                     </div>
                     
                 </div>
                 <p>{course.description}</p>
                 <p>Let's get started with course At ₹{course.price}</p>
                     {
                         user && user.subscription.includes(course._id)? (<button onClick={()=>navigate(`/course/study/${course._id}`)} className="comman-btn"> Study </button>) : (<button onClick={checkoutHandeler} className="comman-btn"> Buy Now </button>)
                     }
             </div>
            }
            </>
        )
     }
     </>
    );
}
export default CourseDescription;