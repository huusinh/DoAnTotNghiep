import { CreateRequest, PaginationResult } from "@main/types/integration.types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateQuizz, QuizzRecord, QuizzResult } from "@main/types/quizz.types";
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

type GetQuizzQuestionsRequest = {
  competitionId: number;
  teamId: number;
};

type UpdateCompetitionRequest = {
  competitionId: number;
} & CreateRequest<QuizzRecord>;

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
        body: payload,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getQuizzDetail = createAsyncThunk(
  "quizz/fetch/single",
  async (competitionId: number, { rejectWithValue }) => {
    try {
      return await get<QuizzRecord>({
        path: `competition/${competitionId}`,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getQuizzQuestions = createAsyncThunk(
  "quizz/fetch/questions",
  async (
    { competitionId, teamId }: GetQuizzQuestionsRequest,
    { rejectWithValue }
  ) => {
    try {
      return await get<QuizzResult[]>({
        path: `competition/${competitionId}/teams/${teamId}/questions`,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteQuizz = createAsyncThunk(
  "quizz/delete",
  async (competitionId: number, { rejectWithValue }) => {
    try {
      return await post({
        path: `competition/${competitionId}/delete`,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateQuizz = createAsyncThunk(
  "quizz/update",
  async (
    { competitionId, ...restFields }: UpdateCompetitionRequest,
    { rejectWithValue }
  ) => {
    try {
      return await post({
        path: `competition/${competitionId}/update`,
        body: restFields,
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
