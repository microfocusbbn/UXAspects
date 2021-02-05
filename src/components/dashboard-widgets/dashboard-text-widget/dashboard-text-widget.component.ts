import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {PredefinedWidgetConfig} from '../interfaces/predefined-widget.interface';
import {TextWidgetConfig} from '../interfaces/text-widget.interface';
import {SidePanelComponent} from '../../side-panel';
import {coerceBooleanProperty, coerceNumberProperty} from '@angular/cdk/coercion';

@Component({
    selector: 'ux-dashboard-text-widget',
    templateUrl: './dashboard-text-widget.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardTextWidgetComponent implements PredefinedWidgetConfig, TextWidgetConfig {
    static ngAcceptInputType_fixedMode: boolean | string;
    static ngAcceptInputType_colSpan: number | string;
    static ngAcceptInputType_rowSpan: number | string;
    static ngAcceptInputType_editable: boolean | string;

    private _fixedMode: boolean = false;
    private _colSpan: number = 1;
    private _rowSpan: number = 1;
    private _editable: boolean = false;

    @Input() get fixedMode(): boolean {
        return this._fixedMode;
    }

    set fixedMode(fixedMode: boolean) {
        this._fixedMode = coerceBooleanProperty(fixedMode);
    }

    @Input() get colSpan(): number {
        return this._colSpan;
    }

    set colSpan(colSpan: number) {
        this._colSpan = coerceNumberProperty(colSpan);
    }

    @Input() get rowSpan(): number {
        return this._rowSpan;
    }

    set rowSpan(rowSpan: number) {
        this._rowSpan = coerceNumberProperty(rowSpan);
    }

    @Input() id: string = '';
    @Input() name: string = '';
    @Input() heading: string = '';
    @Input() editLabel: string = 'Edit';
    @Input() showFullTextLabel: string = 'Show full text';
    @Input() saveLabel: string = 'Save';
    @Input() cancelLabel: string = 'Cancel';

    @Input() text: string = '';

    @Input() get editable(): boolean {
        return this._editable;
    }

    set editable(editable: boolean) {
        this._editable = coerceBooleanProperty(editable);
    }

    @ViewChild('sidePanel') sidePanel: SidePanelComponent;
    textAreaFocused = false;

    @Output() textChange = new EventEmitter<string>();

    open(): void {
        this.sidePanel.openPanel();
        this.textAreaFocused = this.editable;
    }

    save(): void {
        this.textChange.emit(this.text);
        this.sidePanel.closePanel();
    }

    cancel(): void {
        this.sidePanel.closePanel();
    }
}
