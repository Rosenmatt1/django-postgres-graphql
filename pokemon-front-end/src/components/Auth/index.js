import React, { useState } from "react";

// import withRoot from "../../withRoot";
import Login from './Login';
import Register from './Register';

const Auth = () => {
  const [newUser, setNewUser] = useState(true)
  return  newUser ? <Register setNewUser={setNewUser}/> : <Login setNewUser={setNewUser} />
};

export default Auth
