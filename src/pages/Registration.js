import React, { useState } from 'react'
import { Grid,TextField,Button,Collapse,Alert,IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

 import {Link,useNavigate} from 'react-router-dom'
 import { getAuth,updateProfile, createUserWithEmailAndPassword,sendEmailVerification } from "firebase/auth";
 import { getDatabase, ref, set } from "firebase/database";
const Registration = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [open, setOpen] = React.useState(false);
  let navigate = useNavigate();
  let[name,setName] = useState('')
  
  let[email,setEmail] = useState('')
  
  let[password,setPassword] = useState('')
  
  let[confirmpassword,setConfirmpassword] = useState('')

  let[nameerr,setNameerr] = useState('')
  let[emailerr,setEmailerr] = useState('')
  let[passworderr,setPassworderr] = useState('')
  let[confirmpassworderr,setConfirmpassworderr] = useState('')
  let[lengthpassworderr,setLengthpassworderr] = useState('')

  let [passwordmatch,setPasswordmatch] = useState('')
  let [exitsemail,setExitsemail] = useState('')

  let handlesubmitt = () => {
   
    if(!name){
    setNameerr('nam nai kano')
    }else if(!email){
      setEmailerr('please Enter your email')
      setNameerr('')
    }else if(!password){
      setPassworderr('please Enter your password')
      setEmailerr('')
    }else if(password.length < 8){
      setLengthpassworderr('please 8 digite password use')
      setPassworderr('')
     
    }
    
    else if(!confirmpassword){
      setConfirmpassworderr('please Enter your Confirmpassword')
      setLengthpassworderr('')
    }else if(password !== confirmpassword){
      setConfirmpassworderr('')
      setPasswordmatch('passowrd do not match')
      
    }else{
      setPasswordmatch('')
      createUserWithEmailAndPassword(auth,email,password).
      then((user)=>{
         
        
         sendEmailVerification(auth.currentUser)
        
  .then(() => {
   console.log('Email send')
  });
  
  updateProfile(auth.currentUser, {
    displayName: name
  }).then(() => {
    console.log('name set hayca')
    set(ref(db, 'users/'+auth.currentUser.uid), {
      username: name,
      email: email,
     
    });
  }).catch((error) => {
  console.log(error)
  });
         navigate('/login')
      }).catch((error)=>{
        const errorCode = error.code;
      if(errorCode.includes('email')){
        setExitsemail('email already use')
        setOpen(true)
      }
      })
    }
  }


  return (
   <section className='registration'>
        <Grid container spacing={2}>
    <Grid item xs={6}>
      <div className='box'>
          <div className='left'>
              <h2>Get started with easily register</h2>
              <p style={{marginBottom:'40px'}}>Free register and you can enjoy it</p>
              <Collapse in={open}>
        <Alert
        variant="filled" severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon  fontSize="inherit" />
              
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
         {exitsemail}
        </Alert>
      </Collapse>
              <TextField
        helperText={nameerr}
        id="demo-helper-text-aligned"
        label="full Name"
        style={{width:'368px',marginTop:'40px'}}
        type='text'
        onChange={(e)=> setName(e.target.value)}
      />
     <br/>

<TextField
        helperText={emailerr}
        id="demo-helper-text-aligned"
        label="Enter email"
        style={{width:'368px',marginTop:'40px'}}
        type='email'
        onChange={(e)=> setEmail(e.target.value)}
      />
       <br/>
<TextField
        helperText={passworderr?passworderr:lengthpassworderr?lengthpassworderr:""}
        id="demo-helper-text-aligned"
        label="password"
        style={{width:'368px',marginTop:'40px'}}
        type='password'
        onChange={(e)=> setPassword(e.target.value)}
      />
             <br/>
<TextField
        helperText={confirmpassworderr? confirmpassworderr: passwordmatch?passwordmatch:""}
        id="demo-helper-text-aligned"
        label="Confirm-password"
        style={{width:'368px',marginTop:'40px'}}
        type='password'
        onChange={(e)=> setConfirmpassword(e.target.value)}
      /><br/>
        <Button style={{marginTop:'40px' ,width:'368px', padding: "20px 0",borderRadius:'86px', background:'#5F35F5'}} variant="contained" onClick={handlesubmitt}>Sign up</Button>
      
        <p className='msg'>allready have an account ?<Link to="/login">Login</Link></p>
          </div>
      </div>
    </Grid>
    <Grid item xs={6}>
     
      <img style={{width:'100%',height:'100vh'}} src='./assets/images/registration.png'/>
    </Grid>
    </Grid>
   </section>
  )
}

export default Registration