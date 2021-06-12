import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate();
  }

  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate();
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const startDateUTF = dayjs(start_date).utc().local().format();
    const endDateUTF = dayjs(end_date).utc().local().format();

    return dayjs(endDateUTF).diff(startDateUTF, 'days');
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  compareInHours(start_date: Date, end_date: Date): number {
    const startDateUTF = dayjs(start_date).utc().local().format();
    const endDateUTF = dayjs(end_date).utc().local().format();

    return dayjs(endDateUTF).diff(startDateUTF, 'hours');
  }
}

export { DayjsDateProvider };
