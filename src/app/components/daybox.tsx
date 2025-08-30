import { StreakDay } from "../models/StreakDay";

interface DayBoxProps {
  day: StreakDay;
  click: () => void;
};

export default function DayBox({ day, click }: DayBoxProps) {
  const today = new Date();
  const isDayToday = day.dayNr === today.getDate() && day.monthNr === today.getMonth()
    && day.year === today.getFullYear();
  const isDoneClass = day.done ? "done" : "not-done";
  const isTodayClass = isDayToday ? "today" : null;
  const isAfterTodayClass =
    day.dayNr > (new Date).getDate()
      ? "after-today"
      : null;

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
        <p> {day.dayName}</p>
      </button >
    </>
  );
}
