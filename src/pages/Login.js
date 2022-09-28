import React,{ useEffect, useState } from 'react'
import { Grid,TextField,Button,Collapse,Alert,IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Link,useNavigate,useLocation} from 'react-router-dom'
import {AiFillEye,AiFillEyeInvisible} from 'react-icons/ai';
import { getAuth,sendPasswordResetEmail, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const Login = () => {
  const auth = getAuth();
    const navigate = useNavigate()
    const location = useLocation();
  //   
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [msg, setMsg] = useState(false);
  let[email,setEmail] = useState('')
  
  let[password,setPassword] = useState('')
  
  

  let[emailerr,setEmailerr] = useState('')
  let[passworderr,setPassworderr] = useState('')
  
  let[lengthpassworderr,setLengthpassworderr] = useState('')
  let[emailerror,setEmailerror] = useState('')
  let[wrongpassworderr,setWrongpassworderr] = useState('')
  let [checkpassword,setCheckpassword] = useState(false)

  let handlesubmitt = () => {
   
   if(!email){
      setEmailerr('please Enter your email')
     
    }else if(!password){
      setPassworderr('please Enter your password')
      setEmailerr('')
    }else if(password.length < 8){
      setLengthpassworderr('please 8 digite password use')
      setPassworderr('')
     
    }
   else{
    setLengthpassworderr('')
    signInWithEmailAndPassword(auth,email,password).then((user)=>{
     
     navigate('/home')
    }).catch((error)=>{
      const errorCode = error.code;
      console.log(errorCode)
      if(errorCode.includes('user')){
        setEmailerror('email not found')
        setOpen(true)
        setWrongpassworderr('')
      }else if(errorCode.includes('password')){
        setWrongpassworderr('wrong password')
        setOpen(true)
          setEmailerror('')
      }
    })
    }
  }

 let handlepassword = () => {
  setCheckpassword(!checkpassword)
 }

 let handleGoolesingin = () =>{
 
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    navigate('/home')
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
 }

useEffect(()=>{
  if(location.state !== null){
    setMsg(location.state.msg);
    setOpen2(true)
  }
},[])
  return (
    <section className='registration login-part'>
        <Grid container spacing={2}>
    <Grid item xs={6}>
      <div className='box'>
          <div className='left'>
              <h2>Login to your account!</h2>
      <Collapse in={open2}>
        <Alert
         variant="filled"
          action={
            <IconButton
     
              aria-label="close"
              color="inherit"
              size="small"
             
              onClick={() => {
                setOpen2(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {msg}
        </Alert>
      </Collapse>
            
             <div className='loginoption'>
                 <div onClick={handleGoolesingin} className='option'>
                     <p><img src='./assets/images/google.png'/> Login with Google</p>
                 </div>
                 
                 <div className='option'>
                 <p><img src='./assets/images/facebook.png'/>Login with Facebook</p>
                 </div>
             </div>

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
         {emailerror?emailerror:wrongpassworderr&& wrongpassworderr}
        </Alert>
      </Collapse>

<TextField
        helperText={emailerr}
        id="demo-helper-text-aligned"
        label="Enter email"
        style={{width:'368px',marginTop:'40px'}}
        type='email'
        onChange={(e)=> setEmail(e.target.value)}
      />
       <br/>
<div className='eyeicon'>
<TextField
        helperText={passworderr?passworderr:lengthpassworderr?lengthpassworderr:""}
        id="demo-helper-text-aligned"
        label="password"
        style={{width:'368px',marginTop:'40px'}}
        type={checkpassword?'text':'password'}
        onChange={(e)=> setPassword(e.target.value)}
        
      />
      {
       checkpassword?
       <div onClick={handlepassword} className='eye'>
       <AiFillEye /></div>
       :
       <div onClick={handlepassword} className='eye'>
       <AiFillEyeInvisible />
       </div>
      }
    
   
</div>
             <br/>

        <Button style={{width:'368px', padding: "20px 0",borderRadius:'9px', background:'#5F35F5'}} variant="contained" onClick={handlesubmitt}>Login to Continue</Button>
      
         <p className='msg'>Don't have an account?<Link to="/">Sign up</Link></p>
         <p className='forget'>forget password <Link to="/reset">Click here</Link></p>
          </div>
      </div>
    </Grid>
    <Grid item xs={6}>
     
      <img style={{width:'100%',height:'100vh'}} src='./assets/images/img here.png'/>
    </Grid>
    </Grid>
   </section>

  )
}

export default Login