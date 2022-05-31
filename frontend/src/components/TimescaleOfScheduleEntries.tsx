import {ScheduleEntry} from "../model/ScheduleEntry";
import TimescaleEntryCard from "./TimescaleEntryCard";
import "./TimescaleOfScheduleEntries.css"


type ListOfScheduleEntriesProps = {
    scheduleEntries: ScheduleEntry [];
}

export default function TimescaleOfScheduleEntries({scheduleEntries}: ListOfScheduleEntriesProps) {



    return (
        <div className={"timescale-of-schedule-entries"}>
            {scheduleEntries.map(entry =>
            <TimescaleEntryCard key={entry.id}
                                scheduleEntry={entry} />
            )}
        </div>
    )
}