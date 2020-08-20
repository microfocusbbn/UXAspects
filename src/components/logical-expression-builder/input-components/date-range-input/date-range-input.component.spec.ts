import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LogicalExpressionBuilderModule } from '../../logical-expression-builder.module';

@Component({
    selector: 'ux-date-range-input-test',
    template: `
        <ux-date-range-input
            [data]="data"
            (valid)="onValidChange($event)"
            [value]="value"
            (valueChange)="onValueChange($event)">
        </ux-date-range-input>
    `
})
class DateRangeInputTestComponent {
    value = { start: 1597736313762, end: 1597736314762 };
    data: any = { dateFormat: 'short' };

    onValueChange(_: { start: number, end: number }): void {
    }

    onValidChange(_: boolean): void {
    }
}

describe('DateRangeInputComponent', () => {
    let component: DateRangeInputTestComponent;
    let fixture: ComponentFixture<DateRangeInputTestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DateRangeInputTestComponent],
            imports: [LogicalExpressionBuilderModule]
        });
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(DateRangeInputTestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should be created', () => {
        expect(component).toBeDefined();
    });

    it('should fire valid event when value received', async(() => {
        spyOn(component, 'onValidChange');

        component.value = { start: 1234, end: 5678 };

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.onValidChange).toHaveBeenCalled();
        });
    }));
});