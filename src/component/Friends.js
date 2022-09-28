import React, { useEffect, useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue} from "firebase/database";
import { Alert } from '@mui/material';
import {RiMessage2Fill} from 'react-icons/ri';
import {useSelector, useDispatch} from 'react-redux';
import { activeChat } from '../slice/activeChatslice';
const Friends = (props) => {

  const dispatch = useDispatch();
 

 
   
    const auth = getAuth();
    const db = getDatabase();
    let [friends,setFriends] = useState([])
    
    
    useEffect(()=>{
        const friend = ref(db,'acceptfriend/');
        let friendarray = []
        onValue(friend, (snapshot) => {
        //   const data = snapshot.val();
        
          snapshot.forEach(item => {
           
                
                if(auth.currentUser.uid == item.val().reciverid || auth.currentUser.uid == item.val().senderid){
                    friendarray.push(item.val())
                }
            });
            setFriends(friendarray)
           
        });
          
    },[])

    let handleactivechat = (item)=>{
      let userInfo = {};
      
      if(item.reciverid == auth.currentUser.uid){
        userInfo.id = item.senderid;
        userInfo.name = item.sendername;
        userInfo.status ="single"
       
      }else{
        userInfo.id = item.reciverid;
        userInfo.name = item.recivername;
        userInfo.sendername = item.sendername;
        
        userInfo.status ="single"
      }
      dispatch(activeChat(userInfo))
      

    }
  return (
    <div className='Grouprequest'>
    <h2>
      {friends.length} {friends.length >1 ? " Friends": "Friend" }
    </h2>
    <div className='icon2'>
    <BsThreeDotsVertical/>
    </div>
   
    
    {friends.length == 0 &&
          <Alert severity="success">No Friend Request</Alert>}
         {friends.map(item =>(
             <div className='main' onClick={()=>handleactivechat(item)}>
             <div className='img'>
                  <img src='./assets/images/Ellipse 2.png'/>
              </div>
              <div className='item'>
                {
                    auth.currentUser.uid == item.senderid 
                    ?
                    <h1>{item.recivername}</h1> 
                    :
                    <h1>{item.sendername}</h1> 
                }
                   
                 
              </div>
              <div className='button'>
                {props.item=="date" ?<p>{item.date}</p>:
                 <div className='button'>
                 <button>
                    <RiMessage2Fill/>
                 </button>
                 </div>
                }
                  
                 
              </div>
             </div>
         ))

         }
   
  
  
</div>
  )
}

export default Friends