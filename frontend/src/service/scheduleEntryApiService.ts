import {ScheduleEntry} from "../model/ScheduleEntry";
import axios from "axios";


export const getAllScheduleEntriesByApi: () => Promise<ScheduleEntry[]> = () => {
    return axios.get("/api/appointments")
        .then(response => response.data);
}