import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service.js";

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
      return response.data;
});
export const logoutThunk = createAsyncThunk(
    "auth/logout", async () => {
      return await authService.logout();
});
export const updateUserThunk = createAsyncThunk(
      "user/updateUser", async (user) => {
        console.log("updateThunk success"),
      console.log("updateThunk", await authService.updateUser(user));
      return await authService.updateUser(user);
    }
);
export const registerThunk = createAsyncThunk(
    "auth/register",
    async ({username, password, email}) => {
      const user = await authService.register({username, password, email});
      return user;
    }
);