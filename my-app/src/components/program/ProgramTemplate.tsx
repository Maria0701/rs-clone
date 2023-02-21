import { IProgram } from "../../models/models"

interface IProgramElt {
    program: IProgram,
    changeProgram?: () => void
}

export default function ProgramTemplate({program, changeProgram}: IProgramElt) {
  return (
    <div className='program__wrapper' onClick={changeProgram}>
        <img className="program__img" src={`${process.env.PUBLIC_URL}/img/${program?.img}`} alt={`${program?.name}`}/>
        <div className='program__content'>
            <div className='program__name'>{program?.name}</div>
            {
                Boolean(program?.description) && <div className='program__description'>{program?.description}</div>
            }
        </div>
    </div>
  )
}
