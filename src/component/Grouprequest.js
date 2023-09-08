import React, { useEffect, useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs';
import {Box,Typography,Modal,TextField,Button} from '@mui/material';
import { getDatabase,push, ref, set,onValue} from "firebase/database";
import { getAuth } from "firebase/auth";

import { getStorage, ref as sref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const Grouprequest = () => {
        const auth = getAuth();
        const db = getDatabase();
        const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const [open2, setOpen2] = useState(false);
        const handleOpen2 = () => setOpen2(true);
        const handleClose2 = () => setOpen2(false);
        const storage = getStorage();
        const [groupname,setgroupName] = useState('')
        const [groupetagline,setgroupetagline] = useState('')
        let [pusharr,setpusharr] = useState([])
        let [memberlist,setmemberlist] = useState([])
        let [check,setcheck] = useState(false)
        let [file,setfile] = useState(null)

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
        
        let handlejoingroup = (id,g,gn,gt)=>{
           set(push(ref(db, 'groupjoinrequest/')), {
               admineid:id,
               groupid:g,
               groupname:gn,
               groupetagline:gt,
               userid: auth.currentUser.uid,
               username: auth.currentUser.displayName,
               userphoto: auth.currentUser.photoURL
          })
          set(push(ref(db, 'notification/')), {
            admineid:id,
            groupid:g,
            groupname:gn,
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

      useEffect(()=>{
        const starCountRef = ref(db, 'groupmember/');
        
        onValue(starCountRef, (snapshot) => {
          let arr2 = []
            snapshot.forEach((item)=>{
               if(item.val().userid == auth.currentUser.uid){
                arr2.push(item.val().groupid)
               }
                
            
        })
        setmemberlist(arr2)
        });
      },[])
      

      let handlegroupimg = (e)=>{
        setfile(e.target.files[0])
     
      }

      let handlegroupimageupload = ()=>{
        const groupimageRef = sref(storage, 'uploadgroupimg/'+file.name);

        const uploadTask = uploadBytesResumable(groupimageRef, file);
        
    
        uploadTask.on('state_changed', 
          (snapshot) => {
          
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, 
          (error) => {
           console.log(error)
          }, 
          () => {
          
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              if(file!=""){
              set(push(ref(db, 'uploadgroupimg/')), {
                
                
               
               
              });
              
            }
            });
          }
        );
      }
        
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
        <img onClick={handleOpen2}  src="assets/images/Ellipse 4.png"/>
    </div>
    <div className='item'>
        <h1>{item.groupname}</h1>
        <p>{item.groupetagline}</p>
        <p>{item.id}</p>
       
    </div>
    {memberlist.indexOf(item.id) == -1 &&(
    <div className='button' onClick={()=>handlejoingroup(item.admineid,item.id,item.groupname,item.groupetagline)}>
      <button>Join</button>
      </div>
    )
    }
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
      <Modal
  open={open2}
  onClose={handleClose2}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      File send
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      <input onChange={handlegroupimg} type="file"/>
    </Typography>
    {/* {
      progress > 0 &&
      <LinearProgress variant="determinate" value={progress}/>
    } */}
    <Button  onClick={handlegroupimageupload} style={{marginTop:'10px'}} variant="contained">Image upload</Button>

  </Box>
</Modal>
</div>
  )
}

export default Grouprequest