import { useContext, createContext, useState, useEffect } from "react"; //import the all required things from the react
import axios from "axios"; //import the axious for the featching the api from the server
import { server } from "../main"; //import the server from the main file where server is defined
import toast, {Toaster} from "react-hot-toast"; //import the toaster from the react-hot-toast and pass this below the {childeren } for the message

const UserContext = createContext(); // Create the context

const UserContextProvider = ({ children }) => {
//create the use state
const [user , setUser]=useState([]); //create the usestate for the user
const [isAuth, setIsAuth]=useState(false); //for the authentication
const [btnLoading , setBtnLoading]=useState(false);//for loading the button
const [loading , setLoading]=useState(true);

//now crete the user login function
    async function loginUser( email,password,navigate,featchCourses){
        setBtnLoading(true);
        try{//we use the axious for featching the api from the server

            const { data }=await axios.post(`${server}/api/user/login`,{email,password}); //get the data from the the server localhost wher we pass the our backend link and also provide the route url for perticular request
                                                                        //and we pass the email and password which is input of user and that comes from the props
            toast.success(data.message); //messaage is comes from the backend where we defined and that message is displayed when it is sucess
            localStorage.setItem("token",data.token)//now store the token to the localstorage

            setUser(data.user);
            setIsAuth(true); //because sucess message we goted
            setBtnLoading(false);
            navigate("/"); //then user nevigate to the home page
            featchCourses();
        }catch(err){ //if some error accures in login then set the states false
            setBtnLoading(false);
            setIsAuth(false);
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message); // Show server error message
            } else {
                toast.error("Something went wrong!"); // Generic error message
            }
        }
    }
    //now create the user register function 
    async function registerUser( name,email,password,navigate){
        setBtnLoading(true);
        try{//we use the axious for featching the api from the server

            const { data }=await axios.post(`${server}/api/user/register`,{name,email,password}); //get the data from the the server localhost wher we pass the our backend link and also provide the route url for perticular request
                                                                        //and we pass the email and password which is input of user and that comes from the props
            toast.success(data.message); //messaage is comes from the backend where we defined and that message is displayed when it is sucess
            localStorage.setItem("activationToken",data.activationToken)//now store the token to the localstorage

            // setUser(data.user);
            // setIsAuth(true); //because sucess message we goted
            setBtnLoading(false);
            navigate("/verify"); //then user nevigate to the verify page
        }catch(err){ //if some error accures in login then set the states false
            setBtnLoading(false);
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message); // Show server error message
            } else {
                toast.error("Something went wrong!"); // Generic error message
            }
        }
    }

    //now we create the function for the verify otp
    async function verifyOtp(otp,navigate){
        setBtnLoading(true);
        const activationToken=localStorage.getItem("activationToken");
        try{
            const { data }=await axios.post(`${server}/api/user/verify`,{otp,activationToken});
            toast.success(data.message);
            navigate("/login");
            localStorage.removeItem("activationToken");
            // setBtnLoading(false);
        }catch(err){
            setBtnLoading(false);
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message); // Server error message
            } else {
                toast.error("OTP verification failed. Please try again."); // Generic error message
            }
            console.error("Verification error:", err); 
    } finally {
        setBtnLoading(false);
    
        }
    }

    // create the function for featching the user 
    async function featchUser(){   //to acess the user all info
        try{

            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            const {data}=await axios.get(`${server}/api/user/me`,{ //pass the token and get the all information about the user from the route 
                headers:{
                    token:localStorage.getItem("token"), //taking the token value from the local storage
                }
            });
            console.log(data.user);
            setUser(data.user);
            setIsAuth(true);
            setLoading(false);

        }catch(err){
            console.error("Fetch User Error:", err); //for the debugging
            setLoading(false);
        }
    }
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (token) {
            featchUser(); // Only fetch user data if a token exists
        } else {
            setLoading(false); // Set loading to false if no token exists
        }
    },[])
    return (
        <UserContext.Provider value={{ user,setUser,setIsAuth,isAuth,loginUser,btnLoading ,loading ,registerUser,verifyOtp,featchUser }}>
            {children}
            <Toaster /> 
        </UserContext.Provider>
    );
};

const UserData = () => {
    const { user } = useContext(UserContext); // Get the context value
    return <div>{user}</div>; // Display the user value
};

// Explicitly export UserContext, UserContextProvider, and UserData
export { UserContext, UserContextProvider, UserData };
