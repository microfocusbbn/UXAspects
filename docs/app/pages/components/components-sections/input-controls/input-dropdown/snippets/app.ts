import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'highlightSearch'})
export class HighlightSearch implements PipeTransform {
    transform(text: string, filter: string): string {
        const highlightIndex = text.toLowerCase().indexOf(filter.toLowerCase());
        return (highlightIndex < 0) ?
               text :
               text.substr(0, highlightIndex) +
                 '<b>' + text.substr(highlightIndex, filter.length) + '</b>' +
                 text.substr(highlightIndex + filter.length);
    }
}


@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    selected: RadioOption;
    optionList: ReadonlyArray<RadioOption> = [
        { name: 'One' }, { name: 'Two' }, { name: 'Three' }, { name: 'Four' }
    ];
    filteredOptionList: ReadonlyArray<RadioOption> = this.optionList;
    filter: string = '';
    allowNull: boolean = false;
    componentMaxHeight: number = 400;
    placeholder: string = 'Type to search...';

    ngOnInit(): void {
        this.filterList();
    }

    private index(text: string): number {
        return text.toLowerCase().indexOf(this.filter.toLowerCase());
    }

    isHidden(name: string): boolean {
        return this.filter && (this.filter.length > 0) && (this.index(name) === -1);
    }
    
    selectButton(event: KeyboardEvent, option: RadioOption): void {
        this.selected = option;
        event.preventDefault();
    }

    setFilter($event: string) {
        this.filter = $event;
        this.filterList();
    }

    private filterList() {
        this.filteredOptionList =
          this.filter && (this.filter.length > 0) ?
          this.optionList.filter(option => (this.index(option.name) > -1)) :
          this.optionList;
    }
}

export interface RadioOption {
    name: string;
}