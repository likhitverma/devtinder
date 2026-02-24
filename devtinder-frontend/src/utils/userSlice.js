import { createSlice } from "@reduxjs/toolkit";

const initialState = null

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => { 
      return action.payload;
    },
    removeUser: (state) => {
       return null
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
