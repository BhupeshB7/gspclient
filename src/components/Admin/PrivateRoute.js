// import { Route, useNavigate } from 'react-router-dom';

// import jwt from 'jsonwebtoken';


// const PrivateRoute = ({ component: Component, ...rest }) => {
// const token = localStorage.getItem('token');

// const isAuthenticated = token && jwt.decode(token).role === 'admin';
// const navigate = useNavigate();
// return (
// <Route
// {...rest}
// render={(props) => {
// return isAuthenticated ? <Component {...props} /> : navigate('/admin-panel');
// }}
// />
// );
// };

// export default PrivateRoute;

// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';

// function PrivateRoute({ children, isLoggedIn, ...rest }) {
//   return (
//     <Route {...rest} element={isLoggedIn ? children : <Navigate to
//         ="/login" replace />} />
//         );
//         }
        
//         export default PrivateRoute;

// import React from 'react'
// import { Outlet } from 'react-router-dom'

// const PrivateRoute = () => {
//   return (
//     <>
//     <div>PrivateRoute</div>
//     <Outlet/>
//     </>
//   )
// }

// export default PrivateRoute



import React from 'react';
import { Navigate, Route } from 'react-router-dom';
// import { useAuth } from './AuthContext';
import {useAuth} from './useAuth'
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && user.isAdmin ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
