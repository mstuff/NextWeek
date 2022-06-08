import {ScheduleEntry} from "../model/ScheduleEntry";
import "./DeleteAlert.css";
import {MouseEventHandler} from "react";

type DeleteAlertProps = {
    scheduleEntry: ScheduleEntry;
    deleteScheduleEntry: (entryId: string) => void;
    setPopUp: (status: boolean) => void;
}

export default function DeleteAlert({scheduleEntry, deleteScheduleEntry, setPopUp}: DeleteAlertProps) {

    const confirmDelete: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        deleteScheduleEntry(scheduleEntry.id);
        setPopUp(false);
    }

    return (
        <div className={"delete-entry-alert-card"}>
            <div className={"delete-alert-text"}> Delete this one?</div>
            <div className={"position-delete-alert-buttons"}>
                <button className={"dont-delete-button"}
                        onClick={() => setPopUp(false)}> No!
                </button>
                <button className={"delete-confirm-button"}
                        onClick={confirmDelete}> Delete
                </button>
            </div>
        </div>
    )
}
