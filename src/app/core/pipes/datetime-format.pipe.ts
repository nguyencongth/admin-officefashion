import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetimeFormat',
  standalone: true
})
export class DatetimeFormatPipe implements PipeTransform {

  transform(value: Date | string | number): string {
    let date: Date;

    if (value instanceof Date) {
      date = value;
    } else {
      date = new Date(value);
    }

    return date.toLocaleString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

}
