

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import'./Task.css'
function Task() {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState([]);

  const token = localStorage.getItem('token');
//for navigate user
useEffect(() => {
  const fetchUserId = async () => {
    try {
      const response = await fetch('https://gspserver.onrender.com/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      const data = await response.json();
      console.log(data);
      setData(data);
      const userId = data?.userId;
      if (userId) {
        setUserId(userId);
      } else {
        throw new Error('User ID is missing from response data');
      }
    } catch (error) {
      console.error(error);
    }
  };
  fetchUserId();
}, [token]);
//for task 
//

const [videos, setVideos] = useState([]);
const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
const [remainingTime, setRemainingTime] = useState(20);
const [isTaskComplete, setIsTaskComplete] = useState(false);

// Fetch the videos from the server when the component mounts
useEffect(() => {
  async function fetchVideos() {
    const response = await fetch('https://gspserver.onrender.com/api/task/tasks');
    const videos = await response.json();
    // Get watched videos from local storage or set them to an empty array
    const watchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || [];
    // Lock the watched videos
    const lockedVideos = videos.map(video => ({
      ...video,
      locked: watchedVideos.includes(video._id)
    }));
    setVideos(lockedVideos);
  }
  fetchVideos();
}, []);

// Start the timer when the user clicks on the "Start" button
function handleStart() {
  const intervalId = setInterval(() => {
    setRemainingTime(prevRemainingTime => prevRemainingTime - 1);
  }, 1000);
  setTimeout(() => {
    clearInterval(intervalId);
    setRemainingTime(20);
    // Lock the current video after it has been watched
    const updatedVideos = videos.map((video, index) => {
      if (index === currentVideoIndex) {
        return {
          ...video,
          watched: true,
          locked: true
        };
      }
      return video;
    });
    setVideos(updatedVideos);
    // Save the watched video to local storage
    const watchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || [];
    watchedVideos.push(updatedVideos[currentVideoIndex]._id);
    localStorage.setItem('watchedVideos', JSON.stringify(watchedVideos));
    setCurrentVideoIndex(prevIndex => prevIndex + 1);
    updateWallet();
  }, 20000);
}

// Play the video when the user clicks on it
function handleVideoClick(videoIndex) {
  const video = document.getElementById(`video-${videoIndex}`);
  video.play();
}
async function updateWallet(userId) {
  try {
    const response = await axios.post(`https://gspserver.onrender.com/api/updateWallet/${userId}`);
    console.log(response.data);
    alert("Wallet updated successfully!");
    // navigate to dashboard
    window.location.href = '/dashboard';
  } catch (error) {
    console.error(error);
    // alert('Wallet not updated!');
  }
}

  // Render the current video and remaining time
  function renderCurrentVideo() {
    const { _id, videoLink, title, locked } = videos[currentVideoIndex];
    return (
      <div className="task_container-2" style={{display:"flex", justifyContent:"center"}}>
      <div className='task_container'>
        <h4 style={{color:" rgb(186, 183, 183)", textAlign:"center"}}>{title}</h4>
        <div className="video" style={{marginLeft:"15px"}}>
        <iframe id={`video-${currentVideoIndex}.`} title={_id} src={videoLink} onClick={() => handleVideoClick(currentVideoIndex)} height="190px" width="300px"/>
       </div>
        {locked ? (
          <p>Your Task is complete .</p>
        ) : (
          <div>
            <button className='form_button' onClick={handleStart}>Start</button>
            <p>Time remaining: {remainingTime} seconds</p>
          </div>
        )}
      </div>
      </div>
    );
  }
  
// Check if the task is complete and update the user's wallet
useEffect(() => {
  if (currentVideoIndex === videos.length && isTaskComplete) {
    updateWallet(userId);
    setIsTaskComplete(true);
  }
}, [currentVideoIndex, isTaskComplete, videos.length]);

  // Render the task complete message
  function renderTaskComplete() {
    
    return (
      <div>
        <h2>Task Complete!</h2>
        <button onClick={() => updateWallet(userId)}>Update Wallet</button>
      </div>
    );
  }
    

//


const handleDashBoard = ()=>{
  window.location.href = '/dashboard'
}
  return (
    <div className="task_content mt-3" style={{display:"flex", justifyContent:"center", width:"380px"}}>
    <div >
      <button className='btn btn-primary' onClick={handleDashBoard}>DashBoard</button>
      {token && data && data.is_active
        ? <div>
          {/* <h5 style={{color:"gray"}}>  Hello, {data.name} </h5> */}
       <>
     <>
     {/*  */}
     <div>
      {currentVideoIndex < videos.length ? renderCurrentVideo() : renderTaskComplete()}
    </div>
     {/*  */}
     </>
       
       </>
        </div>
        : <div>You do not have access to this content.</div>
      }
    </div>
    </div>
  );
}



export default Task

