import {ScheduleEntry} from "../model/ScheduleEntry";
import "./ScheduleEntryCard.css"


type ScheduleEntryCardProps = {
    scheduleEntry: ScheduleEntry;
}

export default function ScheduleEntryCard({scheduleEntry}: ScheduleEntryCardProps){
    return <div className={"schedule-entry-card"}>
        <div>{scheduleEntry.title}</div>
        <div>{scheduleEntry.description}</div>
        <div>{scheduleEntry.entryDummyDate}</div>
    </div>
}