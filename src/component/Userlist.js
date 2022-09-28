import React, { useState }  from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs';
import { getDatabase, ref, onValue,set,push} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect } from 'react';
import { BsCheckSquareFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { width } from '@mui/system';


const Userlist = () => {
    const auth = getAuth();
    const db = getDatabase();
    let [change,setchange] = useState(false);

   let [userlist,setuserlist] = useState([])
   let[friendrequest,setFriendrequest] = useState([])
   let[friend,setFriend] = useState([])
  
    useEffect(()=>{
         let useArr = []
        const userRef = ref(db, 'users');
        onValue(userRef, (snapshot) => {
           snapshot.forEach((item)=>{
            // useArr.push(item.val())
           useArr.push({
            username: item.val().username,
            email: item.val().email,
           
            id: item.key
           })
           
           })
           setuserlist(useArr)
        });
       
    },[])
    
    console.log(friendrequest)
    useEffect(()=>{
        let FriendrequestArr = []
    
      
        const Friendrequestref = ref(db, 'friends/');
        onValue(Friendrequestref, (snapshot) => {
     
          snapshot.forEach((item)=>{
          
              FriendrequestArr.push(item.val().reciverid+item.val().senderid)
             
           
       
           
           })
           setFriendrequest(FriendrequestArr)
           
        });
        
    },[change])

    useEffect(()=>{
      let FriendArr = []
     
    
      const Friendref = ref(db, 'acceptfriend/');
      onValue(Friendref, (snapshot) => {
   
        snapshot.forEach((item)=>{
        
          FriendArr.push(item.val().reciverid+item.val().senderid)
           
         
     
         
         })
         setFriend(FriendArr)
         
      });
      
  },[])
     
    let handlerequest = (info)=>{
        set(push(ref(db, 'friends/')), {
            sendername: auth.currentUser.displayName,
            reciverid: info.id,
            recivername: info.username,
            senderid: auth.currentUser.uid
            
           
          });
          setchange(!change)
    }
  return (
    <div className='Grouprequest'>
    
    <div className='icon2'>
    <BsThreeDotsVertical/>
    </div>
    <h2>userlist</h2>
    {userlist.map(item=>(
    auth.currentUser.uid !== item.id && 
        <div className='main'>
        <div className='img'>
             <img src='./assets/images/Ellipse 2.png'/>
         </div>
         <div className='item'>
             <h1>{item.username}</h1>
             <h4>{item.id}</h4>
            
            
         </div>

         {
          friend.includes(item.id+auth.currentUser.uid) ||
          friend.includes(auth.currentUser.uid+item.id)
          ?
          <div className='button'>
          <button><FaUserFriends/></button>
         </div>
         
             
           
          :
          friendrequest.includes(item.id+auth.currentUser.uid) ||
          friendrequest.includes(auth.currentUser.uid+item.id)?
           <h1><BsCheckSquareFill/></h1>
        
        :
        <div className='button'>
        <button onClick={()=>handlerequest(item)}>+</button>
       </div>
         }
        
           </div>
    ))}
  
</div>
  )
}

export default Userlist