export interface IWeight {
    value: Number,
    date: Date
}

export interface IClient {
    id: String,
    name: String,
    email: String,
    password: String,
    token?: String,
    role?: Number,
    gender?: String,
    weight?: IWeight[],
    height?: Number,
    target?: string,
    days?:Number,
}

export interface IUpdateData {
    id: String,
    gender?: String,
    weight2:  Number,
    height?: Number,
    target?: String,
    days?: Number,
    exersisesComleted?: []
}


export interface IRegisterData {
    _id?: string
    name: String,
    email: String,
    password: String,
    token?: String,
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
