import ScheduleEntryCard from "./ScheduleEntryCard";
import {ScheduleEntry} from "../model/ScheduleEntry";


type ListOfScheduleEntriesProps = {
    scheduleEntries: ScheduleEntry [];
}

export default function ListOfScheduleEntries({scheduleEntries}: ListOfScheduleEntriesProps){
    return <div>
        {scheduleEntries.map(entry => <ScheduleEntryCard key={entry.id} scheduleEntry={entry}/>)}
    </div>

}