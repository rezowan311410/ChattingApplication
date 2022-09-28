import React, { useEffect, useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs';
import {Box,Typography,Modal,TextField} from '@mui/material';
import { getDatabase,push, ref, set,onValue} from "firebase/database";
import { getAuth } from "firebase/auth";
const Grouprequest = () => {
        const auth = getAuth();
        const db = getDatabase();
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const [groupname,setgroupName] = useState('')
        const [groupetagline,setgroupetagline] = useState('')
        let [pusharr,setpusharr] = useState([])
        let [check,setcheck] = useState(false)
        const inputstyle = {
            width:"100%",
            margin: "10px 0",
        }
       
      let handegoroupcreate = (e)=>{
        set(push(ref(db, 'groups/')), {
            groupname: groupname,
            groupetagline: groupetagline,
            admineid: auth.currentUser.uid,
            adminname: auth.currentUser.displayName
          }).then(()=>{
            setOpen(false)
            setcheck(!check)
          });
        }
        let handlejoingroup = (id,g)=>{
           set(push(ref(db, 'groupjoinrequest/')), {
               admineid:id,
               groupid:g,
               userid: auth.currentUser.uid,
               username: auth.currentUser.displayName,
               userphoto: auth.currentUser.photoURL
          })
          
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

      useEffect(()=>{
        const starCountRef = ref(db, 'groups/');
        let arr = []
        onValue(starCountRef, (snapshot) => {
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
      },[check])

 
  return (
    <div className='Grouprequest group'>
    
    <div className='icon2'>
    <BsThreeDotsVertical/>
    </div>
    <div style={{display:"flex",justifyContent:'space-around'}}>
    <h2>Groups List</h2>
    <div className='button'>
        <button onClick={handleOpen}>Create Group</button>
    </div>
    </div>
   {pusharr.map((item)=>
    item.admineid != auth.currentUser.uid &&(
    <>
     <div className='main'>
   <div className='img'>
        <img src='./assets/images/Ellipse 2.png'/>
    </div>
    <div className='item'>
        <h1>{item.groupname}</h1>
        <p>{item.groupetagline}</p>
       
    </div>
    <div className='button' onClick={()=>handlejoingroup(item.admineid,item.id)}>
        <button>Join</button>
    </div>
   </div>
    </>
   ))}
   <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Box sx={style}>
        
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Fill The Field With profer Information
          </Typography>
          <TextField id="outlined-basic" label="Groupname" variant="outlined" 
          sx={inputstyle}
          onChange={(e)=>setgroupName(e.target.value)}
          />
          <TextField id="outlined-basic" label="Grouptagline" variant="outlined" 
          sx={inputstyle}
          onChange={(e)=>setgroupetagline(e.target.value)}
          />
          <div className='buttongroup'>
            <button onClick={handegoroupcreate}>Group</button>
          </div>
        </Box>
      </Modal>
</div>
  )
}

export default Grouprequest