import React, { useContext, useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import ReCAPTCHA from "react-google-recaptcha";
export default function Verify(){
    const [otp,setOtp]=useState("");//create the use state for the otp and pass empty sting firstofall
    const [show,setShow]=useState(false);
    // const {btnLoading , VerifyOtp}= useContext(UserContext);
    // const navigate=useNavigate();


    // const submitHandeler= async(e)=>{
    //     e.preventDefault();
    //     await VerifyOtp(Number(otp),navigate);
    const [error, setError] = useState(null); // State for error handling

    const { btnLoading, verifyOtp } = useContext(UserContext); // Destructure context values
    const navigate = useNavigate();

    function onChange(value) {
        console.log("Captcha value:", value);
        setShow(true);
      }

    const submitHandeler = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) { // Simple validation for OTP length
            setError("OTP must be 6 digits");
            return;
        }

        setError(null); // Clear error if validation passes

        try {
            console.log("Submitting OTP:", otp);
            await verifyOtp(Number(otp), navigate); // Convert OTP to number and verify
            console.log("Verification successful");
        } catch (err) {
            console.error("Error during OTP verification:", err);
            setError("Verification failed. Please try again."); // Display error if verification fails
        }
    };

    
    return(
        <div className="auth-page">
            <div className="auth-form">
                <h2>Verify Account </h2>
                <form onSubmit={submitHandeler}>
                    <label htmlFor="otp">Otp</label>
                    <input type="number" value={otp} onChange={(e)=>setOtp(e.target.value)} required />
                    {error && <p className="error-message">{error}</p>} {/* Show error message if exists */}
                    <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={onChange}/>
                    { show && (<button disabled={btnLoading} type="submit" className="comman-btn">{btnLoading?"Please Wait...":"Verify"}</button>)}
                </form>
                <p>
                    Go to <Link to="/login">Login</Link> page
                </p>
            </div>
        </div>
    );
};