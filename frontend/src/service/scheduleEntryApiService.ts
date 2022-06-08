import {ScheduleEntry} from "../model/ScheduleEntry";
import axios from "axios";


export const getAllScheduleEntriesByApi: () => Promise<ScheduleEntry[]> = () => {

    return axios.get("/api/schedule")
        .then(response => response.data);
}

export const addNewScheduleEntry: (newEntry: Omit<ScheduleEntry, "id">) => Promise<ScheduleEntry>
    = (newEntry) => {

    return axios.post("/api/schedule", newEntry)
        .then(response => response.data)
}

export const deleteScheduleEntryById: (entryId: string) => Promise<void>
    = (entryId) => {
    return axios.delete(`/api/schedule/${entryId}`);
}
