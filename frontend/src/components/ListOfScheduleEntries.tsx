import ScheduleEntryCard from "./ScheduleEntryCard";
import {ScheduleEntry} from "../model/ScheduleEntry";
import "./ListOfScheduleEntries.css";


type ListOfScheduleEntriesProps = {
    scheduleEntries: ScheduleEntry [];
}

export default function ListOfScheduleEntries({scheduleEntries}: ListOfScheduleEntriesProps){
    return <div className={"list-of-schedule-entries"}>
        {scheduleEntries.map(entry => <ScheduleEntryCard key={entry.id} scheduleEntry={entry}/>)}
    </div>

}