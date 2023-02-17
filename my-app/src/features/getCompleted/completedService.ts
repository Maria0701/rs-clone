import axios from "axios";
import { ICompleted } from "../../models/models";

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

const setCompletedItem = async (completedData: ICompleted) => {
    const response = await axios.post(API_URL, completedData);

    return response.data;
}

const completedService = {
    getCompletedItems,
    setCompletedItem,
};

export default completedService;