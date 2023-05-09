
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const getTokenExpireTime = () => {
  const tokenExpire = localStorage.getItem('tokenExpire');
  return tokenExpire ? parseInt(tokenExpire) : null;
};

const isTokenExpired = () => {
  const expireTime = getTokenExpireTime();
  return expireTime ? expireTime < Date.now() : true;
};

const AdminDashboard = () => {
  const [isTokenValid, setIsTokenValid] = useState(true);

  //show user data state
  const [showData, setShowData] = useState(false);
  // hide user data state
  const [showUserData, setShowUserData] = useState(false);
  //show user data state
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  // hide user data state
  const [showUserWithdrawal, setShowUserWithdrawal] = useState(false);
  //for deposit
  const [depositusers, setDepositUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchDepositQuery, setSearchDepositQuery] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://gspserver.onrender.com/api/deposit/depositusers?search=${searchDepositQuery}`);
        setDepositUsers(response.data);
        setTotalPages(Math.ceil(response.headers['x-total-count'] / 20)); // assuming 20 items per page
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [page]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const [showDeposit, setShowDeposit] = useState(false);

  const handleDeposit =()=>{
    setShowDeposit(!showDeposit);
  }
   //for Task management Start
    const [tasks, setTasks] = useState([]);
      const [title, setTitle] = useState('');
      const [videoLink, setVideoLink] = useState('');
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        const newTask = { title, videoLink };
        try {
          const response = await axios.post('https://gspserver.onrender.com/api/task/tasks', newTask);
          setTasks([...tasks, response.data]);
          setTitle('');
          setVideoLink('');
          alert('Task Added SuccessFully!');
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleDelete = async (taskId) => {
        try {
          await axios.delete(`https://gspserver.onrender.com/api/task/tasks/${taskId}`);
          setTasks(tasks.filter((task) => task._id !== taskId));
          alert('Task Deleted SuccessFully!');
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'title') {
          setTitle(value);
        } else if (name === 'videoLink') {
          setVideoLink(value);
        }
      };
    
      const fetchTasks = async () => {
        try {
          const response = await axios.get('https://gspserver.onrender.com/api/task/tasks');
          setTasks(response.data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
   //for Task management Done
  //show user data state
  const [showTask, setShowTask] = useState(false);
  // hide user data state
   const [showUserTask, setShowUserTask] = useState(false);
  useEffect(() => {
    if (isTokenExpired()) {
      setIsTokenValid(false);
      // redirect to homepage
      window.location.href = '/admin-login';
    }
  }, []);
   

  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  // const [transactionNumber, setTransactionNumber] = useState('');
  const [transaction, setTransaction] = useState("");

  useEffect(() => {
    axios.get('https://gspserver.onrender.com/api/withdrawals')
      .then(response => setWithdrawalRequests(response.data))
      .catch(error => console.log(error));
  }, []);

  // const handleUpdate = (id) => {
  //   axios.put(`http://localhost:5000/api/withdrawals/${id}`, { status: 'approved', transactionNumber })
  //     .then(response => {
  //       const updatedRequests = withdrawalRequests.map(request => {
  //         if (request._id === id) {
  //           return response.data;
  //         }
  //         return request;
  //       });
  //       setWithdrawalRequests(updatedRequests);
  //     })
  //     .catch(error => console.log(error));
  // }

 
  const handleApprove = async (id) => {
    try {
      const response = await axios.put(`https://gspserver.onrender.com/api/withdrawals/${id}`, { status: 'approved', transaction });
      setWithdrawalRequests(withdrawalRequests.map(request => request._id === id ? response.data : request));
      setTransaction("");
    } catch (error) {
      console.log(error);
    }
  };




 
    //User Management
    const [users, setUsers] = useState([]);

    // useEffect(() => {
      const getUsers = async () => {
        const response = await axios.get('https://gspserver.onrender.com/api/admin/api/users');
        setUsers(response.data);
      };
      // getUsers();
    // }, []);
    useEffect(() => {
      getUsers();
    }, []);
    const handleSearch = async () => {
      // Call the API endpoint with the search query parameter
      const response = await fetch(`https://gspserver.onrender.com/api/admin/api/users?search=${searchQuery}`);
      const data = await response.json();
      setUsers(data);
    }; 
    const handleDeleteUser = async (id) => {
      await axios.delete(`https://gspserver.onrender.com/api/admin/api/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
    };

      // show the user data function
      const handleShow =()=>{
        setShowData(!showData);
      }
  const handleClick = () => {
    handleShow();
    toggleContentVisibility();
  };
  const toggleContentVisibility = () => {
    setShowUserData(!showUserData);
  };

      // show the user Task function
      const handleTask =()=>{
        setShowTask(!showTask);
      }
  const handleClickTask = () => {
    handleTask();
    toggleContentVisibilityTask();
  };
  const toggleContentVisibilityTask = () => {
    setShowUserTask(!showUserTask);
  };

      // show the user data function
      const handleShowWithdrawal =()=>{
        setShowWithdrawal(!showWithdrawal);
      }
  const handleClickWithdrawal = () => {
    handleShowWithdrawal();
    toggleContentVisibilityWithdrawal();
  };
  const toggleContentVisibilityWithdrawal = () => {
    setShowUserWithdrawal(!showUserWithdrawal);
  };
  //For User Activation
  
  const handleActivate = async (id) => {
    try {
    await axios.patch(`https://gspserver.onrender.com/api/active/${id}/activate`);
    getUsers();
    alert('User activated.');
    } catch (error) {
    console.error(error);
    }
    };
    
    const handleDeactivate = async (id) => {
    try {
    await axios.patch(`https://gspserver.onrender.com/api/active/${id}/deactivate`);
    getUsers();
    alert('User deactivated.');
    } catch (error) {
    console.error(error);
    }
    };
  return (
    <div>
      {isTokenValid ? (
        <>
        <div className="container-fluid admin-dashboard">

       
        
        {/* <button onClick={handleLogout}>Logout</button> */}
{/*  */}
<nav className="navbar navbar-expand-lg navbar-light bg-light ">
  <div className="navbar-brand" >GSP</div>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav  ms-auto">
    <li className="nav-item">
      <button className="text-center btn btn-primary" onClick={handleClickWithdrawal}>{showUserWithdrawal ? 'Hide WithDrawal' : 'Show Withdrawal'}</button>
        </li>
      <li className="nav-item">
      <button className="text-center btn btn-primary" onClick={handleClickTask}>{showUserTask ? 'Hide Task' : 'Show Task'}</button>
        </li>
      <li className="nav-item">     
      <button className="text-center btn btn-primary" onClick={handleClick}>{showUserData ? 'Hide User' : 'show user'}</button>
      </li>
    </ul>
  </div>
</nav>
{/*  */}
<div className="admin_heading">
  <div className="admin_content" style={{marginTop:"7px", display:"flex", justifyContent:"space-between", margin:"auto", width:"80%"}}>
   <h6 className='text-secondary' style={{cursor:"pointer"}} onClick={handleDeposit}>{showDeposit ? 'Hide deposit':'Show Deposit'} </h6>
   <h6 className='text-secondary' style={{cursor:"pointer"}} onClick={handleClickWithdrawal}>{showUserWithdrawal ? 'Hide WithDrawal' : 'Show Withdrawal'}</h6>
   <h6 className='text-secondary' style={{cursor:"pointer"}} onClick={handleClickTask}>{showUserTask ? 'Hide Task' : 'Show Task'}</h6>
   <h6 className="text-secondary" style={{cursor:"pointer"}} onClick={handleClick}>{showUserData ? 'Hide User' : 'show user'}</h6>
    </div>
</div>
{/* <h1>Welcome to the Admin Dashboard!</h1> */}
{/*  */}
        {/*  */}
{showDeposit && 
<>
<h5 className='text-secondary'>All Depoist</h5>
<h1>User List</h1>
      {/* <ul>
        {depositusers.map(user => (
          <li key={user._id}>
            <p>Name: {user.name}</p>
            <p>Transaction ID: {user.transactionId}</p>
            <p>User ID: {user.userID}</p>
            <img src={`http://localhost:5000/${user.image}`} alt={user.name} />
          </li>
        ))}
      </ul> */}
          <div>
      <h1>Deposit Users</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={searchDepositQuery}
        onChange={(e) => setSearchDepositQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Name</th>
            <th>Transaction ID</th>
            <th>User ID</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {depositusers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.transactionId}</td>
              <td>{user.userID}</td>
              <td>
                <img src={`https://gspserver.onrender.com/${user.image}`} alt="Deposit user" width="200" height="200" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>

</>}
  {showData &&   <div className="container-fluid">  
        <h1 className='text-center'>User Management</h1>
      <input
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button className=' btn btn-primary' onClick={handleSearch} style={{marginLeft:"10px"}}>Search</button>
      <table className="table table-striped table-light"> 
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Sponsor Id</th>
            <th>User Id</th>
            <th>Status</th>
            <th>Action</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.sponsorId}</td>
              <td>{user.userId}</td>
              <td>{user.is_active ? 'Active' : 'Deactive'}</td>
              <td>
                {user.is_active ? (
                  <button className='btn btn-dark' onClick={() => handleDeactivate(user._id)}>
                  Deactivate
                  </button>
                  ) : (
                  <button className='btn btn-secondary' onClick={() => handleActivate(user._id)}>
                  Activate
                  </button>
                  )}
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDeleteUser(user._id)}>
                Delete user
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      </div>}
      {/* For Task */}
      </div>
        {/*  */}
        {showTask && 
      //     <div className="container-fluid">  
      //   <h3 className='text-center' style={{fontWeight:"bold", color:"gray"}}>User Task</h3>
      //           <div className="form_container">
      //                 <form>
      //                   <div className="formInput">
      //                     <div className="form_input">
      //                       <label>Task</label>
      //                       <input type="text" />
      //                     </div>
      //                     <div className="form_input">
      //                       <label>Task Description</label>
      //                       <input type="text" />
      //                     </div>
      //                     <button className='form_button'>Add Task</button>
      //                   </div>
      //                 </form>
      //           </div>
      // </div>
      <>
      <h1>Admin Page</h1>
      <div className="form_container">

      <form onSubmit={handleSubmit}>
        <div className="formInput">

        <div className='form_input'>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" value={title} onChange={handleInputChange} required />
        </div>
        <div className='form_input'>
          <label htmlFor="videoLink">Video URL:</label>
          <input type="text" name="videoLink" value={videoLink} onChange={handleInputChange} required />
        </div>
        <button type="submit" className='form_button' >Add Task</button>
        </div>
      </form>
      </div>
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id}>
              <div>{task.title}</div>
              <div>{task.videoLink}</div>
              <button type="button" onClick={() => handleDelete(task._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
      <button type="button" onClick={fetchTasks}>
        Refresh
      </button>
    </>
      }
        {/* For Withdrawal */}
        {showWithdrawal && 
          <div className="container-fluid">  
        <h3 className='text-center' style={{fontWeight:"bold", color:"gray"}}>WithDrawal History</h3>
                <div className="form_container">
                      <form>
                        <div className="formInput">
                          <div className="form_input">
                            <label>Account Number</label>
                            <input type="text" />
                          </div>
                          <div className="form_input">
                            <label>IFSC Code</label>
                            <input type="text" />
                          </div>
                          <div className="form_input">
                            <label>User ID</label>
                            <input type="text" />
                          </div>
                          <div className="form_input">
                            <label>Transaction Id</label>
                            <input type="text" />
                          </div>
                          <button className='form_button'>WithDraw</button>
                        </div>
                      </form>
                </div>
      <h1>Withdrawal Requests</h1>
      {/* <table className='table table-bordered '>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Transaction Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {withdrawalRequests.map(request => (
            <tr key={request._id}>
              <td>{request.userId}</td>
              <td>{request.amount}</td>
              <td>{request.status}</td>
              <td>{request.transactionNumber}</td>
              <td>
                {request.status === 'pending' && (
                  <div>
                    <input type="text" placeholder="Transaction Number" value={transactionNumber} onChange={(e) => setTransactionNumber(e.target.value)} />
                    <button onClick={() => handleUpdate(request._id)}>Approve</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
       <table className='table table-bordered'>
        <thead>
          <tr>
            <tr>S.No.</tr>
            <th>User ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Transaction</th>
            <th>TransactionId</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {withdrawalRequests.map((request, index )=> (
            <tr key={request._id}>
              <td>{index + 1}</td>
              <td>{request.userId}</td>
              <td>{request.amount}</td>
              <td>{request.status}</td>
              <td>{request.transactionNumber}</td>
              <td>
                <input type="text" value={transaction} onChange={e => setTransaction(e.target.value)} />
              </td>
              <td>
                {request.status === 'pending' && (
                  <button  className='btn btn-danger' onClick={() => handleApprove(request._id)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>}
        </>
        
      ) : (
        <h1>Your session has expired. Please log in again.</h1>
      )}
    </div>
  );
};

export default AdminDashboard;

