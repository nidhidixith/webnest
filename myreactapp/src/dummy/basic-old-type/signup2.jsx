
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000/api/';

const Signup = () => {
      <h1>Sign Up</h1>
      //const navigate = useNavigate();
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [email, setEmail] = useState('');

   const handleSignup = async () => {
    try {
        const response = await axios.post(`${API_BASE_URL}signup/`, { username, password, email });
        //const token = response.data.token;  // Fetch the token from the response
        console.log('Signup successful');
        //console.log('Received token:', token);
        //navigate('/complete_profile');
    } catch (error) {
        console.error('Error during signup:', error.response.data.error);
    }
    };

  return (
    <div>
      <h1>User Registration</h1>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <button onClick={handleSignup}>Sign Up</button>

    </div>
  );
};

export default Signup;



