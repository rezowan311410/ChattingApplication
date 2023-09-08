import { createSlice } from '@reduxjs/toolkit';

export const notificationslice = createSlice({
  name: "notification",
  initialState: {
    amount: 0,
  },
  reducers: {
    notification: (state,action) => {
     
      state.amount = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const {notification} =  notificationslice.actions

export default  notificationslice.reducer