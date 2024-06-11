import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from "../../../services/request";

const initialState = {
  isLoading: false,
  data: null,
  error: "",
};

export const LoginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    resetDataLogin: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(fetchLogin.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.error = "";
      state.isLoading = false;
    });
    builder.addCase(fetchLogin.rejected, (state, { payload }) => {
      state.data = null;
      state.error = payload;
      state.isLoading = false;
    });
  },
});

export const { resetDataLogin } = LoginSlice.actions;

export default LoginSlice.reducer;
