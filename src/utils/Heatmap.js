/**
 * Heatmap util class for mapping contributions and dates.
 * Notice that is source file is under [MIT LICENSE](https://opensource.org/licenses/MIT)
 * @author julienr114
 * @see <a href="https://github.com/julienr114/vue-calendar-heatmap">vue-calendar-heatmap</a>
 */
import { DAYS_IN_ONE_YEAR, DAYS_IN_WEEK } from '@/config/consts';

export default class CalendarHeatmap {
  constructor(endDate, values, daysToShow = DAYS_IN_ONE_YEAR, max) {
    this.endDate = this._parseDate(endDate);
    this.max =
      max || Math.ceil((Math.max(...values.map((day) => day.count)) / 5) * 4);
    this.daysToShow = daysToShow;
    this.startDate = this._shiftDate(endDate, -this.daysToShow);
    this.values = values;
  }

  get activities() {
    return this.values.reduce((newValues, day) => {
      newValues[this._keyDayParser(day.date)] = {
        count: day.count,
        colorIndex: this.getColorIndex(day.count)
      };
      return newValues;
    }, {});
  }

  get weekCount() {
    return this.getDaysCount() / DAYS_IN_WEEK;
  }

  get calendar() {
    let date = this._shiftDate(
      this.startDate,
      -this.getCountEmptyDaysAtStart()
    );
    return Array.from({ length: this.weekCount }, () =>
      Array.from({ length: DAYS_IN_WEEK }, () => {
        let dDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        let dayValues = this.activities[this._keyDayParser(dDate)];
        date.setDate(date.getDate() + 1);
        return {
          date: dDate,
          count: dayValues ? dayValues.count : null,
          colorIndex: dayValues ? dayValues.colorIndex : 0
        };
      })
    );
  }

  get firstFullWeekOfMonths() {
    return this.calendar.reduce((months, week, index, weeks) => {
      if (index > 0) {
        let lastWeek = weeks[index - 1][0].date;
        let currentWeek = week[0].date;
        if (
          lastWeek.getFullYear() < currentWeek.getFullYear() ||
          lastWeek.getMonth() < currentWeek.getMonth()
        ) {
          months.push({ value: currentWeek.getMonth(), index });
        }
      }
      return months;
    }, []);
  }

  getColorIndex(value) {
    if (value === null || value === undefined) {
      return 0;
    } else if (value <= 0) {
      return 1;
    } else if (value >= this.max) {
      return 5;
    } else {
      return Math.ceil(((value * 100) / this.max) * 0.03) + 1;
    }
  }

  getCountEmptyDaysAtStart() {
    return this.startDate.getDay();
  }

  getCountEmptyDaysAtEnd() {
    return DAYS_IN_WEEK - 1 - this.endDate.getDay();
  }

  getDaysCount() {
    return (
      this.daysToShow +
      1 +
      this.getCountEmptyDaysAtStart() +
      this.getCountEmptyDaysAtEnd()
    );
  }

  _shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  _parseDate(entry) {
    return entry instanceof Date ? entry : new Date(entry);
  }

  _keyDayParser(date) {
    let day = this._parseDate(date);
    return `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
  }
}
