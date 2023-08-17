import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, profileThunk, updateUserThunk, registerThunk } from "../../services/auth-thunks.js";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    firstName: "",
    lastName: ""
  },
  reducers: {
    setUser: (state, action) => {
      // Use the payload to set the user
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      // Clear the user information
      state.currentUser = null;
    },
  },
  extraReducers: {
    // [loginThunk.pending]: (state) => {
    //   state.status = 'loading';
    //   state.error = null;
    // },
    [loginThunk.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      state.currentUser = payload;
      state.error = null;
    },
    [loginThunk.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
  },
    [logoutThunk.fulfilled]: (state) => {
      state.status = 'succeeded';
      state.currentUser = null;
    },
    [profileThunk.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      state.currentUser = payload;
    },
    [profileThunk.rejected]: (state, action) => {
      state.currentUser = null;
      state.error = action.error.message;
    },
    [profileThunk.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [updateUserThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      console.log(payload);
    },
    [updateUserThunk.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [updateUserThunk.rejected]: (state, action) => {
      console.error('Failed to update user:', action.error.message);
      state.error = action.error.message;
    },
    [registerThunk.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      state.currentUser = payload;
      state.error = null;
    },
  }
});

export const { setUser, clearUser } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer;