import { format } from 'date-fns';
import { ReactNode } from 'react';

interface IDaySlot {
    isToday: boolean,
    isCurrMonth: boolean,
    isSelected: boolean,
    isWeekend: boolean,
    selectDay: (day: Date) => void,
    day: Date
}

export  function DaySlot({isToday, isCurrMonth, isSelected, selectDay, day, isWeekend}: IDaySlot) {
  return (
    <button 
        onClick={() => selectDay(day)}
        className={`day-slot 
        ${isToday ? 'day-slot--today': ''} 
        ${isCurrMonth ? 'day-slot--curr' : ''} 
        ${isSelected ? 'day-slot--selected' : ''}
        ${isWeekend ? 'day-slot--weekend' : ''}`
        }>
        <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
    </button>
  )
}
