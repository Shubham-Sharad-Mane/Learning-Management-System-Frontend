import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import { server } from "../../main";
import toast from "react-hot-toast";

export default function Lectures({user}){
    const [lectures,setLectures]=useState([]);//creatin the usestate for the all lectures
    const [lecture,setLecture]=useState([]);//for playing the each lecture

    const [loading , setLoading]=useState(true);//for the loding
    const [lecloading , setLecLoading]=useState(false); //for the time for featching the lecture
    const [show,setShow]=useState(false);//this state is created for when admin click on add lecture then one form is created for the add lecture

    const params=useParams();
    const navigate=useNavigate();
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [video,setVideo]=useState("");
    const [videoPrev,setVideoPrev]=useState("");
    const [btnLoading,setBtnLoading]=useState(false);

    if(user && user.role !== "admin" && !user.subscription.includes(params.id)) return navigate("/");

    //now creating the function for the feactching the all lectures
    async function fetchLectures(){
        try{

            const {data}= await axios.get(`${server}/api/lectures/${params.id}`,{//using the axios fetch the server route for the geting the lectures and pass the token in the request for accessing 
                headers:{
                    token:localStorage.getItem("token"),
                }
            });
            setLectures(data.lectures);
            setLoading(false);


        }catch(error){
            console.log(error);
            setLoading(false);
        }
    }

    //now create the function for the feactching the single lecture
    async function fetchLecture(id){
        setLecLoading(true);
        try{

            const {data}= await axios.get(`${server}/api/lecture/${id}`,{//using the axios fetch the server route for the geting the single lecture and pass the token in the request for accessing 
                headers:{
                    token:localStorage.getItem("token"),
                }
            });
            console.log(data); // Check the entire response object
            setLecture(data.lecture);
            setLecLoading(false);

        }catch(error){
            console.log(error);
            setLecLoading(false);
        }
    }

    const changeVideoHandeler=e=>{
        const file=e.target.files[0];
        const reader=new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend=()=>{
            setVideoPrev(reader.result);
            setVideo(file);
        }
    }
    const submitHandeler=async(e)=>{

        setBtnLoading(true);
        e.preventDefault();

        const myform=new FormData();

        myform.append("title",title);
        myform.append("description",description);
        myform.append("lecture",video);

        try{

            const {data}=await axios.post(`${server}/api/course/${params.id}`,myform,{
                headers:{
                    token:localStorage.getItem("token"),
                }
            });

            toast.success(data.message);
            setBtnLoading(false);
            setShow(false);
            fetchLectures();
            setTitle("");
            setDescription("");
            setVideo("");
            setVideoPrev("");

        }catch(error){
            toast.error(error.response.data.message);
            setBtnLoading(false);

        }
    };

    const deleteHandeler=async(id)=>{

        if(confirm("Are You Sure You Want To delete This Lecture !")){

            try{

                const {data}=await axios.delete(`${server}/api/lecture/${id}`,{
                    headers:{
                        token:localStorage.getItem("token"),
                    }
                });

                toast.success(data.message);
                fetchLectures();
            }catch(error){

                toast.error(error.response.data.message);
            }

        }

    }

    useEffect(()=>{
        fetchLectures()
    },[params.id]);

    useEffect(() => {
        console.log(lecture.video); // This should output the video URL
      }, [lecture]);
    return (
        <>

        {
            loading?<Loading/>:
            <>
            
            <div className="lecture-page">

            <div className="left">

            {
                lecloading?<Loading /> : 
                <>
                {
                    lecture.video? 
                    <>
                    <video src={`${server}/${lecture.video.replace(/\\/g, '/')}`} width={"100%"} controls controlsList="nodownload noremoteplayback" disablePictureInPicture disableRemotePlayback autoPlay></video>
                    <h1>{lecture.title}</h1>
                    <h3>{lecture.description}</h3>
                    </> 
                    : <h1>Please select a lecture </h1>
                }
                </>
            }

            </div>
            <div className="right">

            {
                user && user.role ==="admin" && (<button onClick={()=>setShow(!show)} className="comman-btn">{show? "Close":"Add Lecture +"}</button>)
            }

            {
                show && <div className="lecture-form">

                    <h2>Add Lecture</h2>
                    <form onSubmit={submitHandeler}>
                        <label htmlFor="text">Title</label>
                        <input type="text" value={title} onChange={e=>setTitle(e.target.value)} required />

                        <label htmlFor="text">Description</label>
                        <input type="text" value={description} onChange={e=>setDescription(e.target.value)} required />

                        <input type="file" placeholder="choose video" onChange={changeVideoHandeler} required />

                        {
                            videoPrev && (
                                <video src={videoPrev} alt="" width={300} controls ></video>
                            )
                        }

                        <button disabled={btnLoading} type="submit" className="comman-btn">{btnLoading? "Please Wait..." :"Add" }</button>
                    </form>

                </div>
            }

            
            {//this conditation for maping the lecture 

            lectures && lectures.length>0 ? lectures.map((e,i)=>(

                <div key={e._id}>
                <div onClick={()=>fetchLecture(e._id)} key={i} className={`lecture-number ${lecture._id == e._id && "active"}`}>

                    {i+1}. {e.title}
                </div>
                {
                    user && user.role==="admin" && <button onClick={()=>deleteHandeler(e._id)} className="comman-btn" style={{background:"red"}}>Delete {e.title}</button>
                }
                </div>

            )): <p>No Lectures Yet!</p>

            }


            </div>

            </div>
            
            </>
        }

        </>
    );
}