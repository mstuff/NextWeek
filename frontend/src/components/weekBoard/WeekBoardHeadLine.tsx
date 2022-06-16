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
import WeekBoard from "./WeekBoard";
import {isValid} from "date-fns";


type WeekBoardHeadLineProps = {
    scheduleEntries: ScheduleEntry [];
    addScheduleEntry: (newEntry: Omit<ScheduleEntry, "id">) => void;
}

export default function WeekBoardHeadLine({scheduleEntries, addScheduleEntry}: WeekBoardHeadLineProps) {

    const [selectedDay, setSelectedDay] = useState<Date>(new Date());
    const [selectedWeek, setSelectedWeek] = useState<Date []>([]);
    const [closeScheduleViewButtonEnabled, setCloseScheduleViewButtonEnabled] = useState<boolean>(false);
    const [weekBoardEnabled, setWeekBoardEnabled] = useState<boolean>(false);
    const [addEntryEnabled, setAddEntryEnabled] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const handleAddEntry: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        setAddEntryEnabled(true);
    }

    const closeWeekBoard: MouseEventHandler<HTMLButtonElement> = () => {
        setWeekBoardEnabled(false);
        setCloseScheduleViewButtonEnabled(false);
    }

    const showWeekBoard: MouseEventHandler<HTMLButtonElement> = () => {
        onSelect(selectedDay);
        setCloseScheduleViewButtonEnabled(true);
    }

    const handleDateSelection = (event: FormEvent<HTMLInputElement> | null) => {
        if (event && event instanceof Date && isValid(event)) {
            onSelect(event)
        } else {
            toast.warning('Please select a valid date');
        }
    }

    const onSelect = (enteredDay: Date) => {
        setSelectedDay(enteredDay);

        setSelectedWeek([]);
        setSelectedWeek(
            (week) => [...week,
                new Date(enteredDay),
                new Date(enteredDay.getFullYear(), enteredDay.getMonth(), enteredDay.getDate() + 1),
                new Date(enteredDay.getFullYear(), enteredDay.getMonth(), enteredDay.getDate() + 2),
                new Date(enteredDay.getFullYear(), enteredDay.getMonth(), enteredDay.getDate() + 3),
                new Date(enteredDay.getFullYear(), enteredDay.getMonth(), enteredDay.getDate() + 4),
                new Date(enteredDay.getFullYear(), enteredDay.getMonth(), enteredDay.getDate() + 5),
                new Date(enteredDay.getFullYear(), enteredDay.getMonth(), enteredDay.getDate() + 6)]);

        setWeekBoardEnabled(true);
        setCloseScheduleViewButtonEnabled(true);
    }

    const renderInput = (params: any) => <TextField
        {...params}
        variant={"standard"}
        onClick={() => setOpen(true)}
    />

    return (
        <div>
            <div className={"week-board-head"}>
                <form className={"day-picker"}>
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
                            onChange={(inputElement: FormEvent<HTMLInputElement> | null) => {
                                inputElement && handleDateSelection(inputElement);
                            }}
                            renderInput={renderInput}
                        />
                    </LocalizationProvider>
                </form>
                {!closeScheduleViewButtonEnabled &&
                    <button className={"select-buttons"}
                            onClick={showWeekBoard}> Show overview
                    </button>}

                {closeScheduleViewButtonEnabled &&
                    <button className={"select-buttons"}
                            onClick={closeWeekBoard}> Close overview
                    </button>}
                <button className={"select-buttons"}
                        onClick={handleAddEntry}> Add a new entry
                </button>
            </div>
            {weekBoardEnabled && <WeekBoard selectedWeek={selectedWeek}
                                            scheduleEntries={scheduleEntries}/>}
            <div className={"schedule-page-div-new-entry"}>
                {addEntryEnabled && <NewScheduleEntry addScheduleEntry={addScheduleEntry}
                                                      setAddEntryEnabled={setAddEntryEnabled}/>}
            </div>
        </div>
    )
}
