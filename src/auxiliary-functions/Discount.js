import moment from 'moment';

function weekdays() {
  const nowDay = moment().format('dddd').toLowerCase();
  return nowDay !== 'saturday' && nowDay !== 'sunday';
}

function weekOfTheMonth(week, day) {
  const firstDayOfMonth = moment().clone().startOf('month');
  const firstDayOfWeek = firstDayOfMonth.clone().startOf('week');
  const offset = firstDayOfMonth.diff(firstDayOfWeek, 'days');
  return (
    week === Math.ceil((moment().date() + offset) / 7) &&
    day === moment().format('dddd').toLowerCase()
  );
}

function period(time) {
  const nowHour = moment().format('HH');
  const arrayHour = time.split('-');
  const min = Math.min(arrayHour[0], arrayHour[1]);
  const max = Math.max(arrayHour[0], arrayHour[1]);
  return nowHour > min && nowHour < max;
}

export function discount({ week, day }, time, discount, promo = 0) {
  const finalDiscount = discount + promo;
  switch (day) {
    case 'weekdays': {
      return weekdays() && period(time) ? finalDiscount : 0;
    }
    case 'weekends': {
      return !weekdays() && period(time) ? finalDiscount : 0;
    }
    default: {
      return weekOfTheMonth(week, day) && period(time) ? finalDiscount : 0;
    }
  }
}
