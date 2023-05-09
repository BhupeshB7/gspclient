
import React, { useState } from 'react';
import logo from '../assets/logo-2.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = ({setToken}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  //for Login Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
// const BASE_URl = process.env.BASE_URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('https://gspserver.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid userId or password');
      }

      const { token } = await response.json();
      
      localStorage.setItem('token', token);
      // token will expire in 24 hours
      localStorage.setItem('tokenExpire', Date.now() + 86400000 ); //86400000
      //  setToken(token);
      setError(null);
      setIsSubmitting(false);
      toast.success('LogIn successfully!')
      // redirect to dashboard page
      window.location.href = '/dashboard';

    } 
    
    catch (error) {
      setError(error.message);
      alert(error.message)
    }

    
  };
  
const handleSignUp = ()=>{
  window.location.href = '/register';
}
const handleForgotPassword = ()=>{
  window.location.href = '/password-reset';
}
  return (
    <div className="form_container mt-5" style={{marginRight:"5px"}}>
    <form onSubmit={handleSubmit}>
      <div className="formInput">
      <div className="form_section" style={{marginTop:"15px"}}>
            <div className="img"><img src={logo} height={"110px"} width={"80px"} alt="Logo" /></div>
            <div className="content">
               <div className="heading" style={{fontSize:"20px",fontWeight:"bold", marginTop:"16px", marginBottom:"-15px",color:"gray"}}>Welcome Back</div> <hr />
               <div className="body" style={{fontSize:"17px", marginTop:"-15px"}}>Login to continue</div>
            </div>
        </div>
      {error && <div className="error text-danger">{error}</div>}
      <div className="form_input">
      <label>userId:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
     <div className="form_input">
     <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
     </div>
    
      <button type="submit" className='form_button' >
      {isSubmitting? 'processing...':'Login'}
      </button>
      <p onClick={handleSignUp}>Don't have an account yet? <a href='/register' style={{textDecoration:"underline", color:"gray"}}>SignUp</a> </p>
      <h6 onClick={handleForgotPassword} style={{textDecoration:"underline"}}>Forgot Password</h6>
      </div>

    </form>
    <ToastContainer/>
    </div>
  );
};
export default LoginForm;