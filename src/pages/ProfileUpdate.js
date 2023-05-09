import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState({ name: '', bio: '', mobile: '', email: '', address:'', accountNo:'', ifscCode:'', GPay:'', aadhar:''});
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);
//after updation navigate user
const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      // Make API call to update profile using profileData state
      const response = await axios.post('https://gspserver.onrender.com/api/users/profileUpdate', profileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setErrorMessage('');
      console.log(response.data.message);
      setIsSubmitting(false);
      alert(response.data.message);
      setProfileData('');
      navigate('/dashboard');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || 'Error updating profile');
      } else {
        setErrorMessage('Error updating profile');
      }
    }
  };
const handleProfile =()=>{
    navigate('/profile');
}
  if (!isAuthenticated) {
    return <p>Please log in to update your profile</p>;
  }

  return (
    <div className='form_container'>
        <div className="form_data">
        <form onSubmit={handleSubmit}>
            <div className="form_input">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" value={profileData.name} onChange={handleInputChange} />
            </div>
        <div className="form_input">
            <label htmlFor="bio">Bio:</label>
            <textarea id="bio" name="bio" value={profileData.bio} onChange={handleInputChange}></textarea>
        </div>
        <div className="form_input">
            <label htmlFor="mobile">Mobile:</label>
            <input type="tel" id="mobile" name="mobile" value={profileData.mobile} onChange={handleInputChange} />
        </div>
        <div className="form_input">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={profileData.email} onChange={handleInputChange} />
        </div>
        <div className="form_input">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" value={profileData.address} onChange={handleInputChange} />
        </div>
        <div className="form_input">
            <label htmlFor="accountNo">Bank Account No:</label>
            <input type="text" id="accountNo" name="accountNo" value={profileData.accountNo} onChange={handleInputChange} />
        </div>
        <div className="form_input">
            <label htmlFor="ifscCode">IFSC CODE:</label>
            <input type="text" id="ifscCode" name="ifscCode" value={profileData.ifscCode} onChange={handleInputChange} />
        </div>
        <div className="form_input">
            <label htmlFor="GPay">Google Pay:</label>
            <input type="text" id="Gpay" name="GPay" value={profileData.GPay} onChange={handleInputChange} />
        </div>
        <div className="form_input">
            <label htmlFor="aadhar">Aadhar No.:</label>
            <input type="text" id="aadhar" name="aadhar" value={profileData.aadhar} onChange={handleInputChange} min={12} max={12}  />
        </div>

      {errorMessage && <p>{errorMessage}</p>}

      <button className='form_button' type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>

          <button className='form_button' onClick={handleProfile}>Profile</button>
    </form>
        </div>

    </div>
    
  );
};

export default ProfileUpdate;
