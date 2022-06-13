import {DtoUserInput} from "../dto/DtoUserInput";
import {ScheduleEntry} from "../model/ScheduleEntry";
import {toast} from "react-toastify";

export const validateInput: (entryToValidate: DtoUserInput) => boolean =
    entryToValidate => {
        if (!entryToValidate.title) {
            toast.warning(`Please enter a title!`);
            return false;
        } else if (entryToValidate.title.length <= 2) {
            toast.warning(`The Title must contain at least three characters!`);
            return false;
        } else if (!entryToValidate.entryDate) {
            toast.warning(`Please select a valid date!`);
            return false;
        } else if (!entryToValidate.entryTime) {
            toast.warning(`Please enter a valid time!`);
            return false;
        } else if (!entryToValidate.entryDuration) {
            toast.warning(`Please enter a duration!`);
            return false;
        } else return true;
    }

export const patchEntryDate: (entryDtoToPatch: DtoUserInput) => Date =
    entryDtoToPatch => {
        return new Date(entryDtoToPatch.entryDate!.setHours(entryDtoToPatch.entryTime!.getHours(),
            entryDtoToPatch.entryTime!.getMinutes())
        )
    }

export const calculateDurationInMinutes: (entryDtoForCalculation: DtoUserInput) => number =
    entryDtoForCalculation => {
        return new Date(entryDtoForCalculation.entryDuration!).getHours() * 60 +
            new Date(entryDtoForCalculation.entryDuration!).getMinutes()
    }

export const translateDurationIntoDate: (scheduleEntry: ScheduleEntry) => Date =
    scheduleEntry => {
    return new Date(new Date(scheduleEntry.entryDate)
        .setHours(scheduleEntry.durationInMinutes / 60,
            scheduleEntry.durationInMinutes % 60));
    }
