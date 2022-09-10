import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState, useEffect} from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [data,setData] = useState(null)
    const [userCurrent,setUser] = useState([])
    // const [access_token,setAccess] = useState([])
    const moveToLoginPage = () =>{
        navigate("/login")
    }
    const registerUser = async (user) => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      };
      fetch('https://flickerx.herokuapp.com/api/v1/user/register',requestOptions)
      .then(response => {
        var reply = response.json()
        return reply
      })
      .then(data => {
        setData(data);
        return data;
    })
  }
  useEffect(() => {
    if(data!==null){
      var reply = data
      if(reply.response === "User created"){
        document.cookie = "username="+userCurrent.name
        document.cookie = "id="+reply.user_id
        document.cookie = "email="+userCurrent.email
        document.cookie = "access_token="+reply.access_token
        setData(null)
        navigate("/")
      }else{  
        alert("Error: "+reply.response)
        setData(null)
      }
    }
    // eslint-disable-next-line
  }, [data]);
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var user = {};
        user.name = data.get('name')
        user.email = data.get('email')
        user.password = data.get('password')
        registerUser(user)
        setUser(user)
    };
    return(
        <div className="">
        <Container className="container" component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              inputProps={{
                style: { background: 'white' },
              }}
              margin="normal"
              required
              fullWidth
              variant="filled"
              id="name"
              label="User name"
              name="name"
              autoComplete="name"
              autoFocus
              
            />
            <TextField
              inputProps={{
                style: { background: 'white' },
              }}
              margin="normal"
              required
              fullWidth
              variant="filled"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              
            />
            <TextField
              inputProps={{
                style: { background: 'white' },
              }}
              margin="normal"
              required
              fullWidth
              variant="filled"
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container>
              <Grid item>
                <Link onClick={moveToLoginPage} variant="body2">
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Container>
        </div>
    )
  }
  
  export default RegisterPage