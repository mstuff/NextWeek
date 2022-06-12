import {ScheduleEntry} from "../model/ScheduleEntry";
import "./DeleteAlert.css";
import {MouseEventHandler} from "react";

type DeleteAlertProps = {
    scheduleEntry: ScheduleEntry;
    deleteScheduleEntry: (entryId: string) => void;
    setDeleteAlertEnabled: (status: boolean) => void;
}

export default function DeleteAlert({scheduleEntry, deleteScheduleEntry, setDeleteAlertEnabled}: DeleteAlertProps) {

    const confirmDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        deleteScheduleEntry(scheduleEntry.id);
        setDeleteAlertEnabled(false);
    }

    return (
        <div className={"delete-entry-alert-card"}>
            <div className={"delete-alert-text"}> Delete this one?</div>
            <div className={"position-delete-alert-buttons"}>

                <button className={"delete-confirm-button"}
                        onClick={confirmDelete}> Delete
                </button>
                <button className={"dont-delete-button"}
                        onClick={() => setDeleteAlertEnabled(false)}> No!
                </button>
            </div>
        </div>
    )
}
