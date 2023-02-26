import axios from "axios";
import { ICompleted, IForToday } from "../../models/models";

const API_URL = '/api/completed/';

export interface IQueryParams {
    userId: string,
    startDate: string,
    endDate: string,
}

const getCompletedItems = async (queryParams: IQueryParams)  => {
    const response = await axios.get(API_URL, { 
        params: { 
            endDate: queryParams.endDate,
            startDate: queryParams.startDate,
            user_id: queryParams.userId
        } 
    });

    return response.data;
}

const getCompletedToday = async (queryParams: IForToday)  => {
  
    const response = await axios.get(`${API_URL}exercise`, { 
        params: { 
            user_id: queryParams.user_id,
            exercise_id: queryParams.exercise_id
        } 
    });
    return response.data;
}

const setCompletedItem = async (completedData: ICompleted) => {
    const response = await axios.post(API_URL, completedData);
    return response.data;
}

const updateCompleted = async (inf: Pick<ICompleted, 'id'| 'time'>) => {
    const info = {
        time: inf.time,
    }
    const response = await axios.put(`${API_URL}${inf.id}`, info);

    return response.data;
}

const completedService = {
    getCompletedItems,
    setCompletedItem,
    updateCompleted,
    getCompletedToday 
};

export default completedService;