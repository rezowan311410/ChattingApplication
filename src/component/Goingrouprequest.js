import React,{useEffect,useState} from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs';
import {RiMessage2Fill} from 'react-icons/ri';
import {HiUserGroup} from 'react-icons/hi';
import { getDatabase,push, ref, set,onValue} from "firebase/database";
import { getAuth } from "firebase/auth";
import {useSelector, useDispatch} from 'react-redux'
import { activeChat } from '../slice/activeChatslice';
import {Box,Typography,Modal,TextField,Button,List,ListItem,ListItemAvatar
  ,Avatar,ListItemText,Divider,Alert
  } from '@mui/material';
const Goingrouprequest = () => {
  const db = getDatabase();
  const auth = getAuth();
  const dispatch = useDispatch()
  let [pusharr,setpusharr] = useState([])
  let [groupmemberlist,setgroupmemberlist] = useState([])

  const [open, setOpen] = React.useState(false);
  
  const handleClose = () => setOpen(false);
  
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

  let handleactivechat = (item)=>{
    let userInfo = {
        status:'group',
        name:item.groupname,
        groupid:item.id,
        groupadmin:item.admineid
    };
    
    dispatch(activeChat(userInfo))
    

  }

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

  let handlegroupmember = (id)=>{
    setOpen(true)
    const starCountRef = ref(db, 'groupmember/');
    let arr2 = []
    onValue(starCountRef, (snapshot) => {
        snapshot.forEach((item)=>{
           if(item.val().groupid == id){
             let groupmember = {
                 admineid:item.val().admineid,
                 groupid:item.val().groupid,
                 username:item.val().username,
                 userphoto:item.val().userphoto,
                 userid:item.val().userid,
                 id:item.key
             }
             arr2.push(groupmember) 
           }
           
        
    })
    setgroupmemberlist(arr2)
    });
  }
  return (
    <div className='Grouprequest group'>
    
    <div className='icon2'>
    <BsThreeDotsVertical/>
    </div>
    <div style={{display:"flex",justifyContent:'space-around'}}>
    <h2>Groups List</h2>
    
    </div>

    {pusharr.map((item)=>
   
    <>
     <div className='main' onClick={()=>handleactivechat(item)}>
   <div className='img'>
        <img src='./assets/images/Ellipse 2.png'/>
    </div>
    <div className='item'>
        <h1>{item.groupname}</h1>
        <p>{item.groupetagline}
        {item.admineid != auth.currentUser.uid?"":"(admin)"}
        </p>
       
    </div>
    <div className='button'>
    <button><RiMessage2Fill/></button>
    <button onClick={()=>handlegroupmember(item.id)}>< HiUserGroup/></button>
    </div>
   </div>
    </>
   )}
   <>
   <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h1>Total member:{groupmemberlist.length}</h1>
          {groupmemberlist.map((item)=>
               <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
               <ListItem alignItems="flex-start">
                 <ListItemAvatar>
                   <Avatar alt="Cindy Baker" src={item.userphoto}/>
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
                       {' is this a group member'}
                     </React.Fragment>
                   }
                 />
               </ListItem>
             </List>    
          )}
     
        </Box>
      </Modal>
    
   
   </>
   
   
   </div>
  )
}

export default Goingrouprequest