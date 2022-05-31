import {ScheduleEntry} from "../model/ScheduleEntry";
import "./TimescaleEntryCard.css"


type TimescaleEntryCardProps = {
    scheduleEntry: ScheduleEntry;
}

export default function TimescaleEntryCard({scheduleEntry}: TimescaleEntryCardProps) {

const percent:string = "60%"



    return (
        <div className={"timescale-entry-card"}
        style={{top: percent}}>
            <div>{scheduleEntry.title}</div>
            <div>
                {new Date(scheduleEntry.entryDate)
                    .toLocaleDateString('de-DE', {day: "2-digit", month: "2-digit", year: "numeric"})}
            </div>
            <div>
                {new Date(scheduleEntry.entryTime)
                    .toLocaleTimeString('de-DE', {hour: "2-digit", minute: "2-digit"})}
            </div>
        </div>
    )
}