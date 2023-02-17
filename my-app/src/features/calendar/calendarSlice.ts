import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { endOfToday, format, startOfToday } from "date-fns";

interface IState {
    startDate: string,
    endDate: string,
    selectedDay: string,
    currentMonth: string
}

const initialState = {
    startDate: startOfToday().toISOString(), 
    endDate: endOfToday().toISOString(),
    selectedDay: startOfToday().toISOString(),
    currentMonth: format(startOfToday(), 'MMM-yyyy')
}

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setStartDate: (state, action: PayloadAction<string>) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action: PayloadAction<string>) => {
            state.endDate = action.payload;
        },
        setSelectedDate: (state, action: PayloadAction<string>) => {
            state.selectedDay = action.payload;
        },
        setCurrentMonth: (state, action: PayloadAction<string>) => {
            state.currentMonth = action.payload;  
        }
    }
});

export const {setStartDate, setEndDate, setSelectedDate, setCurrentMonth} = calendarSlice.actions;
export default calendarSlice.reducer;