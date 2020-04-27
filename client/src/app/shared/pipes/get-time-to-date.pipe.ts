import { Pipe, PipeTransform } from "@angular/core";
import { getDateDDMM, getTimeToDate } from '../utils/date';

@Pipe({
    name: 'datetimeToTime'
})
export class GetTimeToDatetimePipe implements PipeTransform {
    transform(value: Date | number, ...args: any[]): any {
        return getTimeToDate(value);
    }
}