import Button from '@mui/material/Button';
import React from "react";
const Movies = ({isLoggedIn}) => {
    if(isLoggedIn){
        return (
            <Button size="large" sx={{color: 'white'}}>Login/Register</Button>
        )
    }
    return(<div>hello</div>)
  }
  
  export default Movies