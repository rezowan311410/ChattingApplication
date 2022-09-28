import React,{useState, useEffect} from 'react'
import {AiOutlineHome,AiOutlineMessage,AiOutlineCloudUpload} from  'react-icons/ai';
import {IoMdNotificationsOutline} from  'react-icons/io';
import { getStorage, ref, uploadString,getDownloadURL } from "firebase/storage";
import {FiLogOut,FiSettings} from  'react-icons/fi';

 import { getAuth, signOut,onAuthStateChanged,updateProfile } from "firebase/auth";
 import {useNavigate,Link} from 'react-router-dom'
 import { Typography,Box,Modal,} from '@mui/material'
 import Cropper from "react-cropper";
 import "cropperjs/dist/cropper.css";
const Leftbar = (props) => {
  const auth = getAuth();
  const storage = getStorage();
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const [open2,setOpen2] = useState(false)
  const [loading,setloading] = useState(false)
  const [check,setcheck] = useState(false)
  const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();

  

  let [name,setName] = useState('')
  let [email,setemail] = useState('')
  let [id,setid] = useState('')
  let [createtime,setcreatetime] = useState('')
  

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
      setName(user.displayName)
      setemail(user.email)
      setid(user.uid)
      setcreatetime(user.metadata.creationTime)
      } 
    });
    
  },[check])

  let handlelogout = () => {
    signOut(auth).then(() => {
      navigate('/login')
    }).catch((error) => {
      console.log(error)
    });
    
  }

  let handleOpen = ()=>{
    setOpen(true)
   

  }

  let handleClose= ()=>{
    setOpen(false)
   

  }

  let handleOpen2 = ()=>{
    setOpen2(true)
   

  }
  
  let handleClose2 = ()=>{
    setOpen2(false)
   

  }

  let handlechangeprofile = (e)=>{
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  
  }

  const getCropData = () => {
     setloading(true)
    if (typeof cropper !== "undefined") {
      
      const storageRef = ref(storage,auth.currentUser.uid);
      const message4 = cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        setImage('')
        setloading(false)
        setOpen2(false)
      console.log('Uploaded a data_url string!');
      console.log(snapshot)
      getDownloadURL(storageRef)
      .then((url) => {
        updateProfile(auth.currentUser, {
         photoURL:url
        }).then(() => {
          console.log('uploaded')
          setcheck(!check)
        }).catch((error) => {
          console.log(error)
        });
      })
     });
    }
  };

  return (
    <div className='leftbar-part'>
       <div className='imagebox'>
        {
          !auth.currentUser.photoURL
          ?
          <img className='imagepic' src='./assets/images/profile.jpg'/>
          :
          <img className='imagepic' src={auth.currentUser.photoURL}/>
        }

       <div className='Overlay' onClick={handleOpen2}>
        <AiOutlineCloudUpload className="aiicons"/>
       </div>
       </div>
        <h5 onClick={handleOpen}>{name}</h5>
        <div className='icons'>
          <ul>
            <li className={props.active=='home' && 'active'}>
              <Link to='/home'>
                 <AiOutlineHome/>
              </Link>
             
            </li>  
            <li className={props.active=='msg' && 'active'}>
            <Link to='/message'>
               <AiOutlineMessage/>
              </Link>
            </li>      
            <li className={props.active=='notification' && 'active'}>
              <IoMdNotificationsOutline/>
            </li> 
            <li className={props.active=='setting' && 'active'}>
             <FiSettings/>
            </li>
            <li className={props.active=='logout' && 'active'}>
              <FiLogOut onClick={handlelogout}/>
            </li>
          </ul>
        </div>
        <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  className='position'
>
  <Box className='leftbarbox'>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Account Information
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
     <ul className='accountinfo'>
      <li><span>your id:</span> {id}</li>
      <li><span>your email:</span> {email}</li>
      <li><span>Account Create:</span> {createtime}</li>
     </ul>
    </Typography>
  </Box>
</Modal>

<Modal
  open={open2}
  onClose={handleClose2}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  className='position'
>
  <Box className='leftbarbox'>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Image Upload
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
     <ul className='accountinfo'>
     <div className='imagebox2'>
     {
          !auth.currentUser.photoURL
          ?
          image
          ?
          <div className='img-preview'></div>
          :
          <img className='imagepic' src='./assets/images/profile.jpg'/>
          :
          image
          ?
          <div className='img-preview'></div>
          :
          <img className='imagepic' src={auth.currentUser.photoURL}/>
        }
      
       <div className='Overlay'>
        
       </div>
       </div>
       
     <input type="file" onChange={handlechangeprofile}/>
     <Cropper
          style={{ height: 200, width: "50%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
       {
        image?
        loading
        ?
        <button>
           upload...
       </button>
         :
        <button  onClick={getCropData}>
          upload image
       </button>
       :
       ""
       }
        
     </ul>
     
    </Typography>
  </Box>
</Modal>
    </div>
  )
}

export default Leftbar