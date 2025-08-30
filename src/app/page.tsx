'use client';

import { useState } from "react";
// test
export default function Home() {
    const date = new Date();
    const [selectedDate, setSelectedDate] = useState(date);
    
    function getDaysForMonth(date){
        const nrDays = new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        ).getDate();
        const days = [];
        for (let i = 1; i <= nrDays; i++) {
            const temp = {
                dayNr: i,
                dayName: new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    i)
                    .toLocaleDateString(
                        "en-us",
                        { weekday: "long" }
                    ),
                    doneClass: "not-done"
            };

            days.push(temp);
        }
        return days;
    }
    

    const [daysState, updateDays] = useState(getDaysForMonth(selectedDate));
    const [streak, setStreak] = useState(0);
    const [longestStreak, setLongestStreak] = useState(0);

    function toggleDone(day) {
        if (day.dayNr > (new Date).getDate()) return;

        const tempDays = daysState.map(
            d => d.dayNr === day.dayNr ?
                {
                    ...d,
                    doneClass: day.doneClass === "done" ?
                        "not-done" :
                        "done"
                } : d);

        const streak = calculateStreak(tempDays);
        setStreak(streak);
        const longestStreak = calculateLongestStreak(tempDays);
        setLongestStreak(longestStreak);

        updateDays(tempDays);
    }

    function calculateStreak(tempDays: any[]): number {
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

    function calculateLongestStreak(tempDays: any[])
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

    function getNextMonthName(date) {
        const d = new Date(date);
        d.setMonth(date.getMonth() + 1);
        return d.toLocaleString('en-US', {month: 'long'});
    }

    function getPrevMonthName(date) {
        const d = new Date(date);
        d.setMonth(date.getMonth() - 1);
        return d.toLocaleString('en-US', {month: 'long'});
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
                <span className=" px-4 py-2 ml-8 mr-8 text-white text-3xl font-bold">{selectedDate.toLocaleString('en-US', { month: 'long'})}</span>
        <button onClick={monthMoveForward} className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded min-w-32">

        {getNextMonthName(selectedDate)}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg>
</button>
        </div>
            {daysState.map(day =>
                <Day
                    key={day.dayNr}
                    day={day}
                    click={() => toggleDone(day)}
                />)}
            <h2>Current Streak: {streak}</h2>
            <h2>Longest Streak: {longestStreak}</h2>
        </>
    );
}

function Day({ day, click }) {
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

