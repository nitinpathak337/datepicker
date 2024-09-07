export interface MonthCustomOptionsI{
    day:string|null;
    weekOfMonth:string|null;
}

export interface CustomRecurrenceI{
    unit:string;
    frequency:number;selectedWeekDays:string[];
    monthCustomOptions:MonthCustomOptionsI
}

export interface RecurrenceStoreI {
    startDate: Date;
    endDate: Date | null;
    recurrenceType: string;
    customRecurrence: CustomRecurrenceI;
    setStartDate: (date: Date|null) => void;
    setEndDate: (date: Date|null) => void;
    setRecurrenceType: (type: string) => void;
    setCustomRecurrence: (recurrence: CustomRecurrenceI) => void;
}

export const initialMonthCustomOptions:MonthCustomOptionsI={day:null,weekOfMonth:null}

export const dayToNumber = {
    Sun: 0, // Sunday
    Mon: 1, // Monday
    Tue: 2, // Tuesday
    Wed: 3, // Wednesday
    Thu: 4, // Thursday
    Fri: 5, // Friday
    Sat: 6  // Saturday
  };

export const weekDaysArr =['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];