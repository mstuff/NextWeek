import {useEffect, useState} from "react";
import {ScheduleEntry} from "../model/ScheduleEntry";
import {getAllScheduleEntriesByApi} from "../service/scheduleEntryApiService";


export default function useScheduleEntries(){

    const [scheduleEntries, setScheduleEntries] = useState<ScheduleEntry[]>([]);

    useEffect(() => {
        getAllScheduleEntriesByApi()
            .then(data => setScheduleEntries(data))
            .catch(console.error);
        }, [])

    return {scheduleEntries}
}