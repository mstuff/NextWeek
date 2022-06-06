import ScheduleEntryCard from "./ScheduleEntryCard";
import {ScheduleEntry} from "../model/ScheduleEntry";
import "./BoardOfScheduleEntries.css";


type BoardOfScheduleEntriesProps = {
    scheduleEntries: ScheduleEntry [];
}

export default function BoardOfScheduleEntries({scheduleEntries}: BoardOfScheduleEntriesProps) {
    return <div className={"board-of-schedule-entries"}>
        {scheduleEntries.map(entry => <ScheduleEntryCard key={entry.id} scheduleEntry={entry}/>)}
    </div>
}
