export interface IClient {
    name: String,
    email: String,
    password: String,
    token: String,
    role?: Number
}


export interface IRegisterData {
    name: String,
    email: String,
    password: String,
    token: String,
}