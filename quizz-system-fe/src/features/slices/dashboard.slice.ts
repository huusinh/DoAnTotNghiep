import { get } from "@main/apis";
import { DashboardData } from "@main/types/dashboard.types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getDashboardData = createAsyncThunk(
  "competition/histories",
  async (pageIndex: number, { rejectWithValue }) => {
    try {
      return await get<DashboardData>({
        path: "home",
        query: {
          pageIndex,
        },
      });
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
