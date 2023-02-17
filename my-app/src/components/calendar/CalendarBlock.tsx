import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, isEqual, isSameDay, isSameMonth, isToday, parse, parseISO, startOfToday, startOfWeek } from "date-fns";
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { DAYS_NAMES } from "../../consts/const";
import { setCurrentMonth } from "../../features/calendar/calendarSlice";
import { IQueryParams } from "../../features/getCompleted/completedService";
import { getCompleted } from "../../features/getCompleted/completedSlice";
import { SvgElt } from "../../ui/SvgElt";
import { DaySlot } from "./DaySlot";



export function CalendarBlock() {
    const dispatch = useAppDispatch();
    let today = startOfToday();
    let user = useAppSelector((state) => state.auth.user);
    let chosenArray = useAppSelector((state) => state.completed.completedArr);   
    const selectedDay = useAppSelector((state) => state.calendar.selectedDay);
    const currentMonth = useAppSelector((state) => state.calendar.currentMonth);
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
    
    let days = eachDayOfInterval({
        start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }), 
        end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 })
    });
     
    useEffect(() => {
        const params:IQueryParams = {
            startDate: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }).toISOString(),
            endDate: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }).toISOString(),
            userId: user!._id!
        }
        dispatch(getCompleted(params));
    }, [currentMonth]);

    
    const nextMonth = () => {       
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1});
        dispatch(setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy')));
    };

    const prevMonth = () => {
        let firstDayPrevMonth = add(firstDayCurrentMonth, {months: -1});
        dispatch(setCurrentMonth(format(firstDayPrevMonth, 'MMM-yyyy')));
    }

    const getExersisesForDate = (currDate: Date): number => {
        return chosenArray.filter((exercise) => isSameDay(parseISO(exercise.date!), currDate)).length
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
                completed={getExersisesForDate(day)}
                ></DaySlot>)}
            </div>
        </div>
    );
};