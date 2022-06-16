import DayOfTheWeekCard from "./DayOfTheWeekCard";
import * as React from "react";
import {ScheduleEntry} from "../../model/ScheduleEntry";


type WeekBoardProps = {
    selectedWeek: Date[],
    scheduleEntries: ScheduleEntry[],

}

export default function WeekBoard({selectedWeek, scheduleEntries}:WeekBoardProps) {

    return (
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
    )
}
