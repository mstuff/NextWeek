import {ScheduleEntry} from "../model/ScheduleEntry";


const timeToStartDay: number = 7;
const timeToEndDay: number = 22;
const customizedHoursPerDay: number = timeToEndDay - timeToStartDay;


const minutesPerDay: number = customizedHoursPerDay * 60;

export const getPositionPercentFromEntryTime: (scheduleEntry: ScheduleEntry) => string
    = (scheduleEntry) => {

    const entryTimeInMinutes: number =
        (new Date(scheduleEntry.entryDate).getHours()-timeToStartDay) * 60 +
        new Date(scheduleEntry.entryDate).getMinutes();

    return ((100 * entryTimeInMinutes) / minutesPerDay)
        .toString() + "%";
}

export const getHeightPercentFromDuration: (scheduleEntry: ScheduleEntry) => string
    = (scheduleEntry) => {
    return ((100 * scheduleEntry.durationInMinutes) / minutesPerDay)
        .toString() + "%";
}
