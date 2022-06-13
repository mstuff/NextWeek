import {useEffect, useState} from "react";
import {ScheduleEntry} from "../model/ScheduleEntry";
import {
    getAllScheduleEntriesByApi,
    addNewScheduleEntry,
    updateScheduleEntryById,
    deleteScheduleEntryById
} from "../service/scheduleEntryApiService";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function useScheduleEntries() {

    const [scheduleEntries, setScheduleEntries] = useState<ScheduleEntry[]>([]);

    useEffect(() => {
        getAllScheduleEntriesByApi()
            .then(data => {
                data.length !== 0 ? setScheduleEntries(data) : toast.info("So far no entries!")
            })
            .catch(() => toast.error("Connection failed, please try again later"));
    }, [])

    const addScheduleEntry = (newEntry: Omit<ScheduleEntry, "id">) => {
        addNewScheduleEntry(newEntry)
            .then(addedEntry => setScheduleEntries([...scheduleEntries, addedEntry]))
            .catch(() => toast.error("Your new entry could not be added"));
    }

    const saveUpdatedEntry = (idOfEntryToUpdate: string, entryToUpdate: Omit<ScheduleEntry, "id">) => {
        updateScheduleEntryById(idOfEntryToUpdate, entryToUpdate)
            .then(updatedEntry => {
                setScheduleEntries(scheduleEntries.map(entry => entry.id === idOfEntryToUpdate
                    ? updatedEntry
                    : entry))
            })
            .then(() => toast.success("Your entry was updated!"))
            .catch(() => toast.error("Your entry could not be updated"));
    }

    const deleteScheduleEntry = (entryId: string) => {
        deleteScheduleEntryById(entryId)
            .then(() => setScheduleEntries(scheduleEntries
                .filter(entry => entry.id !== entryId)))
            .then(() => toast.success("Entry removed"))
            .catch(() => toast.error("Your entry could not be removed"));
    }

    return {scheduleEntries, addScheduleEntry, saveUpdatedEntry, deleteScheduleEntry}
}
