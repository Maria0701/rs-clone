import { format} from 'date-fns';
import { useAppSelector } from '../../app/hooks'
import CompletedElement from './CompletedElement';

const completedExample = {
    date: '01-02-2023',
    program: 'Loose Weight',
    exercise: 'bird dog',
    preview: 'bird-dog.jpg',
    time: '44 s',
    user: '',
}

export default function CompletedBlock() {
    const completed = useAppSelector((state) => state.completed.completedForDate);
    const activeDate = useAppSelector((state) => state.calendar.selectedDay);
    console.log(activeDate, format(new Date(activeDate),'MM/dd'))
  return (
    <div className='completed-block'>
        <h1 className='h1'>Exercises completed on {format(new Date(activeDate),'dd.MM')}</h1>
        <div className='completed-items'>
            { completed.length > 0 
                ? completed.map((item) => <CompletedElement element={item} key={item.id}/> )
                : <p>You Did not exercise that day</p>
            }
            
        </div>
    </div>
  )
}
