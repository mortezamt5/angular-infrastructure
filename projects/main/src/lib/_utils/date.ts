import * as moment from 'moment-jalaali';
import { Observable } from 'rxjs';

export type AppDateFormat = 'YYYY-MM-DD' | 'YYYY-M-D' | 'YYYY/MM/DD' | 'YYYYMMDD' | 'YYYY/M/D' | 'HH:mm' | 'HH:mm:ss';
export type AppDateManipulationUnit = 'days' | 'months' | 'years' | 'hours' | 'minutes' | 'seconds';
export type AppCalendarType = 'jalali' | 'gregorian';


export interface AppDateDescriptor {
  year: number;
  month: number;
  day: number;
  hour?: number;
  minute?: number;
  second?: number;
}

export class AppDate {
  private date: moment.Moment;

  private constructor(date: moment.Moment) {
    this.date = date;
  }

  private static resetTime(m: moment.Moment) {
    return m.hour(0).minute(0).second(0);
  }

  /**
   * Returns the current client date
   */
  static clientDate(includeTime = true) {
    let m = moment();
    if (!includeTime) {
      m = this.resetTime(m);
    }
    return new AppDate(m);
  }

  /**
   * Returns the current server date
   */
  static serverDate(): Observable<AppDate> {
    throw new Error('not implemented.');
  }

  /**
   * Creates a AppDate instance from the given Jalaali date
   */
  static fromJalaali(date: AppDateDescriptor) {
    const m = moment(`${date.year}-${date.month}-${date.day}`, 'jYYYY-jMM-jDD');
    return new AppDate(m);
  }

  /**
   * Creates a AppDate instance from the given Gregorian date
   */
  static fromGregorian(date: AppDateDescriptor): AppDate {
    const m = moment(`${date.year}-${date.month}-${date.day}`, 'YYYY-M-D');
    return new AppDate(m);
  }

  /**
   * Parse a string as a Jalaali date and returns its equivalent AppDate
   */
  static parseJalaali(date: string, format: AppDateFormat): AppDate {
    let momentFormat: string;
    switch (format) {
      case 'YYYY-MM-DD':
        momentFormat = `jYYYY-jMM-jDD`;
        break;
      case 'YYYY-M-D':
        momentFormat = `jYYYY-jM-jD`;
        break;
      case 'YYYY/MM/DD':
        momentFormat = 'jYYYY/jMM/jDD';
        break;
      case 'YYYY/M/D':
        momentFormat = 'jYYYY/jM/jD';
        break;
      default:
        throw new Error('unknown date format');
    }

    return new AppDate(moment(date, momentFormat, true));
  }

  /**
   * Parse a string as a Gregorian date and returns its equivalent AppDate
   */
  static parseGregorian(date: string, format: AppDateFormat): AppDate {
    let momentFormat: string;
    switch (format) {
      case 'YYYY-MM-DD':
        momentFormat = `YYYY-MM-DD`;
        break;
      case 'YYYY-M-D':
        momentFormat = `YYYY-M-D`;
        break;
      case 'YYYY/MM/DD':
        momentFormat = 'YYYY/MM/DD';
        break;
      case 'YYYYMMDD':
        momentFormat = 'YYYYMMDD';
        break;
      case 'YYYY/M/D':
        momentFormat = 'YYYY/M/D';
        break;
      default:
        throw new Error('unknown date format');
    }

    return new AppDate(moment(date, momentFormat, false));
  }

  /**
   * Parse a string as a App Server date and returns its equivalent AppDate
   */
  static parseServer(date: string): AppDate {
    return AppDate.parseGregorian(date, 'YYYY-MM-DD');
  }

  /**
   * Creates an invalid date
   */
  static invalid(): AppDate {
    return new AppDate(moment.invalid());
  }

  /**
   * Determines if this instance is a valid date
   */
  isValid(): boolean {
    return this.date.isValid();
  }

  /**
   * Adds a specefic amount of time to the current AppDate
   */
  add(amount: number, unit: AppDateManipulationUnit): AppDate {
    this.date.add(amount, unit);
    return this;
  }

  /**
   * Subtracts a specefic amount of time from the current AppDate
   */
  subtract(amount: number, unit: AppDateManipulationUnit) {
    this.date.subtract(amount, unit);
    return this;
  }

  /**
   * Checks if this AppDate is before another AppDate
   */
  isBefore(date: AppDate): boolean {
    return this.date.isBefore(date.date, 'second');
  }

  /**
   * Checks if this AppDate is after another AppDate
   */
  isAfter(date: AppDate): boolean {
    return this.date.isAfter(date.date, 'second');
  }

  /**
   * Checks if this AppDate is same or after another AppDate
   */
  isSameOrAfter(date: AppDate): boolean {
    return this.date.isSameOrAfter(date.date, 'second');
  }

  /**
   * Checks if this AppDate is before another AppDate
   */
  isSameOrBefore(date: AppDate): boolean {
    return this.date.isSameOrBefore(date.date, 'second');
  }

  /**
   * Returns Jalaali date equivalent to this AppDate instance
   */
  toJalaali(): AppDateDescriptor {
    return {
      year: this.date.jYear(),
      month: this.date.jMonth() + 1,
      day: this.date.jDate(),
      hour: this.date.hour(),
      minute: this.date.minute(),
      second: this.date.second()
    };
  }

  /**
   * Returns Gregorian date equivalent to this AppDate instance
   */
  toGregorian(): AppDateDescriptor {
    return {
      year: this.date.year(),
      month: this.date.month() + 1,
      day: this.date.date(),
      hour: this.date.hour(),
      minute: this.date.minute(),
      second: this.date.second()
    };
  }

  /**
   * Converts this AppDate instance to a Jalaali date string
   */
  formatJalaali(format: AppDateFormat = 'YYYY/MM/DD', options?: any): string {
    let mFormat: string;
    switch (format) {
      case 'YYYY-MM-DD':
        mFormat = `jYYYY-jMM-jDD`;
        break;
      case 'YYYY-M-D':
        mFormat = `jYYYY-jM-jD`;
        break;
      case 'YYYY/MM/DD':
        mFormat = 'jYYYY/jMM/jDD';
        break;
      case 'YYYYMMDD':
        mFormat = 'jYYYYjMMjDD';
        break;
      case 'YYYY/M/D':
        mFormat = 'jYYYY/jM/jD';
        break;
      case 'HH:mm:ss':
        mFormat = `HH:mm:ss`;
        break;
      case 'HH:mm':
        mFormat = `HH:mm`;
        break;
      default:
        throw new Error('unknown date format');
    }

    return this.date.format(mFormat);
  }

  /**
   * Converts this AppDate instance to a Gregorian date string
   */
  formatGregorian(format: AppDateFormat = 'YYYY/MM/DD', options?: any): string {
    let mFormat: string;
    switch (format) {
      case 'YYYY-MM-DD':
        mFormat = `YYYY-MM-DD`;
        break;
      case 'YYYY-M-D':
        mFormat = `YYYY-M-D`;
        break;
      case 'YYYY/MM/DD':
        mFormat = 'YYYY/MM/DD';
        break;
      case 'YYYY/M/D':
        mFormat = 'YYYY/M/D';
        break;
      case 'HH:mm:ss':
        mFormat = `HH:mm:ss`;
        break;
      case 'HH:mm':
        mFormat = `HH:mm`;
        break;
      default:
        throw new Error('unknown date format');
    }

    return this.date.format(mFormat);
  }

  /**
   * Converts this AppDate instance to a App server recognizable date string
   */
  formatServer(): string {
    return this.formatGregorian('YYYY-MM-DD');
  }
}
