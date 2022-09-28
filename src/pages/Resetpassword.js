import React, { useState } from 'react'
import {TextField,Button} from '@mui/material';
import { getAuth,sendPasswordResetEmail} from "firebase/auth";
import {useNavigate} from 'react-router-dom';
const Resetpassword = () => {
    const auth = getAuth();
    let navigate = useNavigate();
    let[email,setEmail] = useState('')
    let handlepasswordreset = ()=>{
         sendPasswordResetEmail(auth, email)
  .then(() => {
    navigate('/login',{
      state:{msg:"please check your email"},
    });
  })
  .catch((error) => {
     console.log('error')
    })
}
  return (
    <div className='resetpassword'>
        <h2 style={{marginBottom:'20px'}}>Reset Password</h2>
        <div className='box'>
          <div className='forget'>
             <h2>Forget Password</h2>
             <p>for reset Your password Enter email address below</p>

             <TextField style={{width:"100%", marginTop:"15px"}} id="outlined-basic" label="Enter Email" variant="outlined" 
             onChange={(e)=>setEmail(e.target.value)}
             />
             <Button onClick={handlepasswordreset} style={{width:'100%', padding: "15px 0",borderRadius:'9px', background:'#5F35F5',marginTop:"20px"}} variant="contained">Reset Password</Button>
          </div>
        </div>
    </div>
  )
}

export default Resetpassword