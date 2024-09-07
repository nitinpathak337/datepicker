import React, { useEffect } from "react";
import { useRecurrenceStore } from "../store/recurrenceStore";
import {
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  differenceInMonths,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { dayToNumber } from "@/constants/constants";
import { formatWeekMonth, getMultiplierBasedOnUnit } from "@/constants/helpers";

const DatePreview = () => {
  const { startDate, recurrenceType, customRecurrence, endDate } =
    useRecurrenceStore();

  const checkDateBasedOnRecurrence = (date: Date) => {
    const differenceInD: number = differenceInCalendarDays(date, startDate);
    switch (recurrenceType) {
      case "daily":
        return true;
      case "weekly":
        return differenceInD % 7 === 0;
      case "monthly":
        return differenceInD % 30 === 0;
      case "yearly":
        return differenceInD % 365 === 0;
      case "custom":
        const multiplier = getMultiplierBasedOnUnit(customRecurrence.unit);
        if (customRecurrence.selectedWeekDays.length !== 0) {
          const startofWeekOfSDate = startOfWeek(startDate); //SDate is start date
          const startOfWeekOfCDate = startOfWeek(date); //CDate is current date
          const differenceInW = differenceInCalendarWeeks(
            startOfWeekOfCDate,
            startofWeekOfSDate
          ); //difference In Week
          return (
            differenceInW % customRecurrence.frequency === 0 &&
            customRecurrence.selectedWeekDays.includes(format(date, "eee"))
          );
        }
        if (
          customRecurrence.monthCustomOptions.weekOfMonth &&
          customRecurrence.monthCustomOptions.day
        ) {
          const startOfMonthOfCDate = startOfMonth(date); //CDate is current date
          const startDay = format(startOfMonthOfCDate, "eee");
          const startOfWeekDate = startOfWeek(date, {
            weekStartsOn: dayToNumber[startDay],
          });
          const startofMonthOfSDate = startOfMonth(startDate); //SDate is start date
          const differenceInM: number = differenceInMonths(
            startOfMonthOfCDate,
            startofMonthOfSDate
          ); //difference in months
          const weekOfMonth =
            differenceInCalendarWeeks(startOfWeekDate, startOfMonthOfCDate, {
              weekStartsOn: dayToNumber[startDay],
            }) + 1; 
          return (
            differenceInM % customRecurrence.frequency === 0 &&
            weekOfMonth ===
              formatWeekMonth(
                customRecurrence.monthCustomOptions.weekOfMonth
              ) &&
            customRecurrence.monthCustomOptions.day === format(date, "eee")
          );
        }
        return differenceInD % (customRecurrence.frequency * multiplier) === 0;
      default:
        return true;
    }
  };

  useEffect(() => {
    checkDateBasedOnRecurrence;
  }, [customRecurrence]);

  return (
    <div>
      <h3 className="mb-4 text-info text-center">Calendar Preview</h3>
      <div>
        <Calendar
          value={[startDate, endDate]}
          selectRange
          tileClassName={({ date }) => {
            const normalizedDate = startOfDay(date);
            if (startDate && !endDate) {
              return normalizedDate >= startOfDay(startDate) &&
                checkDateBasedOnRecurrence(date)
                ? "highlight"
                : null;
            }
            if (startDate && endDate) {
              return normalizedDate >= startOfDay(startDate) &&
                date <= endDate &&
                checkDateBasedOnRecurrence(date)
                ? "highlight"
                : null;
            }
            return null;
          }}
        />
      </div>
    </div>
  );
};

export default DatePreview;
