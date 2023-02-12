import { IRegisterData } from "../../models/models";

const API_URL = '/api/users/';


const register = async (userData: IRegisterData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(userData)
    })
    .then((res) => res.json());

    if (response.data) {
        console.log(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
}

const authService = {
    register,
};

export default authService;