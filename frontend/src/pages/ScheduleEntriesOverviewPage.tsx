import {ScheduleEntry} from "../model/ScheduleEntry";
import ListOfScheduleEntries from "../components/ListOfScheduleEntries";
import NewScheduleEntry from "../components/NewScheduleEntry";

type ScheduleEntriesOverviewPageProps = {
    scheduleEntries: ScheduleEntry [];
    addScheduleEntry: (newEntry: Omit<ScheduleEntry, "id">) => void;
}

export default function ScheduleEntriesOverviewPage({
                                                        scheduleEntries,
                                                        addScheduleEntry
                                                    }: ScheduleEntriesOverviewPageProps) {

    return <div>
        <div>
            <NewScheduleEntry addScheduleEntry={addScheduleEntry}/>
        </div>
        <div>
            <ListOfScheduleEntries scheduleEntries={scheduleEntries}/>
        </div>

    </div>

}