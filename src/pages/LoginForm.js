import React, { useState } from "react";
import axios from "axios";
import {  useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Layout from "../../components/Layout/Layout";
import { useAuth } from "../context/auth";
const Login = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    //custom hooks call
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    //form section    
    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("https://gspserver.onrender.com/auth/logins", {
                userId,
                password,
            });
            if (res && res.data.success) {
              alert(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(location.state || "/");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    };
    return (
        <>
            <div className=" register container md-12 lg-6 ">
                <h4 className='text-center'>Register</h4>


                <form onSubmit={handleSubmit}>


                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your Email' value={userId} onChange={(e) => setUserId(e.target.value)} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="button" className="btn btn-success mb-3" onClick={()=>{navigate('/forgotPassword')}} >Fogot Password...</button> <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login
