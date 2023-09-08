import { useState, useEffect } from 'react';
import React from 'react';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import {BrowserRouter,Routes,Route,} from "react-router-dom";
import {FaToggleOff} from 'react-icons/fa';
import {FaToggleOn} from 'react-icons/fa';
import { getAuth, signOut,onAuthStateChanged } from "firebase/auth";

import { async } from '@firebase/util';
import Resetpassword from './pages/Resetpassword';
import Message from './pages/Message';
import Notifications from './pages/Notifications';
function App() {
  const auth = getAuth();
let [dl,setdl] = useState(false)
let [show,setshow] = useState(false)
let handledark = ()=>{
  setdl(!dl)
}
useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setshow(true)
    } else {
      setshow(false)
      setdl(false)
    }
  });
  
},[])
  return (
<>
     
       <div className={dl ? "dark": "light"}>
      {show&&
         <div className='dlmode' onClick={handledark}>
         {
           dl
           ?
          <>
           <span className='off'><FaToggleOff/></span>
           <span className='text'>Switch to Light</span>
          </>
           :
          <>
           <span className='on'><FaToggleOn/></span>
           <span className='text'>Switch to Dark</span>
          </>
         }
        
  
        </div>
        
      }
<BrowserRouter>
    <Routes>
      <Route path="/" element={<Registration/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/reset" element={<Resetpassword/>}></Route>
      <Route path="/message" element={<Message/>}></Route>
      <Route path="/notification" element={<Notifications/>}></Route>
   
   
    </Routes>
  </BrowserRouter>
  </div>
  
</>


  );
}

export default App;
