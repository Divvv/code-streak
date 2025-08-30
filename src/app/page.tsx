'use client';
import { useState } from "react";
import DayBox from "./components/daybox";
import { StreakDay } from "./models/StreakDay";

export default function Home() {
  const date: Date = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(date);
  const [daysState, updateDays] = useState<StreakDay[]>(getDaysForMonth(selectedDate));
  const [streak, setStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [doneDaysState, updateDoneDays] = useState<StreakDay[]>([]);

  function getDaysForMonth(date: Date) {
    const nrDays = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();
    const days: StreakDay[] = [];
    for (let i = 1; i <= nrDays; i++) {
      const temp: StreakDay = {
        dayNr: i,
        dayName: new Date(
          date.getFullYear(),
          date.getMonth(),
          i)
          .toLocaleDateString(
            "en-us",
            { weekday: "long" }
          ),
        monthNr: date.getMonth(),
        year: date.getFullYear(),
        done: false,
        doneClass: "not-done"
      };

      days.push(temp);
    }
    return days;
  }

  function toggleDone(day: StreakDay) {
    if (day.dayNr > (new Date).getDate()) return;

    const tempDay = day;
    tempDay.done = !tempDay.done;

    const tempDoneDays: StreakDay[] = doneDaysState;
    if (tempDay.done) tempDoneDays.push(tempDay);
    else {
      const index = tempDoneDays.findIndex(
        d => d.dayNr === tempDay.dayNr
          && d.monthNr === tempDay.monthNr
          && d.year === tempDay.year);
      if (index > -1) tempDoneDays.splice(index, 1);
    }

    const tempDays: StreakDay[] = daysState.map(
      d => (d.dayNr === day.dayNr && d.monthNr === day.monthNr && d.year === day.year) ?
        {
          ...d,
          //done: day.done === false ?
          // false : true,
          doneClass: day.doneClass === "done" ?
            "not-done" :
            "done"
        } : d);

    const streak = calculateStreak(tempDays);
    const longestStreak = calculateLongestStreak(tempDays);

    setStreak(streak);
    setLongestStreak(longestStreak);
    updateDoneDays(tempDoneDays);
    updateDays(tempDays);

    console.log(tempDoneDays);
  }

  function calculateStreak(tempDays: StreakDay[]): number {
    let streak = 0;
    let i = tempDays.findIndex(
      d => d.dayNr === (new Date().getDate())
    );
    while (tempDays[i].doneClass === "done") {
      i--;
      streak++;
    }
    return streak;
  }

  function calculateLongestStreak(tempDays: StreakDay[])
    : number {
    let longestStreak = 0;
    let newLongestStreak = 0;
    for (const day of tempDays) {
      if (day.doneClass === "done") {
        newLongestStreak++;
        if (newLongestStreak > longestStreak) {
          longestStreak = newLongestStreak;
        }
      }
      else {
        newLongestStreak = 0;
      }
    }

    return longestStreak;
  }

  function getNextMonthName(date: Date) {
    const d = new Date(date);
    d.setMonth(date.getMonth() + 1);
    return d.toLocaleString('en-US', { month: 'long' });
  }

  function getPrevMonthName(date: Date) {
    const d = new Date(date);
    d.setMonth(date.getMonth() - 1);
    return d.toLocaleString('en-US', { month: 'long' });
  }

  function monthMoveBack() {
    const d = new Date(selectedDate);
    d.setMonth(selectedDate.getMonth() - 1);
    setSelectedDate(d);
    updateDays(getDaysForMonth(d));
  }

  function monthMoveForward() {
    const d = new Date(selectedDate);
    d.setMonth(selectedDate.getMonth() + 1);
    setSelectedDate(d);
    updateDays(getDaysForMonth(d));
  }


  return (
    <>
      <div className="flex justify-center items-center mb-4">
        <button onClick={monthMoveBack} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded min-w-32">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>

          {getPrevMonthName(selectedDate)}</button>
        <span className=" px-4 py-2 ml-8 mr-8 text-white text-3xl font-bold">{selectedDate.toLocaleString('en-US', { month: 'long' })}</span>
        <button onClick={monthMoveForward} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded min-w-32">

          {getNextMonthName(selectedDate)}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
      {daysState.map(day =>
        <DayBox
          key={day.dayNr}
          day={day}
          click={() => toggleDone(day)}
        />)}
      <h2>Current Streak: {streak}</h2>
      <h2>Longest Streak: {longestStreak}</h2>
    </>
  );
}



