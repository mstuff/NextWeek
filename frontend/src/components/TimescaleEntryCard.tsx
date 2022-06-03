import {ScheduleEntry} from "../model/ScheduleEntry";
import "./TimescaleEntryCard.css";
import {CSSProperties} from "react";


type TimescaleEntryCardProps = {
    scheduleEntry: ScheduleEntry;
}

export default function TimescaleEntryCard({scheduleEntry}: TimescaleEntryCardProps) {

    const minutesPerDay: number = 24 * 60;

    const entryTimeInMinutes: number =
        new Date(scheduleEntry.entryDate).getHours() * 60 +
        new Date(scheduleEntry.entryDate).getMinutes();

    const getPositionPercentFromEntryTime: string = ((100 * entryTimeInMinutes) / minutesPerDay)
        .toString() + "%";

    const scaledPositionWithTime: CSSProperties = {
        top: getPositionPercentFromEntryTime,
    };

    return (
        <div className={"timescale-entry-card"}
             style={scaledPositionWithTime}>
            <div>{scheduleEntry.title}</div>
            <div>{scheduleEntry.durationInMinutes}</div>
            <div>
                {new Date(scheduleEntry.entryDate)
                    .toLocaleDateString('de-DE', {day: "2-digit", month: "2-digit", year: "numeric"})}
            </div>
            <div>
                {new Date(scheduleEntry.entryDate)
                    .toLocaleTimeString('de-DE', {hour: "2-digit", minute: "2-digit"})}
            </div>
        </div>
    )
}
