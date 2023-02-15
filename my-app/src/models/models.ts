export interface IClient {
    name: String,
    email: String,
    password: String,
    token?: String,
    role?: Number
}


export interface IRegisterData {
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
};


export interface ITraining {
  id: string;
  name: string;
  url: string;
}

export interface ITrainings {
  trainings: ITraining[]
}
