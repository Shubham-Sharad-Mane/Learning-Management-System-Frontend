import React, { useContext } from "react";
import "./paymentSuccess.css";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const PaymentSuccess=()=>{
    const params=useParams();
    const {user}=useContext(UserContext);
    return(
        <div className="payment-success-page">
            {
                user && <div className="success-message">
                    <h2>Payment Successful</h2>
                    <p>Your Course Description has been activated </p>
                    <p> Reference no - {params.id}</p>
                    <Link to={`/${user._id}/dashboard`} className="comman-btn">Go to Dashboard </Link>
                </div>
            }
        </div>
    );
}

export default PaymentSuccess;