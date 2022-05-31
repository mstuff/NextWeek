import {ScheduleEntry} from "../model/ScheduleEntry";
import ListOfScheduleEntries from "../components/ListOfScheduleEntries";
import NewScheduleEntry from "../components/NewScheduleEntry";

import "./ScheduleEntriesOverviewPage.css"
import WeekBoard from "../components/WeekBoard";

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
            <WeekBoard scheduleEntries={scheduleEntries}/>
        </div>
        <div className={"container"}>
        <div className={"overview-page-div-new-entry"}>
            <NewScheduleEntry addScheduleEntry={addScheduleEntry}/>
        </div>
        </div>
        <div className={"overview-page-div-list-of-entries"}>
            <ListOfScheduleEntries scheduleEntries={scheduleEntries}/>
        </div>
    </div>
}