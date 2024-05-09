import React from 'react'
import  { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./login.css"
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    // Perform signup logic
    // After signup is complete, navigate to another page
    navigate('/another-page');

try {
  const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    console.log(response);
      navigate('/');
  }
  // console.log(response)
  // Redirect to another page or handle success
  else
  navigate('/another-page');
} catch (error) {
  console.error(error);
}
};
  return(
    <div className="container">
    
    <form onSubmit={handleSubmit}>
    <h1>Log in</h1>
        <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1"/>
    </div>
    <button type="submit" className="btn btn-primary">Sign-in</button>        
    </form>
    </div>
)};
export default Login;