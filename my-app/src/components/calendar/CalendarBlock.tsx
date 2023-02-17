import { add, eachDayOfInterval, endOfMonth, endOfWeek, format, isEqual, isSameMonth, isToday, parse, startOfMonth, startOfToday, startOfWeek } from "date-fns";
import { useState } from 'react'
import { DAYS_NAMES } from "../../consts/const";
import { DaySlot } from "./DaySlot";



export function CalendarBlock() {
    let today = startOfToday();
    let [selectedDay, setSelectedDay] = useState(today);
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
    
    let days = eachDayOfInterval({
        start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }), 
        end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 })
    });
  
    const chooseDay = (day: Date) => setSelectedDay(day);

    const nextMonth = () => {
        let firstDayNextMonth = add(firstDayCurrentMonth, {months: 1});
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    };
    
    const prevMonth = () => {
        let firstDayPrevMonth = add(firstDayCurrentMonth, {months: -1});
        setCurrentMonth(format(firstDayPrevMonth, 'MMM-yyyy'))
    }

    return (
        <div className="calendar"> 
            <div className='calendar-top'>
            <h1 className='h1'>{format(firstDayCurrentMonth, 'MMMM yyyy')}</h1>
            <div className='calendar-top__btns'>
                <button className="btn" onClick={prevMonth} >left</button>
                <button className="btn" onClick={nextMonth}>right</button>
            </div>
            </div>
            <div className="calendar__wrapper">
                {DAYS_NAMES.map((item) =>(
                    <div className="day-slot day-slot--nounderline" key={item}>{item}</div>
                ))}
                {days.map((day) => <DaySlot
                key={day.toString()}
                selectDay={chooseDay}
                isToday={isToday(day)} 
                isCurrMonth={isSameMonth(day, today)} 
                isSelected={isEqual(day, selectedDay)}
                isWeekend={(day.getDay() === 6) || (day.getDay()  === 0)}
                day={day}
                />)}
            </div>
        </div>
    );
};