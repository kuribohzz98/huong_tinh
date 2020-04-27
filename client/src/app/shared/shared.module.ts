import { NgModule } from '@angular/core';
import { ConvertDatetimeToDatePipe } from './pipes/convert-date.pipe';
import { GetTimeToDatetimePipe } from './pipes/get-time-to-date.pipe';

@NgModule({
    imports: [

    ],
    declarations: [
        ConvertDatetimeToDatePipe,
        GetTimeToDatetimePipe
    ],
    exports: [
        ConvertDatetimeToDatePipe,
        GetTimeToDatetimePipe
    ]
})
export class SharedModule { }
