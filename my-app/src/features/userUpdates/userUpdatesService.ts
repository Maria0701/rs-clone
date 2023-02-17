import axios from "axios";
import {   IUpdateData } from "../../models/models";

const API_URL = '/api/users/';

const update = async(userData: IUpdateData) => {
    const response = await axios.put(`${API_URL}/${userData.id}`, userData);
    return response.data;
}

const userUpdateService = {
    update
};

export default userUpdateService;