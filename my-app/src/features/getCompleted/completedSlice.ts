import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios  from "axios";
import { RootState } from "../../app/store";
import { ICompleted, IForToday } from "../../models/models";
import completedService, { IQueryParams } from "./completedService";


export const getCompleted = createAsyncThunk<ICompleted[], void,{ state: RootState}>('completed/get', async (_, thunkAPI) => {
    try {
        const params:IQueryParams = {
            endDate: thunkAPI.getState().calendar.endDate,
            startDate: thunkAPI.getState().calendar.startDate,
            userId: thunkAPI.getState().auth.user?._id!
        }
        return completedService.getCompletedItems(params)
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

export const getCompletedForDay = createAsyncThunk<ICompleted[], string, { state: RootState}>('completed/date', async (date: string, thunkAPI) => {
    try {
        const dateInfo:IQueryParams = {
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

export const getCompletedForWeek = createAsyncThunk<ICompleted[], IQueryParams, { state: RootState}>('completed/week', async (dateParams: IQueryParams, thunkAPI) => {
    try {
        return completedService.getCompletedItems(dateParams)
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

export const updateCompleted = createAsyncThunk('completed/update', async (info:Pick<ICompleted, 'id'| 'time'>, thunkAPI) => {
    try {
        return completedService.updateCompleted(info)
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

export const getCompletedToday = createAsyncThunk('completed/today', async ({user_id, exercise_id}:IForToday, thunkAPI) => {
    try {
        const dateInfo:IForToday = {
            user_id,
            exercise_id
        }
        return completedService.getCompletedToday(dateInfo)
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
    completedForWeek: ICompleted[],
    completedItem: ICompleted | null,
    isLoading: boolean,
    isError: boolean,
    isSuccess: boolean,
    isLoadingDay: boolean,
    isSuccessDay: boolean,
    message: string,
}

const initialState: IState = {
    completedArr: [],
    completedForDate:[],
    completedForWeek:[],
    completedItem: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isLoadingDay: false,
    isSuccessDay: false,
    message: '',
}

const completedSlice = createSlice({
    name: 'completed',
    initialState,
    reducers: {
        reset: (state) => initialState,
        clearForDay:(state) => {
            state.completedForDate = []
        },
        resetForDay:(state) => {
            state.isLoadingDay = false;
            state.isSuccessDay = false;
            state.message = '';
        },
        resetUpload:(state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
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
                state.isLoadingDay = true;
            })
            .addCase(getCompletedForDay.fulfilled, (state, action: PayloadAction<ICompleted[]>) =>  {
                state.isLoadingDay = false;
                state.isSuccessDay = true;
                state.isError = false;
                state.completedForDate = action.payload;
            })
            .addCase(getCompletedForDay.rejected, (state, action) => {
                state.isLoadingDay = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(getCompletedForWeek.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCompletedForWeek.fulfilled, (state, action: PayloadAction<ICompleted[]>) =>  {
                state.isLoading = false;
                state.isSuccess = true;
                state.completedForWeek = action.payload;
            })
            .addCase(getCompletedForWeek.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
            })
            .addCase(updateCompleted.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCompleted.fulfilled, (state, action: PayloadAction<ICompleted>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.completedItem = action.payload;
            })
            .addCase(updateCompleted.rejected, (state, action) => {
                state.isLoadingDay = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload as string;
            })
            .addCase(getCompletedToday.fulfilled, (state, action: PayloadAction<ICompleted>) => {
                state.completedItem = action.payload;
            })
    }
});

export const {reset, clearForDay, resetForDay, resetUpload} = completedSlice.actions;
export default completedSlice.reducer;