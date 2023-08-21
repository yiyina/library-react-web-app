import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service.js";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({username, password, email, avatarUrl}) => {
    const user = await authService.register({username, password, email, avatarUrl});
    return user;
  }
);
export const loginThunk = createAsyncThunk(
    "user/login", async (credentials) => {
      const user = await authService.login(credentials);
      return user;
    }
);
export const profileThunk = createAsyncThunk(
    "auth/profile", async () => {
      const response = await authService.profile();
      console.log("profileThunk", response);
      return response;
});
export const profileOtherThunk = createAsyncThunk(
    "auth/profileOther", async (userId) => {
      const response = await authService.profileOther(userId);
      return response;
});
export const logoutThunk = createAsyncThunk(
    "auth/logout", async () => {
      return await authService.logout();
});
export const updateUserThunk = createAsyncThunk(
    "user/updateUser", async (user) => {
     await authService.updateUser(user);
     return user;
});
export const addFollowToUserThunk = createAsyncThunk(
    "user/addFollowToUser", 
    async ({ userId, currentUser }, thunkAPI) => {
        const response = await authService.addFollowToUser(userId, currentUser);
        return response;
    }
);
export const getBookDetailsByProfileThunk = createAsyncThunk(
    "book/getDetailsByProfile",
    async (bookId, thunkAPI) => {
        const response = await authService.getBookDetailsByProfile(bookId);
        return response;
    }
)
