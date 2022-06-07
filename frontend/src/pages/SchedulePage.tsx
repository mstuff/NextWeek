import {ScheduleEntry} from "../model/ScheduleEntry";
import BoardOfScheduleEntries from "../components/BoardOfScheduleEntries";
import NewScheduleEntry from "../components/NewScheduleEntry";

import "./SchedulePage.css"
import WeekBoard from "../components/WeekBoard";

type SchedulePageProps = {
    scheduleEntries: ScheduleEntry [];
    addScheduleEntry: (newEntry: Omit<ScheduleEntry, "id">) => void;
}

export default function SchedulePage({scheduleEntries, addScheduleEntry}: SchedulePageProps) {

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
            <BoardOfScheduleEntries scheduleEntries={scheduleEntries}/>
        </div>
    </div>
}
