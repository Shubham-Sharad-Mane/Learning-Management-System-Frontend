import React from "react"; //import the react from react
import "./App.css"; //import the css for the app.css
import {BrowserRouter , Routes ,Route, Navigate} from "react-router-dom"; //import from the react router dom
import Home from "./pages/home/Home"; //import the home page
import Header from "./components/header/Header"; //import the headers
import Login from "./pages/auth/Login"; //import the login 
import Register from "./pages/auth/Register"; //import the register
import Verify from "./pages/auth/Verify"; //import the verify function
import Footer from "./components/footer/Footer"; //import the footer page 
import About from "./pages/about/About"; //import the aboute page 
import Account from "./pages/account/Account"; //import the account function
import { useContext } from 'react'; //import the useContext from the reaact
import { UserContext, UserData } from './context/UserContext'; //importing the UserContext From the Context
import Loading from "./components/loading/Loading"; //importing the loader function
import Courses from "./pages/courses/Courses"; //import the all courses from the coursese
import CourseDescription from "./pages/coursedescription/CourseDescription"; //import the coursedesccription for the checkout the courses
import PaymentSuccess from "./pages/paymentsuccess/PaymentSuccess"; //import the payment sucess function for the after completing the all payments 
import Dashboard from "./pages/dashboard/Dashboard"; //importing the dashboard components for the my coureses
import CourseStudy from "./pages/coursestudy/CourseStudy"; //importing the course study components for the study the course
import Lectures from "./pages/lectures/Lectures"; //import the function for the all lecturs activity
import AdminDashboard from "./admin/dashboard/AdminDashboard"; //import the admin dashboard
import AdminCourses from "./admin/courses/AdminCourses"; 
import AdminUsers from "./admin/users/AdminUsers";
const App=()=>{
  const { user,isAuth,loading } = useContext(UserContext); // Directly use useContext to access UserContext
  console.log(user);
  // const isAuth=UserData;
  return (
    <>
    {loading?<Loading/>:(
    <BrowserRouter>
    <Header isAuth={isAuth}/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      {/* <Route path="/courses" element={<Courses/>}/> */}
      <Route path="/course/all" element={isAuth ? <Courses /> : <Navigate to="/login" />}/>
      <Route path="/account" element={isAuth?<Account user={user}/>:<Login/>}/>
      <Route path="/login" element={isAuth?<Home/>:<Login/>}/>
      <Route path="/register" element={isAuth?<Home/>:<Register/>}/>
      <Route path="/verify" element={isAuth?<Home/>:<Verify/>}/>
      <Route path="/course/:id" element={isAuth?<CourseDescription user={user}/>:<Login/>}/>
      <Route path="/payment-success/:id" element={isAuth?<PaymentSuccess user={user}/>:<Login/>}/>
      <Route path="/:id/dashboard" element={isAuth?<Dashboard user={user}/>:<Login/>}/>
      <Route path="/course/study/:id" element={isAuth?<CourseStudy user={user}/>:<Login/>}/>
      <Route path="/lectures/:id" element={isAuth?<Lectures user={user}/>:<Login/>}/>
      <Route path="/admin/dashboard" element={isAuth?<AdminDashboard user={user} />:<Login/>}/>
      <Route path="/admin/course" element={isAuth?<AdminCourses user={user} />:<Login/>}/>
      <Route path="/admin/users" element={isAuth?<AdminUsers user={user} />:<Login/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
)}
    </>

  )
}
export default App;