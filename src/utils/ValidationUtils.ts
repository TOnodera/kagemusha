import { DateTime } from 'luxon';

export default class ValidationUtils {
  static checkRange(
    target: string,
    rangeFrom: string,
    rangeTo: string
  ): boolean {
    const propernessDate = '1970-01-01';
    const targetDatetime = DateTime.fromFormat(
      `${propernessDate} ${target}`,
      'yyyy-MM-dd HH:mm'
    );
    const fromDatetime = DateTime.fromFormat(
      `${propernessDate} ${rangeFrom}`,
      'yyyy-MM-dd HH:mm'
    );
    const toDatetime = DateTime.fromFormat(
      `${propernessDate} ${rangeTo}`,
      'yyyy-MM-dd HH:mm'
    );

    if (
      0 <= targetDatetime.diff(fromDatetime, 'minute').minutes &&
      0 <= toDatetime.diff(targetDatetime, 'minute').minutes
    ) {
      return false;
    }

    return true;
  }
}
