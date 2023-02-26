import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Wrapper } from "../components/wrappers/Wrapper";
import { getMe, getMemoizedLatest } from '../features/auth/authSlice';
import Input from '../ui/input';
import { update } from '../features/userUpdates/userUpdatesSlice';
import { IUpdateData } from '../models/models';
import { Loader } from '../ui/Loader';
import { LChart } from '../components/charts/LineChart';
import { format } from 'date-fns';

export function PersonalPage() {
    const fullUser = useAppSelector((state) => state.auth.me);
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const isSuccess = useAppSelector((state) => state.auth.isSuccess);
    const isUpdateSuccess = useAppSelector((state) => state.updateUser.isSuccess);
    const lastWeight = useAppSelector(getMemoizedLatest);
    const dispatch = useAppDispatch();

    const [weightData, setWeightData] = useState({
        labels: fullUser?.weight!.map((data) => format(new Date(data.date), 'dd.MM.yy'))! ,
        datasets: [{
            label: 'WEIGHT',
            data: fullUser?.weight!.map((data) => data.value)!,
        }]
    });

    useEffect(() => {
        if(!fullUser) {
            dispatch(getMe());
        }
    }, []);

    useEffect(() => {
         
        setWeightData({
            labels: fullUser?.weight!.map((data) => format(new Date(data.date), 'dd.MM.yy'))! ,
            datasets: [{
                label: 'WEIGHT',
                data: fullUser?.weight!.map((data) => data.value)!,
            }]
        });

        
    }, [lastWeight, isUpdateSuccess, isSuccess]);
  
    const weightHandler = (data: IUpdateData) => {
        dispatch(update({...data, ...{id:user?._id}}));

        if (isUpdateSuccess) {
            dispatch(getMe());
        }
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <Wrapper>
            {Boolean(fullUser) && <div className="personal-wrapper">
                <h2 className='h2'>Personal Page</h2>
                <Input text={'WEIGHT'} input={'weight2'} current={lastWeight!} changeWeight={weightHandler} />
                <Input text={'HEIGHT'} input={'height'} current={fullUser?.height!} changeWeight={weightHandler} />
                <Input text={'DAYS TO TRAIN'} input={'days'} current={fullUser?.days!} changeWeight={weightHandler} />
            </div>}
            <div className='charts'>
                <LChart data={weightData}/>
            </div>
            <ToastContainer />
        </Wrapper>
    );
};