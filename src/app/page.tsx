'use client';
import { useState } from "react";
import DayBox from "./components/daybox";
import { StreakDay } from "./models/StreakDay";

export default function Home() {
  const date: Date = new Date();
  const [doneDaysState, updateDoneDays] = useState<StreakDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(date);
  const [daysState, updateDays] = useState<StreakDay[]>(getDaysForMonth(selectedDate));
  const [streak, setStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);

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
      };

      days.push(temp);
    }

    for (const d of days) {
      for (const a of doneDaysState) {
        if (
          d.dayNr === a.dayNr &&
          d.monthNr === a.monthNr &&
          d.year === a.year) {
          d.done = true;
        }
      }
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
    updateDoneDays(tempDoneDays);

    const tempDays: StreakDay[] = daysState.map(
      d => (d.dayNr === day.dayNr && d.monthNr === day.monthNr && d.year === day.year) ?
        {
          ...d,
          done: tempDay.done
        } : d);

    updateDays(tempDays);

    const streak = calculateStreak(tempDoneDays);
    setStreak(streak);

    const longestStreak = calculateLongestStreak(tempDays);
    setLongestStreak(longestStreak);
  }

  //todo: fix this
  function calculateStreak(doneDays: StreakDay[]): number {
    const sortedDoneDays: StreakDay[] =
      doneDays.sort((a, b) =>
        a.year - b.year ||
        a.monthNr - b.monthNr ||
        a.dayNr - b.dayNr
      );
    if (sortedDoneDays.length === 0) return 0;
    const lastDay = sortedDoneDays[sortedDoneDays.length - 1];
    const today = new Date();
    if (lastDay?.dayNr !== today.getDate() ||
      lastDay?.monthNr !== today.getMonth() ||
      lastDay.year !== today.getFullYear()) {
      return 0;
    }
    let streak = 1;
    let streakCons = true;
    let i = sortedDoneDays.length - 1;

    while (streakCons) {
      if (i === 0) return streak;
      if (sortedDoneDays[i - 1].monthNr === sortedDoneDays[i].monthNr &&
        sortedDoneDays[i - 1].year === sortedDoneDays[i].year &&
        sortedDoneDays[i - 1].dayNr === sortedDoneDays[i].dayNr - 1) {
        streak++;
        i--;
      } else {
        streakCons = false;
      }
    }

    return streak;
  }

  function calculateLongestStreak(tempDays: StreakDay[])
    : number {
    let longestStreak = 0;
    let newLongestStreak = 0;
    for (const day of tempDays) {
      if (day.done) {
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



