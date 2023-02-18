import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IProgram } from "../../models/models";
import programsService from "./programServise";

export const getAllPrograms = createAsyncThunk('programs/getAll', async (_, thunkAPI) => {
    try {
        return programsService.getAllPrograms();
    } catch (error: unknown) {
        let message;
        if (axios.isAxiosError(error)) {
            message = error.response && error.response.data && error.response.data.message;
        } else if (error instanceof Error){
            message = error.message || error.toString();
        }
        
      return thunkAPI.rejectWithValue(message)
    }
})

interface programState {
    programs: IProgram[],
    isError: Boolean,
    isSuccess: Boolean,
    isLoading: Boolean,
    message: String,
}

const initialState: programState = {
    programs: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}


export const programSlice = createSlice({
    name: 'programs',
    initialState,
    reducers: {
        reset: state => initialState,
    },
    extraReducers:(builder) => {
        builder
            .addCase(getAllPrograms.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPrograms.fulfilled, (state, action: PayloadAction<IProgram[]>) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.programs = action.payload;
            })
            .addCase(getAllPrograms.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
                state.programs = [];
            })
    },
});

export default programSlice.reducer;