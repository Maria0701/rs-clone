import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, isEqual, isSameDay, isSameMonth, isToday, parse, startOfToday, startOfWeek } from "date-fns";
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DAYS_NAMES } from "../../consts/const";
import { setCurrentMonth, setEndDate, setStartDate } from "../../features/calendar/calendarSlice";
import { getCompleted } from "../../features/getCompleted/completedSlice";
import { SvgElt } from "../../ui/SvgElt";
import { getExersisesForDate } from "../../utils/utils";
import { DaySlot } from "./DaySlot";


export function CalendarBlock() {
    const dispatch = useAppDispatch();
    let today = startOfToday();
    let chosenArray = useAppSelector((state) => state.completed.completedArr);   
    const selectedDay = useAppSelector((state) => state.calendar.selectedDay);
    const currentMonth = useAppSelector((state) => state.calendar.currentMonth);
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
    let start = useAppSelector((state) => state.calendar.startDate);
    let end = useAppSelector((state) => state.calendar.endDate);
  
     
    useEffect(() => {
        dispatch(setEndDate(endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }).toISOString()))
        dispatch(setStartDate(startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }).toISOString()))
        dispatch(getCompleted());
    }, [currentMonth, chosenArray.length]);

    let days = eachDayOfInterval({
        start: new Date(start), 
        end: new Date(end)
    });
    
    const nextMonth = () => {       
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1});
        dispatch(setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy')));
    };

    const prevMonth = () => {
        let firstDayPrevMonth = add(firstDayCurrentMonth, {months: -1});
        dispatch(setCurrentMonth(format(firstDayPrevMonth, 'MMM-yyyy')));
    }


    return (
        <div className="calendar"> 
            <div className='calendar-top'>
            <h1 className='h1'>{format(firstDayCurrentMonth, 'MMMM yyyy')}</h1>
            <div className='calendar-top__btns'>
                <button className="btn" onClick={prevMonth}><SvgElt width={16} height={16} name={'chevronleft'} /></button>
                <button className="btn" onClick={nextMonth}><SvgElt width={16} height={16} name={'chevronright'} /></button>
            </div>
            </div>
            <div className="calendar__wrapper">
                {DAYS_NAMES.map((item) => (
                    <div className="day-slot day-slot--nounderline" key={item}>{item}</div>
                ))}

                {days.map((day) => <DaySlot
                key={day.toString()}             
                isToday={isToday(day)} 
                isCurrMonth={isSameMonth(day, today)} 
                isSelected={isEqual(day, new Date(selectedDay))}
                isWeekend={(day.getDay() === 6) || (day.getDay()  === 0)}
                day={day}
                completed={getExersisesForDate(day, chosenArray)}
                ></DaySlot>)}
            </div>
        </div>
    );
};