import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { DateTimePickerTimezone, timezones } from '../../../date-time-picker/index';
import { formatDate } from '@angular/common';


const DefaultTimeZone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };

@Component({
    selector: 'ux-date-range-input',
    templateUrl: './leb-date-range-input.component.html'
})
export class LebDateRangeInputComponent {
    @Output() valueChange: EventEmitter<DateRangeInputValue> = new EventEmitter<DateRangeInputValue>();
    @Output() validChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input()
    set value(value: DateRangeInputValue) {
        this.start = !isNaN(value?.start?.getDate()) ? value.start : new Date();
        this.end = !isNaN(value?.end?.getDate()) ? value.end : new Date();

        this.onRangeChange();
    }

    @Input()
    set configuration(config: DateInputOptions) {
        this.showTime = config?.showTime ?? this.showTime;
        this.showNowBtn = config?.showNowBtn ?? this.showNowBtn;
        this.dateFormat = config?.dateFormat ?? this.dateFormat;
        this.validate = config?.validateFunction ?? this.validate;
    }

    private validate: (value: DateRangeInputValue) => boolean = () => true;
    _valid: boolean;

    start: Date;
    end: Date;

    set invalid(value: boolean) {
        this._invalid = value;
        this._valid = this.validate({ start: this.start, end: this.end });
        this.validChange.emit(this._valid);
    }

    get invalid() {
        return this._invalid;
    }

    private _invalid: boolean = false;

    private _dateString: string;

    get dateString(): string {
        return this._dateString;
    }

    set dateString(dateString: string) {
        this._dateString = dateString;
        this.valueChange.emit({ start: this.start, end: this.end });
    }

    showTime: boolean = false;
    showMeridians: boolean = true;
    showSpinners: boolean = true;
    showTimezone: boolean = false;
    showSeconds: boolean = false;
    showMeridian: boolean = true;
    showNowBtn: boolean = false;
    startTimezone: DateTimePickerTimezone = DefaultTimeZone;
    endTimezone: DateTimePickerTimezone = DefaultTimeZone;

    dateFormat: string = 'short';

    /** Parse a date string when the input changes */
    onDateChange(date: string): void {
        // reset any invalid state
        this.invalid = false;

        // check if the date contains a hyphen
        const parts = (date.indexOf('—') >= 0) ? date.split('—') : date.split('-');
        const startDate = Date.parse(parts[0].trim());
        const endDate = Date.parse(parts[1].trim());

        if (!isNaN(startDate)) {
            this.start = new Date(startDate);
            this.startTimezone = this.getTimezone(parts[0]);
        } else if (parts.length >= 1) {
            this.invalid = true;
            this.start = null;
        }

        if (!isNaN(endDate)) {
            this.end = new Date(endDate);
            this.endTimezone = this.getTimezone(parts[1]);
        } else if (parts.length === 2) {
            this.invalid = true;
            this.end = null;
        }

        if (this.start && this.end && this.start.getTime() > this.end.getTime()) {
            this.invalid = true;
            this.start = null;
            this.end = null;
        }
    }

    /** Update the date string when the date range changes */
    onRangeChange(): void {
        if (this.start && this.end) {
            // check if the dates are valid
            this.invalid = (this.getNormalizedDate(this.start, this.startTimezone).getTime() >
                this.getNormalizedDate(this.end, this.endTimezone).getTime());

            // concatenate the two dates
            this.dateString =
                formatDate(this.start, this.dateFormat, 'en-US') + ' — ' +
                formatDate(this.end, this.dateFormat, 'en-US');
        }
    }

    clear(): void {
        this.start = null;
        this.end = null;
        this.dateString = null;
        this.startTimezone = DefaultTimeZone;
        this.endTimezone = DefaultTimeZone;
        this.onRangeChange();
    }

    private getTimezone(date: string): DateTimePickerTimezone {
        // get the timezone from the datestring
        const timezone = date.match(/GMT([+\-])([0-9]+)/gi);

        // check if there is a matching timezone
        if (timezone === null) {
            return DefaultTimeZone;
        } else {
            const match = timezones.find(zone => zone.name.toLowerCase() === timezone[0].trim().toLowerCase());
            return match ?? DefaultTimeZone;
        }
    }

    private getNormalizedDate(date: Date, timezone: DateTimePickerTimezone): Date {
        return new Date(date.getTime() - timezone.offset * 60 * 1000);
    }
}

interface DateInputOptions {
    showTime?: boolean;
    dateFormat?: string;
    showNowBtn?: boolean;
    validateFunction?: (value: DateRangeInputValue) => boolean;
}

type DateRangeInputValue = { start: Date, end: Date };