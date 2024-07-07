import { PaginationResult } from "@main/types/integration.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateQuizz, QuizzRecord } from "@main/types/quizz.types";
import { get, post } from "@main/apis";
import { RootState } from "../store";

type InitialState = {
  quizz: PaginationResult<QuizzRecord>;
  currentPage: number;
};

const initialState: InitialState = {
  quizz: {
    results: [],
    totalItems: 0,
  },
  currentPage: 1,
};

export const getQuizzList = createAsyncThunk(
  "quizz/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { currentPage } = (getState() as RootState).quizz;
      return get<PaginationResult<QuizzRecord>>({
        path: "competition",
        query: {
          pageIndex: currentPage,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const addQuizz = createAsyncThunk(
  "quizz/create",
  async (payload: CreateQuizz, { rejectWithValue }) => {
    try {
      return await post({
        path: "competition",
        body: payload
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const quizzSlice = createSlice({
  name: "quizz",
  initialState,
  reducers: {
    setCurrentPage(state, { payload }: PayloadAction<number>) {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuizzList.fulfilled, (state, { payload }) => {
      state.quizz = payload;
    });
  },
});

export const quizzReducer = quizzSlice.reducer;
export const { setCurrentPage } = quizzSlice.actions;
export const selectQuizzData = (state: RootState) => state.quizz.quizz;
