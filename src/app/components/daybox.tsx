import { StreakDay } from "../models/StreakDay";

interface DayBoxProps {
  day: StreakDay;
  click: () => void;
};

export default function DayBox({ day, click }: DayBoxProps) {
  const isDoneClass = day.done ? "done" : "not-done";
  const isTodayClass = day.isToday() ? "today" : null;
  const isAfterTodayClass = day.isAfterToday() ? "after-today" : null;

  return (
    <>
      <button
        className={
          `day-button
                ${isDoneClass}
                ${isTodayClass}
                ${isAfterTodayClass}`}
        onClick={click}>
        <p> {day.dayNr}</p>
        <p> {day.monthName}</p>
      </button >
    </>
  );
}
