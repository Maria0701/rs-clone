import axios from "axios";
import {  IRegisterData } from "../../models/models";

const API_URL = '/api/users/';

const register = async (userData: IRegisterData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
}

const login = async (userData: Pick<IRegisterData, 'email' | 'password'>) => {
    const response = await axios.post(`${API_URL}login`, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data;
};

interface UD {
    id: string,
};

const getMe = async (id: UD) => {
    const response = await axios.get(`${API_URL}me`,  {
        params: {
          id: "63f0eb56759f4f81cd1a2485"
        }
      });
    return response.data;
};

const authService = {
    register,
    logout,
    login,
    getMe
};

export default authService;