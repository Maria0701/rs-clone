import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react'
import { getsingleProgram } from '../../features/programs/programsSlice';
import ProgramChooser from '../forms/ProgramChooser';
import './program.css';
import ProgramTemplate from './ProgramTemplate';
import { Loader } from '../../ui/Loader';

interface IProgram {
    programId: string
}

export default function Program({programId}: IProgram) {
    const dispatch = useAppDispatch()
    const programElt = useAppSelector((state) => state.programs.currentProgram);
    const isError = useAppSelector((state) => state.programs.isSingleError);
    const isLoading = useAppSelector((state) => state.programs.isSingleLoading);
    const isSuccess = useAppSelector((state) => state.programs.isSingleSuccess);

    useEffect(() => {
        dispatch(getsingleProgram(programId));
    }, []);

    if (!programId) {
        return <ProgramChooser />
    }

    return (
    <>
        {isLoading && <Loader />}
        <ProgramTemplate program={programElt!} />
    </>        
    )
}
