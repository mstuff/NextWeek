import {ScheduleEntry} from "../model/ScheduleEntry";
import BoardOfScheduleEntries from "../components/entryOverview/BoardOfScheduleEntries";
import NewScheduleEntry from "../components/entryOverview/NewScheduleEntry";
import "./AllEntriesOverviewPage.css"


type AllEntriesOverviewPageProps = {
    scheduleEntries: ScheduleEntry [];
    addScheduleEntry: (newEntry: Omit<ScheduleEntry, "id">) => void;
    deleteScheduleEntry: (entryId: string) => void;
}

export default function AllEntriesOverviewPage({
                                                   scheduleEntries,
                                                   addScheduleEntry,
                                                   deleteScheduleEntry
                                               }: AllEntriesOverviewPageProps) {
    return <div>
        <div className={"container"}>
            <div className={"overview-page-div-new-entry"}>
                <NewScheduleEntry addScheduleEntry={addScheduleEntry}/>
            </div>
        </div>
        <div className={"overview-page-div-list-of-entries"}>
            <BoardOfScheduleEntries scheduleEntries={scheduleEntries}
                                    deleteScheduleEntry={deleteScheduleEntry}/>
        </div>
    </div>
}
