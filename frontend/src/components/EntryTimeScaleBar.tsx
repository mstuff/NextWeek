import {ScheduleEntry} from "../model/ScheduleEntry";
import {CSSProperties} from "react";
import "./EntryTimeScaleBar.css";
import {getHeightPercentFromDuration, getPositionPercentFromEntryTime} from "../service/timescalePositionService";


type TimescaleEntryBarProps = {
    scheduleEntry: ScheduleEntry;
}

export default function EntryTimeScaleBar({scheduleEntry}: TimescaleEntryBarProps) {

    const scaledHeightAndPositionWithTime: CSSProperties = {
        top: getPositionPercentFromEntryTime(scheduleEntry),
        height: getHeightPercentFromDuration(scheduleEntry)
    };

    return (
        <div className={"timescale-entry-bar"}
             style={scaledHeightAndPositionWithTime}>
        </div>
    )
}
