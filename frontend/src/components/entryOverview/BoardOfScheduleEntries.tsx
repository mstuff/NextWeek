import ScheduleEntryCard from "./ScheduleEntryCard";
import {ScheduleEntry} from "../../model/ScheduleEntry";
import "./BoardOfScheduleEntries.css";


type BoardOfScheduleEntriesProps = {
    scheduleEntries: ScheduleEntry [];
    deleteScheduleEntry: (entryId: string) => void;
}

export default function BoardOfScheduleEntries({scheduleEntries, deleteScheduleEntry}: BoardOfScheduleEntriesProps) {
    return (
        <div className={"board-of-schedule-entries"}>
            {scheduleEntries.map(entry => <ScheduleEntryCard key={entry.id}
                                                             scheduleEntry={entry}
                                                             deleteScheduleEntry={deleteScheduleEntry}/>)}
        </div>
    )
}
