import { useEffect, useState } from 'react'
import { isError } from 'util';
import { useAppDispatch, useAppSelector } from '../app/hooks'
import ProgramTemplate from '../components/program/ProgramTemplate';
import { getMe } from '../features/auth/authSlice';
import { getAllPrograms } from '../features/programs/programsSlice';
import { resetUpdate, update } from '../features/userUpdates/userUpdatesSlice';
import Modal from './Modal';
import './program-chooser.css';

export default function ProgramChooser() {
    const [modalState, setModalState] = useState(false);
   
    const dispatch = useAppDispatch();
    const programs = useAppSelector((state) => state.programs.programs);
    const [actual, setActual] = useState(programs)
    const userFull = useAppSelector((state) => state.auth.me);
    const [program, setProgram] = useState(userFull?.program_id);
    const isUpdateLoading = useAppSelector((state) => state.updateUser.isLoading);
    const isUpdateSuccess = useAppSelector((state) => state.updateUser.isSuccess);
    const isUpdateError = useAppSelector((state) => state.updateUser. isError)
    const updateMessage = useAppSelector((state) => state.updateUser.message)
    
    useEffect(() => {
        if (programs.length === 0) {
            dispatch(getAllPrograms())
        }

        if (!userFull) {
            dispatch(getMe());
        } 
    },[]);

    useEffect(() => {
        setActual(programs
            .filter(item => item._id !== userFull?.program_id))
    },[programs]);


    useEffect(() => {
        if (isUpdateSuccess) {
            setModalState(false);
            dispatch(getMe());
            setActual(programs
                .filter(item => item._id !== program))
        }
        dispatch(resetUpdate());
    }, [isUpdateSuccess, isUpdateError])

    const changeHandler = (id: string) => {
        setModalState(true);
        setProgram(id);
    }

    const programHandler  = () => {
        dispatch(update({
            id: userFull?.id,
            program_id: program,
        }))

    }

    const handleClose = () => {
        setModalState(false);
    }

    return (
        <div className='programs-chooser'>
            <h2 className='h2'>You can change a program</h2>
            <div className='programs-chooser__wrapper'>
                {
                    actual.map(item => (<ProgramTemplate program={item} key={item._id} changeProgram={() => changeHandler(item._id)}/>))
                }
            </div> 
            <Modal isOpen={modalState} closeHandler={handleClose}>
                <>
                <h2 className='h2'>Are you shure, you want to change</h2>
                <div className='btns'>
                    <button className='btn btn--yes' onClick={handleClose}>no</button>
                    <button className='btn btn--yes' onClick={programHandler}>yes</button>
                </div>
                {isUpdateError && <p>{updateMessage}</p>}
                </>
            </Modal>          
        </div>
    )
}
