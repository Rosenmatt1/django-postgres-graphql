import React, { useState, useEffect } from 'react';
import '../../App.css';

import Loader from '../Shared/Loader.js'
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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Gavel from "@material-ui/icons/Gavel";
// import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";

// import DialogActions from "@material-ui/core/DialogActions";
// import Button from "@material-ui/core/Button";


function Register({setNewUser}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  //   useEffect(() => {

  //   });

  function Transition(props) {
  return <Slide direction="up" {...props} />
}

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
            <form onSubmit={(e) => handleSubmit(e, createUser)} className="">
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username"> Username </InputLabel>
                <Input id="username" onChange={e => setUsername(e.target.value)} />
              </FormControl >

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email"> Email </InputLabel>
                <Input id="email" type="email" onChange={e => setEmail(e.target.value)} />
              </FormControl >

              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password"> Password </InputLabel>
                <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
              </FormControl >
              <Button type="submit" fullWidth variant="contained" color="secondary" disabled={loading || !username.trim() || !email.trim() || !password.trim()} >
                {loading ? "Registering..." : "Register"}
              </Button>
              <Button fullWidth color="primary" variant="outlined" onClick={() => setNewUser(false)}>
                Previous user? Log in here
            </Button>

              {/* Error Handling  */}
              {error && <Error error={error} />}
            </form>
          )
        }}
      </Mutation>

      <DialogActions>
        <Button color="primary" variant="contained" onClick={() => setNewUser(false)}> Login </Button>
      </DialogActions>

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