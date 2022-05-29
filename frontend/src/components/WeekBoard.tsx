import DayOfTheWeekCard from "./DayOfTheWeekCard";
import "./WeekBoard.css"
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import * as React from "react";
import {FormEvent, useState} from "react";
import TextField from "@mui/material/TextField";


export default function WeekBoard() {

    const [weekDay1, setWeekDay1] = useState<Date>(new Date());
    const [weekDay2, setWeekDay2] = useState<Date>(new Date());
    const [weekDay3, setWeekDay3] = useState<Date>(new Date());
    const [weekDay4, setWeekDay4] = useState<Date>(new Date());
    const [weekDay5, setWeekDay5] = useState<Date>(new Date());
    const [weekDay6, setWeekDay6] = useState<Date>(new Date());
    const [weekDay7, setWeekDay7] = useState<Date>(new Date());

    /*
    const onSelect = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setWeekDay2((date) => new Date(date.setDate(weekDay1.getDate() +1)));
        setWeekDay3((date) => new Date(date.setDate(weekDay1.getDate() +2)));
        setWeekDay4((date) => new Date(date.setDate(weekDay1.getDate() +3)));
        setWeekDay5((date) => new Date(date.setDate(weekDay1.getDate() +4)));
        setWeekDay6((date) => new Date(date.setDate(weekDay1.getDate() +5)));
        setWeekDay7((date) => new Date(date.setDate(weekDay1.getDate() +6)));
    }

     */

    const renderInput = (params: any) => <TextField
        {...params}
        variant={"standard"}
    />

    return (
        <div>
            <div>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Day to start the week"
                        mask={"__.__.____"}
                        value={weekDay1}
                        inputFormat={"dd.MM.yyyy"}
                        onChange={(newValue) => {
                           newValue && setWeekDay1((newValue));
                            setWeekDay2((date) => new Date(date.setDate(weekDay1.getDate() +1)));
                            setWeekDay3((date) => new Date(date.setDate(weekDay1.getDate() +2)));
                            setWeekDay4((date) => new Date(date.setDate(weekDay1.getDate() +3)));
                            setWeekDay5((date) => new Date(date.setDate(weekDay1.getDate() +4)));
                            setWeekDay6((date) => new Date(date.setDate(weekDay1.getDate() +5)));
                            setWeekDay7((date) => new Date(date.setDate(weekDay1.getDate() +6)));
                        }}
                        renderInput={renderInput}
                    />
                </LocalizationProvider>

            </div>
        <div className={"week-board-outer"}>
            <div className={"week-board-inner"}>
                <DayOfTheWeekCard selectedDay={weekDay1}/>
                <DayOfTheWeekCard selectedDay={weekDay2}/>
                <DayOfTheWeekCard selectedDay={weekDay3}/>
                <DayOfTheWeekCard selectedDay={weekDay4}/>
                <DayOfTheWeekCard selectedDay={weekDay5}/>
                <DayOfTheWeekCard selectedDay={weekDay6}/>
                <DayOfTheWeekCard selectedDay={weekDay7}/>
            </div>
        </div>

        </div>
    )

}