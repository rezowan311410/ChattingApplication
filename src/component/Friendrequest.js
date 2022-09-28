import React, { useEffect, useState } from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs';
import { getDatabase, ref, onValue,set,push, remove} from "firebase/database";
import { getAuth } from "firebase/auth";
import { Alert } from '@mui/material';
const Friendrequest = () => {
    const auth = getAuth();
    const db = getDatabase();
    let[friendrequest,setFriendrequest] = useState([]);
    let[dlt,setDlt] = useState(true);
    
    let FriendrequestArr = []


      useEffect(()=>{
      
    const Friendrequestref = ref(db, 'friends/');
    onValue(Friendrequestref, (snapshot) => {
      const data = snapshot.val();
      snapshot.forEach((item)=>{
        console.log(item.key)
        if(auth.currentUser.uid == item.val().reciverid){
          FriendrequestArr.push({
          id:item.key,
          sendername: item.val().sendername,
          recivername: item.val().recivername,
          reciverid: item.val().reciverid,
          senderid: item.val().senderid,
           
              })
           }
       
           
           })
           setFriendrequest(FriendrequestArr)
        });
        
    },[dlt])

let  handleacceptfriend = (info)=>{
  set(push(ref(db, 'acceptfriend/')), {
          id:info.id,
          sendername: info.sendername,
          recivername: info.recivername,
          reciverid: info.reciverid,
          senderid: info.senderid,
          date: `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`,
          
  }).then(()=>{
    remove(ref(db,'friends/'+info.id)).then(()=>{
      setDlt(!dlt)
    })
  })
 
 
}
  return (
    <div className='Grouprequest'>
    
    <div className='icon2'>
    <BsThreeDotsVertical/>
    </div>
    <h2>Friendrequest</h2>
    {friendrequest.map(item=>(
      
         <div className='main'>
         <div className='img'>
              <img src='./assets/images/Ellipse 2.png'/>
          </div>
          <div className='item'>
              <h1>{item.sendername}</h1>
              <p>Hi Guys, Wassup!</p>
          </div>
          <div onClick={()=>handleacceptfriend(item)} className='button'>
              <button>Accept</button>
          </div>
         </div>
       
    ))}
 {friendrequest.length == 0 &&
          <Alert severity="success">No Friend Request</Alert>}
</div>
  )
}

export default Friendrequest