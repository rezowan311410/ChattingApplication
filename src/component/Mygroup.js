import React from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs';
import { getDatabase, push, ref, set,onValue, remove} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect,useState } from 'react';
import {Box,Typography,Modal,TextField,Button,List,ListItem,ListItemAvatar
,Avatar,ListItemText,Divider,Alert
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Mygroup = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [open, setOpen] = React.useState(false);
  
  let [pusharr,setpusharr] = useState([])
  let [pusharr2,setpusharr2] = useState([])
  
  useEffect(()=>{
    const starCountRef = ref(db, 'groups/');
    
    onValue(starCountRef, (snapshot) => {
      let arr = []
        snapshot.forEach((item)=>{
          let groupinfo = {
            admineid:item.val().admineid,
            groupadminname:item.val().adminname,
            groupname:item.val().groupname,
            groupetagline:item.val().groupetagline,
            id:item.key,
          
        }
        
    arr.push(groupinfo)
    })
    setpusharr(arr)
    });
  },[])
   
  
 
  const handleClose = () => setOpen(false);
  const handleOpen = (group) => {
   
    setOpen(true);
    const starCountRef = ref(db, 'groupjoinrequest/');
    
    onValue(starCountRef, (snapshot) => {
      let arr2 = []
        snapshot.forEach((item)=>{
         if(item.val().admineid==auth.currentUser.uid && item.val().groupid == group.id){
          let groupinfo1 = {
             admineid:item.val().admineid,
             groupid:item.val().groupid,
             userid:item.val().userid,
             username:item.val().username,
             userphoto:item.val().userphoto,
             id:item.key,

           
          
        }
        arr2.push(groupinfo1)
         }
   
   
    })
    setpusharr2(arr2)
    });
    
  }

  let handlereject = (item)=>{
       remove(ref(db,"groupjoinrequest/"+item.id))
  }

  let handleaccept = (item)=>{
  
    set(push(ref(db, 'groupmember/')), {
            admineid:item.admineid,
             groupid:item.groupid,
             userid:item.userid,
             username:item.username,
             userphoto:item.userphoto,
            
    }).then(()=>{
      remove(ref(db,"groupjoinrequest/"+item.id))
    })
   
  }
 
  return (
    <div className='Grouprequest'>
   
    <div className='icon2'>
       <BsThreeDotsVertical/>
    </div>
   
    <h2>My Groups</h2>
  
    {pusharr.map((item)=> item.admineid == auth.currentUser.uid&&(
    <>
     <div className='main'>
   <div className='img'>
        <img src='./assets/images/Ellipse 2.png'/>
    </div>
    <div className='item'>
        <h1>{item.groupname}</h1>
        <p>{item.groupetagline}</p>
    </div>
    <div className='button'>
        <button onClick={()=>handleOpen(item)} >info</button>
    </div>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        
          <Box sx={style}>
            { pusharr2.length <= 0 && <Alert severity="info">empty list</Alert>}
            {pusharr2.map(item=>( 
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={item.userphoto}/>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.username}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {item.username}
                        </Typography>
                        {"Wnts to join this group"}<br/>
                       
                        <Button
                         onClick={()=>handleaccept(item)}
                        variant="contained" style={{maginTop:"20px", marginRight:"10px"}}>Accept</Button>
                        <Button onClick={()=>handlereject(item)} variant="contained" color="error" style={{maginTop:"20px", marginRight:"10px"}}>reject</Button>

                      </React.Fragment>
                    }
                  />
                </ListItem>
               
              </List> 
              ))}
             
          </Box>
       
      </Modal>
   </div>
    </>
   ))}
   
  
  
</div>
  )
}

export default Mygroup