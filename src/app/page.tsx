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

    let days = [];
    for (let i = 1; i <= nrDays; i++) {
        const temp = {
            dayNr: i,
            dayName: new Date(
                date.getFullYear(),
                date.getMonth(),
                i)
                .toLocaleDateString(
                    'en-us', { weekday: "long" }
                ),
            doneClass: "not-done"
        };

        days.push(temp);
    }

    const [daysState, updateDays] = useState(days);
    const [streak, setStreak] = useState(0);

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

        let streak = 0;
        let i = tempDays.findIndex(
            d => d.dayNr === (new Date().getDate())
        );
        while (tempDays[i].doneClass === "done") {
            i--;
            streak++;
        }
        setStreak(streak);
        updateDays(tempDays);
    }

    return (
        <>
            {daysState.map(day =>
                <Day
                    key={day.dayNr}
                    day={day}
                    click={() => toggleDone(day)}
                />)}
            <h2>Streak: {streak}</h2>
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

