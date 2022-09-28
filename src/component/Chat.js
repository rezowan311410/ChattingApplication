import React, { useEffect, useState } from 'react'
import { Block } from '@mui/icons-material';

import { getDatabase, push, ref, set,onValue } from "firebase/database";

import {BsThreeDotsVertical} from 'react-icons/bs';
import {FiSend} from 'react-icons/fi';
import {AiFillCamera} from 'react-icons/ai';
import {useSelector,useDispatch} from 'react-redux'
import { getAuth } from "firebase/auth";
const Chat = () => {

    const db = getDatabase();
    const auth = getAuth();
    const user = useSelector((state) => state.activeChat.active);
   
    const dispatch = useDispatch()
    let [msg,setmsg] = useState('')
   
    let [msglist,setmsglist] = useState([])
    let handlemsg = (e)=>{
        setmsg(e.target.value)
    }

    let handlemsgsend = ()=>{
        
        if(msg!=""){
          if(user.status == 'group'){
            console.log('ata group msg')
          }else{

            set(push(ref(db, 'singlemsg/')), {
                whosend: auth.currentUser.uid,
                whosendname: auth.currentUser.displayName,
                whorecivename: user.name,
                whoreciveid: user.id,
                msg:msg,
              });
            

          }
        }
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
        
         console.log(msglist)
    },[user.id])
   
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
       
       {msglist.map((item)=>
          auth.currentUser.uid ==  item.whosend ?
       (
         <div className='msg' style={Rightalingn}>
         <p style={msgsend}>{item.msg}</p>
         <p className='date' style={senddate} >Today, 2:01pm</p>
        </div>
       )
       :
        (
        <div className='msg' style={leftalingn}>
            <p style={msgrecive}>{item.msg}</p>
            <p className='date' style={recivedate}>Today, 2:01pm</p>
        </div>
        )
       )}
     
       
       
    </div>
    <div className='msgbox'>
        <div className='textarea'>
            <input onChange={handlemsg} type='text' placeholder='Message'/>
            <AiFillCamera className='camera'/>
            <button onClick={handlemsgsend} ><FiSend/>
                
            </button>
        </div>
    </div>
   </div>
  )
}

export default Chat

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