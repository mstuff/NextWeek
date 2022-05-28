import {ScheduleEntry} from "../model/ScheduleEntry";
import {FormEvent, useState} from "react";
import "./NewScheduleEntry.css";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker, DesktopTimePicker} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import * as React from "react";


type NewScheduleEntryProps = {
    addScheduleEntry: (newEntry: Omit<ScheduleEntry, "id">) => void;
}

export default function NewScheduleEntry({addScheduleEntry}: NewScheduleEntryProps) {

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [entryDate, setEntryDate] = useState<Date | null>(null);
    const [entryTime, setEntryTime] = useState<Date | null>(null);

    const onAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title) {
            alert(`Please enter a title!`);
            return;
        } else if (!description) {
            alert(`Please enter a description!`);
            return;
        } else if (!entryDate) {
            alert(`Please enter a valid date!`);
            return;
        } else if (!entryTime) {
            alert(`Please enter a valid time!`);
            return;
        }

        const newScheduleEntry: Omit<ScheduleEntry, "id"> = {
            title: title,
            description: description,
            entryDate: entryDate,
            entryTime: entryTime
        }

        addScheduleEntry(newScheduleEntry);

        setTitle('');
        setDescription('');
        setEntryDate(null);
        setEntryTime(null);
    }

    const renderInput = (params: any) => <TextField
        {...params}
        variant={"standard"}
    />

    return (
        <div>
            <form onSubmit={onAdd}
                  className={"new-entry-form"}>
                <input className={"new-entry-input-field"}
                       type={"text"}
                       placeholder={"Title"}
                       value={title}
                       onChange={event => setTitle(event.target.value)}/>
                <input className={"new-entry-input-field"}
                       type={"text"}
                       placeholder={"Description"}
                       value={description}
                       onChange={event => setDescription(event.target.value)}/>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Start date"
                        mask={"__.__.____"}
                        value={entryDate}
                        inputFormat={"dd.MM.yyyy"}
                        onChange={(newValue) => {
                            setEntryDate((newValue));
                        }}
                        renderInput={renderInput}
                    />
                    <DesktopTimePicker
                        label="Start time"
                        mask={"__:__"}
                        value={entryTime}
                        inputFormat={"HH:mm"}
                        disableOpenPicker={true}
                        onChange={(newValue) => {
                            setEntryTime((newValue));
                        }}
                        renderInput={renderInput}
                    />
                </LocalizationProvider>
                <input className={"new-entry-add-button"}
                       type={"submit"} value={"Add new entry"}/>
            </form>
        </div>
    )
}