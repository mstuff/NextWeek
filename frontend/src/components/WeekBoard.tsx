import DayOfTheWeekCard from "./DayOfTheWeekCard";
import "./WeekBoard.css"
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import * as React from "react";
import {FormEvent, useState} from "react";
import TextField from "@mui/material/TextField";
import {ScheduleEntry} from "../model/ScheduleEntry";

type WeekBoardProps = {
    scheduleEntries: ScheduleEntry [];
}

export default function WeekBoard({scheduleEntries}: WeekBoardProps) {

    const [selectedDay, setSelectedDay] = useState<Date>(new Date());
    const [selectedWeek, setSelectedWeek] = useState<Date []>([]);

    const onSelect = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedDay) {
            alert('Please select a valid date');
            return;
        }

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
    />

    return (
        <div>
            <div>
                <form className={"day-picker"}
                      onSubmit={onSelect}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            className={"start-picker-field"}
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
                    <input className={"select-day-button"}
                           type={"submit"} value={"Select this day"}/>
                </form>
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
        </div>
    )
}
