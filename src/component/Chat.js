import React, { useEffect, useState } from 'react'
import { Block } from '@mui/icons-material';

import { getDatabase, push, ref, set,onValue } from "firebase/database";
import { getStorage, ref as sref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {Modal,Box,Typography,Button,LinearProgress,Alert } from "@mui/material";
import {BsThreeDotsVertical} from 'react-icons/bs';
import {FiSend} from 'react-icons/fi';
import {AiFillCamera} from 'react-icons/ai';
import {useSelector,useDispatch} from 'react-redux'
import { getAuth } from "firebase/auth";
import moment from 'moment/moment';
const Chat = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const db = getDatabase();
    const auth = getAuth();
    const storage = getStorage();
    

    const user = useSelector((state) => state.activeChat.active);
   
    const dispatch = useDispatch()
    let [msg,setmsg] = useState('')
    let [file,setfile] = useState(null)
    let [progress,setprogress] = useState('')
    let [member,setmember] = useState(false)
   
    let [msglist,setmsglist] = useState([])
    let [groupmsglist,setgroupmsglist] = useState([])
    let handlemsg = (e)=>{
        setmsg(e.target.value)
    }
   console.log(user)
    let handlemsgsend = ()=>{
        
        if(msg!=""){
          if(user.status == 'group'){
            set(push(ref(db, 'groupmsg')), {
              whosend: auth.currentUser.uid,
              whosendname: auth.currentUser.displayName,
              
              whoreciveid: user.groupid,
              msg:msg,
              date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}
               ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            });
          }else{

            set(push(ref(db, 'singlemsg/')), {
                whosend: auth.currentUser.uid,
                whosendname: auth.currentUser.displayName,
                whorecivename: user.name,
                whoreciveid: user.id,
                msg:msg,
                date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}
                 ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
              }).then(()=>{
                setmsg('')
              })
            

          }
        }
    }

    let handleimageupload = ()=>{
      const singleimgRef = sref(storage, 'singleimg/'+file.name);
      const uploadTask = uploadBytesResumable(singleimgRef,file);
      uploadTask.on('state_changed', 
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setprogress(progress)
  }, 
  (error) => {
   console.log(error)
  }, 
  () => {
  
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      if(file!=""){
        if(user.status == 'group'){
          console.log('ata group msg')
        }else{

          set(push(ref(db, 'singlemsg/')), {
              whosend: auth.currentUser.uid,
              whosendname: auth.currentUser.displayName,
              whorecivename: user.name,
              whoreciveid: user.id,
              img: downloadURL,
              date: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}
                ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            }).then(()=>{
              setfile('')
              setprogress('')
              setOpen(false)
            });
          

        }
      }
    });
  }
);
    }

    useEffect(()=>{
        
        const starCountRef = ref(db, 'singlemsg/');
        onValue(starCountRef, (snapshot) => {
            let messarr = []
            snapshot.forEach(item=>{
                if(
                    (item.val().whosend == auth.currentUser.uid &&
                    item.val().whoreciveid == user.id) || 
                       (item.val().whosend == user.id &&
                       item.val().whoreciveid == auth.currentUser.uid)
                    
                )

                
                messarr.push(item.val())
            })
            setmsglist(messarr)
        });
        
        
    },[user.id])

    useEffect(()=>{
        
        const starCountRef = ref(db, 'groupmsg/');
        onValue(starCountRef, (snapshot) => {
            let messarr2 = []
            snapshot.forEach(item=>{
             

                
                messarr2.push(item.val())
            })
            setgroupmsglist(messarr2)
        });
        
        
    },[user.id])
   
    let handlesingleimg = (e)=>{
      setfile(e.target.files[0])
   
    }

    useEffect(()=>{
     if(user.status == "group"){
      const groupmembers = ref(db, 'groupmember');
      onValue(groupmembers, (snapshot) => {
        snapshot.forEach((item)=>{
           if(auth.currentUser.uid== item.val().userid && 
                   item.val().groupid == user.groupid || auth.currentUser.uid == item.val().admineid && 
                   item.val().groupid == user.groupid 
           ){
              setmember(user.groupid)                            
           }
        })
       
      });
      
     }

    },[user])
  return (
    <div className='chat'>
    <div className='toparea'>
        <div className='info'>
            <div className='image'>
                <img src='assets/images/Ellipse 4.png'/>
                <div className='round'></div>
            </div>
            <div className='identify'>
                <h2>{user.name}</h2>
                <p>Online</p>
            </div>
        </div>
        <div className='dots'>
            <BsThreeDotsVertical/>
        </div>
    </div>
    <div className='chatarea'>
       {
        user.status == "group"
        ?
        groupmsglist.map((item)=>
          auth.currentUser.uid ==  item.whosend ?
       item.whoreciveid == user.groupid &&
       
         (
       
         <div className='msg' style={Rightalingn}>
           <p className='name' style={senddate} >{item.whosendname}</p>
         <p style={msgsend}>{item.msg}</p>
         <p className='date' style={senddate} >{item.date}</p>
         </div>
       
        ):
        item.whoreciveid == user.groupid &&
        (
        
       
        <div className='msg' style={leftalingn}>
           <p className='name' style={recivedate} >{item.whosendname}</p>
            <p style={msgrecive}>{item.msg}</p>
            <p className='date' style={recivedate}>{item.date}</p>
        </div>
        )
        
        )
        :
        msglist.map((item)=>
          auth.currentUser.uid ==  item.whosend ?
       (
       
         item.msg?(
        <>
         <div className='msg' style={Rightalingn}>
         <p style={msgsend}>{item.msg}</p>
         <p className='date' style={senddate} >{item.date}</p>
         </div>
        </>
        ):
         <div className='msg' style={Rightalingn}>
          <div className='chatimg' style={msgsend}>
           <img src={item.img}/>
         
         <p style={msgsend}>{item.msg}</p>
         <p className='date' style={senddate} >{item.date}</p>
        </div>
        </div>
       )
       :
       item.msg?
        (
        <div className='msg' style={leftalingn}>
            <p style={msgrecive}>{item.msg}</p>
            <p className='date' style={recivedate}>{item.date}</p>
        </div>
        ):
        (
          <div className='msg' style={leftalingn}>
          <div className='chatimg' style={msgrecive}>
           <img src={item.img}/>
         <p className='date' style={recivedate} >{item.date}</p>
        </div>
        </div>
        )
       )
       }
      
     
       
       
    </div>

    {
      user.status == "group"?
      
        (user.groupid== member?
            (
              <div className='msgbox'>
              <div className='textarea'>
                  <input onChange={handlemsg} type='text' value={msg} placeholder='Message'/>
                  <AiFillCamera className='camera' onClick={handleOpen}/>
                  <button onClick={handlemsgsend} ><FiSend/>
                      
                  </button>
              </div>
          </div>
            ):(
              <Alert severity="info">{user.name} not a member of this group</Alert>
              
            )
        
      
        )
      :
      <div className='msgbox'>
      <div className='textarea'>
          <input onChange={handlemsg} type='text' value={msg} placeholder='Message'/>
          <AiFillCamera className='camera' onClick={handleOpen}/>
          <button onClick={handlemsgsend} ><FiSend/>
              
          </button>
      </div>
  </div>
    }
    
   
 
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      File send
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      <input type="file" onChange={handlesingleimg}/>
    </Typography>
    {
      progress > 0 &&
      <LinearProgress variant="determinate" value={progress} />
    }
    <Button onClick={handleimageupload} style={{marginTop:'10px'}} variant="contained">Image upload</Button>

  </Box>
</Modal>
   </div>
   
  )
}

export default Chat

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

let msgrecive = {
   background: "#F1F1F1",
  

}


 let msgsend = {
   background: "#5F35F5",
   color:"#fff",
}

let recivedate = {
    left:"-40px",
}


let senddate = {
    right:" -40px",
    
}

let leftalingn = {
    justifyContent: 'flex-start',
}

let Rightalingn = {
    justifyContent: 'flex-end',
    
}