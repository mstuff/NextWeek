import {ScheduleEntry} from "../model/ScheduleEntry";


const minutesPerDay: number = 24 * 60;

export const getPositionPercentFromEntryTime: (scheduleEntry: ScheduleEntry) => string
    = (scheduleEntry) => {

    const entryTimeInMinutes: number =
        new Date(scheduleEntry.entryDate).getHours() * 60 +
        new Date(scheduleEntry.entryDate).getMinutes();

    return ((100 * entryTimeInMinutes) / minutesPerDay)
        .toString() + "%";
}

export const getHeightPercentFromDuration: (scheduleEntry: ScheduleEntry) => string
    = (scheduleEntry) => {
    return ((100 * scheduleEntry.durationInMinutes) / minutesPerDay)
        .toString() + "%";
}
