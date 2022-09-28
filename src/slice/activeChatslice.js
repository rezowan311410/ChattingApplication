import { createSlice } from '@reduxjs/toolkit'

export const activeChatslice = createSlice({
  name: 'activeChat',
  initialState: {
    active: 'ab',
  },
  reducers: {
    activeChat: (state,action) => {
     
      state.active = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const {activeChat} =  activeChatslice.actions

export default  activeChatslice.reducer