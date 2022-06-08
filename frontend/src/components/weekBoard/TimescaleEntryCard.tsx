import {ScheduleEntry} from "../../model/ScheduleEntry";
import "./TimescaleEntryCard.css";
import {CSSProperties} from "react";
import {getPositionPercentFromEntryTime} from "../../service/timescalePositionService";


type TimescaleEntryCardProps = {
    scheduleEntry: ScheduleEntry;
}

export default function TimescaleEntryCard({scheduleEntry}: TimescaleEntryCardProps) {

    const scaledPositionWithTime: CSSProperties = {
        top: getPositionPercentFromEntryTime(scheduleEntry),
    };

    return (
        <div className={"timescale-entry-card"}
             style={scaledPositionWithTime}>
            <div>{scheduleEntry.title}</div>
            <div className={"time-info"}>Start:
                {new Date(scheduleEntry.entryDate)
                    .toLocaleTimeString('de-DE', {hour: "2-digit", minute: "2-digit"})}
            </div>
        </div>
    )}
