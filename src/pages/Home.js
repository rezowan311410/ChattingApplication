import React,{useState,useEffect} from 'react'
import { Alert,Grid } from '@mui/material';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
import Leftbar from '../component/Leftbar';
import Search from '../component/Search';
import Grouprequest from '../component/Grouprequest';
import Userlist from '../component/Userlist';
import Friendrequest from '../component/Friendrequest';
import Friends from '../component/Friends';
import Mygroup from '../component/Mygroup';
import Blockedusers from '../component/Blockedusers';
const Home = () => {
const auth = getAuth();
const navigate = useNavigate();
let [Emailverify,setEmailverify] = useState(false)
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailverify(user.emailVerified)
      } else {
        navigate('/login')
      }
    });
    
  },[])
  return (
   <>
    {
      
      Emailverify
      ?
      
      <Grid container spacing={2}>
      <Grid item xs={2}>
       <Leftbar active='home'/>
      </Grid>
      <Grid item xs={4}>
       <>
       <Search></Search>
       <Grouprequest></Grouprequest>
       <Friendrequest></Friendrequest>
       
       </>
      </Grid>
      <Grid item xs={3}>
      <Friends item='date'></Friends>
      <Mygroup></Mygroup>
      </Grid>
      <Grid item xs={3}>
        <Userlist></Userlist>
        <Blockedusers></Blockedusers>
      </Grid>
    </Grid>
      :
      

   <Grid container spacing={2}>
  <Grid item xs={4}>
   
  </Grid>
  <Grid item xs={4}>
  <Alert variant="filled" severity="info">
  please check your Email for verify
  </Alert>
  </Grid>
  <Grid item xs={4}>
   
  </Grid>
</Grid>

      
    }
   </>
   
  )
}

export default Home