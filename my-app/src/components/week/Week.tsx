import { addDays, eachDayOfInterval, endOfWeek, format, isEqual, isToday, startOfToday, startOfWeek } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { SvgElt } from '../../ui/SvgElt'
import { useState, useEffect } from 'react'
import './week.css';
import { IQueryParams } from '../../features/getCompleted/completedService';
import { getCompleted, getCompletedForWeek } from '../../features/getCompleted/completedSlice';
import { getExersisesForDate } from '../../utils/utils';

export default function Week() {
    const dispatch = useAppDispatch();
    let today = startOfToday();
    let user = useAppSelector((state) => state.auth.user);
    const completed = useAppSelector((state) => state.completed.completedForWeek);
    let [currentDay, setCurrentWeek] = useState(today);
    let [selectedDay, setSelectedDate] = useState(today);

    useEffect(() => {
        const params:IQueryParams = {
            startDate: startOfWeek(currentDay, { weekStartsOn: 1 }).toISOString(),
            endDate: endOfWeek(currentDay, { weekStartsOn: 1 }).toISOString(),
            userId: user!._id!
        }
        dispatch(getCompletedForWeek(params));
    }, [currentDay]);

    let days = eachDayOfInterval({
        start: startOfWeek(currentDay, { weekStartsOn: 1 }), 
        end: endOfWeek(currentDay, { weekStartsOn: 1 })
    });
   
    const prevWeek = () => {
        setCurrentWeek(addDays(currentDay, -7));
    }

    const nextWeek = () => {
        setCurrentWeek(addDays(currentDay, 7));
    }

    const changeSelected = (day: Date) => {
        setSelectedDate(day);
    }

    return (
        <div className='week'>
            <button className="btn" onClick={prevWeek}><SvgElt width={16} height={16} name={'chevronleft'} /></button>
            <div className='week__wrapper'>
                {
                    days.map((day) => (
                        <button 
                            key={day.toString()}
                            onClick={() => changeSelected(day)}
                            className={`btn week__item 
                            ${isToday(day) ? 'week__item--current' : ''}
                            ${isEqual(day, new Date(selectedDay))? 'week__item--selected' : ''}`
                            }>
                            <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
                            {
                                getExersisesForDate(day, completed) > 0 ? <div className="week__exercises">
                                    <SvgElt width={20} height={20} name={'tick'} />
                                </div> : ''
                            } 
                        </button>
                    ))
                }
            </div>
            <button className="btn" onClick={nextWeek}>
                <SvgElt width={16} height={16} name={'chevronright'} />
            </button>
        </div>
    )
}
