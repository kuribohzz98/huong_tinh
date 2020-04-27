import { Pipe, PipeTransform } from "@angular/core";
import { getDateDDMM } from '../utils/date';

@Pipe({
    name: 'datetimeToDate'
})
export class ConvertDatetimeToDatePipe implements PipeTransform {
    transform(value: Date | number, ...args: any[]): any {
        return getDateDDMM(value);
    }
}