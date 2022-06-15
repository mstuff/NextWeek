import {ScheduleEntry} from "../../model/ScheduleEntry";
import {FormEvent, useState} from "react";
import "./NewScheduleEntry.css";
import * as React from "react";
import {DtoUserInput} from "../../dto/DtoUserInput";
import {calculateDurationInMinutes, patchEntryDate, validateInput} from "../../service/userIOService";
import InputFields from "../InputFields";


type NewScheduleEntryProps = {
    addScheduleEntry: (newEntry: Omit<ScheduleEntry, "id">) => void;
    setAddEntryEnabled: (status: boolean) => void;
}

export default function NewScheduleEntry({addScheduleEntry, setAddEntryEnabled}: NewScheduleEntryProps) {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [entryDate, setEntryDate] = useState<Date | null>(null);
    const [entryTime, setEntryTime] = useState<Date | null>(null);
    const [entryDuration, setEntryDuration] = useState<Date | null>(null);

    const onAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newEntryDto: DtoUserInput = {
            title: title,
            description: description,
            entryDate: entryDate,
            entryTime: entryTime,
            entryDuration: entryDuration
        }

        if (!validateInput(newEntryDto)) {
            return;
        }

        const newScheduleEntry: Omit<ScheduleEntry, "id"> = {
            title: title,
            description: description,
            entryDate: patchEntryDate(newEntryDto),
            durationInMinutes: calculateDurationInMinutes(newEntryDto)
        }

        addScheduleEntry(newScheduleEntry);

        setTitle('');
        setDescription('');
        setEntryDate(null);
        setEntryTime(null);
        setEntryDuration(null);
    }

    return (
        <div className={"new-entry-form"}>
            <form onSubmit={onAdd}>
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
                <button className={"edit-buttons"} onClick={() => setAddEntryEnabled(false)}> Close</button>
                <input className={"new-entry-add-button"}
                       type={"submit"}
                       value={"Add a new entry"}
                />
            </form>
        </div>
    )
}
