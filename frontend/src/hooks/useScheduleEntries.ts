import {useEffect, useState} from "react";
import {ScheduleEntry} from "../model/ScheduleEntry";
import {
    getAllScheduleEntriesByApi,
    addNewScheduleEntry,
    updateScheduleEntryById,
    deleteScheduleEntryById
} from "../service/scheduleEntryApiService";



export default function useScheduleEntries() {

    const [scheduleEntries, setScheduleEntries] = useState<ScheduleEntry[]>([]);

    useEffect(() => {
        getAllScheduleEntriesByApi()
            .then(data => {
                data.length !== 0 ? setScheduleEntries(data) : alert("So far no entries!")
            })
            .catch(console.error);
    }, [])

    const addScheduleEntry = (newEntry: Omit<ScheduleEntry, "id">) => {
        addNewScheduleEntry(newEntry)
            .then(addedEntry => setScheduleEntries([...scheduleEntries, addedEntry]))
            .catch(console.error);
    }

    const saveUpdatedEntry = (idOfEntryToUpdate: string, entryToUpdate: Omit<ScheduleEntry, "id">) => {
        updateScheduleEntryById(idOfEntryToUpdate, entryToUpdate)
            .then(updatedEntry => {
                setScheduleEntries(scheduleEntries.map(entry => entry.id === idOfEntryToUpdate
                    ? updatedEntry
                    : entry))
            })
            .catch(console.error)
    }

    const deleteScheduleEntry = (entryId: string) => {
        deleteScheduleEntryById(entryId)
            .then(() => setScheduleEntries(scheduleEntries
                .filter(entry => entry.id !== entryId)))
            .catch(console.error);
    }

    return {scheduleEntries, addScheduleEntry, saveUpdatedEntry, deleteScheduleEntry}
}
