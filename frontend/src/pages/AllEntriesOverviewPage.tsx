import {ScheduleEntry} from "../model/ScheduleEntry";
import BoardOfScheduleEntries from "../components/entryOverview/BoardOfScheduleEntries";
import "./AllEntriesOverviewPage.css"


type AllEntriesOverviewPageProps = {
    scheduleEntries: ScheduleEntry [];
    addScheduleEntry: (newEntry: Omit<ScheduleEntry, "id">) => void;
    saveUpdatedEntry: (entryId: string, entryToUpdate: Omit<ScheduleEntry, "id">) => void;
    deleteScheduleEntry: (entryId: string) => void;
}

export default function AllEntriesOverviewPage({
                                                   scheduleEntries,
                                                   saveUpdatedEntry,
                                                   deleteScheduleEntry
                                               }: AllEntriesOverviewPageProps) {
    return <div>
        <div className={"container"}>
        </div>
        <div className={"overview-page-div-list-of-entries"}>
            <BoardOfScheduleEntries scheduleEntries={scheduleEntries}
                                    saveUpdatedEntry={saveUpdatedEntry}
                                    deleteScheduleEntry={deleteScheduleEntry}/>
        </div>
    </div>
}
