import { format } from 'date-fns';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getCompletedForDay } from '../../features/getCompleted/completedSlice';
import { Loader } from '../../ui/Loader';
import CompletedElement from './CompletedElement';


export default function CompletedBlock() {
    const dispatch = useAppDispatch()
    const completed = useAppSelector((state) => state.completed.completedForDate);
    const activeDate = useAppSelector((state) => state.calendar.selectedDay);
    const isLoading = useAppSelector((state) => state.completed.isLoading);
    const isError = useAppSelector((state) => state.completed.isError)

    useEffect(()=> {
        dispatch(getCompletedForDay(activeDate))
    },[activeDate]);

    return (
        <div className='completed-block'>
            <h1 className='h1'>Exercises completed on {format(new Date(activeDate),'dd.MM')}</h1>
            <div className='completed-items'>
                {isError && <p>Something went wrong</p>}
                {
                isLoading ?
                <Loader />
                :  completed.length > 0 
                    ? completed.map((item) => <CompletedElement element={item} key={item.id}/> )
                    : <p>You Did not exercise that day</p> 
                }         
            </div>
        </div>
    )
}
