import {ScheduleEntry} from "../model/ScheduleEntry";
import TimescaleEntryCard from "./TimescaleEntryCard";
import "./TimescaleBoard.css"


type TimescaleBoardProps = {
    scheduleEntries: ScheduleEntry [];
}

export default function TimescaleBoard({scheduleEntries}: TimescaleBoardProps) {

    return (
        <div className={"timescale-board"}>
            <div>
                {scheduleEntries.map(entry =>
                    <TimescaleEntryCard key={entry.id}
                                        scheduleEntry={entry}/>
                )}
            </div>
        </div>
    )
}
