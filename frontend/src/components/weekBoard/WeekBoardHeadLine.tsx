import DayOfTheWeekCard from "./DayOfTheWeekCard";
import "./WeekBoard.css"
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import * as React from "react";
import {FormEvent, MouseEventHandler, useState} from "react";
import TextField from "@mui/material/TextField";
import {ScheduleEntry} from "../../model/ScheduleEntry";
import NewScheduleEntry from "../entryOverview/NewScheduleEntry";
import {toast} from "react-toastify";

type WeekBoardHeadLineProps = {
    scheduleEntries: ScheduleEntry [];
    addScheduleEntry: (newEntry: Omit<ScheduleEntry, "id">) => void;
}

export default function WeekBoardHeadLine({scheduleEntries, addScheduleEntry}: WeekBoardHeadLineProps) {

    const [selectedDay, setSelectedDay] = useState<Date>(new Date());
    const [selectedWeek, setSelectedWeek] = useState<Date []>([]);
    const [addEntryEnabled, setAddEntryEnabled] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);


    const handleAddEntry: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        setAddEntryEnabled(true);
    }


    const onSelect = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedDay) {
            toast.warning('Please select a valid date');
            return;
        }

        console.log(new Date(selectedDay))

        setSelectedWeek([]);
        setSelectedWeek(
            (week) => [...week,
                new Date(selectedDay),
                new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() + 1),
                new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() + 2),
                new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() + 3),
                new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() + 4),
                new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() + 5),
                new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() + 6)]);
    }

    const renderInput = (params: any) => <TextField
        {...params}
        variant={"standard"}
        onClick={() => setOpen(true)}
    />

    return (
        <div>
            <div className={"week-board-head"}>
                <form className={"day-picker"}
                      onSubmit={onSelect}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            className={"start-picker-field"}
                            open={open}
                            onOpen={() => setOpen(true)}
                            onClose={() => setOpen(false)}
                            label="Day to start the week"
                            mask={"__.__.____"}
                            value={selectedDay}
                            inputFormat={"dd.MM.yyyy"}
                            onChange={(newValue) => {
                                newValue && setSelectedDay((newValue));
                            }}
                            renderInput={renderInput}
                        />
                    </LocalizationProvider>
                    <input className={"select-buttons"}
                           type={"submit"} value={"Plan the week"}/>
                </form>
                <button className={"select-buttons"}
                        onClick={handleAddEntry}> Close overview
                </button>
                <button className={"select-buttons"}
                        onClick={handleAddEntry}> Add a new entry
                </button>
            </div>
            <div className={"week-board-outer"}>
                <div className={"week-board-inner"}>
                    {selectedWeek.map(day => <DayOfTheWeekCard
                        scheduleEntries={scheduleEntries
                            .filter(entry => new Date(entry.entryDate).toLocaleDateString() === new Date(day).toLocaleDateString())}
                        selectedDay={day}
                        key={day.toLocaleDateString()}
                    />)}
                </div>
            </div>
            <div className={"schedule-page-div-new-entry"}>
                {addEntryEnabled && <NewScheduleEntry addScheduleEntry={addScheduleEntry}
                                                      setAddEntryEnabled={setAddEntryEnabled}/>}
            </div>
        </div>
    )
}
