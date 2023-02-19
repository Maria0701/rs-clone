import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getAllPrograms, resetPrograms } from '../../features/programs/programsSlice';
import CustomSelect2 from '../../ui/CustomSelect2'
import { Loader } from '../../ui/Loader';
import { update } from '../../features/userUpdates/userUpdatesSlice';

export default function ProgramChooser() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.me)
    const targets = useAppSelector((state) => state.programs.programs);
    const isProgramsSuccess = useAppSelector((state) => state.programs.isSuccess);
    const isProgramsLoading = useAppSelector((state) => state.programs.isLoading);
    const isUpdLoading = useAppSelector((state) => state.updateUser.isLoading);
    const isUpdError = useAppSelector((state) => state.updateUser.isError);
    const isUpdSuccess = useAppSelector((state) => state.updateUser.isSuccess);
    const message = useAppSelector((state) => state.updateUser.message);

    useEffect(()=> {
        dispatch(getAllPrograms());
 
    }, []);

    useEffect(() => {
        return () => {
            resetPrograms();
        }
    }, [isUpdSuccess, isUpdError])

    if (isProgramsLoading) {
        return (<Loader />)
    }
    
    const switchTargets = (value: string) => {
        dispatch(update({
            id: user?.id,
            program_id: value
        }));
    };

    return (
        <>
        {            
            isProgramsSuccess && (
                <label className="form__label">
                    <p>Target</p>
                    <CustomSelect2 options={targets} switchItem={switchTargets} text={'Выберите цель'}/>
                </label>
            )
        }
        </>
    )
}
