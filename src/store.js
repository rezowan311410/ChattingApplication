
import { configureStore } from '@reduxjs/toolkit'
import activeChatslice from './slice/activeChatslice'
import notificationslice from './slice/notificationslice'
export default configureStore({
  reducer: {
   
    activeChat: activeChatslice,
    notification: notificationslice,
    
  },
})