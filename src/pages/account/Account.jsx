import React, { useContext } from "react"; // Import useContext
import { UserContext } from "../../context/UserContext"; // Import UserContext
import { MdDashboard } from "react-icons/md"; //import the icon from the reaact icon
import { IoMdLogOut } from "react-icons/io"; //import the icon from the react icon
import "./account.css"; //import the css for account component
import toast from "react-hot-toast"; //importing the toast for thr flash messages
import { useNavigate } from "react-router-dom"; //import the navigating
export default function Account({user}){
    console.log(user);
    const {setIsAuth , setUser}=useContext(UserContext);
    const navigate=useNavigate();
    const LogoutHandeler=()=>{
        localStorage.clear();
        setUser([]);
        setIsAuth(false);
        toast.success("Logged Out Success");
        navigate("/login");
    }
    return (
        <div>
            {
                user && (
                    <div className="profile">
                <h2>MY Profile</h2>
                <div className="profile-info">
                    <p>
                        <strong>Name- {user.name} </strong>
                    </p>
                    <p>
                        <strong>Email- {user.email} </strong>
                    </p>

                    <button onClick={()=>navigate(`/${user._id}/dashboard`)} className="comman-btn"><MdDashboard />Dashboard</button>
                    <br/>
                    {
                        user.role ==="admin" && (<button onClick={()=>navigate(`/admin/dashboard`)} className="comman-btn"><MdDashboard />Admin Dashboard</button>)
                    }
                    <br/>
                    <button className="comman-btn" onClick={LogoutHandeler} style={{background:"red"}}><IoMdLogOut />Logout</button>

                </div>

            </div>
                )
            }
        </div>
    );
}