import {ScheduleEntry} from "../model/ScheduleEntry";
import BoardOfScheduleEntries from "../components/BoardOfScheduleEntries";
import NewScheduleEntry from "../components/NewScheduleEntry";
import "./AllEntriesOverviewPage.css"


type AllEntriesOverviewPageProps = {
    scheduleEntries: ScheduleEntry [];
    addScheduleEntry: (newEntry: Omit<ScheduleEntry, "id">) => void;
}

export default function AllEntriesOverviewPage({
                                                   scheduleEntries,
                                                   addScheduleEntry
                                               }: AllEntriesOverviewPageProps) {

    return <div>
        <div className={"container"}>
            <div className={"overview-page-div-new-entry"}>
                <NewScheduleEntry addScheduleEntry={addScheduleEntry}/>
            </div>
        </div>
        <div className={"overview-page-div-list-of-entries"}>
            <BoardOfScheduleEntries scheduleEntries={scheduleEntries}/>
        </div>
    </div>
}
