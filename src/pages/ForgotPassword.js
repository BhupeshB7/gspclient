import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const otpInputRef = useRef(null);
  const newPasswordInputRef = useRef(null);

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('https://gspserver.onrender.com/api/auth/forgot-password', { email });
      setIsEmailSent(true);
      toast.success('OTP sent to email');
      otpInputRef.current.focus();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('https://gspserver.onrender.com/api/auth/reset-password', { email, otp, newPassword });
      toast.success('Password updated successfully');
      setEmail('');
      setOtp('');
      setNewPassword('');
      setIsEmailSent(false);
      newPasswordInputRef.current.focus();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      {!isEmailSent && (
        <form onSubmit={handleEmailSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <button type="submit">Send OTP</button>
        </form>
      )}
      {isEmailSent && (
        <form onSubmit={handleOtpSubmit}>
          <label>
            OTP:
            <input type="number" value={otp} onChange={(event) => setOtp(event.target.value)} required ref={otpInputRef} />
          </label>
          <label>
            New Password:
            <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.valuerequired)} ref={newPasswordInputRef} />
</label>
<button type="submit">Reset Password</button>
</form>
)}
<ToastContainer />
</div>
);
}

export default ForgotPassword;
