import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import { IUpdateData } from '../../models/models';
import userUpdateService from './userUpdatesService';

interface updateUserState {
    userUpdated: IUpdateData | null,
    isError: Boolean,
    isSuccess: Boolean,
    isLoading: Boolean,
    message: String,
}

const initialState: updateUserState = {
    userUpdated: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}


export const update = createAsyncThunk('user/update', async (user: IUpdateData, thunkAPI)=> {
    try {
        return userUpdateService.update(user);
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


export const userSlice = createSlice({
    name: 'updatedUser',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(update.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(update.fulfilled, (state, action: PayloadAction<IUpdateData>) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.userUpdated = action.payload;
            })
            .addCase(update.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
                state.userUpdated = null;
            })
    },
});


// export const {reset} = userSlice.actions;
export default userSlice.reducer;