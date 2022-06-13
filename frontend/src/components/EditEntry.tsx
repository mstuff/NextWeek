import {ScheduleEntry} from "../model/ScheduleEntry";
import "./EditEntry.css"
import {FormEvent, useState} from "react";
import * as React from "react";
import Header from "./Header";
import {DtoUserInput} from "../dto/DtoUserInput";
import {
    translateDurationIntoDate,
    calculateDurationInMinutes,
    patchEntryDate,
    validateInput
} from "../service/userIOService";
import InputFields from "./InputFields";


type EditEntryProps = {
    scheduleEntry: ScheduleEntry;
    saveUpdatedEntry: (entryId: string, entryToUpdate: Omit<ScheduleEntry, "id">) => void;
    setEditEnabled: (status: boolean) => void;
}

export default function EditEntry({scheduleEntry, saveUpdatedEntry, setEditEnabled}: EditEntryProps) {

    const [title, setTitle] = useState<string>(scheduleEntry.title);
    const [description, setDescription] = useState<string>(scheduleEntry.description);
    const [entryDate, setEntryDate] = useState<Date | null>(new Date(scheduleEntry.entryDate));
    const [entryTime, setEntryTime] = useState<Date | null>(new Date(scheduleEntry.entryDate));
    const [entryDuration, setEntryDuration] = useState<Date | null>(new Date(translateDurationIntoDate(scheduleEntry)));

    const onUpdate = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const entryToUpdate: DtoUserInput = {
            title: title,
            description: description,
            entryDate: entryDate,
            entryTime: entryTime,
            entryDuration: entryDuration
        }

        if (!validateInput(entryToUpdate)) {
            return;
        }

        const updatedEntry: Omit<ScheduleEntry, "id"> = {
            title: title,
            description: description,
            entryDate: patchEntryDate(entryToUpdate),
            durationInMinutes: calculateDurationInMinutes(entryToUpdate)
        }
        saveUpdatedEntry(scheduleEntry.id, updatedEntry);
    }

    return <div className={"div-fixed-bg"}>
        <Header/>
        <div className={"div-fixed-edit"}>
            <form onSubmit={onUpdate}>
                <InputFields title={title}
                             setTitle={setTitle}
                             description={description}
                             setDescription={setDescription}
                             entryDate={entryDate}
                             setEntryDate={setEntryDate}
                             entryTime={entryTime}
                             setEntryTime={setEntryTime}
                             entryDuration={entryDuration}
                             setEntryDuration={setEntryDuration} />
                <button className={"edit-buttons"} onClick={() => setEditEnabled(false)}> Close</button>
                <input className={"edit-buttons"}
                       type={"submit"}
                       value={"Update"}
                />
            </form>
        </div>
    </div>
}
