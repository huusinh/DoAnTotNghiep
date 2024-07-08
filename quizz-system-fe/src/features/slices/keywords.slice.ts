import { get, post } from "@main/apis";
import { CreateRequest, PaginationResult } from "@main/types/integration.types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";
import { KeywordRecord } from "@main/types/keyword.types";

type InitialState = {
  keywords: PaginationResult<KeywordRecord>;
  keywordsSelect: KeywordRecord[];
  currentPage: number;
};

const initialState: InitialState = {
  keywords: {
    results: [],
    totalItems: 0,
  },
  keywordsSelect: [],
  currentPage: 1,
};

type UpdateKeywordRequest = {
  keywordId: number;
} & Omit<KeywordRecord, "id">;

export const getKeywords = createAsyncThunk(
  "keywords/fetch",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { currentPage } = (getState() as RootState).keywords;

      return await get<PaginationResult<KeywordRecord>>({
        path: "question",
        query: {
          pageIndex: currentPage,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const createKeyword = createAsyncThunk(
  "keywords/create",
  async (payload: CreateRequest<KeywordRecord>, { rejectWithValue }) => {
    try {
      return await post({
        path: "question",
        body: payload,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getKeywordById = createAsyncThunk(
  "keywords/fetch/one",
  async (keywordId: number, { rejectWithValue }) => {
    try {
      return await get<KeywordRecord>({
        path: `question/${keywordId}`,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateKeyword = createAsyncThunk(
  "keywords/update",
  async (
    { keywordId, ...restFields }: UpdateKeywordRequest,
    { rejectWithValue }
  ) => {
    try {
      return await post<KeywordRecord>({
        path: `question/${keywordId}/update`,
        body: restFields,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteKeyword = createAsyncThunk(
  "keywords/delete",
  async (keywordId: number, { rejectWithValue }) => {
    try {
      return await post<KeywordRecord>({
        path: `question/${keywordId}/delete`,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const getKeywordsSelect = createAsyncThunk(
  "keywords/fetch/select",
  async (_, { rejectWithValue }) => {
    try {
      return await get<KeywordRecord[]>({
        path: `question/select`,
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const keywordsSlice = createSlice({
  name: "keywords",
  initialState,
  reducers: {
    setCurrentPage(state, { payload }: PayloadAction<number>) {
      state.currentPage = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getKeywords.fulfilled, (state, { payload }) => {
      state.keywords = payload;
    });
    builder.addCase(getKeywordsSelect.fulfilled, (state, { payload }) => {
      state.keywordsSelect = payload;
    });
  },
});

export const keywordsReducer = keywordsSlice.reducer;
export const { setCurrentPage } = keywordsSlice.actions;
export const selectKeywordsData = (state: RootState) => state.keywords.keywords;
export const selectKeywordsDropdown = (state: RootState) =>
  state.keywords.keywordsSelect;
