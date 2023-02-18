import { SECS } from "../consts/const"

export const secsToMins = (secs: number):string => {
    return `${Math.floor(secs / SECS)} min ${secs % SECS} sec`
}