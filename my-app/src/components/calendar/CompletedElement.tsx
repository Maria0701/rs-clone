import { ICompleted } from '../../models/models'
import { SvgElt } from '../../ui/SvgElt'

interface ICompletedelement {
    element: ICompleted
}

export default function CompletedElement({element}:ICompletedelement ) {
  return (
    <div className='completed-item'>
        <div className='completed-item__img'>
            <img src={`${process.env.PUBLIC_URL}/img/${element.preview}`} alt={`${element.exercise_name}`}/>
        </div>
        <div className='completed-item__content'>                    
            <div className='completed-item__name'>{element.exercise_name}</div>
            <time className='completed-item__date' dateTime={`${element.date}`}>
                <SvgElt width={16} height={16} name={'calendar'} /> 
                {element.date}
            </time>
            <div className='completed-item__time'>
                <SvgElt width={16} height={16} name={'time'} />
                <>{element.time}</>                
            </div>
            <a className='completed-item__link' href="#">Повторить</a>
        </div>
    </div>
  )
}
