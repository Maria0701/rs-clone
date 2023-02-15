import React, { useReducer } from 'react'
import { ToastContainer } from 'react-toastify';
import { Footer } from '../components/footer/Footer'
import { Header } from '../components/header/header'
import { GENDERS, Targets } from '../consts/const';
import { EQuestioner, UsernameFormElement } from '../models/models';
import CustomSelect from '../ui/CustomSelect';

interface IInitialState {
    gender: string,
    weight: number,
    height: number,
    target: string,
    days: number
};

interface IPayload { 
    payload: { 
        name?: string, 
        value: string 
    },
    type: string
};


const formReducer = (state:IInitialState , action: IPayload) => {
    console.log(action)
    switch(action.type) {
        case EQuestioner.setChange:
            return {
                ...state,
                [action.payload.name!]: action.payload.value
            };
        case EQuestioner.setDays:
            return {
                ...state,
                gender: action.payload.value
            };
        case EQuestioner.setDays:
            return {
                ...state,
                target: action.payload.value
            }
        default:
            return state;
    }
}

export default function Questioner() {
    const initialState = {
        gender: '',
        weight: 0,
        height: 0,
        target: '',
        days: 0
    };


    const [state, dispatch] = useReducer(formReducer, initialState);

    const onSubmit = (evt: React.FormEvent<UsernameFormElement>) => {
        evt.preventDefault();
    }

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: EQuestioner.setChange, payload: {name: e.target.name, value: e.target.value}})
    };

    const switchGender = (value: string) => {
        dispatch({type: EQuestioner.setGender, payload: { value: value}})
    };

    const switchTargets = (value: string) => {
        dispatch({type: EQuestioner.setGender, payload: { value: value}})
    };

     

    return (
        <>
            <Header />
            <main  className="justify-center">
                <div className="container">
                <form className='form form--login'  onSubmit={onSubmit}>
                    <ToastContainer />
                    <label className="form__label">
                        <CustomSelect options={GENDERS} switchItem={switchGender} text={'Укажите пол'}/>
                    </label>
                    <label className="form__label">
                        <input className='input form__input'
                            type="number"
                            value={state.weight}
                            name="weight"
                            placeholder='Please enter password'
                            onChange={onChange}
                            />
                    </label>
                    <label className="form__label">
                        <input className='input form__input'
                            type="number"
                            value={state.height}
                            name="height"
                            placeholder='Please enter password'
                            onChange={onChange}
                            />
                    </label>
                    <label className="form__label">
                        <CustomSelect options={Targets} switchItem={switchTargets} text={'Выберите цель'}/>
                    </label>
                    <label className="form__label">
                        <input className='input form__input'
                            type="number"
                            value={state.days}
                            name="days"
                            placeholder='Please enter password'
                            onChange={onChange}
                            />
                    </label>
                    <button type="submit" className='btn btn--block'>Submit</button>
                </form>
                </div>
            </main>            
            <Footer />
        </>
    )
}
