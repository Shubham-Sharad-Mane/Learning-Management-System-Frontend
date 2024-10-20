import React, { useContext } from "react";
import "./comman.css";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaBook } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { UserContext, UserData } from "../../context/UserContext";

export default function Sidebar(){ //we use the childern as a props because we want to wrap it 
    const {user}=useContext(UserContext);
    return (
        <div className="sidebar">

        <ul>
            <li>
                <Link to={`/admin/dashboard`} >
                    <div className="icon">
                        <AiFillHome/>
                    </div>
                    <span>Home</span>
                </Link>
            </li>
           
                <li>
                <Link to={`/admin/course`} >
                        <div className="icon">
                            <FaBook/>
                        </div>
                        <span>Courses</span>
                    </Link>
                </li>
            
           {
            user && user.mainrole === "superadmin" && (
            <li>
            <Link to={`/admin/users`} >
                    <div className="icon">
                        <FaUserAlt />
                    </div>
                    <span>Users</span>
                </Link>
            </li>
            )
        }
            <li>
            <Link to={`/account`} >
                    <div className="icon">
                        <AiOutlineLogout />
                    </div>
                    <span>Logout</span>
                </Link>
            </li>
        </ul>

        </div>
    );
}