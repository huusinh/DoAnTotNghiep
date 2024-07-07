import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "@redux/store"

const initialState = {
    isLoading: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState: initialState,
    reducers: {
        showLoadingDialog(state) {
            state.isLoading = true
        },
        closeLoadingDialog(state) {
            state.isLoading = false
        }
    }
})

export const { showLoadingDialog, closeLoadingDialog } = loadingSlice.actions
export const loadingReducer = loadingSlice.reducer
export const selectLoadingState = (state: RootState) => state.loading.isLoading