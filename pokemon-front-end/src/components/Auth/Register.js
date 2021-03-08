import React, { useState, useEffect } from 'react';
import '../../App.css';
import Loader from '../Shared/Loader.js'
import Error from '../Shared/Error.js'

import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

import Button from "@material-ui/core/Button";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Similar to componentDidMount and componentDidUpdate:
  //   useEffect(() => {

  //   });

  const handleSubmit = (e, createUser) => {
    e.preventDefault()
    createUser()
    // This object could be passed into createUser, instead of passing variables into Mutation tag
    // {
    //   variables: {
    //     username: username,
    //     email: email,
    //     password: password
    //   }
    // }
  }


  return (
    <div className="registerContainer">

      <Mutation mutation={REGISTER_MUTATION} variables={{ username, password }} onCompleted={data => {
        console.log({ data })
        // setOpen(true)
      }}>
        {(createUser, { loading, error }) => {
          return (
            <form onSubmit={(e) => handleSubmit(e, createUser)} className="register">
              Register
              <input onChange={(e) => setUsername(e.target.value)} />
              <input onChange={(e) => setPassword(e.target.value)} />
            </form>
          )
        }}
      </Mutation>

      {/* <DialogActions>
        <Button color="primary" variant="contained" onClick={() => setNewUser(false)}> Login </Button>
      </DialogActions> */}

    </div >
  );
}


const REGISTER_MUTATION = gql`
mutation ($username: String!, $email: String!, $password: String!) {
  createUser(username:$username, email:$email, password:$password) {
    user {
      username
      email
    }
  }
}`


export default Register;