import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker, DesktopTimePicker} from "@mui/x-date-pickers";
import * as React from "react";


type InputFieldsProps = {
    title: string,
    setTitle: (eventValue: string) => void,
    description: string,
    setDescription: (eventValue: string) => void,
    entryDate: Date | null,
    setEntryDate: (eventValue: Date | null) => void,
    entryTime: Date | null,
    setEntryTime: (eventValue: Date | null) => void,
    entryDuration: Date | null,
    setEntryDuration: (eventValue: Date | null) => void
}

export default function InputFields({
                                        title, setTitle,
                                        description, setDescription,
                                        entryDate, setEntryDate,
                                        entryTime, setEntryTime,
                                        entryDuration, setEntryDuration
                                    }: InputFieldsProps) {

    const renderInput = (params: any) => <TextField
        {...params}
        variant={"standard"}
    />

    return (
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
                        id={"standard-multiline-static"}
                        label={"Description"}
                        multiline
                        rows={3.7}
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
    )
}