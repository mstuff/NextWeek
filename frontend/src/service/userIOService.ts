import {DtoUserInput} from "../dto/DtoUserInput";
import {ScheduleEntry} from "../model/ScheduleEntry";

export const validateInput: (entryToValidate: DtoUserInput) => boolean =
    entryToValidate => {
        if (!entryToValidate.title) {
            alert(`Please enter a title!`);
            return false;
        } else if (entryToValidate.title.length <= 2) {
            alert(`The Title must contain at least three characters!`);
            return false;
        } else if (!entryToValidate.entryDate) {
            alert(`Please select a valid date!`);
            return false;
        } else if (!entryToValidate.entryTime) {
            alert(`Please enter a valid time!`);
            return false;
        } else if (!entryToValidate.entryDuration) {
            alert(`Please enter a duration!`);
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
