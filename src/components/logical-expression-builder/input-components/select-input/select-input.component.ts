import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'ux-select-input',
    templateUrl: './select-input.component.html'
})
export class SelectInputComponent implements OnInit {
    @Output() valueChange: EventEmitter<string[]> = new EventEmitter<string[]>();
    @Output() valid: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() value: string[];

    public _value: ReadonlyArray<SelectOption>;

    @Input()
    set data(data: { options: SelectOption[], validateFunction?: (value: any) => boolean }) {
        this._options = data?.options ?? [];
        this._validate = data?.validateFunction ?? this._validate;
    }

    public _options: ReadonlyArray<SelectOption>;

    private _validate: (value: string[]) => boolean = () => true;
    public _valid: boolean = true;

    ngOnInit() {
        if (Array.isArray(this.value)) {
            this._value = this.value
                .map((v: string) => {
                    return this._options?.find((o: SelectOption) => o.name === v);
                })
                .filter((o: SelectOption) => o);
        }
    }

    handleValueChange(value: SelectOption[]): void {
        const outputOptions = value.map((v: SelectOption) => v.name);
        this.valueChange.emit(outputOptions);
        this._valid = this._validate(outputOptions);
        this.valid.emit(this._valid);
    }
}

type SelectOption = { name: string, label: string, icon?: string };
