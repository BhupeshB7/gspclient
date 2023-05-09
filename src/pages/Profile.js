
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import spinner from '../assets/spinner.gif'
function Profile() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('token');
//for navigate user
const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://gspserver.onrender.com/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log(result); // check the response data
      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, [token]);

  if (isLoading) {
    return <h6 className='text-center' style={{marginTop:"50px"}}>Loading... <img src={spinner} alt="spinner"height="50px" width="50px" /></h6>;
  }
//for user go to dashboard
const handleDashBoard = ()=>{
  navigate('/dashboard');
}
// for user go to profile Update
const handleProfile = () =>{
  navigate('/profile-update');
}
  return (
    <div>
      {token ? ( <div className="dashboard-profile-center">
          <div className="user-profile">
          <div className="container" style={{marginTop:"20px"}}>
        <h5 className='text-center text-secondary'>Welcome, {data.name}</h5>
          <table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">{data.name}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Email:</td>
      <td>{data.email}</td>
    </tr>
    <tr>
      <td>Mobile:</td>
      <td>{data.mobile}</td>
    </tr>
    <tr>
      <td>SponsorId:</td>
      <td>{data.sponsorId}</td>
    </tr>
    <tr>
      <td>UserId:</td>
      <td>{data.userId}</td>
    </tr>
    <tr>
      <td>Bio:</td>
      <td>{data.bio}</td>
    </tr>
    <tr>
      <td>Address:</td>
      <td>{data.address}</td>
    </tr>
    <tr>
      <td>Account No:</td>
      <td>{data.accountNo}</td>
    </tr>
    <tr>
      <td>IFSC CODE:</td>
      <td>{data.ifscCode}</td>
    </tr>
    <tr>
      <td>Google Pay:</td>
      <td>{data.GPay}</td>
    </tr>
    <tr>
      <td>Aadhar No:</td>
      <td>{data.aadhar}</td>
    </tr>
    <tr>
      <td>Profile Created:</td>
      <td>{data.createdAt}</td>
    </tr>
  </tbody>
</table>
<div className="container ">
  <button className='form_button' onClick={handleDashBoard}>DashBoard</button>
  <button className='form_button' onClick={handleProfile}>ProfileUpdate</button>
</div>
      </div>

          </div>
        </div>):(
          <h3>Re login to continue...</h3>
        )}
    </div>
  );
}

export default Profile;
