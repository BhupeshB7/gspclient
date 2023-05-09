import React from 'react'

const handleHomePage =()=>{
  window.location.href ='/';
}
const Error = () => {
  return (
    <>
    <img src="https://img.freepik.com/free-vector/404-error-isometric-illustration_23-2148509538.jpg?size=626&ext=jpg&ga=GA1.1.1717175719.1670043102&semt=ais" height={"400px"} width={"380px"} alt="Page Not Found..." />
    <div className="d-flex" style={{justifyContent:"center"}}>

    <button className='btn btn-success' onClick={handleHomePage}>Home Page</button>
    </div>
    </>
  )
}

export default Error