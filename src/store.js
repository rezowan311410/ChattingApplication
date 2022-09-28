
import { configureStore } from '@reduxjs/toolkit'
import activeChatslice from './slice/activeChatslice'
export default configureStore({
  reducer: {
    activeChat: activeChatslice,
  },
})