import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post } from "@main/apis";
import { RootState } from "@redux/store";
import { ISignInRequest, ISignInResult } from "@main/types/auth.types";

type AuthenticationState = {
  accessToken?: string;
  isAuthenticated: boolean;
};

const initialState: AuthenticationState = {
  isAuthenticated: false,
};

export const signIn = createAsyncThunk(
  "users/sign-in",
  async ({ username, password }: ISignInRequest, { rejectWithValue }) => {
    try {
      return await post<ISignInResult>({
        path: "auth/sign-in",
        body: {
          username,
          password,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = undefined;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      signIn.fulfilled,
      (state, { payload }: PayloadAction<ISignInResult>) => {
        state.accessToken = payload.accessToken;
      }
    );
  },
});

export const { logout } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
export const selectIsAuthenticated = (state: RootState) =>
  state.authentication.isAuthenticated;
