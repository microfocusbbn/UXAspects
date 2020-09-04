import { Injectable } from '@angular/core';
import { LogicalOperatorDefinition } from '../interfaces/LogicalOperatorDefinition';
import { FieldDefinition } from '../interfaces/FieldDefinition';
import { OperatorDefinitionList, OperatorDefinition } from '../interfaces/OperatorDefinitionList';
import { DisplayValueFunction } from '../interfaces/DisplayValueFunction';
import { LocalizedStrings } from '../interfaces/LocalizedStrings';

@Injectable()
export class LogicalExpressionBuilderService {
    private logicalOperators: LogicalOperatorDefinition[] = [
        { name: 'and', label: 'and', minNumberOfChildren: 2, errorMessage: '\'and\' needs at least two children.' },
        { name: 'or', label: 'or', minNumberOfChildren: 2, errorMessage: '\'or\' needs at least two children.' },
        { name: 'not', label: 'not', maxNumberOfChildren: 1, minNumberOfChildren: 1, errorMessage: '\'not\' needs exactly one child.' }
    ];
    private fields: FieldDefinition[] = [];
    private operators: OperatorDefinitionList = {};
    private localizedStrings: LocalizedStrings = {};
    private displayValueFunction: DisplayValueFunction;

    // Logical operators
    setLogicalOperators(logicalOperators: LogicalOperatorDefinition[]): void {
        this.logicalOperators = [...logicalOperators];
    }

    getLogicalOperators(): LogicalOperatorDefinition[] {
        return this.logicalOperators;
    }

    getLogicalOperatorByName(name: string): LogicalOperatorDefinition {
        return this.logicalOperators.find((operator) => operator.name === name);
    }

    // Fields
    setFields(fields: FieldDefinition[]): void {
        this.fields = [...fields];
    }

    getFields(): FieldDefinition[] {
        return this.fields;
    }

    // Operators
    setOperators(operators: OperatorDefinitionList): void {
        this.operators = { ...operators };
    }

    getOperatorsByFieldType(fieldType: string): OperatorDefinition[] {
        return this.operators?.[fieldType] ?? [];
    }

    // Localized Strings
    setLocalizedStrings(localizedStrings: LocalizedStrings): void {
        this.localizedStrings = localizedStrings;
    }

    getLocalizedStrings(): LocalizedStrings {
        return this.localizedStrings;
    }

    // displayValueFunction for displaying values
    getDisplayValueFunction(): DisplayValueFunction {
        return this.displayValueFunction;
    }

    setDisplayValueFunction(transformFunction: DisplayValueFunction): void {
        this.displayValueFunction = transformFunction;
    }

    // Focus stuff
    private _rowInFocus: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
    private _conditionInEditMode: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(null);
    private _editBlocked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // editBlocked
    public getEditBlocked(): Observable<boolean> {
        return this._editBlocked.asObservable();
    }

    public setEditBlocked(blocked: boolean): void {
        this._editBlocked.next(blocked);
    }

    public getRowInFocus(): Observable<number[]> {
        return this._rowInFocus.asObservable();
    }

    public setRowInFocus(path: number[]): void {
        this._rowInFocus.next(path);
    }

    // Focus stuff
    private _lastFocused: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

    public getLastFocused(): Observable<number[]> {
        return this._lastFocused.asObservable();
    }

    public setLastFocused(path: number[]): void {
        this._lastFocused.next(path);
    }

    // Focus stuff
    private _lastFocused: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

    public getLastFocused(): Observable<number[]> {
        return this._lastFocused.asObservable();
    }

    public setLastFocused(path: number[]): void {
        this._lastFocused.next(path);
    }
}
