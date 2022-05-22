import {useEffect, useState} from "react";
import {ScheduleEntry} from "../model/ScheduleEntry";
import {addNewScheduleEntry, getAllScheduleEntriesByApi} from "../service/scheduleEntryApiService";


export default function useScheduleEntries(){

    const [scheduleEntries, setScheduleEntries] = useState<ScheduleEntry[]>([]);

    useEffect(() => {
        getAllScheduleEntriesByApi()
            .then(data => setScheduleEntries(data))
            .catch(console.error);
        }, [])

    const addScheduleEntry = (newEntry: Omit<ScheduleEntry, "id">) => {
        addNewScheduleEntry(newEntry)
            .then(addedEntry => setScheduleEntries([...scheduleEntries, addedEntry]))
            .catch(console.error);
    }

    return {scheduleEntries, addScheduleEntry}
}