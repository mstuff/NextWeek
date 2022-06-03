import {ScheduleEntry} from "../model/ScheduleEntry";
import {CSSProperties} from "react";
import "./EntryTimeScaleBar.css";


type TimescaleEntryBarProps = {
    scheduleEntry: ScheduleEntry;
}

export default function EntryTimeScaleBar({scheduleEntry}: TimescaleEntryBarProps) {

    const minutesPerDayBar: number = 24 * 60;

    const entryTimeInMinutesBar: number =
        new Date(scheduleEntry.entryDate).getHours() * 60 +
        new Date(scheduleEntry.entryDate).getMinutes();

    const getPositionPercentFromEntryTimeBar: string = ((100 * entryTimeInMinutesBar) / minutesPerDayBar)
        .toString() + "%";
    const getHeightPercentFromDurationBar: string = ((100 * scheduleEntry.durationInMinutes) / minutesPerDayBar)
        .toString() + "%";

    const scaledHeightAndPositionWithTimeBar: CSSProperties = {
        top: getPositionPercentFromEntryTimeBar,
        height: getHeightPercentFromDurationBar
    };

    return (
        <div className={"timescale-entry-bar"}
             style={scaledHeightAndPositionWithTimeBar}>
        </div>
    )
}