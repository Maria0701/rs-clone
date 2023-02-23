import { IExercise } from '../../models/models'

interface IExerciseTemplate {
    exercise: IExercise,
    moveToPage: (id:string) => void
}

export default function ExerciseTemplate({exercise, moveToPage}: IExerciseTemplate) {
  return (
    <div className='program__wrapper' onClick={() => moveToPage(exercise._id)}>
        <img className="program__img" src={`${process.env.PUBLIC_URL}/img/${exercise?.img}`} alt={`${exercise?.name}`}/>
                <div className='program__content'>
                <div className='program__name'>{exercise?.name}</div>
                {
                    Boolean(exercise?.description) && <div className='program__description'>{exercise?.description}</div>
                }
         </div>
    </div>
  )
}
