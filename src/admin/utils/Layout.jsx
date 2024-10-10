import React from "react";
import "./comman.css";
import Sidebar from "./Sidebar";


export default function Layout({children}){ //we use the childern as a props because we want to wrap it 
    console.log("Layout children:", children);
    return (
        <div className="dashboard-admin">
             <Sidebar/>
             <div className="content">{children}</div>
             </div>
    );
}