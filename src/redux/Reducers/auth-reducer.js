import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, profileThunk, profileOtherThunk, updateUserThunk, registerThunk, addFollowToUserThunk, getBookDetailsByProfileThunk, deleteBookCommentThunk } from "../../services/auth-thunks.js";

const userSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    otherUser: null,
    likedBooksDetails: [],
    commentedBooksDetails: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    firstName: "",
    lastName: "",
    // avatar: "",
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
    [registerThunk.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      state.currentUser = payload;
      state.error = null;
    },
    [registerThunk.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [loginThunk.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [loginThunk.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      state.currentUser = payload;
      state.error = null;
    },
    [loginThunk.rejected]: (state, action) => {
      state.status = 'failed';
      // state.error = null;
      state.error = action.error.message;
    },
    [logoutThunk.fulfilled]: (state) => {
      state.status = 'succeeded';
      state.currentUser = null;
    },
    [profileThunk.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      console.log("profileThunk: ", payload);
      console.log("loginThunk: ", state.currentUser);
      state.currentUser = payload;
      state.error = null;
    },
    [profileThunk.rejected]: (state, action) => {
      console.log("profileThunk: rejected");
      state.status = 'failed';
      state.error = action.error.message;
      console.error("profileThunk rejected:", action.error);
    },
    [profileThunk.pending]: (state) => {
      console.log("profileThunk: loading");
      state.status = 'loading';
      state.error = null;
    },
    
    [profileOtherThunk.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      state.otherUser = payload;
      state.error = null;
    },
    [profileOtherThunk.rejected]: (state, action) => {
      console.log("profileThunk: rejected");
      state.status = 'failed';
      state.error = action.error.message;
      console.error("profileThunk rejected:", action.error);
    },
    [profileOtherThunk.pending]: (state) => {
      console.log("profileThunk: loading");
      state.status = 'loading';
      state.error = null;
    },

    [updateUserThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
    },
    [updateUserThunk.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [updateUserThunk.rejected]: (state, action) => {
      console.error('Failed to update user:', action.error.message);
      state.error = action.error.message;
    },
    [addFollowToUserThunk.fulfilled]: (state, { payload }) => {
      state.currentUser = payload.updatedCurrentUser; // Assuming the backend sends the updated current user as 'updatedCurrentUser'
      state.otherUser = payload.updatedFollowedUser;  // Optionally update the followed user if necessary
      state.error = null;
    },
    [getBookDetailsByProfileThunk.fulfilled]: (state, action) => {
      state.likedBooksDetails = action.payload.likedBooks;
      state.commentedBooksDetails = action.payload.commentedBooks;
      state.status = 'succeeded';
    },
    [getBookDetailsByProfileThunk.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [deleteBookCommentThunk.fulfilled]: (state, action) => {
      state.status = 'success';
      state.error = null;
    },
    [deleteBookCommentThunk.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer;