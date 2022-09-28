import React from 'react'
import { Alert,Grid } from '@mui/material';

import Leftbar from '../component/Leftbar';
import Search from '../component/Search';

import Friends from '../component/Friends';


import Goingrouprequest from '../component/Goingrouprequest';
import Chat from '../component/Chat';
import { Container } from '@mui/system';
const Message = () => {

  return (
   <>
  
      

<Grid container spacing={2}>

      <Grid item xs={2}>
       <Leftbar active='msg'/>
      </Grid>
      <Grid item xs={4}>
       <>
       <Search></Search>
       <Goingrouprequest></Goingrouprequest>
       <Friends item='button'></Friends>
       
       </>
      </Grid>
      <Grid item xs={6}>
      <>
      <Chat></Chat>
      </>
     
      </Grid>
      
    </Grid>

      
      

      
   
   </>
   
  )
}

export default Message