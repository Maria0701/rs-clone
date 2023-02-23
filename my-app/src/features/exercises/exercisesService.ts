import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import { IExercise } from '../../models/models';

const API_URL = '/api/exercises/';

export const exercisesAPI = createApi({
    reducerPath: 'exercisesAPI',
    baseQuery: fetchBaseQuery({baseUrl: API_URL}),
    endpoints:(build) => ({
        fetchAllExercises: build.query<IExercise[], string>({
            query: (program_ids) => ({
                url: '',
                params: {
                    program_ids: program_ids,
                }
            })
        }),
        getOneExercise: build.query<IExercise, string>({
            query:(id) => ({
                url: id,
            })
        })
    })
})