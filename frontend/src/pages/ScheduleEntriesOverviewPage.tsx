import {ScheduleEntry} from "../model/ScheduleEntry";
import ScheduleEntryCard from "../components/ScheduleEntryCard";

type ScheduleEntriesOverviewPageProps = {
    scheduleEntries: ScheduleEntry [];
}


export default function ScheduleEntriesOverviewPage({scheduleEntries}: ScheduleEntriesOverviewPageProps){

    return <div>
        {scheduleEntries.map(entry => <ScheduleEntryCard key={entry.id} scheduleEntry={entry}/>)}
    </div>

}