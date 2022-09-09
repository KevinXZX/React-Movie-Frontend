import Button from '@mui/material/Button';
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = ({isLoggedIn}) => {
    const navigate = useNavigate();
    const moveToLoginPage = () =>{
        console.log("testing")
        navigate("/login")
      }
    if(isLoggedIn){
        return (
            <Button size="large" sx={{color: 'white'}} onClick={moveToLoginPage}>Login/Register</Button>
        )
    }
    return(<div>hello</div>)
  }
  
  export default LoginButton