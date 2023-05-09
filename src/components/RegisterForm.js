import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import ReCAPTCHA from 'react-google-recaptcha';
import logo from '../assets/logo-1.png'
import congrats from '../assets/congrats.png'
import './LoginSuccess.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    sponsorId: ''
  });

  const navigate = useNavigate();
  function onClickHome(){
      navigate("/");
  }
  function onLogin(){
      navigate("/login");
  }
  const [userId, setUserId] = useState('');
  // const [emailId, setEmailId] = useState('');
  const [errors, setErrors] = useState('');
  //show password
  const [showPassword, setShowPassword] = useState(false);
  const [verified, setVerified] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  //for Form Validation
  const [focused, setFocused] =useState(false);
  const handleFocus = (e) =>{
    setFocused(true);
  }
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //captcha verification
  function onChange(value) {
    // console.log("Captcha value:", value);
    setVerified(true);
  }
  //for registration Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const ref = searchParams.get('ref');

  //   if (ref) {
  //     handleChange(ref);
  //   }
  // }, [location.search]);
// Get the ref parameter from the URL
const searchParams = new URLSearchParams(window.location.search);
const ref = searchParams.get('ref');

// If the ref parameter is present, set the sponsorId state with its value
if (ref) {
  formData.sponsorId = ref;
}
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post('https://gspserver.onrender.com/api/users/register', formData);
      setUserId(res.data.userId);
      setFormData({
        name: '',
        email: '',
        password: '',
        mobile: '',
        sponsorId: ''
      });
      // setErrors({});
      console.log(res.data);
      setIsSubmitting(false);
      alert("User Registered SucceccFully!");
    }

    catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Email or mobile number already in use.');
      }
      else if (error.response && error.response.status === 404) {
        toast.error('Please Enter Valid SponserID');
      }
      else {
        setErrors('An error occurred. Please try again later.');
       toast.error('An error occurred. Please try again later.');
    
      }
    }


  };

  return (

    <>
    {!userId ?(<div className="form_container">
    <div className="form_data">
      
    <form onSubmit={handleSubmit}>
      <div className="formInput">
        <div className="form_section">
          <div className="img"><img src={logo} height={"100px"} width={"100px"} alt="Logo" /></div>
          <div className="content">
          <div className="heading" style={{fontSize:"20px",fontWeight:"bold", marginTop:"16px", marginBottom:"-15px",color:"gray"}}>Welcome</div> <hr />
          <div className="body" style={{fontSize:"17px", marginTop:"-15px"}}>Register to continue</div>
          </div>
        </div> 
      <div className="form_input">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder='Enter Your Name'
          className={`form-input ${errors.name ? 'is-invalid' : ''}`}
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form_input">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder='Enter Your Email'
          // className={`form-input ${errors.email ? 'is-invalid' : ''}`}
          value={formData.email}
          onChange={handleChange}
          required
          onBlur={handleFocus}
          focused={focused.toString()}
        />
        <span>Enter correct Email ID</span>
      </div>
      <div className="form_input">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className='password_input-container'>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password "
            name="password"
            placeholder='Enter Password'
            // className={`form-input input-field ${errors.password ? 'is-invalid' : ''}`}
            value={formData.password}
            onChange={handleChange}
            minLength="6"
            // required
            onBlur={handleFocus}
            focused={focused.toString()}
            pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$" 
          />
          <button className='password-button' onClick={togglePasswordVisibility} >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
          <span>Password must contain 1 Capital, 1 Small letter, 1number and 1 special character.</span>
        </div>
      </div>
      <div className="form_input">
        <label htmlFor="mobile" className="form-label">
          Mobile
        </label>
        <input 
          type="text"
          id="mobile"
          name="mobile"
          placeholder='Enter Mobile No'
          // className={`form-input ${errors.mobile ? 'is-invalid' : ''}`}
          value={formData.mobile}
          onChange={handleChange}
          pattern="[0-9]{1}[0-9]{9}"
          onBlur={handleFocus}
          focused={focused.toString()}
          // required
        />
        <span>Mobile No should be 10 Digit, Or only number</span>
      </div>
      <div className="form_input">
        <label htmlFor="sponsorId" className="form-label">
          Sponsor ID
        </label>
        <input
          type="text"
          id="sponsorId"
          name="sponsorId"
          placeholder='Enter Sponsor ID'
          className={`form-input ${errors.sponsorId ? 'is-invalid' : ''}`}
          value={formData.sponsorId}
          onChange={handleChange}
          required={!location.search}
          readOnly={location.search ? true : false} defaultValue={location.search.substring(1)}
        />
      </div>
      <div className="captcha">

        {/* <ReCAPTCHA sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' onChange={onChange} /> */}
      </div>

      <button type="submit"  className=" form_button">
        {isSubmitting? 'processing...':'Register'}
      </button>
      </div>
    </form>
    <ToastContainer/>
    {/* {userId && (
      <div className="user-display">
        <h2>User ID: {userId}</h2>
        <h3>Email Id: {emailId}</h3>
      </div>
    )}  */}
   
   </div>
  </div>
  ):(

    <div className="row loginSuccessCard mt-5">
                <div className="col-10 col-sm-10 col-md-6 col-lg-5 ">

                    <div className="loginCardContainer  ">
                        <div className="card-circle">
                            <h2>✓</h2>
                        </div>
                        <div className="cardImage">
                            <img src={congrats} height="200px" alt="" />
                        </div>
                        <div className="user-details">

                            <h6 className='text-center text-success'>You have Successfully Completed your Registration process.</h6>
                            <h6 className='text-center text-secondary' style={{fontWeight:"bold"}}>Your  UserId: {userId}</h6>
                        </div>
                        <div className="loginSuccessButton">
                        <button className="m-4 btn btn-secondary " onClick={onClickHome}>Go to Home</button>
                        {/* <button className='btn btn-outline-secondary' onClick={() => navigator.clipboard.writeText(userId)} >
                          Copy userId
                         </button> */}
                         <button className='btn btn-outline-secondary' onClick={() => {
                                navigator.clipboard.writeText(userId);
                                    alert('User Id is copied!');
                             }}>copy userId</button>
                        <button className="m-4 btn btn-primary "  onClick={onLogin}>Login</button>
                        </div>

                    </div>
                </div>
            </div>
  )}
    </>
  );
};

export default RegisterForm;
