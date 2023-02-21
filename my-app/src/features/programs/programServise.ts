import axios from "axios";
const API_URL = '/api/programs/';

const getAllPrograms = async ()  => {
    const response = await axios.get(API_URL);
    return response.data;
}

const getOneProgram = async (id: string)  => {
    const response = await axios.get(`${API_URL}`, {params: {
        id: id
    }});
    return response.data;
}

const programsService = {
    getAllPrograms,
    getOneProgram 
}

export default programsService;