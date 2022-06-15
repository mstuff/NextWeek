import {ScheduleEntry} from "../model/ScheduleEntry";
import BoardOfScheduleEntries from "../components/entryOverview/BoardOfScheduleEntries";
import "./SchedulePage.css"
import WeekBoardHeadLine from "../components/weekBoard/WeekBoardHeadLine";

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
            <WeekBoardHeadLine scheduleEntries={scheduleEntries}
                               addScheduleEntry={addScheduleEntry}/>
        </div>
        <div className={"schedule-page-container"}>

        </div>
        <div className={"schedule-page-div-list-of-entries"}>
            <BoardOfScheduleEntries scheduleEntries={scheduleEntries}
                                    saveUpdatedEntry={saveUpdatedEntry}
                                    deleteScheduleEntry={deleteScheduleEntry}/>
        </div>
    </div>
}
