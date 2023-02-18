import axios from "axios";
const API_URL = '/api/programs/';

const getAllPrograms = async ()  => {
    const response = await axios.get(API_URL);
    return response.data;
}

const programsService = {
    getAllPrograms,
}

export default programsService;