import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios  from "axios";
import { RootState } from "../../app/store";
import { ICompleted } from "../../models/models";
import completedService, { IQueryParams } from "./completedService";


export const getCompleted = createAsyncThunk('completed/get', async (completed: IQueryParams, thunkAPI) => {
    try {
        return completedService.getCompletedItems(completed)
    } catch (error: unknown) {
        let message;
        if (axios.isAxiosError(error)) {
            message = error.response && error.response.data && error.response.data.message;
        } else if (error instanceof Error){
            message = error.message || error.toString();
        }
        
      return thunkAPI.rejectWithValue(message)
    }
});

export const setCompleted = createAsyncThunk('completed/post', async (completedData: ICompleted, thunkAPI) => {
    try {
        return completedService.setCompletedItem(completedData);
    }catch (error: unknown) {
        let message;
        if (axios.isAxiosError(error)) {
            message = error.response && error.response.data && error.response.data.message;
        } else if (error instanceof Error){
            message = error.message || error.toString();
        }
        
      return thunkAPI.rejectWithValue(message)
    }
});

export const getCompletedForDay = createAsyncThunk<ICompleted[], string,  { state: RootState}>('completed/date', async (date: string, thunkAPI) => {
    try {
        const dateInfo = {
            endDate: date,
            startDate: date,
            userId: thunkAPI.getState().auth.user?._id!
        }
        return completedService.getCompletedItems(dateInfo)
    } catch (error: unknown) {
        let message;
        if (axios.isAxiosError(error)) {
            message = error.response && error.response.data && error.response.data.message;
        } else if (error instanceof Error){
            message = error.message || error.toString();
        }
        
      return thunkAPI.rejectWithValue(message)
    }
});

export interface IState {
    completedArr: ICompleted[],
    completedForDate: ICompleted[],
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    message: string,
}

const initialState: IState = {
    completedArr: [],
    completedForDate:[],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

const completedSlice = createSlice({
    name: 'completed',
    initialState,
    reducers: {
        reset: (state) => initialState,
        clearForDay:(state) => {
            state.completedForDate = []
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(getCompleted.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCompleted.fulfilled, (state, action: PayloadAction<ICompleted[]>) =>  {
                state.isLoading = false;
                state.isSuccess = true;
                state.completedArr = action.payload;
            })
            .addCase(getCompleted.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(setCompleted.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(setCompleted.fulfilled, (state, action: PayloadAction<ICompleted>) =>  {
                state.isLoading = false;
                state.isSuccess = true;
                state.completedArr.push(action.payload);
            })
            .addCase(setCompleted.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(getCompletedForDay.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCompletedForDay.fulfilled, (state, action: PayloadAction<ICompleted[]>) =>  {
                state.isLoading = false;
                state.isSuccess = true;
                state.completedForDate = action.payload;
            })
            .addCase(getCompletedForDay.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
    }
});

export const {reset, clearForDay} = completedSlice.actions;
export default completedSlice.reducer;