// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isAuthenticated: !!Cookies.get('token'),
  token: Cookies.get('token') || null,
  type:null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.access_token;
      state.type = action.payload.user.type;
      Cookies.set('token', action.payload.access_token, { expires: 1 / 24 }); // Set cookie with a 1-hour expiration
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      Cookies.remove('token');
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
