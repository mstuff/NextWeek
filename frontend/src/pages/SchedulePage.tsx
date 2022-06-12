import {ScheduleEntry} from "../model/ScheduleEntry";
import BoardOfScheduleEntries from "../components/entryOverview/BoardOfScheduleEntries";
import NewScheduleEntry from "../components/entryOverview/NewScheduleEntry";

import "./SchedulePage.css"
import WeekBoard from "../components/weekBoard/WeekBoard";

type SchedulePageProps = {
    scheduleEntries: ScheduleEntry [];
    addScheduleEntry: (newEntry: Omit<ScheduleEntry, "id">) => void;
    saveUpdatedEntry: (entryId: string, entryToUpdate: Omit<ScheduleEntry, "id">) => void;
    deleteScheduleEntry: (entryId: string) => void;
}

export default function SchedulePage({
                                         scheduleEntries,
                                         addScheduleEntry,
                                         saveUpdatedEntry,
                                         deleteScheduleEntry
                                     }: SchedulePageProps) {

    return <div>
        <div>
            <WeekBoard scheduleEntries={scheduleEntries}/>
        </div>
        <div className={"schedule-page-container"}>
            <div className={"schedule-page-div-new-entry"}>
                <NewScheduleEntry addScheduleEntry={addScheduleEntry}/>
            </div>
        </div>
        <div className={"schedule-page-div-list-of-entries"}>
            <BoardOfScheduleEntries scheduleEntries={scheduleEntries}
                                    saveUpdatedEntry={saveUpdatedEntry}
                                    deleteScheduleEntry={deleteScheduleEntry}/>
        </div>
    </div>
}
