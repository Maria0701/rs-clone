import { differenceInWeeks, isSameDay, parseISO } from "date-fns"
import { SECS } from "../consts/const"
import { ICompleted } from "../models/models"

export const secsToMins = (secs: number):string => {
    return `${Math.floor(secs / SECS)} min ${secs % SECS} sec`
}

export const getExersisesForDate = (currDate: Date, arr: ICompleted[]): number => {
    return arr.filter((exercise) => isSameDay(parseISO(exercise.date!), currDate)).length
}

export const getWeekNumber = (initialDate: string) => {
    const currDate = new Date();
    return differenceInWeeks(currDate, new Date(initialDate)) + 1;
}

export const getBodyText = (height: number, weight: number) => {
    console.log(height / 100)
    return (weight / Math.pow((height / 100), 2)).toFixed(2);
}