import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post } from "@main/apis";
import { RootState } from "@redux/store";
import {
  ISignInRequest,
  ISignInResult,
  ISignUpRequest,
} from "@main/types/auth.types";
import { jwtDecode, JwtPayload } from "jwt-decode";

type UserInfoPayload = JwtPayload & {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
};

type UserInfo = {
  userId: number;
  fullName: string;
};

type AuthenticationState = {
  accessToken?: string;
  isAuthenticated: boolean;
  userInfo?: UserInfo;
};

const initialState: AuthenticationState = {
  isAuthenticated: false,
};

export const signIn = createAsyncThunk(
  "users/sign-in",
  async (payload: ISignInRequest, { rejectWithValue }) => {
    try {
      return await post<ISignInResult>({
        path: "/authentication/sign-in",
        body: payload,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const signUp = createAsyncThunk(
  "users/sign-up",
  async (payload: ISignUpRequest, { rejectWithValue }) => {
    try {
      return await post({
        path: "/authentication/sign-up",
        body: payload,
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
      state.userInfo = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      signIn.fulfilled,
      (state, { payload }: PayloadAction<ISignInResult>) => {
        const data = jwtDecode<UserInfoPayload>(payload.accessToken);
        state.userInfo = {
          userId: Number(
            data[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ]
          ),
          fullName:
            data["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        };
        state.isAuthenticated = true;
        state.accessToken = payload.accessToken;
      }
    );
  },
});

export const { logout } = authenticationSlice.actions;
export const authenticationReducer = authenticationSlice.reducer;
export const selectIsAuthenticated = (state: RootState) =>
  state.authentication.isAuthenticated;
export const selectUserInfo = (state: RootState) =>
  state.authentication.userInfo;
