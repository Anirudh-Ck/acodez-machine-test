import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  userDetails: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      //   state.userDetails.push(action.payload);
      const newUser = { id: uuidv4(), ...action.payload };
      state.userDetails.push(newUser);
    },
    deleteUser: (state, action) => {
      // state.userDetails = state.userDetails.filter(
      //   (user, index) => index !== action.payload
      // );
      state.userDetails = state.userDetails.filter(
        (user) => user.id !== action.payload
      );
    },
    updateUser: (state, action) => {
      const index = state.userDetails.findIndex(
        (u) => u.id === action.payload.id
      );
      if (index !== -1) {
        state.userDetails[index] = action.payload;
      }
    },
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
