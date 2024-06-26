import { createSlice } from "@reduxjs/toolkit";

const loginS = createSlice({
  name: "logins",
  initialState: {
    isLoged: {
      login: false,
      role: "",
      userName: "",
      mtll: "",
      token: "",
    },
  },
  reducers: {
    logIn(s, p) {
      s.isLoged.login = true;
      s.isLoged.role = p.payload.role;
      s.isLoged.userName = p.payload.userName;
      s.isLoged.mtll = p.payload.mtll;
      s.isLoged.token = p.payload.token;
    },
    logout(s, p) {
      s.isLoged = {
        login: false,
        role: "",
        userName: "",
        mtll: "",
        token: "",
      };
    },
  },
});

export const loginActions = loginS.actions;
export default loginS;
