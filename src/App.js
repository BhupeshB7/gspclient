import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
// import UserDisplay from './components/UserDisplay';
import './App.css'
import LoginPage from './components/LoginPage';
import Dashboard from './components/UserDisplay';
import ForgotPassword from './components/ForgotPassword';
import PasswordReset from './components/PasswordReset';
import Error from './pages/Error';
import Login from './components/Admin/Login';
// import PrivateRoute from './components/Admin/PrivateRoute';
import AdminDashboard from './components/Admin/AdminDashboard';
import Task from './components/Task';
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate';
// import UserTask from './pages/UserTask';
import Home from './components/Home';
import Withdrawal from './pages/Withdrawal';
// import PrivateRoute from './components/Admin/PrivateRoute';

function App() {

  
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);


  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route  path="/register" element={<RegisterForm/>} />

        {/* <PrivateRoute path="/admin/dashboard" isLoggedIn={isLoggedIn}>
          <AdminDashboard onLogout={handleLogout} />
        </PrivateRoute>
        <Route path="/admin-login">
          <Login onLogin={handleLogin} />
        </Route> */}
        {/* <Route path="/admin" element={<PrivateRoute  />}>
          <Route path='dashboard' element={<AdminDashboard/>} />
        </Route> */}
        <Route path="/admin-login" element={<Login />} />
          <Route  path="/login" element={<LoginPage/>} LoginPage={setToken}/>
          {/* <Route  path="/admin-login" element={<Login/>} /> */}
          <Route  path="/dashboard" element={<Dashboard/>}/>
          <Route  path="/task" element={<Task/>}/>
          <Route  path="/admin/dashboard" element={<AdminDashboard/>} />
          {/* <Route path="/admin/dashboard" component={AdminDashboard} /> */}
           {/* Profile Route */}
          <Route path='/profile' element={<Profile/>} token={token}/>
          <Route path='/withdrawal' element={<Withdrawal/>} token={token}/>
          <Route path='/profile-update' element={<ProfileUpdate/>} />

          <Route  path="/forgotpassword/:id/:token" element={<ForgotPassword/>} />
          <Route  path="/password-reset" element={<PasswordReset/>} />
          {/* <Route  path="/userTask" element={<UserTask/>} /> */}
          <Route  path="*" element={<Error/>} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
