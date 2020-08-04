import { Injectable } from '@angular/core';
import { LogicalOperatorDefinition } from '../interfaces/LogicalOperatorDefinition';
import { FieldDefinition } from '../interfaces/FieldDefinition';
import { OperatorDefinitionList, OperatorDefinition } from '../interfaces/OperatorDefinitionList';
import { LogicalExpressionBuilderModule } from '../logical-expression-builder.module';
import { BehaviorSubject, Observable } from 'rxjs';
import { DisplayValueFunction } from '../interfaces/DisplayValueFunction';

@Injectable({
    providedIn: 'root',
})
export class LogicalExpressionBuilderService {
    private _logicalOperators: LogicalOperatorDefinition[] = [];
    private _fields: FieldDefinition[] = [];
    private _operators: OperatorDefinitionList = {};
    private _localizedStrings = {};
    private _editBlocked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private _displayValueFunction: DisplayValueFunction;

    // Logical operators
    public setLogicalOperators(logicalOperators: LogicalOperatorDefinition[]): void {
        this._logicalOperators = [...logicalOperators];
    }

    public getLogicalOperators(): LogicalOperatorDefinition[] {
        return this._logicalOperators;
    }

    public getLogicalOperatorByName(name: string): LogicalOperatorDefinition {
        return this._logicalOperators.find((operator) => operator.name === name);
    }

    // Fields
    public setFields(fields: FieldDefinition[]): void {
        this._fields = [...fields];
    }

    public getFields(): FieldDefinition[] {
        return this._fields;
    }

    // Operators
    public setOperators(operators: OperatorDefinitionList): void {
        this._operators = { ...operators };
    }

    public getOperatorsByFieldType(fieldType: string): OperatorDefinition[] {
        return this._operators?.[fieldType] ?? [];
    }

    // Localized Strings
    public setLocalizedStrings(localizedStrings: any): void {
        this._localizedStrings = localizedStrings;
    }

    public getLocalizedStrings(): any {
        return this._localizedStrings;
    }

    // editBlocked
    public getEditBlocked(): Observable<boolean> {
        return this._editBlocked.asObservable();
    }

    public setEditBlocked(editBlocked: boolean): void {
        this._editBlocked.next(editBlocked);
    }

    // displayValueFunction for displaying values
    public getDisplayValueFunction(): DisplayValueFunction {
        return this._displayValueFunction;
    }

    public setDisplayValueFunction(transformFunction: DisplayValueFunction): void {
        this._displayValueFunction = transformFunction;
    }

    // Focus stuff
    private _lastFocused: BehaviorSubject<[number, number]> = new BehaviorSubject<[number, number]>([-1, -1]);

    public getLastFocused(): Observable<[number, number]> {
        return this._lastFocused.asObservable();
    }

    public setLastFocused(ids: [number, number]): void {
        this._lastFocused.next(ids);
    }
}
