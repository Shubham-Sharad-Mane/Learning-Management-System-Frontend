import React from "react";
import "./footer.css";
import { FaLinkedin } from "react-icons/fa";
import { AiFillTwitterSquare } from "react-icons/ai";
import { FaGithubSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

export default function Footer(){
    return (
        <footer>
            <div className="footer-content">
                <p>
                    &copy; 2024 Your E-Learning Platform. All rights reserved.<br/>
                    Made With ❤️ <a href="">Shubham Sharad Mane</a>

                </p>
                <div className="social-links">
                    <a href="https://www.linkedin.com/in/shubham-sharad-mane/"><FaLinkedin /></a>
                    <a href="https://github.com/Shubham-Sharad-Mane"><FaGithubSquare /></a>
                    <a href=""><AiFillTwitterSquare /></a>
                    <a href=""><AiFillInstagram /></a>
                </div>
            </div>
        </footer>
    );
}