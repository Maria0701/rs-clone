import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { ICompleted } from '../../models/models'
import { SvgElt } from '../../ui/SvgElt'
import { secsToMins } from '../../utils/utils'

interface ICompletedelement {
    element: ICompleted
}

export default function CompletedElement({element}:ICompletedelement ) {
    const navigate = useNavigate();

    const goToExercise = () => {
        navigate(`/exercise/${element.exercise_id}`)
    }
  return (
    <div className='completed-item'>
        <div className='completed-item__img'>
            <img src={`${process.env.PUBLIC_URL}/img/${element.preview}`} alt={`${element.exercise_name}`}/>
        </div>
        <div className='completed-item__content'>                    
            <div className='completed-item__name'>{element.exercise_name}</div>
            <time className='completed-item__date' dateTime={`${element.date}`}>
                <SvgElt width={16} height={16} name={'calendar'} />                
                {format(new Date(element.date!),'dd.MM.yyyy') }
            </time>
            <div className='completed-item__time'>
                <SvgElt width={16} height={16} name={'time'} />
                <>{secsToMins(element.time)}</>                
            </div>
            <button className='completed-item__link btn' onClick={goToExercise}>Повторить</button>
        </div>
    </div>
  )
}
