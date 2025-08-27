'use client';

import { useState } from "react";
// test
export default function Home() {
    const date = new Date();
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

    const [daysState, updateDays] = useState(days);
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

    return (
        <>
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

