import "./DayOfTheWeekCard.css"
import {ScheduleEntry} from "../../model/ScheduleEntry";
import TimescaleBoard from "./TimescaleBoard";
import TimescaleBarBox from "./TimescaleBarBox";

type DayOfTheWeekProps = {
    scheduleEntries: ScheduleEntry [];
    selectedDay: Date;
}

export default function DayOfTheWeekCard({selectedDay, scheduleEntries}: DayOfTheWeekProps) {

    return (
        <div className={"day-of-the-week-card"}>
            <div>
                <h1 className={"day-of-the-week-h1"}>
                    {new Date(selectedDay)
                        .toLocaleDateString("en-US", {weekday: "short"})}
                </h1>
                <p className={"day-of-the-week-p"}>
                    {new Date(selectedDay)
                        .toLocaleDateString('de-DE', {day: "2-digit", month: "2-digit", year: "numeric"})}
                </p>
            </div>
            <div className={"timescale-container"}>
            <div className={"calender-board-for-bars"}>
                <TimescaleBarBox scheduleEntries={scheduleEntries}/>
            </div>
            <div className={"calender-board-for-cards"}>
                <TimescaleBoard scheduleEntries={scheduleEntries}/>
            </div>
            </div>
        </div>
    )
}
