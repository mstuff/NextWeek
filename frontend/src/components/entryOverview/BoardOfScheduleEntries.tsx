import ScheduleEntryCard from "./ScheduleEntryCard";
import {ScheduleEntry} from "../../model/ScheduleEntry";
import "./BoardOfScheduleEntries.css";
import {sortDescendingByDate} from "../../service/helperFunctionsService";


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

    scheduleEntries.sort(sortDescendingByDate);

    return (
        <div>
            <h2 className={"entry-board-header"}> My appointments </h2>
            <div className={"board-of-schedule-entries"}>

                {scheduleEntries.map(entry => <ScheduleEntryCard key={entry.id}
                                                                 scheduleEntry={entry}
                                                                 saveUpdatedEntry={saveUpdatedEntry}
                                                                 deleteScheduleEntry={deleteScheduleEntry}/>)}
            </div>
        </div>
    )
}
