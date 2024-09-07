import { CustomRecurrenceI, initialMonthCustomOptions, RecurrenceStoreI } from '@/constants/constants';
import {create} from 'zustand';



export const useRecurrenceStore = create<RecurrenceStoreI>((set) => ({
  startDate: new Date(),
  endDate: null,
  recurrenceType: 'daily',
  customRecurrence: {unit:'days',frequency:1,selectedWeekDays:[],monthCustomOptions:initialMonthCustomOptions},
  setStartDate: (date:Date|null) => set({ startDate: date }),
  setEndDate: (date:Date|null) => set({ endDate: date }),
  setRecurrenceType: (type:string) => set({ recurrenceType: type }),
  setCustomRecurrence: (recurrence:CustomRecurrenceI) => set({ customRecurrence: recurrence }),
}));