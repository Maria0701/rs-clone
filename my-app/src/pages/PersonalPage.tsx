import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Wrapper } from "../components/wrappers/Wrapper";
import { getMe } from '../features/auth/authSlice';
import Input from '../ui/input';
import { update } from '../features/userUpdates/userUpdatesSlice';
import { IUpdateData } from '../models/models';
import { Loader } from '../ui/Loader';

export function PersonalPage() {
    const [currentWeight, setCurrentWeight] = useState(0);
    const dispatch = useAppDispatch();
    const fullUser = useAppSelector((state) => state.auth.me);
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const isSuccess = useAppSelector((state) => state.auth.isSuccess);


    useEffect(() => {
        if(!fullUser) {
            dispatch(getMe());
        }
    
        setCurrentWeight(fullUser?.weight![fullUser?.weight!.length - 1].value as number);
    }, []);

    useEffect(() => {
        setCurrentWeight(fullUser?.weight![fullUser?.weight!.length - 1].value as number);
        console.log(fullUser?.weight![fullUser?.weight!.length - 1].value, 2)
    }, [fullUser?.height, fullUser?.days, isSuccess]);


    const weightHandler = (data: IUpdateData) => {
        dispatch(update({...data, ...{id:user?._id}}))
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <Wrapper>
            {Boolean(fullUser) && <div className="personal-wrapper">
                <h2 className='h2'>Personal Page</h2>
                <Input text={'WEIGHT'} input={'weight2'} current={currentWeight} changeWeight={weightHandler} />
                <Input text={'HEIGHT'} input={'height'} current={fullUser?.height!} changeWeight={weightHandler} />
                <Input text={'DAYS TO TRAIN'} input={'days'} current={fullUser?.days!} changeWeight={weightHandler} />
            </div>}
            <ToastContainer />
        </Wrapper>
    );
};