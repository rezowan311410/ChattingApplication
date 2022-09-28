import React from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs';
import { getDatabase, push, ref, set,onValue} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useEffect,useState } from 'react';
const Mygroup = () => {
  const auth = getAuth();
  const db = getDatabase();
  let [pusharr,setpusharr] = useState([])
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
  },[])
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
        <button>Accept</button>
    </div>
   </div>
    </>
   ))}
   
  
  
</div>
  )
}

export default Mygroup