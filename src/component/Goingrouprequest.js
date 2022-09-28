import React,{useEffect,useState} from 'react'
import {BsThreeDotsVertical} from 'react-icons/bs';
import {RiMessage2Fill} from 'react-icons/ri';
import { getDatabase,push, ref, set,onValue} from "firebase/database";
import { getAuth } from "firebase/auth";
import {useSelector, useDispatch} from 'react-redux'
import { activeChat } from '../slice/activeChatslice';
const Goingrouprequest = () => {
  const db = getDatabase();
     const auth = getAuth();
     const dispatch = useDispatch()
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

  let handleactivechat = (item)=>{
    let userInfo = {
        status:'group',
        name:item.groupname,
        groupid:item.key,
        groupadmin:item.admineid
    };
    
    dispatch(activeChat(userInfo))
    

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
    </div>
   </div>
    </>
   )}
 
   
     {/* <div className='main'>
   <div className='img'>
        <img src='./assets/images/Ellipse 2.png'/>
    </div>
    <div className='item'>
        <h1>Mern</h1>
        <p>Be a mern star</p>
       
    </div>
    <div className='button'>
        <button><RiMessage2Fill/></button>
    </div>
   </div> */}
   </div>
  )
}

export default Goingrouprequest