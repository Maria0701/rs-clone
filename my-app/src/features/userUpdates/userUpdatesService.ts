import axios from "axios";
import {   IUpdateData } from "../../models/models";

const API_URL = '/api/users/';

const update = async(userData: IUpdateData) => {
    const response = await axios.put(`${API_URL}/${userData.id}`, userData);
    if (userData.weight2)  await axios.put(`${API_URL}/weight/${userData.id}`, {value: userData.weight2});

    return response.data;
}


const userUpdateService = {
    update
};

export default userUpdateService;