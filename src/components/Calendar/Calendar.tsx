import { forwardRef, useState, useCallback, type HTMLAttributes } from "react";
import {
  calendarStyles,
  calendarHeaderStyles,
  calendarNavButtonStyles,
  calendarTitleStyles,
  calendarGridStyles,
  calendarWeekdayStyles,
  calendarDayStyles,
} from "./Calendar.styles";

export interface CalendarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue"
> {
  /** Selected date */
  value?: Date | null;
  /** Default selected date */
  defaultValue?: Date | null;
  /** Called when date is selected */
  onChange?: (date: Date) => void;
  /** Minimum selectable date */
  minDate?: Date;
  /** Maximum selectable date */
  maxDate?: Date;
  /** Locale for month/day names */
  locale?: string;
}

const WEEKDAYS_SHORT = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value: controlledValue,
      defaultValue = null,
      onChange,
      minDate,
      maxDate,
      locale = "en-US",
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<Date | null>(
      defaultValue,
    );
    const isControlled = controlledValue !== undefined;
    const selectedDate = isControlled ? controlledValue : internalValue;

    const today = new Date();
    const [viewYear, setViewYear] = useState(
      selectedDate?.getFullYear() ?? today.getFullYear(),
    );
    const [viewMonth, setViewMonth] = useState(
      selectedDate?.getMonth() ?? today.getMonth(),
    );

    const prevMonth = useCallback(() => {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      } else {
        setViewMonth((m) => m - 1);
      }
    }, [viewMonth]);

    const nextMonth = useCallback(() => {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      } else {
        setViewMonth((m) => m + 1);
      }
    }, [viewMonth]);

    const selectDate = useCallback(
      (date: Date) => {
        if (!isControlled) setInternalValue(date);
        onChange?.(date);
      },
      [isControlled, onChange],
    );

    const isDisabled = (date: Date): boolean => {
      if (minDate && date < new Date(minDate.setHours(0, 0, 0, 0))) return true;
      if (maxDate && date > new Date(maxDate.setHours(23, 59, 59, 999)))
        return true;
      return false;
    };

    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
    const prevMonthDays = getDaysInMonth(
      viewMonth === 0 ? viewYear - 1 : viewYear,
      viewMonth === 0 ? 11 : viewMonth - 1,
    );

    const monthName = new Date(viewYear, viewMonth).toLocaleDateString(locale, {
      month: "long",
      year: "numeric",
    });

    // Build calendar grid
    const days: { date: Date; outsideMonth: boolean }[] = [];

    // Previous month trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push({
        date: new Date(
          viewMonth === 0 ? viewYear - 1 : viewYear,
          viewMonth === 0 ? 11 : viewMonth - 1,
          day,
        ),
        outsideMonth: true,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(viewYear, viewMonth, i),
        outsideMonth: false,
      });
    }

    // Next month leading days
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(
          viewMonth === 11 ? viewYear + 1 : viewYear,
          viewMonth === 11 ? 0 : viewMonth + 1,
          i,
        ),
        outsideMonth: true,
      });
    }

    return (
      <div ref={ref} className={calendarStyles({ className })} {...props}>
        <div className={calendarHeaderStyles()}>
          <button
            type="button"
            aria-label="Previous month"
            onClick={prevMonth}
            className={calendarNavButtonStyles()}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className={calendarTitleStyles()}>{monthName}</span>
          <button
            type="button"
            aria-label="Next month"
            onClick={nextMonth}
            className={calendarNavButtonStyles()}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className={calendarGridStyles()}>
          {WEEKDAYS_SHORT.map((day) => (
            <div key={day} className={calendarWeekdayStyles()}>
              {day}
            </div>
          ))}

          {days.map(({ date, outsideMonth }, idx) => {
            const disabled = isDisabled(date);
            const selected =
              selectedDate !== null &&
              selectedDate !== undefined &&
              isSameDay(date, selectedDate);

            return (
              <button
                key={idx}
                type="button"
                disabled={disabled}
                onClick={() => !disabled && selectDate(date)}
                className={calendarDayStyles({
                  selected,
                  today: isToday(date),
                  outsideMonth,
                  disabled,
                })}
                aria-label={date.toLocaleDateString(locale)}
                aria-selected={selected}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

Calendar.displayName = "Calendar";
