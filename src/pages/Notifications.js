import React, { useState,useEffect } from 'react'
import { Alert,Grid,List,ListItem,ListItemText,IconButton } from '@mui/material';
import {IoMdNotificationsOutline} from  'react-icons/io';
import Leftbar from '../component/Leftbar';
import {useSelector, useDispatch} from 'react-redux'
import { getDatabase,push, ref, set,onValue} from "firebase/database";
function Notifications() {
  const dispatch = useDispatch();
    let [notificationtrone,setnotificationtrone] = useState([])
    const db = getDatabase();
    useEffect(()=>{
  
        const starCountRef = ref(db, 'notification/');
       
        onValue(starCountRef, (snapshot) => {
          let arr = []
            snapshot.forEach((item)=>{
               let trone = {
                
                  
                  admineid:item.val().admineid,
                  groupid:item.val().groupid,
                  groupname:item.val().groupname,
                  userid:item.val().userid,
                  username: item.val().username,
                  userphoto:item.val().userphoto

               }
                
            arr.push(trone)
        })
        setnotificationtrone(arr)
        // dispatch(notification(0))
        });
      },[])
  return (
    <>
  
      

    <Grid container spacing={2}>
    
          <Grid item xs={2}>
          <Leftbar active='notification'/>
          </Grid>
          <Grid item xs={10}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
  {notificationtrone.map((item) => (
    <ListItem
      
      disableGutters
      secondaryAction={
        <IconButton aria-label="comment">
          <IoMdNotificationsOutline/>
        </IconButton>
      }
    >
      <ListItemText primary={`${item.username} is want to be join ${item.groupname} group`} />
    </ListItem>
  ))}
</List>
          
          </Grid>
          
        </Grid>
    
          
          
    
          
       
       </>
  )
}

export default Notifications