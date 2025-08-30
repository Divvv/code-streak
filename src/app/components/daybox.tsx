import { StreakDay } from "../page";

interface DayBoxProps {
  day: StreakDay;
  click: () => void;
};

export default function DayBox({ day, click }: DayBoxProps) {
  const today = new Date();
  const isDayToday = day.dayNr === today.getDate();
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
                ${day.doneClass}
                ${isTodayClass}
                ${isAfterTodayClass}`}
        onClick={click}>
        <p> {day.dayNr}</p>
        <p> {day.dayName}</p>
      </button >
    </>
  );
}
