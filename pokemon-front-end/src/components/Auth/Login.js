import React, { useState, useEffect } from 'react';
import '../App.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Similar to componentDidMount and componentDidUpdate:
//   useEffect(() => {
    
//   });

  return (
    <div className="loginContainer">
      <div className="login">
        Login
        <input onChange={(e) => setUsername(e.target.value)} />
        <input onChange={(e) => setPassword(e.target.value)} />
      </div>
    </div>
  );
}


export default Login;