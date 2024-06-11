import { createAsyncThunk } from "@reduxjs/toolkit";
import { setErrorResponse } from "../../helpers";
import { Api } from "../Api";
import { loginQuery } from "../query";

export const fetchLogin = createAsyncThunk(
  "fetchLogin",
  async (body, { rejectWithValue }) => {
    try {
      const res = await Api.graphql({
        query: loginQuery,
        variables: { email: body?.email, password: body?.password },
        showLog: true,
      });

      return res?.adminLogin;
    } catch (e) {
      const err = setErrorResponse(e);
      return rejectWithValue(err);
    }
  }
);
