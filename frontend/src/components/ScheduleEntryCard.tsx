import {ScheduleEntry} from "../model/ScheduleEntry";
import "./ScheduleEntryCard.css"

type ScheduleEntryCardProps = {
    scheduleEntry: ScheduleEntry;
}

export default function ScheduleEntryCard({scheduleEntry}: ScheduleEntryCardProps) {

    return (
    <div className={"schedule-entry-card"}>
        <div>{scheduleEntry.title}</div>
        <div>{scheduleEntry.description}</div>
        <div>
            {new Date(scheduleEntry.entryDate)
                .toLocaleDateString('de-DE', {day: "2-digit", month: "2-digit", year: "numeric"})}
        </div>
        <div>
            {new Date(scheduleEntry.entryDate)
                .toLocaleTimeString('de-DE', {hour: "2-digit", minute: "2-digit"})}
        </div>
        <div>{new Date(scheduleEntry.entryDate)
            .toLocaleDateString("en-US", {weekday: "short"})}
        </div>
    </div>
    )
}
