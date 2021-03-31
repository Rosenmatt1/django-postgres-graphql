import React, { useState, useEffect } from 'react';
import '../../App.css';
import Loader from '..//Shared/Loader.js'
import Error from '../Shared/Error.js'

import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Lock from "@material-ui/icons/Lock";

function Login({setNewUser}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Similar to componentDidMount and componentDidUpdate:
  //   useEffect(() => {

  //   });

  return (
    <div className="">
      <Paper className="">
        <Mutation mutation={LOGIN_MUTATION} variables={{ username, password }}>
          {(tokenAuth, { loading, error, called, client }) => {

            const handleSubmit = async (e, tokenAuth, client) => {
              e.preventDefault()
              const res = await tokenAuth();
              console.log(res)
              localStorage.setItem('authToken', res.data.tokenAuth.token)
              client.writeData({ data: { isLoggedIn: true } })  //way to get access to state
            }

            return (
              <form onSubmit={(e) => handleSubmit(e, tokenAuth, client)} >
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="username"> Username </InputLabel>
                  <Input id="username" onChange={e => setUsername(e.target.value)} />
                </FormControl >

                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="password"> Password </InputLabel>
                  <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormControl >
                <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading || !username.trim() || !password.trim()} className="">
                  {loading ? "Loging In..." : "Log In"}
                </Button>
                <Button fullWidth color="secondary" variant="outlined" onClick={() => setNewUser(true)}>
                  New user? Register here
              </Button>

                {/* Error Handling  */}
                {error && <Error error={error} />}
              </form>
            )
          }}
        </Mutation>
        </Paper>
        
    </div>
  )
};

const LOGIN_MUTATION = gql`
mutation ($username: String!, $password: String!) {
      tokenAuth(username:$username, password:$password) {
      token
    }
}`


export default Login;