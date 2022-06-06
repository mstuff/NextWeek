import {ScheduleEntry} from "../model/ScheduleEntry";
import EntryTimeScaleBar from "./EntryTimeScaleBar";
import "./TimescaleBarBox.css"

type TimescaleBarBoxProps = {
    scheduleEntries: ScheduleEntry [];
}

export default function TimescaleBarBox({scheduleEntries}: TimescaleBarBoxProps) {

    return (
        <div className={"timescale-bar-box"}>
            {scheduleEntries.map(entry => <EntryTimeScaleBar key={entry.id}
                                                             scheduleEntry={entry}/>)}
        </div>
    )
}
