import {ScheduleEntry} from "../model/ScheduleEntry";

export const sortDescendingByDate: (scheduleEntry1: ScheduleEntry, scheduleEntry2: ScheduleEntry) => number
    = (entry1, entry2) => +new Date (entry2.entryDate) - +new Date (entry1.entryDate);
