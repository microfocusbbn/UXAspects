import { formatDate } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { DateTimePickerTimezone, timezones } from '@ux-aspects/ux-aspects';


const DefaultTimeZone: DateTimePickerTimezone = { name: 'GMT', offset: 0 };

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    /** The date in the left side of the date range picker */
    start: Date;

    /** The date in the right side of the date range picker */
    end: Date;

    /** The formatted date string to display in the input */
    date: string;

    /** Indicate whether or not the selected date is valid */
    invalid: boolean = false;

    /** Indicate if the time picker should be visible */
    showTime: boolean = false;

    /** Indicate if the timezone picker should be visible */
    showTimezone: boolean = false;

    /** Indicate if the seconds on the time picker should be visible */
    showSeconds: boolean = false;

    /** Indicate if the meridian on the time picker should be visible */
    showMeridian: boolean = true;

    /** Indicate if the spinners on the time picker should be visible */
    showSpinners: boolean = true;

    /** Indicate if the show now should be visible */
    showNowBtn: boolean = false;

    /** Store the currently selected start timezone */
    startTimezone: DateTimePickerTimezone = DefaultTimeZone;

    /** Store the currently selected end timezone */
    endTimezone: DateTimePickerTimezone = DefaultTimeZone;

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
            this.invalid =  (this.getNormalizedDate(this.start, this.startTimezone).getTime() >
                this.getNormalizedDate(this.end, this.endTimezone).getTime());

            // concatenate the two dates
            this.date =
                formatDate(this.start, 'd MMMM y  h:mm a', 'en-US') + ' ' + this.startTimezone.name + ' — ' +
                formatDate(this.end, 'd MMMM y  h:mm a', 'en-US') + ' ' + this.endTimezone.name;
        }
    }

    clear(): void {
        this.start = null;
        this.end = null;
        this.date = null;
        this.startTimezone = DefaultTimeZone;
        this.endTimezone = DefaultTimeZone;
        this.onRangeChange();
    }

    private getTimezone(date: string): DateTimePickerTimezone {

        // get the timezone from the datestring
        const timezone = date.match(/GMT(\+|-)([0-9]+)/gi);

        // check if there is a matching timezone
        if (timezone === null) {
            return DefaultTimeZone;
        } else {
            const match = timezones.find(zone => zone.name.toLowerCase() === timezone[0].trim().toLowerCase());
            return match ?? DefaultTimeZone;
        }
    }

    /** Account for the timezone offset */
    private getNormalizedDate(date: Date, timezone: DateTimePickerTimezone): Date {
        return new Date(date.getTime() - timezone.offset * 60 * 1000);
    }
}
