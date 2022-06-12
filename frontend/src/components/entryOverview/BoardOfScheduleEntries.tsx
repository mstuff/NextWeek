import ScheduleEntryCard from "./ScheduleEntryCard";
import {ScheduleEntry} from "../../model/ScheduleEntry";
import "./BoardOfScheduleEntries.css";


type BoardOfScheduleEntriesProps = {
    scheduleEntries: ScheduleEntry [];
    saveUpdatedEntry: (entryId: string, entryToUpdate: Omit<ScheduleEntry, "id">) => void;
    deleteScheduleEntry: (entryId: string) => void;
}

export default function BoardOfScheduleEntries({
                                                   scheduleEntries,
                                                   saveUpdatedEntry,
                                                   deleteScheduleEntry
                                               }: BoardOfScheduleEntriesProps) {
    return (
        <div className={"board-of-schedule-entries"}>
            {scheduleEntries.map(entry => <ScheduleEntryCard key={entry.id}
                                                             scheduleEntry={entry}
                                                             saveUpdatedEntry={saveUpdatedEntry}
                                                             deleteScheduleEntry={deleteScheduleEntry}/>)}
        </div>
    )
}
