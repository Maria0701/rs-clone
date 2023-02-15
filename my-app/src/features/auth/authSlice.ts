import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { IRegisterData } from '../../models/models';
import authService from './authService';

//get  user from localStorage
const user  = JSON.parse(localStorage.getItem('user')  as string);

interface authState {
    user: IRegisterData | null,
    isError: Boolean,
    isSuccess: Boolean,
    isLoading: Boolean,
    message: String,
}

const initialState: authState = {
    user: Boolean(user) ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// Register User 
export const register = createAsyncThunk('auth/register', async (user:IRegisterData, thunkAPI) => {
    try {
        return authService.register(user);

    } catch(error: unknown) {
        if (error instanceof Error) {
            const message =  error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
});

// Register User 
export const login = createAsyncThunk('auth/login', async (user:Pick<IRegisterData, 'email' | 'password'>, thunkAPI) => {
    try {
        return authService.login(user);

    } catch(error: unknown) {
        if (error instanceof Error) {
            const message =  error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const logout = createAsyncThunk('auth/logout', async () => {
    authService.logout();
})

export const authSlice = createSlice({
    name: 'auth',
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
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<IRegisterData>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<IRegisterData>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload as string;
                state.user = null;
            })
    },
});


export const {reset} = authSlice.actions;
export default authSlice.reducer;