import { Component } from '@angular/core';


export interface RadioOption {
    name: string;
}

// noinspection AngularMissingOrInvalidDeclarationInModule
@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    selected: RadioOption;
    optionList = [{name: 'One'}, {name: 'Two'}, {name: 'Three'}, {name: 'Four'}];
    filter = '';
    showBusyIndicator = false;
    allowNull = false;
    componentWidth: number = 400;
    componentMaxHeight: number = 400;
    placeholder: string = 'type to search ...';
    focusIndex = 0;

    constructor() {
    }


    private index(text: any): number {
        return text.toLowerCase().indexOf(this.filter.toLowerCase());
    }

    isHidden(name: string) {
        return this.filter && (this.filter.length > 0) && (this.index(name) === -1);
    }

    beforeHighlight(text: string): string {
        const highlightIndex = this.index(text);
        return (highlightIndex < 0) ? text : text.substr(0, highlightIndex);
    }

    highlightText(text: string): string {
        const highlightIndex = this.index(text);
        return (highlightIndex < 0) ? '' : text.substr(highlightIndex, this.filter.length);
    }

    afterHighlight(text: string): string {
        const highlightIndex = this.index(text);
        return (highlightIndex < 0) ? '' : text.substr(highlightIndex + this.filter.length);
    }

    navigateUp(event: KeyboardEvent) {
        if (this.focusIndex > 0) {
            this.focusIndex--;
            event.preventDefault();
        }
    }

    navigateDown(event: KeyboardEvent) {
        if (this.focusIndex < this.optionList.length - 1) {
            this.focusIndex++;
            event.preventDefault();
        }
    }

    public selectButton(event: KeyboardEvent) {
        this.selected = this.optionList[this.focusIndex];
        event.preventDefault();
    }
}