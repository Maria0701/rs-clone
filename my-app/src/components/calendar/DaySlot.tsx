import { format } from 'date-fns';
import { ReactNode } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setSelectedDate } from '../../features/calendar/calendarSlice';
import { clearForDay, getCompletedForDay } from '../../features/getCompleted/completedSlice';

interface IDaySlot {
    isToday: boolean,
    isCurrMonth: boolean,
    isSelected: boolean,
    isWeekend: boolean,
    day: Date,
    children?: ReactNode,
    completed: number
}

export  function DaySlot({isToday, isCurrMonth, isSelected, day, isWeekend, completed}: IDaySlot) {
  const dispatch = useAppDispatch();
  const chooseDay = (day: Date) => {
    dispatch(setSelectedDate(day.toISOString()));
  };
  
  return (
    <button 
        onClick={() => chooseDay(day)}
        className={`day-slot 
        ${isToday ? 'day-slot--today': ''} 
        ${isCurrMonth ? 'day-slot--curr' : ''} 
        ${isSelected ? 'day-slot--selected' : ''}
        ${isWeekend ? 'day-slot--weekend' : ''}`
        }>
        <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
        {
          completed > 0 ? <div className="day-slot__exercises">{ completed }</div> : ''
        } 
    </button>
  )
}
