import React, { useState } from 'react'
import './Home.css'
import {ImLocation, ImWhatsapp} from 'react-icons/im'
import {IoCall} from 'react-icons/io5'
import {MdEmail} from 'react-icons/md'
// import ReCAPTCHA from 'react-google-recaptcha'
// for Accordian or Faq
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MdExpandMore } from 'react-icons/md'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha'

const Home = () => {

  const [verified, setVerified] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState('');
  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    if (!recaptchaValue) {
      toast.error('Please complete the reCAPTCHA.');
      return;
    }

    const dataToSubmit = {
      name,
      email,
      message,
    };

    try {
      const response = await axios.post('https://gspserver.onrender.com/api/send-email', dataToSubmit);

      if (response.status === 200) {
        toast.success('Contact us form submitted!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast.error('Oops, something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Oops, something went wrong. Please try again.');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      toast.error('Please enter your name.');
      isValid = false;
    }

    if (!email) {
      toast.error('Please enter your email address.');
      isValid = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error('Please enter a valid email address.');
        isValid = false;
      }
    }

    if (!message) {
      toast.error('Please enter a message.');
      isValid = false;
    }

    return isValid;
  };
function onChange(){
  setVerified(true);
}
  return (
    <>
        {/* Navbar */}
        <div>
                <nav className="navbar navbar-expand-lg ">
                    <div className="container-fluid ms-3">
                        <a className="navbar-brand text-bold" href="/" style={{color:"#30ABE2",fontWeight:"bolder"}}>GSP</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                           {/* <span ><img src={navIcon} alt="" /></span> */}
                        </button>
                        <div className=" collapse navbar-collapse" id="navbarNav">
                            <ul className="ms-auto navbar-nav ">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href='/login'>Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href='/register'>Get Started</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            {/* Navbar End... */}
            {/* Home section */}
            <div className="home-content">

{/* Home Section */}
<div className='home-section'>
    <div className="home-container d-flex ">
        <h1>Welcome to</h1>
        <h2>GLOBAL SUCCESS POINT</h2>
        <h6>Please, Login to continue...</h6>
        <div>
            <a className="home-button" href='/register'>Get Started →</a>
        </div>
    </div>
</div>
</div>
            {/* Home section-End */}
{/* About-section */}
<div className="about-content">
            <div className="about-container head-container">
                <h3 style={{textAlign:"center"}}>About Us</h3>
                <div className="row about-row-section">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-5 about-col-section-1 about-col-section">
                    <p> we are team of dedicated of  &nbsp;&nbsp;&nbsp;  &nbsp;professionals  who are passionate about  &nbsp;&nbsp; helping people achieves their dream through our &nbsp;unique MLM program. Our mission is to empower individuals and communities with the tools and resources they need to succed in the ever-evolving world of entrepreneurship.</p>
                      
                         </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 about-col-section-2 about-col-section" >
                        {/* <img src="https://img.freepik.com/free-vector/online-world-concept-illustration_114360-1092.jpg?size=338&ext=jpg&ga=GA1.2.1717175719.1670043102&semt=sph" alt="mlm_aboutImage" width="45%" height="30%" style={{borderRadius:"8px"}} /> */}
                        <img src="https://img.freepik.com/free-vector/connected-world-concept-illustration_114360-4240.jpg?w=740&t=st=1679376370~exp=1679376970~hmac=e5c464e99187d34b73fd468730aec3a32f4c951233aa80fda94f8e18c9b2c654" alt="mlm_aboutImage" width="80%" height="60%" style={{borderRadius:"8px"}} />
                   
                    </div>
                </div>
                <div className="row about-row-section flex-column-reverse flex-md-row ">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 about-col-section-3 about-col-section">
                     <img src="https://img.freepik.com/free-vector/online-world-concept-illustration_114360-1092.jpg?size=338&ext=jpg&ga=GA1.2.1717175719.1670043102&semt=sph" alt="mlm_aboutImage" width="80%" height="60%" style={{borderRadius:"8px"}} />
                        {/* <img src="https://img.freepik.com/free-vector/connected-world-concept-illustration_114360-4240.jpg?w=740&t=st=1679376370~exp=1679376970~hmac=e5c464e99187d34b73fd468730aec3a32f4c951233aa80fda94f8e18c9b2c654" alt="mlm_aboutImage" width="50%" height="40%" style={{borderRadius:"8px"}} /> */}
                   
                         </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 about-col-section-2 about-col-section" >
                    <p className='p'> At our MLM company, we are passionate about providing our members with the tools and resources they need to succeed. We believe that when individuals come together to work towards a common goal, amazing things can happen.</p>
                   
                    </div>
                </div>
            </div>
        </div>
        {/* About-section-End */}
        {/* Contact-us-section */}
        <div className="head-container">

<h3>Contact Us</h3>
</div>
<div className="container" style={{marginBottom:"40px"}}>
  <div className="row contact-row" style={{marginTop:"20px"}}>
    <div className="col-sm-12 col-md-6 col-lg-5 contact-section-1">
      <h3>Get In Touch...</h3>
      {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae deleniti illum labore, voluptatum iusto dolor? Totam vitae ratione consectetur necessitatibus?</p> */}
     <div className="contact-us">
      <div className="row" >
      <div className="contact-icon col-2"><ImLocation className='contact-svg'/></div>
      <div className="contact-details col-10">
        <a  href ="/"className="p-text">Patna, zero mile 800007</a>
        {/* <a href="tel:+91 8581869783" className="p-text">+91 8581869783</a> */}
       </div>
      </div>
      <div className="row" >
      <div className="contact-icon col-2"><IoCall className='contact-svg'/></div>
      <div className="contact-details col-10">
      <a href="tel:+91 7562951168" className="p-text">+91 7562951168</a>
      </div>
      </div>
      <div className="row" >
      <div className="contact-icon col-2"><MdEmail className='contact-svg'/></div>
      <div className="contact-details col-10">
      <a href="mailto:globalsuccess080@gmail.com" className="p-text">globalsuccess080@gmail.com</a>
      </div>
      </div>
      <div className="row">
      <div className="contact-icon col-2"><ImWhatsapp className='contact-svg'/></div>
      <div className="contact-details col-10">
      <a href="https://wa.me/917562951168/?text=Hi!%20I'm%20interested%20to%20know%20more." className='p-text' target="_blank" rel="noreferrer">WhatsApp</a>
     
      </div>
      </div>

      
     </div>
    </div>
    <div className="col-sm-12 col-md-6 col-lg-7 contact-section-2 form_container">
   
          <form onSubmit={handleSubmit}>
            <div className="formInput" style={{marginTop:"10px"}}>
      <div className='form_input'style={{marginTop:"10px"}}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className='form_input'style={{marginTop:"10px"}}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className='form_input'style={{marginTop:"10px"}}>
        <label htmlFor="message"style={{marginBottom:"10px"}}>Message:</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>
      <ReCAPTCHA  className='mt-3 ' sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' onExpired={() => setRecaptchaValue('')}
onErrored={() => setRecaptchaValue('')} onChange={handleRecaptchaChange}/>
      <button className='form_button' type="submit">Send</button>
      </div>
    </form>

      <ToastContainer/>
    </div>
  </div>
</div>
        {/* Contact-us-section-End */}
{/* Faq */}
<h4 style={{ textAlign: "center", marginBottom: "20px", color:"#8186d5" }}>Frequently Asked Question</h4>

            <div className="container" style={{display:'flex', justifyContent:"center" }}>
                <div className='Faq' style={{ width: "90vw"}}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header" style={{marginTop:"10px"}}
                        >
                            <Typography>Why GSP? or IT is trustable or not!</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                               Global Successpoint is 100% genuine platform , where you can earn by watching video daily.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel2a-content"
                            id="panel2a-header" style={{marginTop:"10px"}}
                        >
                            <Typography> I can withdraw without any direct.</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                yes, you can withdraw 200 without any direct.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel2a-content"
                            id="panel2a-header" style={{marginTop:"10px"}}
                        >
                            <Typography>Minimum withdrawal Amount.</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                500
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"style={{marginTop:"10px", marginBottom:"10px"}}
                        >
                            <Typography>what is the minimum direct for, i need to make withdrawal!</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                               2
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
{/* Faq-end */}
        {/* Footer */}
        <footer className="footer-20192">
  <div className="site-section">
    <div className="container-fluid" >
       
      <div className="row footer-row">
        <div className="col-sm ">
          <a href="/"className="footer-logo" style={{fontWeight:"700"}}> GSP</a>
          <p className="copyright">
            <small>© 2022</small>
          </p>
        </div>
        {/* <div className="col-sm">
          <h3>Customers</h3>
          <ul className="list-unstyled links">
            <li><a href="/">Buyer</a></li>
            <li><a href="/">Supplier</a></li>
          </ul>
        </div> */}
        <div className="col-sm">
          <h3>Quick Links</h3>
          <ul className="list-unstyled links">
            <li><a href="/about">About us</a></li>
            {/* <li><a href="/contact">Careers</a></li> */}
            <li><a href="/contact">Contact us</a></li>
          </ul>
        </div>
        
        <div className="col-sm">
          <h3>Further Information</h3>
          <ul className="list-unstyled links">
            <li><a href="/term">Terms &amp; Conditions</a></li>
            <li><a href="/policy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="col-sm">
          <h3>Login to continue</h3>
          <ul className="list-unstyled links mt-4">
            <li><a href="/login" className='login-button' style={{color:"#fff"}}>Login</a></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h3>Follow us</h3>
          <ul className="list-unstyled social">
            <li><a href="/"><span className="icon-facebook" /></a></li>
            <li><a href="/"><span className="icon-twitter" /></a></li>
            <li><a href="/"><span className="icon-linkedin" /></a></li>
          </ul>
        </div>

       
      </div>
      <div className="row">
      <div className="col-sm">
          <ul className="list-unstyled links mt-4">
            <li className='text-center mt-4'> GSP &copy; All Right Reserved</li> </ul>
        </div>
      </div>
    </div>
    
  </div>

</footer>
    </>
  )
}

export default Home