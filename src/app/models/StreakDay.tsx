'use client';

export class StreakDay {
  private _date: Date;
  private _done: boolean;

  public get dayNr(): number { return this._date.getDate(); }
  public get monthNr(): number { return this._date.getMonth(); }
  public get year(): number { return this._date.getFullYear(); }

  public get monthName(): string { return this._date.toLocaleString("en-US", { month: "long" }); }
  public get done(): boolean { return this._done; }
  public get date(): Date { return this._date; }

  public toggleDone() {
    this._done = !this._done;
  }

  public setDone(b: boolean): void {
    this._done = b;
  }

  public isSame(day: StreakDay): boolean {
    return this._date.getTime() === day.date.getTime();
  }

  public isBefore(day: StreakDay): boolean {
    let prevDate = day.date;
    prevDate.setDate(day.date.getDate() - 1);
    return this.date.getTime() === prevDate.getTime();
  }

  public isAfter(day: StreakDay): boolean {
    let prevDate = day.date;
    prevDate.setDate(day.date.getDate() + 1);
    return this.date.getTime() === prevDate.getTime();
  }

  public isToday(): boolean {
    const today = new Date();
    return this._date.getDate() === today.getDate() &&
      this._date.getMonth() === today.getMonth() &&
      this._date.getFullYear() === today.getFullYear();
  }

  public isAfterToday(): boolean {
    return this.year > (new Date).getFullYear() ||
      this.monthNr > (new Date).getMonth() ||
      this.dayNr > (new Date).getDate();
  }

  constructor(day: Date, done: boolean = false) {
    this._date = day;
    this._done = done;
  }
}

