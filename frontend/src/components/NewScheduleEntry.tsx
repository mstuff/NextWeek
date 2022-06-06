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
    const [entryDuration, setEntryDuration] = useState<Date | null>(null);

    const onAdd = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title) {
            alert(`Please enter a title!`);
            return;
        } else if (!description) {
            alert(`Please enter a description!`);
            return;
        } else if (!entryDate) {
            alert(`Please select a valid date!`);
            return;
        } else if (!entryTime) {
            alert(`Please enter a valid time!`);
            return;
        } else if (!entryDuration) {
            alert(`Please enter a duration!`);
            return;
        }

        const patchedEntryDate: Date =
            new Date(entryDate.setHours(entryTime.getHours(),
                entryTime.getMinutes())
            )

        const durationInMinutes: number =
            new Date(entryDuration).getHours() * 60 +
            new Date(entryDuration).getMinutes()


        const newScheduleEntry: Omit<ScheduleEntry, "id"> = {
            title: title,
            description: description,
            entryDate: patchedEntryDate,
            durationInMinutes: durationInMinutes
        }

        addScheduleEntry(newScheduleEntry);

        setTitle('');
        setDescription('');
        setEntryDate(null);
        setEntryTime(null);
        setEntryDuration(null);
    }

    const renderInput = (params: any) => <TextField
        {...params}
        variant={"standard"}
    />

    return (
        <div className={"new-entry-form"}>
            <form onSubmit={onAdd}>
                <div className={"entry-fields-container"}>
                    <div className={"text-fields-container"}>
                        <div className={"margin-for-mui-fields"}>
                            <TextField
                                id={"standard-basic"}
                                label={"Title"}
                                variant={"standard"}
                                value={title}
                                onChange={event => event && setTitle(event.target.value)}
                            />
                        </div>
                        <div className={"margin-for-mui-fields"}>
                            <TextField
                                id={"standard-basic"}
                                label={"Description"}
                                variant={"standard"}
                                value={description}
                                onChange={event => event && setDescription(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className={"date-fields-container"}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <div className={"margin-for-mui-fields"}>
                                <DesktopDatePicker
                                    label="Start date"
                                    mask={"__.__.____"}
                                    minDate={new Date()}
                                    value={entryDate}
                                    inputFormat={"dd.MM.yyyy"}
                                    onChange={(newValue) => {
                                        setEntryDate((newValue));
                                    }}
                                    renderInput={renderInput}
                                />
                            </div>
                            <div className={"margin-for-mui-fields"}>
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
                            </div>
                            <div className={"margin-for-mui-fields"}>
                                <DesktopTimePicker
                                    label="Select a duration"
                                    mask={"__:__"}
                                    value={entryDuration}
                                    inputFormat={"HH:mm"}
                                    disableOpenPicker={true}
                                    onChange={(newValue) => {
                                        setEntryDuration((newValue));
                                    }}
                                    renderInput={renderInput}
                                />
                            </div>
                        </LocalizationProvider>
                    </div>

                </div>
                <input className={"new-entry-add-button"}
                       type={"submit"}
                       value={"Add a new entry"}
                />
            </form>
        </div>
    )
}
