import React, { useReducer,  useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Wrapper } from '../components/wrappers/Wrapper';
import { GENDERS } from '../consts/const';
import { getAllPrograms } from '../features/programs/programsSlice';
import { update } from '../features/userUpdates/userUpdatesSlice';
import { EQuestioner, IUpdateData, UsernameFormElement } from '../models/models';
import { formReducer, initialUpdateState } from '../reducers/updateUserReducer';
import CustomSelect from '../ui/CustomSelect';
import CustomSelect2 from '../ui/CustomSelect2';
import { Loader } from '../ui/Loader';

export default function Questioner() {
    const navigate = useNavigate();
    const dispatchApp = useAppDispatch();
    const targets = useAppSelector((state) => state.programs.programs);
    const isUpdLoading = useAppSelector((state) => state.updateUser.isLoading);
    const isUpdError = useAppSelector((state) => state.updateUser.isError);
    const message = useAppSelector((state) => state.updateUser.message);
    const isUpdSuccess = useAppSelector((state) => state.updateUser.isSuccess)
    const user = useAppSelector((state) => state.auth.user);
    const isProgramsSuccess = useAppSelector((state) => state.programs.isSuccess);

    useEffect(()=> {
        dispatchApp(getAllPrograms());
    }, []);

    const [state, dispatch] = useReducer(formReducer , initialUpdateState);


    const onSubmit = (evt: React.FormEvent<UsernameFormElement>) => {
        evt.preventDefault();
        if (state.weight > 150 || state.weight < 40)  {
            toast.error('The Weight should be higher, then 40 and lower then 150')
        } else if (state.height! > 200 || state.height! < 100) {
            toast.error('The Height should be higher, then 100 and lower then 200')
        } else if (state.days! > 7 || state.days! < 1) {
            toast.error('The number of days should be between1 and 7')
        } else{
            const userData:IUpdateData = {
                id: user!._id as String,
                gender: state.gender,
                weight2: Number(state.weight),
                height: Number(state.height),
                program_id: state.target,
                days: Number(state.days),
                isAuth: true
            }

            dispatchApp(update(userData));
        }
    }
   

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'weight' && (parseInt(e.target.value) > 200 || parseInt(e.target.value) < 40) ) {
            toast.error('The Weight should be higher, then 40 and lower then 200')
        }
        if (e.target.name === 'height' && (parseInt(e.target.value) > 200 || parseInt(e.target.value) < 100) ) {
            toast.error('The Height should be higher, then 100 and lower then 200')
        }
        if (e.target.name === 'days' && (parseInt(e.target.value) > 7 || parseInt(e.target.value) < 1) ) {
            toast.error('The number of days should be between1 and 7')
        }
        dispatch({type: EQuestioner.setChange, payload: {name: e.target.name, value: e.target.value}})
    };

    const switchGender = (value: string) => {
        dispatch({type: EQuestioner.setGender, payload: { value: value}})
    };

    const switchTargets = (value: string) => {
        dispatch({type: EQuestioner.switchTarget, payload: { value: value}})
    };

    useEffect(() => {
        if (isUpdError) {
            toast.error(message);
        }

        if (isUpdSuccess) {
            navigate('/');
        }


    }, [isUpdError, isUpdSuccess, message, navigate]);

    if (isUpdLoading) {
        return <Loader />
    }

    return (
        <Wrapper>
            <form className='form form--login'  onSubmit={onSubmit}>
                <ToastContainer />
                <label className="form__label">
                    <p>Gender</p>
                    <CustomSelect options={GENDERS} switchItem={switchGender} text={'Укажите пол'}/>
                </label>
                <label className="form__label">
                    <p>Weight (sm)</p>
                    <input className='input form__input'
                        type="number"
                        value={state.weight > 0 ? state.weight : ''}
                        name="weight"
                        placeholder='Please enter password'
                        onChange={onChange}
                        />
                </label>
                <label className="form__label">
                    <p>Height (sm)</p>
                    <input className='input form__input'
                        type="number"
                        value={state.height > 0 ? state.height: ''}
                        name="height"
                        placeholder='Please enter password'
                        onChange={onChange}
                        />
                </label>
                {
                    isProgramsSuccess && (
                        <label className="form__label">
                            <p>Target</p>
                            <CustomSelect2 options={targets} switchItem={switchTargets} text={'Выберите цель'}/>
                        </label>
                    )
                }
                
                <label className="form__label">
                    <p>Number of days to train</p>
                    <input className='input form__input'
                        type="number"
                        value={state.days > 0 ? state.days : ''}
                        name="days"
                        placeholder='Please enter password'
                        onChange={onChange}
                        />
                </label>
                <button type="submit" className='btn btn--block'>Submit</button>
            </form>
        </Wrapper>       
    )
}
