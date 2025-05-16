import { createSlice } from "@reduxjs/toolkit";

// Check if localStorage is available (e.g., not during server-side or testing)
const isBrowser =
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const userFromStorage = isBrowser
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage || null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      if (isBrowser) {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },
    logout: (state) => {
      state.user = null;
      if (isBrowser) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
