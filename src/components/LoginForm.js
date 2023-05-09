import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
const LoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Code to send login request to backend and get token
  //   // Code to save token to local storage
  //   fetch('https://gspbackend.onrender.com/api/users/login', {
  //     method: 'POST',
  //     body: JSON.stringify({ userId, password }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // Save token to local storage
  //       const token = data.token;
  //       const expirationDate = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
  //       localStorage.setItem('token', token);
  //       localStorage.setItem('expirationDate', expirationDate);
  //       // Redirect to home page
  //       // window.location.href = '/';
  //       navigate('/');
  //       alert("User Login!")
  //     })
  //     .catch((err) => console.error(err));
  // };
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ userId, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          // Save token to local storage
          const token = data.token;
          const expirationDate = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
          localStorage.setItem('token', token);
          localStorage.setItem('expirationDate', expirationDate);
          setLoggedIn(true);
        }
      })
      .catch((err) => console.error(err));
  };
  if (loggedIn) {
    navigate('/');
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="userId">User ID</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
