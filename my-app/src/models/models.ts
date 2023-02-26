export interface IWeight {
    value: number,
    date: Date
}

export interface IClient {
    id: string,
    name: string,
    email: string,
    password: string,
    token?: string,
    role?: number,
    gender?: String,
    weight?: IWeight[],
    height?: number,
    target?: string,
    program_id?: string,
    days?:number,
    registrationDate?: string,
    isAuth:boolean
}

export interface IUpdateData {
    id?: String,
    gender?: String,
    weight2?:  Number,
    height?: Number,
    program_id?: String,
    days?: Number,
    exersisesComleted?: [],
    isAuth?: Boolean,
}


export interface IRegisterData {
    _id?: string
    name: string,
    email: string,
    password: string,
    token?: string,
    role?: number
}

export interface FormElements extends HTMLFormControlsCollection {
    usernameInput: HTMLInputElement
}

export interface UsernameFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export const EQuestioner = {
    setGender :'setGender',
    setChange : 'setChange',
    setDays :'setDays',
    switchTarget: 'switchTarget'
};


export interface ITraining {
  id: string;
  name: string;
  url: string;
}

export interface ITrainings {
  trainings: ITraining[]
}

export interface IExercise {
    _id :string,
    name: string,
    url: string,
    description: string,
    img: string,
    program_ids: string[],
}

export interface ICompleted {
    program_name: string,
    program_id:  string,
    exercise_name:  string,
    exercise_id:  string,
    preview:  string,
    time: number,
    user_id: string,
    date?: string,
    id?: string,
    _id?: string
}

export interface IProgram {
    name: string
    date?: Date,
    img: string,
    exersises_ids:string[],
    _id: string,
    description?: string, 
}

export interface IForToday {
    user_id: string,
    exercise_id: string
}
