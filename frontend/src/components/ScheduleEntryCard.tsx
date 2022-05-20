import {ScheduleEntry} from "../model/ScheduleEntry";


type ScheduleEntryCardProps = {
    scheduleEntry: ScheduleEntry;
}

export default function ScheduleEntryCard({scheduleEntry}: ScheduleEntryCardProps){
    return <div>
        <div>{scheduleEntry.title}</div>
        <div>{scheduleEntry.description}</div>
        <div>{scheduleEntry.toScheduleDummyDate}</div>
    </div>
}