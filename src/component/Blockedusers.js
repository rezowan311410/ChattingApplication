import React, { useEffect, useState } from 'react';
import { getAuth } from "firebase/auth";
import {BsThreeDotsVertical} from 'react-icons/bs';
import { getDatabase, ref, set,onValue,push, remove } from "firebase/database";
const Blockedusers = () => {
  const db = getDatabase();
  const auth = getAuth();
  let[block,setblock] = useState([]);
  useEffect(()=>{
      
    const Friendrequestref = ref(db, 'block/');
    onValue(Friendrequestref, (snapshot) => {
      let blockArr = []
      const data = snapshot.val();
      snapshot.forEach((item)=>{
        if(auth.currentUser.uid == item.val().blockbyid){
          blockArr.push({
          id:item.key,
          block: item.val().block,
          blockid: item.val().blockid,
           
              })
           }else if(auth.currentUser.uid == item.val().blockid){
            blockArr.push({
              id:item.key,
              blockbyid: item.val().blockbyid,
              blockby: item.val().blockby,
               
            })
           }
       
           
           })
           setblock(blockArr)
        });
        
    },[])
    let handleunblock = (item)=>{
      set(push(ref(db, 'acceptfriend/')), {
        
        sendername: item.block,
        senderid: item.blockid,
        reciverid: auth.currentUser.uid,
        recivername: auth.currentUser.displayName,
       
        date: `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`,
        
    }).then(()=>{
      remove(ref(db,'block/'+item.id))
    })
    }
  return (
    <div className='Grouprequest'>
   
    <div className='icon2'>
    <BsThreeDotsVertical/>
    </div>
   
    <h2>Blocked Users</h2>
           {block.map(item=>(
               <div className='main'>
               <div className='img'>
                    <img src='./assets/images/Ellipse 2.png'/>
                </div>
                <div className='item'>
                <h1>{item.block}</h1>
                <h1>{item.blockby}</h1>
                 <p>Hi Guys, Wassup!</p>
                </div>
              {
                item.blockbyid?
                ""
                :
                <div className='button'>
                <div className='extra'>
                <p>29/08/2022</p>
                <button onClick={()=>handleunblock(item)}>Unblocked</button>
                
                </div>
            </div>
              }
               </div>
           
           ))}
             
   
  
  
</div>
  )
}

export default Blockedusers