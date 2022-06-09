import {ScheduleEntry} from "../../model/ScheduleEntry";
import {BsXSquareFill} from "react-icons/bs";
import "./ScheduleEntryCard.css"
import {IconContext} from "react-icons";
import {MouseEventHandler, useState} from "react";
import DeleteAlert from "../DeleteAlert";

type ScheduleEntryCardProps = {
    scheduleEntry: ScheduleEntry;
    deleteScheduleEntry: (entryId: string) => void;
}

export default function ScheduleEntryCard({scheduleEntry, deleteScheduleEntry}: ScheduleEntryCardProps) {

    const [deleteAlertEnabled, setDeleteAlertEnabled] = useState<boolean>(false);

    const handleDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        setDeleteAlertEnabled(true);
    }

    return (
        <div className={"schedule-entry-card"}>
            <div>
                <div className={"title-entry-card"}>{scheduleEntry.title}</div>
                {deleteAlertEnabled && <DeleteAlert scheduleEntry={scheduleEntry}
                                       deleteScheduleEntry={deleteScheduleEntry}
                                       setDeleteAlertEnabled={setDeleteAlertEnabled}/>}
            </div>
            <div className={"entry-card-info-and-actions-tiles"}>
                <div className={"entry-card-time-info"}>
                    <div>
                        {new Date(scheduleEntry.entryDate)
                            .toLocaleDateString('de-DE', {day: "2-digit", month: "2-digit", year: "numeric"})}
                    </div>
                    <div>
                        <div>
                            {new Date(scheduleEntry.entryDate)
                                .toLocaleTimeString('de-DE', {hour: "2-digit", minute: "2-digit"})}
                        </div>
                        <div>
                            {Math.trunc(scheduleEntry.durationInMinutes / 60)} {"h "}
                            {Math.trunc(scheduleEntry.durationInMinutes % 60)} {"min"}
                        </div>
                    </div>
                </div>
                <div className={"action-tiles"}>
                    <IconContext.Provider
                        value={{size: "20px", style: {color: "#82A3A1", backgroundColor: "#565656"}}}>
                        <button className={"delete-button"} onClick={handleDelete}><BsXSquareFill/></button>
                    </IconContext.Provider>
                </div>
            </div>
        </div>
    )
}
