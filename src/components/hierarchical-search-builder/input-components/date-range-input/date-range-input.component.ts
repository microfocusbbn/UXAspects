import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { DateTimePickerTimezone, timezones } from '../../../date-time-picker';
import { formatDate } from '@angular/common';

@Component({
    selector: 'ux-date-range-input',
    templateUrl: './date-range-input.component.html',
    // styleUrls: ['']
})
export class DateRangeInputComponent {
    @Input()
    set value(value: number[]) {
        const [start, end] = value.map((v) => new Date(v));
        this.start = !isNaN(start.getDate()) ? start : new Date();
        this.end = !isNaN(end.getDate()) ? end : new Date();
    }

    @Input()
    set data(data: DateInputOptions) {
        this.timezone = data?.timezone ?? { name: 'GMT', offset: 0 };

        this.showTime = data?.showTime ?? false;
        this.showTimezones = data?.showTimezones ?? true;
        this.showMeridians = data?.showMeridians ?? true;
        this.showSpinners = data?.showSpinners ?? true;
    }

    @Output() valueChange = new EventEmitter<number[]>();

    start: Date;
    end: Date;
    invalid: boolean = false;

    private _dateString: string;

    get dateString(): string {
        return this._dateString;
    }

    set dateString(dateString: string) {
        this._dateString = dateString;
        this.valueChange.emit([this.start.getTime(), this.end.getTime()]);
    }

    timezone: DateTimePickerTimezone;

    showTime: boolean;
    showTimezones: boolean;
    showMeridians: boolean;
    showSpinners: boolean;


    /** Indicate if the timezone picker should be visible */
    showTimezone: boolean = false;

    /** Indicate if the seconds on the time picker should be visible */
    showSeconds: boolean = false;

    /** Indicate if the meridian on the time picker should be visible */
    showMeridian: boolean = true;

    /** Indicate if the show now should be visible */
    showNowBtn: boolean = false;

    /** Store the currently selected start timezone */
    startTimezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };

    /** Store the currently selected end timezone */
    endTimezone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };

    onDateChange(date: string): void {

        // reset any invalid state
        this.invalid = false;

        // check if the date contains a hyphen
        const parts = (date.indexOf('—') ? date.split('—') : date.split('-'));
        const startDate = Date.parse(parts[0].trim());
        const endDate = Date.parse(parts[1].trim());

        if (!isNaN(startDate)) {
            this.start = new Date(startDate);
            this.startTimezone = this.getTimezone(parts[0]);
        } else if (parts.length >= 1 && isNaN(startDate)) {
            this.invalid = true;
            this.start = null;
        }

        if (!isNaN(endDate)) {
            this.end = new Date(endDate);
            this.endTimezone = this.getTimezone(parts[1]);
        } else if (parts.length === 2 && isNaN(endDate)) {
            this.invalid = true;
            this.end = null;
        }

        if (this.start && this.end && this.start.getTime() > this.end.getTime()) {
            this.invalid = true;
            this.start = null;
            this.end = null;
        }
    }

    onRangeChange(): void {
        const start = this.start ?
            formatDate(this.start, 'd MMMM y  h:mm a', 'en-US') + ' ' + this.startTimezone.name : '';
        const end = this.end ?
            formatDate(this.end, 'd MMMM y  h:mm a', 'en-US') + ' ' + this.endTimezone.name : '';

        if (!this.start || !this.end) {
            return;
        }

        // reset the invalid state
        this.invalid = false;

        // check if the dates are valid
        if (this.getNormalizedDate(this.start, this.startTimezone).getTime() >
            this.getNormalizedDate(this.end, this.endTimezone).getTime()) {
            this.invalid = true;
        }

        // concatenate the two dates
        this.dateString = start && end ? `${start} — ${end}` : start || end;
    }

    onTimezoneChange(isStart: boolean, timezone: DateTimePickerTimezone): void {
        if (isStart) {
            this.startTimezone = timezone;
        } else {
            this.endTimezone = timezone;
        }

        this.onRangeChange();
    }

    clear(): void {
        this.start = null;
        this.end = null;
        this.dateString = null;
        this.startTimezone = { name: 'GMT', offset: 0 };
        this.endTimezone = { name: 'GMT', offset: 0 };
        this.onRangeChange();
    }

    private getTimezone(date: string): DateTimePickerTimezone {
        // get the timezone from the datestring
        const timezone = date.match(/GMT(\+|-)([0-9]+)/gi);

        // check if there is a matching timezone
        if (timezone === null) {
            return { name: 'GMT', offset: 0 };
        } else {
            const match = timezones.find(_timezone =>
                _timezone.name.toLowerCase() === timezone[0].trim().toLowerCase());
            return match ? match : { name: 'GMT', offset: 0 };
        }
    }

    private getNormalizedDate(date: Date, timezone: DateTimePickerTimezone): Date {
        const normalizedDate = new Date(date);
        normalizedDate.setMinutes(normalizedDate.getMinutes() + timezone.offset);
        return normalizedDate;
    }
}

interface DateInputOptions {
    timezone?: DateTimePickerTimezone;
    showTime?: boolean;
    showTimezones?: boolean;
    showMeridians?: boolean;
    showSpinners?: boolean;
}
