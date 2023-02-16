import { EQuestioner } from "../models/models";

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

export const initialUpdateState = {
    gender: '',
    weight: 0,
    height: 0,
    target: '',
    days: 0
};


export const formReducer = (state:IInitialState , action: IPayload) => {
    switch(action.type) {
        case EQuestioner.setChange:
            return {
                ...state,
                [action.payload.name!]: action.payload.value
            };
        case EQuestioner.setGender:
            return {
                ...state,
                gender: action.payload.value
            };
        case EQuestioner.switchTarget:
            return {
                ...state,
                target: action.payload.value
            };
        default:
            return state;
    }
}