import {DtoUserInput} from "../dto/DtoUserInput";

export const validateInput: (entryToValidate: DtoUserInput) => void =
    entryToValidate => {
        if (!entryToValidate.title) {
            alert(`Please enter a title!`);
            return;
        } else if (!entryToValidate.description) {
            alert(`Please enter a description!`);
            return;
        } else if (!entryToValidate.entryDate) {
            alert(`Please select a valid date!`);
            return;
        } else if (!entryToValidate.entryTime) {
            alert(`Please enter a valid time!`);
            return;
        } else if (!entryToValidate.entryDuration) {
            alert(`Please enter a duration!`);
            return;
        }
    }

export const patchEntryDate: (entryDtoToPatch: DtoUserInput) => Date =
    entryDtoToPatch => {
        validateInput(entryDtoToPatch);
        console.log(new Date(entryDtoToPatch.entryDate!))
        console.log(new Date(entryDtoToPatch.entryDate!.getHours()))
        return new Date(entryDtoToPatch.entryDate!.setHours(entryDtoToPatch.entryTime!.getHours(),
            entryDtoToPatch.entryTime!.getMinutes())
        )
    }

export const calculateDurationInMinutes: (entryDtoToCalculateFor: DtoUserInput) => number =
    entryDtoToCalculateFor => {
        validateInput(entryDtoToCalculateFor);
        return new Date(entryDtoToCalculateFor.entryDuration!).getHours() * 60 +
            new Date(entryDtoToCalculateFor.entryDuration!).getMinutes()
    }






