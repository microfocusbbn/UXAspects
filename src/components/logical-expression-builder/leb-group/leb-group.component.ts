import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { Expression, ExpressionCondition, ExpressionGroup } from '../interfaces/Expression';
import { LogicalOperatorDefinition } from '../interfaces/LogicalOperatorDefinition';
import { LogicalExpressionBuilderService } from '../services/logical-expression-builder.service';
import { ValidationService } from '../services/validation.service';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'ux-leb-group',
    templateUrl: './leb-group.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LebGroupComponent implements OnInit, OnDestroy {
    @Output() groupChange: EventEmitter<ExpressionGroup> = new EventEmitter<ExpressionGroup>();

    @Input()
    set subExpression(_subExpression: ExpressionGroup) {
        this._subExpression = { ..._subExpression };
    }

    get subExpression(): ExpressionGroup {
        return this._subExpression;
    }

    private _subExpression: ExpressionGroup;

    @Input() logicalOperatorName: string;
    @Input() indent: number = 0;
    @Input() path: number[];

    public additionalIndent: number = 40;
    public logicalOperators: LogicalOperatorDefinition[];
    public selectedLogicalOperator: LogicalOperatorDefinition;

    public _focused: boolean = false;
    public _valid: boolean = true;
    public _errorMessage: string;
    public _showAddBtn: boolean = false;

    public _wasLastFocused$: Observable<boolean>;
    private _destroy$: Subject<void> = new Subject<void>();

    constructor(private _lebService: LogicalExpressionBuilderService, private _validationService: ValidationService, private _cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.logicalOperators = this._lebService.getLogicalOperators();
        this.selectedLogicalOperator = this._lebService.getLogicalOperatorByName(this.logicalOperatorName);
        this._validate();

        this._wasLastFocused$ = this._lebService.getRowInFocus().pipe(
            takeUntil(this._destroy$),
            map((path: number[]) => path.length === this.path.length && path.every((value: number, index: number) => value === this.path[index]))
        );
    }

    ngOnDestroy(): void {
        this._validationService.removeValidationState(this.path);

        this._destroy$.next();
        this._destroy$.complete();
    }

    public handleSelectedOperatorChange(selectedOperator: LogicalOperatorDefinition) {
        this.selectedLogicalOperator = selectedOperator;
        this.subExpression = { ...this.subExpression, logicalOperator: this.selectedLogicalOperator.name };

        this._validate();
        this.groupChange.emit(this.subExpression);

        this._lebService.setRowInFocus(this.path);
    }

    public handleGroupChange(subExpression: ExpressionGroup | ExpressionCondition, index: number) {
        if (subExpression) {
            this.subExpression.children[index] = subExpression;
        } else {
            let temp = [...this.subExpression.children];
            temp.splice(index, 1);
            this.subExpression.children = [...temp];
        }

        this._validate();
        this.groupChange.emit(this.subExpression);
    }

    public addCondition(): void {
        const children: Expression[] = [...this.subExpression.children, {
            type: 'condition',
            field: null,
            operator: null,
            value: null,
        }];

        this.subExpression = { ...this.subExpression, children };

        this._validate();
        this.groupChange.emit(this.subExpression);

        this._lebService.setRowInFocus([...this.path, this.subExpression.children.length - 1]);
        this._lebService.setConditionInEditMode([...this.path, this.subExpression.children.length - 1]);
    }

    public addGroup(): void {
        const children: Expression[] = [...this.subExpression.children, {
            type: 'group',
            logicalOperator: this._lebService.getLogicalOperators()[0].name,
            children: [
                { type: 'condition', field: null, operator: null, value: null },
            ],
        }];

        this.subExpression = { ...this.subExpression, children };

        this._validate();
        this.groupChange.emit(this.subExpression);
        this._lebService.setConditionInEditMode([...this.path, this.subExpression.children.length - 1, 0]);
        this._lebService.setEditBlocked(true);
        this._lebService.setRowInFocus([...this.path, this.subExpression.children.length - 1, 0]);
    }

    public removeConditionAtIndex(id: number): void {
        this.subExpression.children = this.subExpression.children.filter((_, index) => {
            return index !== id;
        });

        this._validate();
        this.groupChange.emit(this.subExpression);

        if (id === 0) {
            if (this.subExpression.children.length) {
                this._lebService.setRowInFocus([...this.path, 0]);
            } else {
                this._lebService.setRowInFocus(this.path);
            }
        } else {
            this._lebService.setRowInFocus([...this.path, id - 1]);
        }
    }

    public embedConditionAtIndex(id: number): void {
        let tempExpression = this.subExpression;
        const condition = tempExpression.children[id];

        tempExpression.children[id] = <ExpressionGroup>{
            type: 'group',
            logicalOperator: this._lebService.getLogicalOperators()[0].name,
            children: [condition],
        };

        this.subExpression = tempExpression;

        this._validate();
        this.groupChange.emit(this.subExpression);
        this._lebService.setRowInFocus([...this.path, id]);
    }

    public deleteGroup(): void {
        this.subExpression = null;
        this.groupChange.emit(this.subExpression);
        this._validationService.removeValidationState(this.path);
        this._lebService.setRowInFocus(this.path.slice(0, -1));
        this._lebService.setConditionInEditMode(null);
    }

    private _validate(logicalOperator: LogicalOperatorDefinition = this.selectedLogicalOperator): boolean {
        if ('minNumberOfChildren' in logicalOperator && 'maxNumberOfChildren' in logicalOperator) {
            const numberOfChildren = this.subExpression.children?.length;
            const tooFew = !(numberOfChildren >= logicalOperator.minNumberOfChildren);
            const tooMany = !(numberOfChildren <= logicalOperator.maxNumberOfChildren);

            this._valid = !tooFew && !tooMany;

            if (tooFew || tooMany) {
                this._errorMessage = logicalOperator.errorMessage || 'Wrong number of children';
            }

            this._showAddBtn = this.subExpression.children?.length < logicalOperator.maxNumberOfChildren;
        } else if ('minNumberOfChildren' in logicalOperator) {
            this._valid = this.subExpression.children?.length >= logicalOperator.minNumberOfChildren;
            this._errorMessage = this._valid ? null : logicalOperator.errorMessage || 'Wrong number of children';
            this._showAddBtn = true;
        } else if ('maxNumberOfChildren' in logicalOperator) {
            this._valid = this.subExpression.children?.length <= logicalOperator.maxNumberOfChildren;
            this._errorMessage = this._valid ? null : logicalOperator.errorMessage || 'Wrong number of children';
            this._showAddBtn = this.subExpression.children?.length < logicalOperator.maxNumberOfChildren;
        }

        this._validationService.setValidationState(this.path, this._valid);
        return this._valid;
    }

    public onDropdownOpenChange(open: boolean) {
        this._lebService.setEditBlocked(open);
    }
}
