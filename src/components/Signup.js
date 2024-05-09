import  { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import React from 'react';
//import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Hello")
        try {
            const response = await fetch('http://localhost:5000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Failed to signup');
            }
            // console.log(response)
            // Redirect to another page or handle success
            navigate('/another-page');
        } catch (error) {
            alert("User already exist");
            console.error(error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Sign up</h1>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="e-mail address" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
                <h2>Already a user?</h2>
                <Link to="/login" className="btn">Login</Link>
            </form>
        </div>
    );
}

export default Signup;
