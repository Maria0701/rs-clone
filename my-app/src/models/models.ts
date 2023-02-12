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