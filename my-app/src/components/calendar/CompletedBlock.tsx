import { format } from 'date-fns';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getCompletedForDay, resetForDay } from '../../features/getCompleted/completedSlice';
import { Loader } from '../../ui/Loader';
import CompletedElement from './CompletedElement';

interface ICompletedBlock {
    activeDate?: string
}

export default function CompletedBlock({activeDate}: ICompletedBlock ) {
    const dispatch = useAppDispatch()
    const completed = useAppSelector((state) => state.completed.completedForDate);
    const date = useAppSelector((state) => state.calendar.selectedDay);
    if (!activeDate) activeDate = date;
    const isLoading = useAppSelector((state) => state.completed.isLoadingDay);
    const isError = useAppSelector((state) => state.completed.isError);
    const isSuccess = useAppSelector((state) => state.completed.isSuccessDay)

    useEffect(()=> {
        dispatch(getCompletedForDay(activeDate!));

        return() => {
            resetForDay()
        }
    },[activeDate]);

    return (
        <div className='completed-block'>
            <h1 className='h1'>Exercises completed on {format(new Date(activeDate),'dd.MM')}</h1>
            <div className='completed-items'>
                {isError && <p>Something went wrong</p>}
                {isLoading && <Loader />}
                {    completed.length > 0 
                    ? completed.map((item) => <CompletedElement element={item} key={item.id}/> )
                    : <p>You Did not exercise that day</p>
                }         
            </div>
        </div>
    )
}
