import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const PasswordReset = () => {

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value)
    }

    const sendLink = async (e) => {
        e.preventDefault();

        if (email === "") {
            // toast.error("email is required!", {
            //     position: "top-center"
            // });
            alert('Email is Required!');
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else {
            const res = await fetch("https://gspserver.onrender.com/api/auth/sendpasswordlink", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (data.status === 201) {
                setEmail("");
                setMessage(true)
            } else {
                // toast.error("Invalid User",{
                //     position: "top-center"
                // })
                alert('Invalid User or User Does not Exists')
            }
        }
    }

    return (
        <>
            <div className='form_container mt-5'>
                <div className="form_data">
                    <div className="form_heading">
                        <h4 className='text-center mb-3' style={{fontWeight:"bold", color:"gray"}}>Forgot Password</h4>
                    </div>

                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>pasword reset link send Succsfully in Your Email</p> : ""}
                    <form>
                        <div className="form_input">
                            <label htmlFor="email" style={{fontSize:"17px", marginTop:"20px"}}>Email</label>
                            <input type="email" value={email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>

                        <button className='form_button' onClick={sendLink}>Send</button>
                        <p className='text-gray'>Note:- wait 10-15 seconds, for send Link.</p>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    )
}

export default PasswordReset