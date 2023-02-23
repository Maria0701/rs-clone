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
});

export const getsingleProgram = createAsyncThunk('programs/getOne', async (id:string, thunkAPI) => {
    try {
        return programsService.getOneProgram(id);
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


interface programState {
    programs: IProgram[],
    currentProgram: IProgram | null,
    isError: Boolean,
    isSuccess: Boolean,
    isLoading: Boolean,
    message: String,
    isSingleError: Boolean,
    isSingleSuccess: Boolean,
    isSingleLoading: Boolean,
}

const initialState: programState = {
    programs: [],
    currentProgram: null, 
    isError: false,
    isSuccess: false,
    isLoading: false,
    isSingleError: false,
    isSingleSuccess: false,
    isSingleLoading: false,
    message: '',
}


export const programSlice = createSlice({
    name: 'programs',
    initialState,
    reducers: {
        resetPrograms: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
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
            .addCase(getsingleProgram.pending, (state) => {
                state.isSingleLoading = true;
            })
            .addCase(getsingleProgram.fulfilled, (state, action: PayloadAction<IProgram>) => {
                state.isSingleLoading = false;
                state.isSingleError = false;
                state.isSingleSuccess = true;
                state.currentProgram = action.payload;
            })
            .addCase(getsingleProgram.rejected, (state, action) =>{
                state.isSingleLoading = false;
                state.isSingleError = true;
                state.message = action.payload as string;
                state.programs = [];
            })
    },
});
export const {resetPrograms} = programSlice.actions;
export default programSlice.reducer;