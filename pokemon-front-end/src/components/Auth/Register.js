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
import VerifiedUserTwoTone from "@material-ui/icons/VerifiedUserTwoTone";


function Register({ setNewUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);

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
    <div className={styles.root}>
      <Paper className={styles.paper}>
        <Avatar className={styles.avatar}>
          <Gavel />
        </Avatar>
        <Typography variant="headline">
          Register
        </Typography>
        <Mutation mutation={REGISTER_MUTATION} variables={{ username, password, email }} onCompleted={data => {
          console.log({ data })
          setOpen(true)
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
        <Dialog disableBackdropClick={true} open={open} TransitionComponent={Transition}>
          {/* means they can't get rid of dialogue by clicking on background */}
          <DialogTitle>
            <VerifiedUserTwoTone className="" />
           New Account
        </DialogTitle>
          <DialogContent>
            <DialogContentText> User {username} Successfully Created! </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" variant="contained" onClick={() => setNewUser(false)}> Login </Button>
          </DialogActions>
        </Dialog>
      </Paper>
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


const styles = theme => ({
  root: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up("md")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing.unit * 2
  },
  title: {
    marginTop: theme.spacing.unit * 2,
    color: theme.palette.openTitle
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  icon: {
    padding: "0px 2px 2px 0px",
    verticalAlign: "middle",
    color: "green"
  }
});


export default withStyles(styles)(Register);