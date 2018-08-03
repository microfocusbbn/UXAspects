import { Component, Input, NgModule, Injectable, NgZone, Directive, ElementRef, EventEmitter, Output, ChangeDetectionStrategy, ContentChild, TemplateRef, HostBinding, ViewChild, forwardRef, Optional, Renderer2, ViewEncapsulation, Pipe, ChangeDetectorRef, ViewContainerRef, HostListener, ContentChildren, QueryList, Host, ViewChildren, Inject, Attribute, SkipSelf, ComponentFactoryResolver, Injector } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import ResizeObserver from 'resize-observer-polyfill';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { debounceTime, filter, map, takeUntil, distinctUntilChanged, delay, auditTime, combineLatest as combineLatest$1, first, mergeMap, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NG_VALUE_ACCESSOR, FormsModule, NG_VALIDATORS, NgModel } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Overlay, ScrollDispatcher, OverlayModule } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ObserversModule } from '@angular/cdk/observers';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { of } from 'rxjs/observable/of';
import * as dragulaNamespace from 'dragula/dist/dragula';
import dragulaNamespace__default, {  } from 'dragula/dist/dragula';
import { LiveAnnouncer, FocusKeyManager, A11yModule, FocusMonitor } from '@angular/cdk/a11y';
import { BsDropdownDirective, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { animate, query, stagger, style, transition, trigger, state } from '@angular/animations';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { ESCAPE } from '@angular/cdk/keycodes';
import { concat } from 'rxjs/observable/concat';
import { timer } from 'rxjs/observable/timer';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UpgradeComponent } from '@angular/upgrade/static';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BreadcrumbsComponent {
    /**
     * @param {?} event
     * @param {?} crumb
     * @return {?}
     */
    clickCrumb(event, crumb) {
        if (crumb.onClick) {
            crumb.onClick.call(null, event);
        }
    }
}
BreadcrumbsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-breadcrumbs',
                template: "<nav aria-label=\"Breadcrumb\">\n    <ol class=\"breadcrumb\">\n        <li *ngFor=\"let crumb of crumbs\">\n\n            <!-- If there is a router link then use a tag -->\n            <a *ngIf=\"crumb.routerLink || crumb.onClick\"\n                tabindex=\"0\"\n                [routerLink]=\"crumb.routerLink\"\n                [fragment]=\"crumb.fragment\"\n                [queryParams]=\"crumb.queryParams\"\n                (click)=\"clickCrumb($event, crumb)\">\n                {{ crumb.title }}\n            </a>\n\n            <!-- If there is not router link then display text in a span -->\n            <span *ngIf=\"!crumb.routerLink && !crumb.onClick\">{{ crumb.title }}</span>\n        </li>\n    </ol>\n</nav>"
            }] }
];
BreadcrumbsComponent.propDecorators = {
    crumbs: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BreadcrumbsModule {
}
BreadcrumbsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    RouterModule
                ],
                exports: [BreadcrumbsComponent],
                declarations: [BreadcrumbsComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ResizeService {
    /**
     * @param {?} _zone
     */
    constructor(_zone) {
        this._zone = _zone;
        this._observer = new ResizeObserver(this.elementDidResize.bind(this));
        this._targets = new WeakMap();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._observer.disconnect();
    }
    /**
     * @param {?} target
     * @return {?}
     */
    addResizeListener(target) {
        this._zone.runOutsideAngular(() => this._observer.observe(target));
        if (this._targets.has(target)) {
            return this._targets.get(target);
        }
        else {
            const /** @type {?} */ emitter = new ReplaySubject();
            this._targets.set(target, emitter);
            return emitter;
        }
    }
    /**
     * @param {?} target
     * @return {?}
     */
    removeResizeListener(target) {
        this._observer.unobserve(target);
    }
    /**
     * @param {?} entries
     * @return {?}
     */
    elementDidResize(entries) {
        this._zone.run(() => {
            for (const /** @type {?} */ entry of entries) {
                if (this._targets.has(/** @type {?} */ (entry.target))) {
                    const /** @type {?} */ emitter = this._targets.get(/** @type {?} */ (entry.target));
                    emitter.next({ width: (/** @type {?} */ (entry.target)).offsetWidth, height: (/** @type {?} */ (entry.target)).offsetHeight });
                }
            }
        });
    }
}
ResizeService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ResizeService.ctorParameters = () => [
    { type: NgZone }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ResizeDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _resizeService
     * @param {?} _ngZone
     */
    constructor(_elementRef, _resizeService, _ngZone) {
        this._elementRef = _elementRef;
        this._resizeService = _resizeService;
        this._ngZone = _ngZone;
        this.throttle = 0;
        this.uxResize = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._subscription = this._resizeService.addResizeListener(this._elementRef.nativeElement)
            .pipe(debounceTime(this.throttle))
            .subscribe((event) => this._ngZone.run(() => this.uxResize.emit(event)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._resizeService.removeResizeListener(this._elementRef.nativeElement);
        this._subscription.unsubscribe();
    }
}
ResizeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxResize]',
                providers: [ResizeService]
            },] }
];
/** @nocollapse */
ResizeDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ResizeService },
    { type: NgZone }
];
ResizeDirective.propDecorators = {
    throttle: [{ type: Input }],
    uxResize: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ResizeModule {
}
ResizeModule.decorators = [
    { type: NgModule, args: [{
                exports: [ResizeDirective],
                declarations: [ResizeDirective],
                providers: [ResizeService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CardTabContentDirective {
}
CardTabContentDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxCardTabContent]'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CardTabsService {
    constructor() {
        this.tab$ = new BehaviorSubject(null);
        this.tabs$ = new BehaviorSubject([]);
        this.position$ = new BehaviorSubject('top');
        // when a tab is added or removed ensure we always select one if any are available
        this._subscription = this.tabs$.pipe(filter(tabs => !this.tab$.value || !tabs.find(tab => tab === this.tab$.value))).subscribe(tabs => this.tab$.next(tabs.length > 0 ? tabs[0] : null));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * Add a tab to the list of tabs
     * @param {?} tab
     * @return {?}
     */
    addTab(tab) {
        this.tabs$.next([...this.tabs$.value, tab]);
    }
    /**
     * Remove a tab from the list
     * @param {?} tab
     * @return {?}
     */
    removeTab(tab) {
        this.tabs$.next(this.tabs$.value.filter(_tab => _tab !== tab));
    }
    /**
     * Select the tab
     * @param {?} tab
     * @return {?}
     */
    select(tab) {
        this.tab$.next(tab);
    }
    /**
     * Set the position of the tab content
     * @param {?} position
     * @return {?}
     */
    setPosition(position) {
        this.position$.next(position);
    }
}
CardTabsService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
CardTabsService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CardTabComponent {
    /**
     * @param {?} _tabService
     */
    constructor(_tabService) {
        this._tabService = _tabService;
        this.active$ = this._tabService.tab$.pipe(map(tab => tab === this));
        this._tabService.addTab(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._tabService.removeTab(this);
    }
}
CardTabComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-card-tab',
                template: "<ng-content *ngIf=\"active$ | async\"></ng-content>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
CardTabComponent.ctorParameters = () => [
    { type: CardTabsService }
];
CardTabComponent.propDecorators = {
    content: [{ type: ContentChild, args: [CardTabContentDirective, { read: TemplateRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CardTabsetComponent {
    /**
     * @param {?} tabService
     */
    constructor(tabService) {
        this.tabService = tabService;
        this.offset = 0;
        this.bounds = { lower: 0, upper: 0 };
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    set position(direction) {
        this.tabService.setPosition(direction);
    }
    /**
     * @return {?}
     */
    get position() {
        return this.tabService.position$.getValue();
    }
    /**
     * @param {?} tab
     * @param {?} element
     * @return {?}
     */
    select(tab, element) {
        // select the tab
        this.tabService.select(tab);
        // ensure the tab is moved into view if required
        this.moveIntoView(element);
    }
    /**
     * @param {?} dimensions
     * @return {?}
     */
    resize(dimensions) {
        this._width = dimensions.width;
        this._innerWidth = this.tablist.nativeElement.scrollWidth;
        this.bounds.lower = 0;
        this.bounds.upper = -(this._innerWidth - this._width);
    }
    /**
     * @return {?}
     */
    previous() {
        this.offset += this._width;
        // ensure it remains within the allowed bounds
        this.offset = Math.min(this.offset, this.bounds.lower);
    }
    /**
     * @return {?}
     */
    next() {
        this.offset -= this._width;
        // ensure it remains within the allowed bounds
        this.offset = Math.max(this.offset, this.bounds.upper);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    moveIntoView(element) {
        // if we dont have the dimensions we cant check
        if (!this._width || !this._innerWidth) {
            return;
        }
        // get the current element bounds
        const { offsetLeft, offsetWidth } = element;
        const { marginLeft, marginRight } = getComputedStyle(element);
        // calculate the visible area
        const /** @type {?} */ viewportStart = Math.abs(this.offset);
        const /** @type {?} */ viewportEnd = viewportStart + this._width;
        const /** @type {?} */ cardWidth = parseFloat(marginLeft) + offsetWidth + parseFloat(marginRight);
        // if we need to move to the left - figure out how much
        if (offsetLeft < viewportStart) {
            this.offset -= (offsetLeft - parseFloat(marginLeft)) - viewportStart;
        }
        // if we need to move to the right - figure out how much
        if ((offsetLeft + cardWidth) > viewportEnd) {
            this.offset -= (offsetLeft + cardWidth) - viewportEnd;
        }
    }
}
CardTabsetComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-card-tabset',
                template: "<div class=\"card-tab-content\" role=\"tabpanel\" *ngIf=\"(tabService.tab$ | async)\">\r\n    <ng-content></ng-content>\r\n</div>\r\n\r\n<div class=\"card-tabs\" #tabs>\r\n\r\n    <button class=\"card-tabs-paging-btn card-tabs-paging-btn-previous\" aria-label=\"Previous Tabs\" (click)=\"previous()\" *ngIf=\"offset < bounds.lower\">\r\n        <i class=\"hpe-icon hpe-previous\"></i>\r\n    </button>\r\n\r\n    <div class=\"card-tabs-list\" role=\"tablist\" #tablist (uxResize)=\"resize($event)\" [style.transform]=\"'translateX(' + offset + 'px)'\">\r\n\r\n        <div class=\"card-tab\"\r\n            role=\"tab\"\r\n            tabindex=\"0\" #card\r\n            *ngFor=\"let tab of tabService.tabs$ | async\"\r\n            [ngClass]=\"tabService.position$ | async\"\r\n            [class.active]=\"tab.active$ | async\"\r\n            [attr.aria-selected]=\"tab.active$ | async\"\r\n            (click)=\"select(tab, card)\"\r\n            (focus)=\"tabs.scrollLeft = 0\"\r\n            (keydown.enter)=\"select(tab, card)\">\r\n\r\n            <ng-container [ngTemplateOutlet]=\"tab.content\"></ng-container>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <button class=\"card-tabs-paging-btn card-tabs-paging-btn-next\" aria-label=\"Next Tabs\" (click)=\"next()\" *ngIf=\"offset > bounds.upper\">\r\n        <i class=\"hpe-icon hpe-next\"></i>\r\n    </button>\r\n</div>",
                providers: [CardTabsService]
            }] }
];
/** @nocollapse */
CardTabsetComponent.ctorParameters = () => [
    { type: CardTabsService }
];
CardTabsetComponent.propDecorators = {
    position: [{ type: HostBinding, args: ['class',] }, { type: Input }],
    tablist: [{ type: ViewChild, args: ['tablist',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CardTabsModule {
}
CardTabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ResizeModule
                ],
                declarations: [CardTabsetComponent, CardTabComponent, CardTabContentDirective],
                exports: [CardTabsetComponent, CardTabComponent, CardTabContentDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
};
let /** @type {?} */ uniqueCheckboxId = 0;
class CheckboxComponent {
    constructor() {
        this._checkboxId = `ux-checkbox-${++uniqueCheckboxId}`;
        this.id = this._checkboxId;
        this.tabindex = 0;
        this.clickable = true;
        this.simplified = false;
        this.indeterminateValue = -1;
        this.disabled = false;
        this.ariaLabel = '';
        this.ariaLabelledby = null;
        this.valueChange = new EventEmitter();
        this._value = false;
        this.indeterminate = false;
        this.focused = false;
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        // determine if it is in the indeterminate state
        this.indeterminate = this._value === this.indeterminateValue;
        // determine the checked state
        this.ariaChecked = this.indeterminate ? 'mixed' : this._value;
        // invoke change event
        this.valueChange.emit(this._value);
        // call callback
        this.onChangeCallback(this._value);
        this.onTouchedCallback();
    }
    /**
     * @return {?}
     */
    get inputId() {
        return `${this.id || this._checkboxId}-input`;
    }
    /**
     * @return {?}
     */
    toggle() {
        if (this.disabled || !this.clickable) {
            return;
        }
        if (this.value === this.indeterminateValue) {
            this.value = true;
            return;
        }
        // toggle the checked state
        this.value = !this.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this._value) {
            this._value = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
CheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-checkbox',
                template: "<label [attr.for]=\"inputId\"\n       class=\"ux-checkbox\"\n       [class.ux-checkbox-checked]=\"value === true\"\n       [class.ux-checkbox-indeterminate]=\"indeterminate\"\n       [class.ux-checkbox-simplified]=\"simplified\"\n       [class.ux-checkbox-disabled]=\"disabled\"\n       [class.ux-checkbox-focused]=\"focused\">\n\n    <div class=\"ux-checkbox-container\">\n        <input type=\"checkbox\"\n               class=\"ux-checkbox-input\"\n               [id]=\"inputId\"\n               [required]=\"required\"\n               [checked]=\"value\"\n               [attr.value]=\"value\"\n               [disabled]=\"disabled\"\n               [attr.name]=\"name\"\n               [tabindex]=\"tabindex\"\n               [indeterminate]=\"indeterminate\"\n               [attr.aria-label]=\"ariaLabel\"\n               [attr.aria-labelledby]=\"ariaLabelledby\"\n               [attr.aria-checked]=\"ariaChecked\"\n               (focus)=\"focused = true\"\n               (blur)=\"focused = false\"\n               (change)=\"$event.stopPropagation()\"\n               (click)=\"toggle()\">\n    </div>\n\n    <span class=\"ux-checkbox-label\">\n        <ng-content></ng-content>\n    </span>\n</label>\n",
                providers: [CHECKBOX_VALUE_ACCESSOR]
            }] }
];
CheckboxComponent.propDecorators = {
    id: [{ type: Input }],
    name: [{ type: Input }],
    required: [{ type: Input }],
    tabindex: [{ type: Input }],
    clickable: [{ type: Input }],
    simplified: [{ type: Input }],
    indeterminateValue: [{ type: Input }],
    disabled: [{ type: Input }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    valueChange: [{ type: Output }],
    value: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CheckboxModule {
}
CheckboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [FormsModule],
                exports: [CheckboxComponent],
                declarations: [CheckboxComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ColumnSortingDirective {
    constructor() {
        this.events = new Subject();
        this.order = [];
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.events.complete();
    }
    /**
     * @param {?} sorting
     * @return {?}
     */
    toggleColumn(sorting) {
        // apply sorting based on the single or multiple sort
        this.order = this.singleSort ? this.toggleSingleColumn(sorting) : this.toggleMultipleColumn(sorting);
        // emit the latest order
        this.events.next(this.order);
        return this.order;
    }
    /**
     * @param {?} sorting
     * @return {?}
     */
    toggleSingleColumn(sorting) {
        return sorting.state === ColumnSortingState.NoSort ? [] : [{ key: sorting.key, state: sorting.state }];
    }
    /**
     * @param {?} sorting
     * @return {?}
     */
    toggleMultipleColumn(sorting) {
        // reorder columns here
        const /** @type {?} */ idx = this.order.findIndex(column => column.key === sorting.key);
        // if wasnt previously selected add to list
        if (idx === -1) {
            return [...this.order, { key: sorting.key, state: sorting.state }];
        }
        // if we are sorting it change the sorting order
        if (sorting.state === ColumnSortingState.Ascending || sorting.state === ColumnSortingState.Descending) {
            return [...this.order.filter(_column => _column.key !== sorting.key), { key: sorting.key, state: sorting.state }];
        }
        // Otherwise remove the item
        return this.order.filter(_column => _column.key !== sorting.key);
    }
}
ColumnSortingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxColumnSorting]'
            },] }
];
ColumnSortingDirective.propDecorators = {
    singleSort: [{ type: Input }]
};
/** @enum {string} */
const ColumnSortingState = {
    Ascending: 'ascending',
    Descending: 'descending',
    NoSort: 'none',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ColumnSortingComponent {
    /**
     * @param {?} _columnSorter
     */
    constructor(_columnSorter) {
        this._columnSorter = _columnSorter;
        this.stateChange = new EventEmitter();
        this.columnSortingState = ColumnSortingState;
        this._onDestroy = new Subject();
        this._columnSorter.events.pipe(takeUntil(this._onDestroy)).subscribe(event => {
            // if we are sorting this column then find the matching data
            const /** @type {?} */ columnIdx = event.findIndex(_column => _column.key === this.key);
            // if we are not sorting this column then mark it as NoSort
            if (columnIdx === -1) {
                this.state = ColumnSortingState.NoSort;
            }
            // only store the number if we have 2 or more columns being sorted
            this.order = event.length < 2 || columnIdx === -1 ? null : columnIdx + 1;
            // Emit the latest change
            this.stateChange.emit(this.state);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @return {?}
     */
    changeState() {
        switch (this.state) {
            case ColumnSortingState.Ascending:
                this.state = ColumnSortingState.Descending;
                break;
            case ColumnSortingState.Descending:
                this.state = ColumnSortingState.NoSort;
                break;
            default:
                this.state = ColumnSortingState.Ascending;
        }
        // inform parent
        return this._columnSorter.toggleColumn({ key: this.key, state: this.state });
    }
}
ColumnSortingComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-column-sorting',
                template: "<div class=\"ux-column-sorting\">\n\n    <i class=\"ux-column-sorting-icon hpe-icon\"\n       [class.hpe-ascend]=\"state === columnSortingState.Ascending\"\n       [class.hpe-descend]=\"state === columnSortingState.Descending\"\n       [class.column-sorting-icon-hidden]=\"state === columnSortingState.NoSort\">\n    </i>\n\n    <p class=\"ux-column-sorting-number\" aria-hidden=\"true\">{{ order }}</p>\n</div>",
                exportAs: 'ux-column-sorting'
            }] }
];
/** @nocollapse */
ColumnSortingComponent.ctorParameters = () => [
    { type: ColumnSortingDirective }
];
ColumnSortingComponent.propDecorators = {
    state: [{ type: Input }],
    key: [{ type: Input }],
    stateChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ColumnSortingModule {
}
ColumnSortingModule.decorators = [
    { type: NgModule, args: [{
                exports: [ColumnSortingComponent, ColumnSortingDirective],
                declarations: [ColumnSortingComponent, ColumnSortingDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ConduitSubject {
    /**
     * @param {?} conduit
     * @param {?} _zone
     * @param {?} zoneId
     */
    constructor(conduit, _zone, zoneId) {
        this.conduit = conduit;
        this._zone = _zone;
        this.zoneId = zoneId;
        this._onDestroy = new Subject();
        // store the target subject object
        this._subject = conduit.subject;
        // check if there are any conduits that have supplied an initial value
        this.getInitialValue();
        // subscribe to changes to the source subject
        this._subject.pipe(distinctUntilChanged(conduit.changeDetection), takeUntil(this._onDestroy))
            .subscribe(this.onOutput.bind(this));
        // subscribe to the zone events and root zone events
        _zone.getEvents().pipe(filter(event => event.conduit.id === conduit.id), takeUntil(this._onDestroy)).subscribe(this.onInput.bind(this));
    }
    /**
     * Check all allow inputs to see if there is a value we should initially set the conduit to
     * @return {?}
     */
    getInitialValue() {
        // if we do not accept inputs then do nothing
        if (this.conduit.acceptsInput === false) {
            return;
        }
        // return all subjects that are 1) Not itself 2) In a zone that is listed in acceptsInput 3) Have a currentValue set
        const /** @type {?} */ subjects = this._zone.getSubjects().filter(subject => {
            // If this is itself or if it has not value to give us then do nothing
            if (subject === this || subject.conduit.id !== this.conduit.id || !subject.conduit.hasOwnProperty('currentValue')) {
                return false;
            }
            // if acceptsInput is true then we return every time
            if (this.conduit.acceptsInput === true) {
                return true;
            }
            if (Array.isArray(this.conduit.acceptsInput)) {
                return this.conduit.acceptsInput.indexOf(subject.zoneId) !== -1;
            }
        });
        // if there are no matches then do nothing
        if (subjects.length === 0) {
            return;
        }
        // otherwise sort by the last modified field
        subjects.sort((subjectOne, subjectTwo) => subjectOne.conduit.lastModified.getTime() < subjectTwo.conduit.lastModified.getTime() ? 1 : -1);
        // get the most recent value
        this._subject.next(subjects[0].conduit.currentValue);
    }
    /**
     * This will be triggered when a conduits value has changed
     * @param {?} event
     * @return {?}
     */
    onInput(event) {
        // if we dont accept input or we emitted this value then do nothing
        if (this.conduit.acceptsInput === false || event.conduit === this.conduit) {
            return;
        }
        // check if the conduit produces output - if not we only do something if we are in the same zone
        if (event.conduit.producesOutput === false && event.zoneId !== this.zoneId) {
            return;
        }
        // check if we only accept inputs from specific zones
        if (Array.isArray(this.conduit.acceptsInput)) {
            // check if the event came from an acceptable zone
            if (!this.conduit.acceptsInput.find(zone => zone === event.zoneId)) {
                return;
            }
        }
        // if required transform the value
        const /** @type {?} */ outputValue = this.conduit.map ? this.conduit.map(event.value) : event.value;
        // update the subject
        this._subject.next(outputValue);
    }
    /**
     * This will be fired when this conduit emits a new value
     * @param {?} value
     * @return {?}
     */
    onOutput(value) {
        // store the most recent value and when it was modified - can be used for any new conduits to lookup a value
        this.conduit.currentValue = value;
        this.conduit.lastModified = new Date();
        // check if this should produce output
        if (this.conduit.producesOutput) {
            this._zone.emit({ conduit: this.conduit, zoneId: this.zoneId, value });
        }
    }
    /**
     * Unsubscribe once this subject is destroyed
     * @return {?}
     */
    destroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This utility is to ensure a all functions with the specified name are called in all super classes
 * @param {?} target
 * @param {?} functionName
 * @return {?}
 */
function invokeSuperFunction(target, functionName) {
    // get all instances of the function
    const /** @type {?} */ functionList = [];
    // store the current prototype we are checking
    let /** @type {?} */ prototype = target;
    // look through every base class and check it
    do {
        if (prototype.hasOwnProperty(functionName)) {
            functionList.push(prototype[functionName]);
        }
        prototype = prototype.__proto__;
    } while (prototype.__proto__);
    // augment the top level function to call all the functions
    target[functionName] = function (...args) {
        functionList.forEach(func => func.call(target, ...args));
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ConduitZone {
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // find all conduit subjects that are part of this zone
        ConduitZone.subjects.filter(_subject => _subject.zoneId === this._zoneId)
            .forEach(_subject => this.unregisterConduit(_subject.conduit));
    }
    /**
     * Store reference to the repository and begin watching for and emitting changes
     * @param {?} conduit
     * @return {?}
     */
    registerConduit(conduit) {
        ConduitZone.subjects.push(new ConduitSubject(conduit, this, this._zoneId));
    }
    /**
     * Destroy a conduit
     * @param {?} conduit
     * @return {?}
     */
    unregisterConduit(conduit) {
        const /** @type {?} */ subject = this.getConduitSubject(conduit.subject);
        if (subject) {
            // remove the subject from the internal list of conduit subjects
            ConduitZone.subjects = ConduitZone.subjects.filter(_subject => _subject !== subject);
            // perform all unsubscriptions
            subject.destroy();
        }
    }
    /**
     * Provide the zone with an ID
     * @param {?} zoneId
     * @return {?}
     */
    setZoneId(zoneId) {
        this._zoneId = zoneId;
    }
    /**
     * Emit a value to all zones for checking
     * @param {?} event
     * @return {?}
     */
    emit(event) {
        ConduitZone.events.next(event);
    }
    /**
     * Retrieve a conduit subsject object from the rxjs subject
     * @param {?} subject
     * @return {?}
     */
    getConduitSubject(subject) {
        return ConduitZone.subjects.find(_subject => _subject.conduit.subject === subject);
    }
    /**
     * Get all subjects from all zones
     * @return {?}
     */
    getSubjects() {
        return ConduitZone.subjects;
    }
    /**
     * Alter the properties of a conduit dynamically
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    setConduitProperties(subject, properties) {
        // find the conduit with the matching subject
        const /** @type {?} */ conduitSubject = this.getSubjects().find(_conduit => _conduit.conduit.subject === subject);
        // if a match was found update the properties
        if (conduitSubject) {
            // update each specified property
            for (const /** @type {?} */ prop in properties) {
                conduitSubject.conduit[prop] = properties[prop];
            }
        }
    }
    /**
     * Programmatically create a conduit at runtime
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    createConduit(subject, properties) {
        // register the conduit with the zone
        this.registerConduit(Object.assign({}, properties, { subject }));
    }
    /**
     * Register all conduits in a component
     * @param {?} component
     * @return {?}
     */
    registerConduits(component) {
        if (Array.isArray(component._conduits)) {
            component._conduits.forEach((conduit) => this.registerConduit(Object.assign({}, conduit, { subject: component[conduit.propertyKey] })));
        }
    }
    /**
     * Register all conduits in a component
     * @param {?} component
     * @return {?}
     */
    unregisterConduits(component) {
        if (Array.isArray(component._conduits)) {
            component._conduits.forEach((conduit) => this.unregisterConduit(conduit));
        }
    }
    /**
     * Return the global event stream
     * @return {?}
     */
    getEvents() {
        return ConduitZone.events;
    }
}
/**
 * Create a global subject store
 */
ConduitZone.subjects = [];
/**
 * Expose an event stream of new values
 */
ConduitZone.events = new Subject();
ConduitZone.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ConduitComponent {
    /**
     * @param {?} _zone
     */
    constructor(_zone) {
        this._zone = _zone;
        // we want to ensure these functions get called even if a class overrides them
        invokeSuperFunction(this, 'ngOnInit');
        invokeSuperFunction(this, 'ngOnDestroy');
    }
    /**
     * We need to register the conduits with the zone when the component is initialised
     * @return {?}
     */
    ngOnInit() {
        // register the conduit in the zone and ensure it gets the correct instance of the target
        this._zone.registerConduits(this);
    }
    /**
     * We need to unregister the conduits when the component is destroyed
     * @return {?}
     */
    ngOnDestroy() {
        this._zone.unregisterConduits(this);
    }
    /**
     * Alter the properties of a conduit dynamically
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    setConduitProperties(subject, properties) {
        this._zone.setConduitProperties(subject, properties);
    }
    /**
     * Programmatically create a conduit at runtime
     * @param {?} subject
     * @param {?} properties
     * @return {?}
     */
    createConduit(subject, properties) {
        this._zone.createConduit(subject, properties);
    }
}
/** @nocollapse */
ConduitComponent.ctorParameters = () => [
    { type: ConduitZone, decorators: [{ type: Optional }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
class ConduitZoneComponent extends ConduitComponent {
    /**
     * @return {?}
     */
    ngOnInit() {
        this._zone.setZoneId(this.zoneId);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ defaultConduitProps = {
    acceptsInput: true,
    producesOutput: true,
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Expose the property that conduits will be stored in
 */
const /** @type {?} */ CONDUITS = '_conduits';
/**
 * Create the conduit property decorator
 * @param {?} properties
 * @return {?}
 */
function Conduit(properties) {
    return (target, propertyKey) => {
        if (typeof properties === 'function') {
            properties = properties.call(null);
        }
        // if the target does not already have a conduit list then create one
        if (!target.hasOwnProperty(CONDUITS)) {
            Object.defineProperty(target, CONDUITS, { value: [] });
        }
        // add the conduit to the list ensuring all required properties are provided
        target[CONDUITS].push(/** @type {?} */ (Object.assign({}, defaultConduitProps, properties, { target, propertyKey })));
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DashboardService {
    constructor() {
        this._rowHeight = 0;
        this.widgets$ = new BehaviorSubject([]);
        this.options$ = new BehaviorSubject(defaultOptions);
        this.dimensions$ = new BehaviorSubject({});
        this.height$ = this.dimensions$.pipe(delay(0), map((dimensions) => dimensions.height), distinctUntilChanged());
        this.placeholder$ = new BehaviorSubject({ visible: false, x: 0, y: 0, width: 0, height: 0 });
        this.layout$ = new Subject();
        this.stacked$ = new BehaviorSubject(false);
        this.layout$.subscribe(this.setLayoutData.bind(this));
        this.stacked$.pipe(filter(stacked => stacked === true)).subscribe(this.updateWhenStacked.bind(this));
        this.widgets$.pipe(delay(0)).subscribe(() => this.renderDashboard());
        this.dimensions$.pipe(delay(0)).subscribe(() => this.renderDashboard());
    }
    /**
     * @return {?}
     */
    get options() {
        return this.options$.getValue();
    }
    /**
     * @return {?}
     */
    get widgets() {
        return this.widgets$.getValue();
    }
    /**
     * @return {?}
     */
    get stacked() {
        return this.stacked$.getValue();
    }
    /**
     * @return {?}
     */
    get dimensions() {
        return this.dimensions$.getValue();
    }
    /**
     * @return {?}
     */
    get columnWidth() {
        return this.dimensions.width / this.options.columns;
    }
    /**
     * Add a widget to the dashboard
     * @param {?} widget The widget component to add to the dashboard
     * @return {?}
     */
    addWidget(widget) {
        this.widgets$.next([...this.widgets$.getValue(), widget]);
    }
    /**
     * Remove a widget from the dashboard
     * @param {?} widget The widget to remove
     * @return {?}
     */
    removeWidget(widget) {
        this.widgets$.next(this.widgets$.getValue().filter(_widget => _widget !== widget));
    }
    /**
     * Indicate that the dashboard element has been resized
     * @param {?=} width The width of the dashboard element in px
     * @param {?=} height The height of the dashboard element in px
     * @return {?}
     */
    setDimensions(width = this.dimensions.width, height = this.dimensions.height) {
        if (this.dimensions.width !== width || this.dimensions.height !== height) {
            this.dimensions$.next({ width: width, height: height });
        }
    }
    /**
     * Produce an object containing all the required layout data.
     * This can be useful for exporting/saving a layout
     * @return {?}
     */
    getLayoutData() {
        return this.widgets.map(widget => {
            return { id: widget.id, col: widget.getColumn(), row: widget.getRow(), colSpan: widget.getColumnSpan(), rowSpan: widget.getRowSpan() };
        });
    }
    /**
     * Position widgets programatically
     * @param {?} widgets
     * @return {?}
     */
    setLayoutData(widgets) {
        // iterate through each widget data and find a match
        widgets.forEach(widget => {
            // find the matching widget
            const /** @type {?} */ target = this.widgets.find(_widget => _widget.id === widget.id);
            if (target) {
                target.setColumn(widget.col);
                target.setRow(widget.row);
                target.setColumnSpan(widget.colSpan);
                target.setRowSpan(widget.rowSpan);
            }
        });
    }
    /**
     * Update the positions and sizes of the widgets
     * @return {?}
     */
    renderDashboard() {
        // get the dimensions of the dashboard
        this._rowHeight = this.options.rowHeight || this.columnWidth;
        // ensure the column width is not below the min widths
        this.stacked$.next(this.columnWidth < this.options.minWidth);
        // ensure the row height is not below the min widths
        if (this._rowHeight < this.options.minWidth) {
            this._rowHeight = this.options.minWidth;
        }
        this.setDashboardLayout();
        // iterate through each widget and set the size - except the one being resized
        this.widgets.filter(widget => !this._actionWidget || widget !== this._actionWidget.widget)
            .forEach(widget => widget.render());
    }
    /**
     * Determine where widgets should be positioned based on their positions, width and the size of the container
     * @return {?}
     */
    setDashboardLayout() {
        // find any widgets that do not currently have a position set
        this.widgets.filter(widget => widget.getColumn() === undefined || widget.getRow() === undefined)
            .forEach(widget => this.setWidgetPosition(widget));
        this.setDashboardHeight();
    }
    /**
     * @return {?}
     */
    updateWhenStacked() {
        // iterate through each widget set it's stacked state and
        this.getWidgetsByOrder().forEach((widget, idx) => {
            widget.setColumn(0);
            widget.setRow(idx);
        });
    }
    /**
     * @return {?}
     */
    getWidgetsByOrder() {
        return this.widgets.sort((w1, w2) => {
            const /** @type {?} */ w1Position = w1.getColumn() * w1.getRow();
            const /** @type {?} */ w2Position = w2.getColumn() * w2.getRow();
            if (w1Position < w2Position) {
                return -1;
            }
            if (w1Position > w2Position) {
                return 1;
            }
            return 0;
        });
    }
    /**
     * Find a position that a widget can fit in the dashboard
     * @param {?} widget The widget to try and position
     * @return {?}
     */
    setWidgetPosition(widget) {
        // find a position for the widget
        let /** @type {?} */ position = 0;
        let /** @type {?} */ success = false;
        // repeat until a space is found
        while (!success) {
            // get a position to try
            const /** @type {?} */ column = position % this.options.columns;
            const /** @type {?} */ row = Math.floor(position / this.options.columns);
            // check the current position
            if (this.getPositionAvailable(column, row, widget.getColumnSpan(), widget.getRowSpan())) {
                success = true;
                widget.setColumn(column);
                widget.setRow(row);
                return;
            }
            if (column === 0 && widget.colSpan > this.options.columns) {
                throw new Error('Dashboard widgets have a colSpan greater than the max number of dashboard columns!');
            }
            position++;
        }
    }
    /**
     * Check if a position in the dashboard is vacant or not
     * @param {?} column
     * @param {?} row
     * @param {?} columnSpan
     * @param {?} rowSpan
     * @param {?=} ignoreWidget
     * @return {?}
     */
    getPositionAvailable(column, row, columnSpan, rowSpan, ignoreWidget) {
        // get a list of grid spaces that are populated
        const /** @type {?} */ spaces = this.getOccupiedSpaces();
        // check if the block would still be in bounds
        if (column + columnSpan > this.options.columns) {
            return false;
        }
        // check each required position
        for (let /** @type {?} */ x = column; x < column + columnSpan; x++) {
            for (let /** @type {?} */ y = row; y < row + rowSpan; y++) {
                if (spaces.find(block => block.column === x && block.row === y && block.widget !== ignoreWidget)) {
                    return false;
                }
            }
        }
        return true;
    }
    /**
     * @return {?}
     */
    getOccupiedSpaces() {
        // find all spaces that are currently occupied
        return this.widgets.filter(widget => widget.getColumn() !== undefined && widget.getRow() !== undefined)
            .reduce((value, widget) => {
            this.forEachBlock(widget, (column, row) => value.push({ widget: widget, column: column, row: row }));
            return value;
        }, []);
    }
    /**
     * Begin resizing a widget
     * @param {?} action The the widget to resize
     * @return {?}
     */
    onResizeStart(action) {
        // store the mouse event
        this._mouseEvent = action.event;
        this._actionWidget = action;
        // bring the widget to the font
        this.bringToFront(action.widget);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    onResizeDrag(action) {
        const /** @type {?} */ mousePosX = this._mouseEvent.pageX - pageXOffset;
        const /** @type {?} */ mousePosY = this._mouseEvent.pageY - pageYOffset;
        // if there was no movement then do nothing
        if (action.event.x === mousePosX && action.event.y === mousePosY) {
            return;
        }
        // update the stored mouse event
        this._mouseEvent = action.event;
        // get handle for direction
        const { handle } = action;
        // get the bounds of the handle
        const /** @type {?} */ bounds = handle.getBoundingClientRect();
        // get the center of the handle
        const /** @type {?} */ centerX = bounds.left + (bounds.width / 2);
        const /** @type {?} */ centerY = bounds.top + (bounds.height / 2);
        // get the current mouse position
        const /** @type {?} */ mouseX = mousePosX - centerX;
        const /** @type {?} */ mouseY = mousePosY - centerY;
        // store the new proposed dimensions for the widget
        const /** @type {?} */ dimensions = {
            x: action.widget.x,
            y: action.widget.y,
            width: action.widget.width,
            height: action.widget.height
        };
        // update widget based on the handle being dragged
        switch (action.direction) {
            case ActionDirection.Right:
                dimensions.width += mouseX;
                break;
            case ActionDirection.Left:
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this.options.minWidth) {
                    const /** @type {?} */ difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                break;
            case ActionDirection.Bottom:
                dimensions.height += mouseY;
                break;
            case ActionDirection.Top:
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this.options.minHeight) {
                    const /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            // Support resizing on multiple axis simultaneously
            case ActionDirection.TopLeft:
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this.options.minWidth) {
                    const /** @type {?} */ difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this.options.minHeight) {
                    const /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            case ActionDirection.TopRight:
                dimensions.width += mouseX;
                dimensions.y += mouseY;
                dimensions.height -= mouseY;
                if (dimensions.height < this.options.minHeight) {
                    const /** @type {?} */ difference = this.options.minHeight - dimensions.height;
                    dimensions.y -= difference;
                    dimensions.height += difference;
                }
                break;
            case ActionDirection.BottomLeft:
                dimensions.height += mouseY;
                dimensions.x += mouseX;
                dimensions.width -= mouseX;
                if (dimensions.width < this.options.minWidth) {
                    const /** @type {?} */ difference = this.options.minWidth - dimensions.width;
                    dimensions.x -= difference;
                    dimensions.width += difference;
                }
                break;
            case ActionDirection.BottomRight:
                dimensions.height += mouseY;
                dimensions.width += mouseX;
                break;
        }
        const /** @type {?} */ currentWidth = action.widget.x + action.widget.width;
        const /** @type {?} */ currentHeight = action.widget.y + action.widget.height;
        // ensure values are within the dashboard bounds
        if (dimensions.x < 0) {
            dimensions.x = 0;
            dimensions.width = currentWidth;
        }
        if (dimensions.y < 0) {
            dimensions.y = 0;
            dimensions.height = currentHeight;
        }
        if ((dimensions.x + dimensions.width) > this.dimensions.width) {
            dimensions.width = this.dimensions.width - dimensions.x;
        }
        // if the proposed width is smaller than allowed then reset width to minimum and ignore x changes
        if (dimensions.width < this.options.minWidth) {
            dimensions.x = action.widget.x;
            dimensions.width = this.options.minWidth;
        }
        // if the proposed height is smaller than allowed then reset height to minimum and ignore y changes
        if (dimensions.height < this.options.minHeight) {
            dimensions.y = action.widget.y;
            dimensions.height = this.options.minHeight;
        }
        // update the widget actual values
        action.widget.setBounds(dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // update placeholder position and value
        this.setPlaceholderBounds(true, dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // show the widget positions if the current positions and sizes were to persist
        this.updateWidgetPositions(action.widget);
    }
    /**
     * @return {?}
     */
    onResizeEnd() {
        const /** @type {?} */ placeholder = this.placeholder$.getValue();
        // commit resize changes
        this.commitWidgetChanges();
        // hide placeholder
        placeholder.visible = false;
        // update the placeholder
        this.placeholder$.next(placeholder);
        this._actionWidget = null;
        this._mouseEvent = null;
        // ensure any vacant upper spaces are filled where required
        this.shiftWidgetsUp();
        // update dashboard height
        this.setDashboardHeight();
        // emit information about the layout
        this.layout$.next(this.getLayoutData());
    }
    /**
     * @param {?} action
     * @return {?}
     */
    onDragStart(action) {
        this.onResizeStart(action);
        // store the starting placeholder position
        this.setWidgetOrigin();
        this.cacheWidgets();
    }
    /**
     * @return {?}
     */
    onDragEnd() {
        this.onResizeEnd();
        this._widgetOrigin = {};
    }
    /**
     * @param {?} action
     * @return {?}
     */
    onDrag(action) {
        // if there was no movement then do nothing
        if (action.event.pageX === this._mouseEvent.pageX && action.event.pageY === this._mouseEvent.pageY) {
            return;
        }
        // get the current mouse position
        const /** @type {?} */ mouseX = action.event.pageX - this._mouseEvent.pageX;
        const /** @type {?} */ mouseY = action.event.pageY - this._mouseEvent.pageY;
        // store the latest event
        this._mouseEvent = action.event;
        const /** @type {?} */ dimensions = {
            x: action.widget.x + mouseX,
            y: action.widget.y + mouseY,
            width: action.widget.width,
            height: action.widget.height
        };
        this.restoreWidgets(true);
        // update widget position
        action.widget.setBounds(dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // update placeholder position and value
        this.setPlaceholderBounds(true, dimensions.x, dimensions.y, dimensions.width, dimensions.height);
        // show the widget positions if the current positions and sizes were to persist
        this.shiftWidgets();
        this.setDashboardHeight();
    }
    /**
     * @return {?}
     */
    getRowHeight() {
        return this._rowHeight;
    }
    /**
     * @return {?}
     */
    cacheWidgets() {
        this._cache = this.widgets.map(widget => ({ id: widget.id, column: widget.getColumn(), row: widget.getRow() }));
    }
    /**
     * @param {?=} ignoreActionWidget
     * @return {?}
     */
    restoreWidgets(ignoreActionWidget = false) {
        this._cache.filter(widget => !ignoreActionWidget || widget.id !== this._actionWidget.widget.id).forEach(widget => {
            const /** @type {?} */ match = this.widgets.find(wgt => wgt.id === widget.id);
            if (match) {
                match.setColumn(widget.column);
                match.setRow(widget.row);
            }
        });
    }
    /**
     * When dragging any widgets that need to be moved should be moved to an appropriate position
     * @return {?}
     */
    shiftWidgets() {
        let /** @type {?} */ widgetsToMove = [];
        const /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check if there are any widgets under the placeholder
        for (let /** @type {?} */ row = placeholder.row; row < placeholder.row + placeholder.rowSpan; row++) {
            for (let /** @type {?} */ column = placeholder.column; column < placeholder.column + placeholder.columnSpan; column++) {
                // store reference to any widgets that need moved
                this.getOccupiedSpaces()
                    .filter(space => space.column === column && space.row === row && space.widget !== this._actionWidget.widget)
                    .forEach(space => widgetsToMove.push(space.widget));
            }
        }
        // remove any duplicates
        widgetsToMove = widgetsToMove.filter((widget, idx, array) => array.indexOf(widget) === idx);
        // if no widgets need moved then we can stop here
        if (widgetsToMove.length === 0) {
            return;
        }
        // create a duplicate we can use to keep track of which have been moved
        const /** @type {?} */ unmovedWidgets = widgetsToMove.slice();
        // attempt to move any widgets to the previous widget position
        widgetsToMove.forEach(widget => {
            // get a grid off all occupied spaces - taking into account the placeholder and ignoring widgets that need moved
            const /** @type {?} */ grid = this.getOccupiedSpaces().filter(space => !unmovedWidgets.find(wgt => wgt === space.widget));
            // iterate each free block
            for (let /** @type {?} */ row = this._widgetOrigin.row; row < this._widgetOrigin.row + this._widgetOrigin.rowSpan; row++) {
                for (let /** @type {?} */ column = this._widgetOrigin.column; column < this._widgetOrigin.column + this._widgetOrigin.columnSpan; column++) {
                    // determine if the block can fit in this space
                    let /** @type {?} */ requiredSpaces = this.getRequiredSpacesFromPoint(widget, column, row);
                    // check if widget would fit in space
                    let /** @type {?} */ available = requiredSpaces.every(space => {
                        return !grid.find(gridSpace => gridSpace.column === space.column && gridSpace.row === space.row) && space.column < this.getColumnCount();
                    });
                    if (available) {
                        widget.setColumn(column);
                        widget.setRow(row);
                        unmovedWidgets.splice(unmovedWidgets.findIndex(wgt => wgt === widget), 1);
                        return;
                    }
                }
            }
            // if we get to here then we can't simply swap the positions - next try moving right
            if (this.canWidgetMoveRight(widget, true)) {
                // after the shift check if placeholder position is still valid
                this.validatePlaceholderPosition(ActionDirection.Right);
                return;
            }
            // next try moving left
            if (this.canWidgetMoveLeft(widget, true)) {
                // after the shift check if placeholder position is still valid
                this.validatePlaceholderPosition(ActionDirection.Left);
                return;
            }
            // determine the distance that the widget needs to be moved down
            let /** @type {?} */ distance = (this._actionWidget.widget.getRow() - widget.getRow()) + this._actionWidget.widget.getRowSpan();
            // as a last resort move the widget downwards
            this.moveWidgetDown(widget, distance);
        });
    }
    /**
     * After shifts have taken place we should verify the place holder position is still valid
     * @param {?} shiftDirection - the position widgets were shifted
     * @return {?}
     */
    validatePlaceholderPosition(shiftDirection) {
        const /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check if the placeholder is over a widget
        if (this.getWidgetsAtPosition(placeholder.column, placeholder.row, true).length > 0) {
            // move the placeholder the opposite direction
            switch (shiftDirection) {
                case ActionDirection.Left:
                    this.setPlaceholderBounds(placeholder.visible, placeholder.x + this.getColumnWidth(), placeholder.y, placeholder.width, placeholder.height);
                    break;
                case ActionDirection.Right:
                    this.setPlaceholderBounds(placeholder.visible, placeholder.x - this.getColumnWidth(), placeholder.y, placeholder.width, placeholder.height);
                    break;
            }
            // validate this new position again
            this.validatePlaceholderPosition(shiftDirection);
        }
    }
    /**
     * Determine if a widget can be moved left - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    canWidgetMoveLeft(widget, performMove = false) {
        // check if the widget is the action widget or occupies the first column
        if (widget === this._actionWidget.widget || widget.getColumn() === 0) {
            return false;
        }
        // find the positions required
        const /** @type {?} */ targetSpaces = this.getOccupiedSpaces().filter(space => space.widget === widget).map(space => {
            return { column: space.column - widget.getColumnSpan(), row: space.row, widget: space.widget };
        });
        // check if there are widget in the required positions and if so, can they move right?
        const /** @type {?} */ moveable = targetSpaces.every(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).every(wgt => this.canWidgetMoveLeft(wgt)));
        if (performMove && moveable) {
            // move all widgets to the right
            targetSpaces.forEach(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).forEach(wgt => this.canWidgetMoveLeft(wgt, true)));
            // move current widget to the right
            widget.setColumn(widget.getColumn() - 1);
        }
        return moveable;
    }
    /**
     * Determine if a widget can be moved right - or if it can move the widgets to the right to make space for the widget
     * @param {?} widget
     * @param {?=} performMove
     * @return {?}
     */
    canWidgetMoveRight(widget, performMove = false) {
        // check if the widget is the dragging widget or the widget occupies the final column
        if (widget === this._actionWidget.widget || widget.getColumn() + widget.getColumnSpan() === this.options.columns) {
            return false;
        }
        // find the positions required
        const /** @type {?} */ targetSpaces = this.getOccupiedSpaces().filter(space => space.widget === widget).map(space => {
            return { column: space.column + widget.getColumnSpan(), row: space.row, widget: space.widget };
        });
        // check if there are widget in the required positions and if so, can they move right?
        const /** @type {?} */ moveable = targetSpaces.every(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).every(wgt => this.canWidgetMoveRight(wgt)));
        if (performMove && moveable) {
            // move all widgets to the right
            targetSpaces.forEach(space => this.getWidgetsAtPosition(space.column, space.row).filter(wgt => wgt !== space.widget).forEach(wgt => this.canWidgetMoveRight(wgt, true)));
            // move current widget to the right
            widget.setColumn(widget.getColumn() + 1);
        }
        return moveable;
    }
    /**
     * Store the initial position of the widget being dragged
     * @return {?}
     */
    setWidgetOrigin() {
        this._widgetOrigin = {
            column: this._actionWidget.widget.getColumn(),
            row: this._actionWidget.widget.getRow(),
            columnSpan: this._actionWidget.widget.getColumnSpan(),
            rowSpan: this._actionWidget.widget.getRowSpan()
        };
    }
    /**
     * Calculate all the required positions is a widget was to be positioned at a particular point
     * @param {?} widget
     * @param {?} column
     * @param {?} row
     * @return {?}
     */
    getRequiredSpacesFromPoint(widget, column, row) {
        const /** @type {?} */ spaces = [];
        for (let /** @type {?} */ y = row; y < row + widget.getRowSpan(); y++) {
            for (let /** @type {?} */ x = column; x < column + widget.getColumnSpan(); x++) {
                spaces.push({ column: x, row: y, widget: widget });
            }
        }
        return spaces;
    }
    /**
     * Position widgets based on the position of the placeholder - this is temporary until confirmed
     * @param {?} widget
     * @return {?}
     */
    updateWidgetPositions(widget) {
        const /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check all spaces the placeholder will occupy and move any widget currently in them down
        for (let /** @type {?} */ column = placeholder.column; column < placeholder.column + placeholder.columnSpan; column++) {
            for (let /** @type {?} */ row = placeholder.row; row < placeholder.row + placeholder.rowSpan; row++) {
                this.getWidgetsAtPosition(column, row, true)
                    .filter(wgt => wgt !== widget)
                    .forEach(wgt => this.moveWidgetDown(wgt));
            }
        }
        // update the height of the dashboard
        this.setDashboardHeight();
        // if we arent dragging the top handle then fill spaces
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight) {
            this.shiftWidgetsUp();
        }
    }
    /**
     * Determine if a widget is occupying a specific row and column
     * @param {?} column The columns to check if occupied
     * @param {?} row The row to check if occupied
     * @param {?=} ignoreResizing Whether or not to ignore the widget currently being resized
     * @return {?}
     */
    getWidgetsAtPosition(column, row, ignoreResizing = false) {
        return this.getOccupiedSpaces()
            .filter(space => space.column === column && space.row === row)
            .filter(space => space.widget !== this._actionWidget.widget || !ignoreResizing)
            .map(space => space.widget);
    }
    /**
     * Update the placeholder visibility, position and size
     * @param {?} visible
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    setPlaceholderBounds(visible, x, y, width, height) {
        const /** @type {?} */ placeholder = this.placeholder$.getValue();
        const /** @type {?} */ rounding = this._actionWidget.direction === ActionDirection.Left ||
            this._actionWidget.direction === ActionDirection.Top ? Rounding.RoundDownBelowHalf : Rounding.RoundUpOverHalf;
        placeholder.visible = visible;
        placeholder.column = this.getPlaceholderColumn(x, width);
        placeholder.row = this.getPlaceholderRow(y, height);
        placeholder.columnSpan = this.getPlaceholderColumnSpan(width);
        placeholder.rowSpan = this.getPlaceholderRowSpan(height);
        // calculate the maximum number of rows
        const /** @type {?} */ rowCount = this.widgets.filter(widget => widget !== this._actionWidget.widget)
            .reduce((previous, widget) => Math.max(widget.getRow() + widget.getRowSpan(), previous), 0);
        // constrain maximum placeholder row
        placeholder.row = Math.min(placeholder.row, rowCount);
        placeholder.x = (placeholder.column * this.getColumnWidth()) + this.options.padding;
        placeholder.y = (placeholder.row * this._rowHeight) + this.options.padding;
        placeholder.width = (placeholder.columnSpan * this.getColumnWidth()) - (this.options.padding * 2);
        placeholder.height = (placeholder.rowSpan * this._rowHeight) - (this.options.padding * 2);
        // set the values of the widget to match the values of the placeholder - however do not render the changes
        this._actionWidget.widget.setColumn(placeholder.column, false);
        this._actionWidget.widget.setRow(placeholder.row, false);
        this._actionWidget.widget.setColumnSpan(placeholder.columnSpan, false);
        this._actionWidget.widget.setRowSpan(placeholder.rowSpan, false);
        // update the placeholder
        this.placeholder$.next(placeholder);
    }
    /**
     * Get the placeholder column position
     * @param {?} x
     * @param {?} width
     * @return {?}
     */
    getPlaceholderColumn(x, width) {
        const /** @type {?} */ column = this.getColumnFromPx(x, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        const /** @type {?} */ columnSpan = Math.floor(width / this.getColumnWidth());
        const /** @type {?} */ upperLimit = this.getColumnCount() - columnSpan;
        // if we arent dragging left then just return the column
        if (this._actionWidget.direction !== ActionDirection.Left &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.BottomLeft) {
            return Math.max(Math.min(column, upperLimit), 0);
        }
        // get any overflow
        const /** @type {?} */ overflow = width % this.getColumnWidth();
        return (x <= 0 || overflow === 0 || columnSpan === 0 || overflow > (this.getColumnWidth() / 2)) ?
            Math.max(Math.min(column, upperLimit), 0) :
            Math.max(Math.min(column + 1, upperLimit), 0);
    }
    /**
     * Get the column span of the placeholder
     * @param {?} width
     * @return {?}
     */
    getPlaceholderColumnSpan(width) {
        const /** @type {?} */ columnSpan = this.getColumnFromPx(width);
        // if we arent dragging right or left then just return the column span
        if (this._actionWidget.direction !== ActionDirection.Right &&
            this._actionWidget.direction !== ActionDirection.TopRight &&
            this._actionWidget.direction !== ActionDirection.BottomRight &&
            this._actionWidget.direction !== ActionDirection.Left &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.BottomLeft) {
            return Math.max(columnSpan, 1);
        }
        // get the current column span and any overflow
        const /** @type {?} */ overflow = width % this.getColumnWidth();
        return (columnSpan > 0 && overflow > (this.getColumnWidth() / 2)) ? Math.max(columnSpan + 1, 1) : Math.max(columnSpan, 1);
    }
    /**
     * Get the row position of the placeholder
     * @param {?} y
     * @param {?} height
     * @return {?}
     */
    getPlaceholderRow(y, height) {
        const /** @type {?} */ row = this.getRowFromPx(y, this._actionWidget.direction === ActionDirection.Move ? Rounding.RoundUpOverHalf : Rounding.RoundDown);
        const /** @type {?} */ rowSpan = Math.ceil(height / this._rowHeight);
        // if we arent dragging up then just return the row
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight) {
            return Math.max(row, 0);
        }
        // get any overflow
        let /** @type {?} */ overflow = height < this._rowHeight ? 0 : height % this._rowHeight;
        return (y <= 0 || rowSpan === 0 || overflow === 0 || overflow > (this._rowHeight / 2)) ? Math.max(row, 0) : Math.max(row + 1, 0);
    }
    /**
     * Get the row span of the placeholder
     * @param {?} height
     * @return {?}
     */
    getPlaceholderRowSpan(height) {
        const /** @type {?} */ rowSpan = this.getRowFromPx(height);
        // if we arent dragging up or down then just return the column span
        if (this._actionWidget.direction !== ActionDirection.Top &&
            this._actionWidget.direction !== ActionDirection.TopLeft &&
            this._actionWidget.direction !== ActionDirection.TopRight &&
            this._actionWidget.direction !== ActionDirection.Bottom &&
            this._actionWidget.direction !== ActionDirection.BottomLeft &&
            this._actionWidget.direction !== ActionDirection.BottomRight) {
            return Math.max(rowSpan, 1);
        }
        // get the current column span and any overflow
        const /** @type {?} */ overflow = height % this._rowHeight;
        return (overflow > (this._rowHeight / 2)) ? Math.max(rowSpan + 1, 1) : Math.max(rowSpan, 1);
    }
    /**
     * @param {?} x
     * @param {?=} rounding
     * @return {?}
     */
    getColumnFromPx(x, rounding = Rounding.RoundDown) {
        const /** @type {?} */ column = Math.floor(x / Math.floor(this.getColumnWidth()));
        const /** @type {?} */ overflow = (x % Math.floor(this.getColumnWidth()));
        const /** @type {?} */ half = this.getColumnWidth() / 2;
        switch (rounding) {
            case Rounding.RoundDown:
                return column;
            case Rounding.RoundDownBelowHalf:
                return overflow < half ? column : column + 1;
            case Rounding.RoundUpOverHalf:
                return overflow > half ? column + 1 : column;
            case Rounding.RoundUp:
                return overflow > 0 ? column + 1 : column;
        }
    }
    /**
     * @param {?} y
     * @param {?=} rounding
     * @return {?}
     */
    getRowFromPx(y, rounding = Rounding.RoundDown) {
        const /** @type {?} */ row = Math.floor(y / Math.floor(this._rowHeight));
        const /** @type {?} */ overflow = (y % Math.floor(this._rowHeight));
        const /** @type {?} */ half = this._rowHeight / 2;
        switch (rounding) {
            case Rounding.RoundDown:
                return row;
            case Rounding.RoundDownBelowHalf:
                return overflow < half ? row : row + 1;
            case Rounding.RoundUpOverHalf:
                return overflow > half ? row + 1 : row;
            case Rounding.RoundUp:
                return overflow > 0 ? row + 1 : row;
        }
    }
    /**
     * @return {?}
     */
    commitWidgetChanges() {
        const /** @type {?} */ placeholder = this.placeholder$.getValue();
        // check that we have all the values we need
        if (placeholder.column === undefined || placeholder.row === undefined ||
            placeholder.columnSpan === undefined || placeholder.rowSpan === undefined) {
            return;
        }
        if (this._actionWidget) {
            this._actionWidget.widget.setColumn(placeholder.column);
            this._actionWidget.widget.setRow(placeholder.row);
            this._actionWidget.widget.setColumnSpan(placeholder.columnSpan);
            this._actionWidget.widget.setRowSpan(placeholder.rowSpan);
        }
        // reset all placeholder values
        placeholder.column = undefined;
        placeholder.row = undefined;
        placeholder.columnSpan = undefined;
        placeholder.rowSpan = undefined;
        // emit the new placeholder values
        this.placeholder$.next(placeholder);
    }
    /**
     * Get the current column width
     * @return {?}
     */
    getColumnWidth() {
        return Math.floor(this.columnWidth);
    }
    /**
     * Calculate the number of rows populated with widgets
     * @return {?}
     */
    getRowCount() {
        return this.widgets.reduce((previous, widget) => Math.max(widget.getRow() + widget.getRowSpan(), previous), 0);
    }
    /**
     * Set the height of the dashboard container element
     * @return {?}
     */
    setDashboardHeight() {
        // size the dashboard container to ensure all rows fit
        let /** @type {?} */ rowCount = this.getRowCount();
        // if we should show an empty row increment the row count by 1
        if (this.options.emptyRow) {
            rowCount++;
        }
        this.setDimensions(undefined, rowCount * this._rowHeight);
    }
    /**
     * Orders the z-index of all widgets to move the active one to the front
     * @param {?} widget The widget that should be brought to the front
     * @return {?}
     */
    bringToFront(widget) {
        this.widgets.forEach(_widget => _widget === widget ? _widget.bringToFront() : _widget.sendToBack());
    }
    /**
     * Move a widget down - if widgets are in the position below, then move them down further
     * @param {?} widget The widget to move downwards
     * @param {?=} distance
     * @return {?}
     */
    moveWidgetDown(widget, distance = 1) {
        // move the widget down one position
        widget.setRow(widget.getRow() + distance);
        // check every space the widget occupies for collisions
        this.forEachBlock(widget, (column, row) => this.getWidgetsAtPosition(column, row, true)
            .filter(wgt => wgt !== widget)
            .forEach(wgt => this.moveWidgetDown(wgt, distance)));
    }
    /**
     * Widgets should not be allowed to have a vacant space above them - if there is one they should move upwards to fill it
     * @return {?}
     */
    shiftWidgetsUp() {
        // check whether or not changes have been made - if so we need to repeat until stable
        let /** @type {?} */ stable = true;
        // iterate each widget and
        this.widgets.forEach(widget => {
            // if widget is already on the top row then do nothing
            if (widget.getRow() === 0) {
                return;
            }
            // if we are currently dragging and this is the dragging widget then skip
            if (this._actionWidget && this._actionWidget.widget === widget) {
                return;
            }
            if (this.getPositionAvailable(widget.getColumn(), widget.getRow() - 1, widget.getColumnSpan(), 1)) {
                widget.setRow(widget.getRow() - 1);
                stable = false;
            }
        });
        // if changes occurred then we should repeat the process
        if (!stable) {
            this.shiftWidgetsUp();
        }
    }
    /**
     * Iterate over each space a widget occupied
     * @param {?} widget The widget to determine spaces
     * @param {?} callback The function to be called for each space, should expect a column and row argument witht he context being the widget
     * @return {?}
     */
    forEachBlock(widget, callback) {
        for (let /** @type {?} */ row = widget.getRow(); row < widget.getRow() + widget.getRowSpan(); row++) {
            for (let /** @type {?} */ column = widget.getColumn(); column < widget.getColumn() + widget.getColumnSpan(); column++) {
                callback.call(widget, column, row);
            }
        }
    }
    /**
     * Returns the number of columns available
     * @return {?}
     */
    getColumnCount() {
        return this.stacked ? 1 : this.options.columns;
    }
}
DashboardService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DashboardService.ctorParameters = () => [];
const /** @type {?} */ defaultOptions = { columns: 5, padding: 5, minWidth: 100, minHeight: 100, emptyRow: true };
/** @enum {number} */
const ActionDirection = {
    Top: 0,
    TopRight: 1,
    Right: 2,
    BottomRight: 3,
    Bottom: 4,
    BottomLeft: 5,
    Left: 6,
    TopLeft: 7,
    Move: 8,
};
ActionDirection[ActionDirection.Top] = "Top";
ActionDirection[ActionDirection.TopRight] = "TopRight";
ActionDirection[ActionDirection.Right] = "Right";
ActionDirection[ActionDirection.BottomRight] = "BottomRight";
ActionDirection[ActionDirection.Bottom] = "Bottom";
ActionDirection[ActionDirection.BottomLeft] = "BottomLeft";
ActionDirection[ActionDirection.Left] = "Left";
ActionDirection[ActionDirection.TopLeft] = "TopLeft";
ActionDirection[ActionDirection.Move] = "Move";
/** @enum {number} */
const Rounding = {
    RoundDown: 0,
    RoundDownBelowHalf: 1,
    RoundUp: 2,
    RoundUpOverHalf: 3,
};
Rounding[Rounding.RoundDown] = "RoundDown";
Rounding[Rounding.RoundDownBelowHalf] = "RoundDownBelowHalf";
Rounding[Rounding.RoundUp] = "RoundUp";
Rounding[Rounding.RoundUpOverHalf] = "RoundUpOverHalf";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DashboardComponent {
    /**
     * @param {?} dashboardService
     */
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
        this.layoutChange = new EventEmitter();
        dashboardService.layout$.subscribe(layout => this.layoutChange.emit(layout));
    }
    /**
     * @param {?} layout
     * @return {?}
     */
    set layout(layout) {
        if (layout) {
            this.dashboardService.layout$.next(layout);
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) {
        this.dashboardService.options$.next(Object.assign({}, defaultOptions, options));
    }
    /**
     * Set the initial dimensions
     * @return {?}
     */
    ngAfterViewInit() {
        this.dashboardService.setDimensions(this.dashboardElement.nativeElement.offsetWidth, this.dashboardElement.nativeElement.offsetHeight);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        this.dashboardService.setDimensions(event.width, event.height);
    }
}
DashboardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-dashboard',
                template: "<div #dashboard class=\"dashboard-container\" [style.height.px]=\"dashboardService.height$ | async\">\n    <div (uxResize)=\"onResize($event)\" [throttle]=\"16\" class=\"dashboard\">\n        <ng-content></ng-content>\n    </div>\n    \n    <div class=\"position-indicator\" *ngIf=\"(dashboardService.placeholder$ | async).visible\" \n        [style.left.px]=\"(dashboardService.placeholder$ | async).x\" \n        [style.top.px]=\"(dashboardService.placeholder$ | async).y\" \n        [style.width.px]=\"(dashboardService.placeholder$ | async).width\"\n        [style.height.px]=\"(dashboardService.placeholder$ | async).height\"></div>\n</div>",
                providers: [DashboardService],
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
DashboardComponent.ctorParameters = () => [
    { type: DashboardService }
];
DashboardComponent.propDecorators = {
    layout: [{ type: Input }],
    options: [{ type: Input }],
    layoutChange: [{ type: Output }],
    dashboardElement: [{ type: ViewChild, args: ['dashboard',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DashboardWidgetComponent {
    /**
     * @param {?} dashboardService
     */
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
        this.colSpan = 1;
        this.rowSpan = 1;
        this.resizable = false;
        this.x = 0;
        this.y = 0;
        this.width = 100;
        this.height = 100;
        this.padding = 0;
        this.zIndex = 0;
        this._column = { regular: undefined, stacked: undefined };
        this._row = { regular: undefined, stacked: undefined };
        this._columnSpan = { regular: 1, stacked: 1 };
        this._rowSpan = { regular: 1, stacked: 1 };
        this._subscription = dashboardService.options$.subscribe(() => this.update());
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._columnSpan.regular = this.colSpan;
        this._rowSpan.regular = this.rowSpan;
        if (!this.id) {
            console.warn('Dashboard Widget is missing an ID.');
            // set random id - keeps things working but prevents exporting of positions
            this.id = Math.floor(Math.random() * 100000).toString();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // add the widget to the dashboard
        this.dashboardService.addWidget(this);
        // apply the current options
        this.update();
    }
    /**
     * If component is removed, then unregister it from the service
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
        this.dashboardService.removeWidget(this);
    }
    /**
     * Apply the current dashboard options
     * @return {?}
     */
    update() {
        // get the current options at the time
        const { padding, columns } = this.dashboardService.options;
        this.padding = padding;
        this._columnSpan.stacked = columns;
    }
    /**
     * Set the actual position and size values
     * @return {?}
     */
    render() {
        this.x = this.getColumn() * this.dashboardService.getColumnWidth();
        this.y = this.getRow() * this.dashboardService.getRowHeight();
        this.width = this.getColumnSpan() * this.dashboardService.getColumnWidth();
        this.height = this.getRowSpan() * this.dashboardService.getRowHeight();
    }
    /**
     * @return {?}
     */
    getColumn() {
        return this.getStackableValue(this._column);
    }
    /**
     * @return {?}
     */
    getRow() {
        return this.getStackableValue(this._row);
    }
    /**
     * @param {?} column
     * @param {?=} render
     * @return {?}
     */
    setColumn(column, render = true) {
        this.setStackableValue(this._column, column);
        if (render) {
            this.render();
        }
    }
    /**
     * @param {?} row
     * @param {?=} render
     * @return {?}
     */
    setRow(row, render = true) {
        this.setStackableValue(this._row, row);
        if (render) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    getColumnSpan() {
        return this.getStackableValue(this._columnSpan);
    }
    /**
     * @return {?}
     */
    getRowSpan() {
        return this.getStackableValue(this._rowSpan);
    }
    /**
     * @param {?} columnSpan
     * @param {?=} render
     * @return {?}
     */
    setColumnSpan(columnSpan, render = true) {
        this.setStackableValue(this._columnSpan, columnSpan);
        if (render) {
            this.render();
        }
    }
    /**
     * @param {?} rowSpan
     * @param {?=} render
     * @return {?}
     */
    setRowSpan(rowSpan, render = true) {
        this.setStackableValue(this._rowSpan, rowSpan);
        if (render) {
            this.render();
        }
    }
    /**
     * @return {?}
     */
    bringToFront() {
        this.zIndex = 1;
    }
    /**
     * @return {?}
     */
    sendToBack() {
        this.zIndex = 0;
    }
    /**
     * @param {?} x
     * @param {?} y
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    setBounds(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    dragstart(handle, event, direction) {
        this.dashboardService.onResizeStart({ widget: this, direction: direction, event: event, handle: handle });
    }
    /**
     * @param {?} handle
     * @param {?} event
     * @param {?} direction
     * @return {?}
     */
    drag(handle, event, direction) {
        this.dashboardService.onResizeDrag({ widget: this, direction: direction, event: event, handle: handle });
    }
    /**
     * @return {?}
     */
    dragend() {
        this.dashboardService.onResizeEnd();
    }
    /**
     * Allows automatic setting of stackable value
     * @param {?} property The current StackableValue object
     * @param {?} value The value to set in the appropriate field
     * @return {?}
     */
    setStackableValue(property, value) {
        if (this.dashboardService.stacked) {
            property.stacked = value;
        }
        else {
            property.regular = value;
        }
    }
    /**
     * Return the appropriate value from a stackable value
     * @param {?} property The Stackable value object
     * @return {?}
     */
    getStackableValue(property) {
        return this.dashboardService.stacked ? property.stacked : property.regular;
    }
}
DashboardWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-dashboard-widget',
                template: "<div class=\"widget-content widget-col-span-{{ getColumnSpan() }} widget-row-span-{{ getRowSpan() }}\">\n    <ng-content></ng-content>\n</div>\n\n<div uxDrag #handleTop class=\"resizer-handle handle-top\" \n    (dragstart)=\"dragstart(handleTop, $event, 0)\"\n    (drag)=\"drag(handleTop, $event, 0)\"\n    (dragend)=\"dragend()\"\n    [style.top.px]=\"padding\" \n    [hidden]=\"!resizable\">\n</div>\n\n<div uxDrag #handleTopRight class=\"resizer-handle handle-top-right\" \n    (dragstart)=\"dragstart(handleTopRight, $event, 1)\"\n    (drag)=\"drag(handleTopRight, $event, 1)\"\n    (dragend)=\"dragend()\"\n    [style.top.px]=\"padding\" \n    [style.right.px]=\"padding\" \n    [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag #handleRight class=\"resizer-handle handle-right\" \n    (dragstart)=\"dragstart(handleRight, $event, 2)\"\n    (drag)=\"drag(handleRight, $event, 2)\"\n    (dragend)=\"dragend()\"\n    [style.right.px]=\"padding\" \n    [hidden]=\"!resizable || (dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag #handleBottomRight class=\"resizer-handle handle-bottom-right\" \n    (dragstart)=\"dragstart(handleBottomRight, $event, 3)\"\n    (drag)=\"drag(handleBottomRight, $event, 3)\"\n    (dragend)=\"dragend()\"\n    [style.bottom.px]=\"padding\" \n    [style.right.px]=\"padding\" \n    [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag #handleBottom class=\"resizer-handle handle-bottom\" \n    (dragstart)=\"dragstart(handleBottom, $event, 4)\"\n    (drag)=\"drag(handleBottom, $event, 4)\"\n    (dragend)=\"dragend()\"\n    [style.bottom.px]=\"padding\" \n    [hidden]=\"!resizable\">\n</div>\n\n<div uxDrag #handleBottomLeft class=\"resizer-handle handle-bottom-left\" \n    (dragstart)=\"dragstart(handleBottomLeft, $event, 5)\"\n    (drag)=\"drag(handleBottomLeft, $event, 5)\"\n    (dragend)=\"dragend()\"\n    [style.bottom.px]=\"padding\" \n    [style.left.px]=\"padding\" \n    [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag #handleLeft class=\"resizer-handle handle-left\" \n    (dragstart)=\"dragstart(handleLeft, $event, 6)\"\n    (drag)=\"drag(handleLeft, $event, 6)\"\n    (dragend)=\"dragend()\"\n    [style.left.px]=\"padding\" \n    [hidden]=\"!resizable || (dashboardService.stacked$ | async)\">\n</div>\n\n<div uxDrag #handleTopLeft class=\"resizer-handle handle-top-left\" \n    (dragstart)=\"dragstart(handleTopLeft, $event, 7)\"\n    (drag)=\"drag(handleTopLeft, $event, 7)\"\n    (dragend)=\"dragend()\"\n    [style.top.px]=\"padding\" \n    [style.left.px]=\"padding\" \n    [hidden]=\"!resizable && !(dashboardService.stacked$ | async)\">\n</div>"
            }] }
];
/** @nocollapse */
DashboardWidgetComponent.ctorParameters = () => [
    { type: DashboardService }
];
DashboardWidgetComponent.propDecorators = {
    id: [{ type: Input }],
    col: [{ type: Input }],
    row: [{ type: Input }],
    colSpan: [{ type: Input }],
    rowSpan: [{ type: Input }],
    resizable: [{ type: Input }],
    x: [{ type: HostBinding, args: ['style.left.px',] }],
    y: [{ type: HostBinding, args: ['style.top.px',] }],
    width: [{ type: HostBinding, args: ['style.width.px',] }],
    height: [{ type: HostBinding, args: ['style.height.px',] }],
    padding: [{ type: HostBinding, args: ['style.padding.px',] }],
    zIndex: [{ type: HostBinding, args: ['style.z-index',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DragDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _ngZone
     * @param {?} _renderer
     */
    constructor(_elementRef, _ngZone, _renderer) {
        this._elementRef = _elementRef;
        this._ngZone = _ngZone;
        this._renderer = _renderer;
        /**
         * Detemine if we should show a clone when dragging
         */
        this.clone = false;
        /**
         * Allow the dragging to be enabled/disabled
         */
        this.draggable = true;
        /**
         * Emit an event when dragging starts
         */
        this.dragstart = new EventEmitter();
        /**
         * Emit an event when the mouse moves while dragging
         */
        this.drag = new EventEmitter();
        /**
         * Emit an event when the dragging finishes
         */
        this.dragend = new EventEmitter();
        /**
         * Create an observable from the mouse down event
         */
        this._mousedown$ = fromEvent(this._elementRef.nativeElement, 'mousedown');
        /**
         * Create an observable from the mouse move event
         */
        this._mousemove$ = fromEvent(document, 'mousemove');
        /**
         * Create an observable from the mouse up event
         */
        this._mouseup$ = fromEvent(document, 'mouseup');
        /**
         * Use an observable to unsubscribe from all subscriptions
         */
        this._onDestroy = new Subject();
        this._mousedown$.pipe(filter(() => this.draggable), takeUntil(this._onDestroy)).subscribe(this.dragStart.bind(this));
    }
    /**
     * Emit events and create clone when drag starts
     * @param {?} event
     * @return {?}
     */
    dragStart(event) {
        event.preventDefault();
        if (this.clone) {
            // clone the node
            this.cloneNode(event);
        }
        // apply a class to the element being dragged
        this._renderer.addClass(this._elementRef.nativeElement, 'ux-drag-dragging');
        // emit the drag start event
        this._ngZone.run(() => this.dragstart.emit(event));
        this._mousemove$.pipe(takeUntil(this._mouseup$), takeUntil(this._onDestroy))
            .subscribe(this.dragMove.bind(this), null, this.dragEnd.bind(this));
    }
    /**
     * Emit event and update clone position when dragging moves
     * @param {?} event
     * @return {?}
     */
    dragMove(event) {
        event.preventDefault();
        if (this._clone) {
            this.updateNodePosition(event);
        }
        // emit the drag start event
        this._ngZone.run(() => this.drag.emit(event));
    }
    /**
     * Emit event and destroy clone when dragging ends
     * @return {?}
     */
    dragEnd() {
        // if there was a clone, remove it
        if (this._clone) {
            this._renderer.removeChild(document.body, this._clone);
            this._clone = null;
        }
        // remove the dragging class
        this._renderer.removeClass(this._elementRef.nativeElement, 'ux-drag-dragging');
        this._ngZone.run(() => this.dragend.emit());
    }
    /**
     * Create an exact clone of an element
     * @param {?} event
     * @return {?}
     */
    cloneNode(event) {
        // duplicate the node
        this._clone = this._elementRef.nativeElement.cloneNode(true);
        // store the position within the draggable element
        const { top, left } = this._elementRef.nativeElement.getBoundingClientRect();
        this._offset = { x: event.clientX - left, y: event.clientY - top };
        // inline all styles so it looks identical regardless of its position in the DOM
        this.inlineStyles(this._elementRef.nativeElement, this._clone);
        // ensure we can easily position the node an it is above all other elements
        this._renderer.setAttribute(this._clone, 'aria-hidden', 'true');
        this._renderer.setStyle(this._clone, 'position', 'absolute');
        this._renderer.setStyle(this._clone, 'z-index', '99999');
        // apply a class to allow custom styling
        this._renderer.addClass(this._clone, 'ux-drag-dragging-clone');
        // insert the cloned element
        this._renderer.appendChild(document.body, this._clone);
        // set the cloned element initial position
        this.updateNodePosition(event);
    }
    /**
     * Position the clone relative to the mouse
     * @param {?} event
     * @return {?}
     */
    updateNodePosition(event) {
        this._renderer.setStyle(this._clone, 'left', (event.pageX - this._offset.x) + 'px');
        this._renderer.setStyle(this._clone, 'top', (event.pageY - this._offset.y) + 'px');
    }
    /**
     * Inline all styles to ensure styling is consistent regardless of its position in the dom
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    inlineStyles(source, target) {
        // get all the computed styles from the source element
        const /** @type {?} */ styles = getComputedStyle(source);
        // inline every specified style
        for (let /** @type {?} */ idx = 0; idx < styles.length; idx++) {
            const /** @type {?} */ style$$1 = styles.item(idx);
            if (style$$1 !== undefined) {
                this._renderer.setStyle(target, styles[idx], styles[style$$1]);
            }
        }
        // ensure we dont capture any move events
        this._renderer.setStyle(target, 'pointer-events', 'none');
        // do the same for all the child elements
        for (let /** @type {?} */ idx = 0; idx < source.children.length; idx++) {
            this.inlineStyles(source.children[idx], target.children[idx]);
        }
    }
    /**
     * Unsubscribe from all subscriptions
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
DragDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxDrag]'
            },] }
];
/** @nocollapse */
DragDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];
DragDirective.propDecorators = {
    clone: [{ type: Input }],
    draggable: [{ type: Input }],
    dragstart: [{ type: Output }],
    drag: [{ type: Output }],
    dragend: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DashboardDragHandleDirective extends DragDirective {
    /**
     * @param {?} widget
     * @param {?} dashboardService
     * @param {?} elementRef
     * @param {?} ngZone
     * @param {?} renderer
     */
    constructor(widget, dashboardService, elementRef, ngZone, renderer) {
        super(elementRef, ngZone, renderer);
        this.dragstart.pipe(takeUntil(this._onDestroy))
            .subscribe((event) => dashboardService.onDragStart({ widget: widget, direction: ActionDirection.Move, event: event }));
        this.drag.pipe(takeUntil(this._onDestroy))
            .subscribe((event) => dashboardService.onDrag({ widget: widget, direction: ActionDirection.Move, event: event }));
        this.dragend.pipe(takeUntil(this._onDestroy))
            .subscribe(() => dashboardService.onDragEnd());
    }
}
DashboardDragHandleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxDashboardWidgetDragHandle], [ux-dashboard-widget-drag-handle]'
            },] }
];
/** @nocollapse */
DashboardDragHandleDirective.ctorParameters = () => [
    { type: DashboardWidgetComponent },
    { type: DashboardService },
    { type: ElementRef },
    { type: NgZone },
    { type: Renderer2 }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DragModule {
}
DragModule.decorators = [
    { type: NgModule, args: [{
                exports: [DragDirective],
                declarations: [DragDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DECLARATIONS = [
    DashboardComponent,
    DashboardWidgetComponent,
    DashboardDragHandleDirective
];
class DashboardModule {
}
DashboardModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ResizeModule,
                    DragModule
                ],
                exports: DECLARATIONS,
                declarations: DECLARATIONS,
                providers: [DashboardService],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ SPIN_BUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SpinButtonComponent),
    multi: true
};
class SpinButtonComponent {
    constructor() {
        this.type = 'text';
        this.placeholder = '';
        this.disabled = false;
        this.spinners = true;
        this.readOnly = true;
        this.scrolling = true;
        this.arrowkeys = true;
        this.valueChange = new EventEmitter();
        this.increment = new EventEmitter();
        this.decrement = new EventEmitter();
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        this.onChangeCallback(value);
        this.onTouchedCallback();
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    scroll(event) {
        if (!this.scrolling) {
            return;
        }
        if (event.deltaY > 0) {
            this.triggerDecrement();
        }
        else {
            this.triggerIncrement();
        }
        event.preventDefault();
    }
    /**
     * @return {?}
     */
    triggerIncrement() {
        if (!this.disabled) {
            this.increment.emit();
        }
    }
    /**
     * @return {?}
     */
    triggerDecrement() {
        if (!this.disabled) {
            this.decrement.emit();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
SpinButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-spin-button',
                template: "<button class=\"spin-button\"\n        *ngIf=\"spinners\"\n        tabindex=\"-1\"\n        [disabled]=\"disabled\"\n        [attr.aria-label]=\"incrementAriaLabel\"\n        [attr.aria-disabled]=\"disabled\"\n        (click)=\"triggerIncrement()\">\n\n  <span class=\"hpe-icon hpe-up\"></span>\n</button>\n\n<input [type]=\"type\"\n       role=\"spinbutton\"\n       [min]=\"min\"\n       [max]=\"max\"\n       [tabindex]=\"0\"\n       class=\"form-control\"\n       [placeholder]=\"placeholder\"\n       [readOnly]=\"readOnly\"\n       [disabled]=\"disabled\"\n       [attr.aria-label]=\"inputAriaLabel\"\n       [attr.aria-disabled]=\"disabled\"\n       [attr.aria-valuemin]=\"min\"\n       [attr.aria-valuenow]=\"value\"\n       [attr.aria-valuemax]=\"max\"\n       [attr.aria-readonly]=\"readOnly\"\n       [ngModel]=\"value\"\n       (ngModelChange)=\"valueChange.emit($event)\"\n       (wheel)=\"scroll($event)\"\n       (keydown.arrowup)=\"arrowkeys ? triggerIncrement() : null; $event.preventDefault()\"\n       (keydown.arrowdown)=\"arrowkeys ? triggerDecrement() : null; $event.preventDefault()\">\n\n<button class=\"spin-button\"\n        *ngIf=\"spinners\"\n        tabindex=\"-1\"\n        [disabled]=\"disabled\"\n        [attr.aria-label]=\"decrementAriaLabel\"\n        [attr.aria-disabled]=\"disabled\"\n        (click)=\"triggerDecrement()\">\n\n  <span class=\"hpe-icon hpe-down\"></span>\n</button>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [SPIN_BUTTON_VALUE_ACCESSOR]
            }] }
];
SpinButtonComponent.propDecorators = {
    value: [{ type: Input }],
    type: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    placeholder: [{ type: Input }],
    disabled: [{ type: Input }],
    spinners: [{ type: Input }],
    readOnly: [{ type: Input }],
    scrolling: [{ type: Input }],
    arrowkeys: [{ type: Input }],
    incrementAriaLabel: [{ type: Input }],
    inputAriaLabel: [{ type: Input }],
    decrementAriaLabel: [{ type: Input }],
    valueChange: [{ type: Output }],
    increment: [{ type: Output }],
    decrement: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SpinButtonModule {
}
SpinButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                exports: [SpinButtonComponent],
                declarations: [SpinButtonComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TimeFormatPipe {
    /**
     * @param {?} value
     * @param {?} pad
     * @return {?}
     */
    transform(value, pad) {
        return value < 10 && pad ? '0' + value : value;
    }
}
TimeFormatPipe.decorators = [
    { type: Pipe, args: [{
                name: 'timeFormat'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ TIME_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimePickerComponent),
    multi: true
};
class TimePickerComponent {
    constructor() {
        this.arrowkeys = true;
        this.mousewheel = true;
        this.disabled = false;
        this.readOnly = false;
        this.showMeridian = false;
        this.showHours = true;
        this.showMinutes = true;
        this.showSeconds = false;
        this.showSpinners = true;
        this.hourStep = 1;
        this.minuteStep = 1;
        this.secondStep = 1;
        this.meridians = ['AM', 'PM'];
        this.valueChange = new EventEmitter();
        this.isValid = new EventEmitter();
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
        this.value$ = new BehaviorSubject(new Date());
        // create observables that are derived from the latest value
        this.hour$ = this.value$.pipe(map(date => date.getHours()), map(hour => this.showMeridian ? this.getMeridianTime(hour) : hour));
        this.minute$ = this.value$.pipe(map(date => date.getMinutes()));
        this.second$ = this.value$.pipe(map(date => date.getSeconds()));
        this.meridian$ = this.value$.pipe(map(date => date.getHours() < 12 ? this.meridians[0] : this.meridians[1]));
        this.valid$ = this.value$.pipe(map(date => this.checkValidity(date)));
        this._meridian = this.meridians[0];
        this._subscription = this.valid$.pipe(distinctUntilChanged()).subscribe(valid => this.isValid.emit(valid));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this.value$.next(new Date(value));
        this.valueChange.emit(this.value$.value);
        this.onChangeCallback(this.value$.value);
        this.onTouchedCallback();
    }
    /**
     * @return {?}
     */
    get value() {
        return new Date(this.value$.value);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    getMeridianTime(hour) {
        return hour > 12 ? hour - 12 : hour;
    }
    /**
     * @param {?} hour
     * @return {?}
     */
    setHour(hour) {
        const /** @type {?} */ date = this.value;
        date.setHours(hour ? hour : 0);
        this.value = date;
    }
    /**
     * @param {?} minute
     * @return {?}
     */
    setMinute(minute) {
        const /** @type {?} */ date = this.value;
        date.setMinutes(minute ? minute : 0);
        this.value = date;
    }
    /**
     * @param {?} seconds
     * @return {?}
     */
    setSeconds(seconds) {
        const /** @type {?} */ date = this.value;
        date.setSeconds(seconds ? seconds : 0);
        this.value = date;
    }
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    incrementHour(arrowkey = false) {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setHour(this.value.getHours() + this.hourStep);
    }
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    decrementHour(arrowkey = false) {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setHour(this.value.getHours() - this.hourStep);
    }
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    incrementMinute(arrowkey = false) {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setMinute(this.value.getMinutes() + this.minuteStep);
    }
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    decrementMinute(arrowkey = false) {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setMinute(this.value.getMinutes() - this.minuteStep);
    }
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    incrementSecond(arrowkey = false) {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setSeconds(this.value.getSeconds() + this.secondStep);
    }
    /**
     * @param {?=} arrowkey
     * @return {?}
     */
    decrementSecond(arrowkey = false) {
        if (this.disabled || arrowkey && !this.arrowkeys) {
            return;
        }
        this.setSeconds(this.value.getSeconds() - this.secondStep);
    }
    /**
     * @param {?} meridian
     * @return {?}
     */
    selectMeridian(meridian) {
        this._meridian = meridian;
        // get the current time
        const /** @type {?} */ hour = this.value.getHours();
        // if we have selected AM
        if (meridian === this.meridians[0]) {
            if (hour >= 12) {
                this.setHour(hour - 12);
            }
        }
        // if we have selected PM
        if (meridian === this.meridians[1]) {
            if (hour < 12) {
                this.setHour(hour + 12);
            }
        }
    }
    /**
     * @param {?} date
     * @return {?}
     */
    checkValidity(date) {
        let /** @type {?} */ valid = true;
        if (this.min && date.getTime() <= this.min.getTime()) {
            valid = false;
        }
        if (this.max && date.getTime() >= this.max.getTime()) {
            valid = false;
        }
        return valid;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    hourChange(value) {
        // convert the string to a number
        let /** @type {?} */ hour = parseInt(value);
        let /** @type {?} */ currentHour = this.value.getHours();
        // if the value hasn't changed, do nothing
        if (hour === currentHour) {
            return;
        }
        // ensure the hours is valid
        if (!isNaN(hour)) {
            if (hour < 0) {
                hour = 0;
            }
            if (hour > (this.showMeridian ? 12 : 23)) {
                hour = this.showMeridian ? 12 : 23;
            }
        }
        hour = isNaN(hour) ? currentHour : hour;
        // if the number is invalid then restore it to the previous value
        if (this._meridian === this.meridians[0]) {
            if (hour >= 12) {
                hour -= 12;
            }
        }
        // if we have selected PM
        if (this._meridian === this.meridians[1]) {
            if (hour < 12) {
                hour += 12;
            }
        }
        this.setHour(hour);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    minuteChange(value) {
        // convert the string to a number
        let /** @type {?} */ minute = parseInt(value);
        let /** @type {?} */ currentMinute = this.value.getMinutes();
        // if the value hasn't changed, do nothing
        if (minute === currentMinute) {
            return;
        }
        // ensure the hours is valid
        if (!isNaN(minute)) {
            if (minute < 0) {
                minute = 59;
            }
            if (minute > 59) {
                minute = 0;
            }
        }
        // if the number is invalid then restore it to the previous value
        this.setMinute(isNaN(minute) ? currentMinute : minute);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    secondChange(value) {
        // convert the string to a number
        let /** @type {?} */ second = parseInt(value);
        let /** @type {?} */ currentSecond = this.value.getSeconds();
        // if the value hasn't changed, do nothing
        if (second === currentSecond) {
            return;
        }
        // ensure the hours is valid
        if (!isNaN(second)) {
            if (second < 0) {
                second = 0;
            }
            if (second > 59) {
                second = 59;
            }
        }
        // if the number is invalid then restore it to the previous value
        this.setSeconds(isNaN(second) ? currentSecond : second);
    }
}
TimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-time-picker',
                template: "<div class=\"time-picker\" aria-label=\"Time picker\">\n\n    <div class=\"time-picker-column\" [class.has-error]=\"!(valid$ | async)\" *ngIf=\"showHours\">\n\n        <ux-spin-button\n            type=\"text\"\n            class=\"time-spinner\"\n            placeholder=\"HH\"\n            [min]=\"0\"\n            [max]=\"showMeridian ? 12 : 23\"\n            [value]=\"hour$ | async | timeFormat:!showMeridian\"\n            (valueChange)=\"hourChange($event)\"\n            [spinners]=\"showSpinners\"\n            [disabled]=\"disabled\"\n            [readOnly]=\"readOnly\"\n            inputAriaLabel=\"hour\"\n            incrementAriaLabel=\"Increment the hour\"\n            decrementAriaLabel=\"Decrement the hour\"\n            (increment)=\"incrementHour()\"\n            (decrement)=\"decrementHour()\">\n        </ux-spin-button>\n\n    </div>\n\n    <div class=\"time-picker-separator\" *ngIf=\"showMinutes\">:</div>\n\n    <div class=\"time-picker-column\" [class.has-error]=\"!(valid$ | async)\" *ngIf=\"showMinutes\">\n\n        <ux-spin-button\n            type=\"text\"\n            class=\"time-spinner\"\n            placeholder=\"MM\"\n            [min]=\"0\"\n            [max]=\"59\"\n            [value]=\"minute$ | async | timeFormat:true\"\n            (valueChange)=\"minuteChange($event)\"\n            [spinners]=\"showSpinners\"\n            [disabled]=\"disabled\"\n            [readOnly]=\"readOnly\"\n            inputAriaLabel=\"minute\"\n            incrementAriaLabel=\"Increment the minute\"\n            decrementAriaLabel=\"Decrement the minute\"\n            (increment)=\"incrementMinute()\"\n            (decrement)=\"decrementMinute()\">\n        </ux-spin-button>\n\n    </div>\n\n    <div class=\"time-picker-separator\" *ngIf=\"showSeconds\">:</div>\n\n    <div class=\"time-picker-column\" [class.has-error]=\"!(valid$ | async)\" *ngIf=\"showSeconds\">\n\n        <ux-spin-button\n            type=\"text\"\n            class=\"time-spinner\"\n            placeholder=\"SS\"\n            [min]=\"0\"\n            [max]=\"59\"\n            [value]=\"second$ | async | timeFormat:true\"\n            (valueChange)=\"secondChange($event)\"\n            [spinners]=\"showSpinners\"\n            [disabled]=\"disabled\"\n            [readOnly]=\"readOnly\"\n            inputAriaLabel=\"seconds\"\n            incrementAriaLabel=\"Increment the second\"\n            decrementAriaLabel=\"Decrement the second\"\n            (increment)=\"incrementSecond()\"\n            (decrement)=\"decrementSecond()\">\n        </ux-spin-button>\n\n    </div>\n</div>\n\n<div class=\"time-picker-meridian\" *ngIf=\"showMeridian\">\n\n    <div class=\"btn-group\" role=\"radiogroup\">\n\n        <button class=\"btn button-toggle-accent\"\n                *ngFor=\"let meridian of meridians\"\n                role=\"radio\"\n                tabindex=\"0\"\n                [disabled]=\"disabled\"\n                (click)=\"selectMeridian(meridian)\"\n                [class.active]=\"meridian === (meridian$ | async)\"\n                [attr.aria-label]=\"meridian\"\n                [attr.aria-checked]=\"meridian === (meridian$ | async)\"\n                [attr.aria-disabled]=\"disabled\">\n                {{ meridian }}\n        </button>\n\n    </div>\n</div>",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [TIME_PICKER_VALUE_ACCESSOR],
                host: {
                    'aria-label': 'Time Picker'
                }
            }] }
];
/** @nocollapse */
TimePickerComponent.ctorParameters = () => [];
TimePickerComponent.propDecorators = {
    arrowkeys: [{ type: Input }],
    mousewheel: [{ type: Input }],
    disabled: [{ type: Input }],
    readOnly: [{ type: Input }],
    showMeridian: [{ type: Input }],
    showHours: [{ type: Input }],
    showMinutes: [{ type: Input }],
    showSeconds: [{ type: Input }],
    showSpinners: [{ type: Input }],
    hourStep: [{ type: Input }],
    minuteStep: [{ type: Input }],
    secondStep: [{ type: Input }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    meridians: [{ type: Input }],
    value: [{ type: Input }],
    valueChange: [{ type: Output }],
    isValid: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TimePickerModule {
}
TimePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    SpinButtonModule
                ],
                exports: [TimePickerComponent],
                declarations: [TimePickerComponent, TimeFormatPipe],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Convert a single dimension array to a double dimension array
 * @template T
 * @param {?} items the single dimension array to convert
 * @param {?} columns the number of items each array should have
 * @return {?}
 */
function gridify(items, columns) {
    // create a copy of array so not to effect the original
    items = items.slice(0);
    const /** @type {?} */ grid = [];
    while (items.length) {
        grid.push(items.splice(0, columns));
    }
    return grid;
}
/**
 * Create an array of numbers between two limits
 * @param {?} start the lower limit
 * @param {?} end the upper limit
 * @return {?}
 */
function range(start, end) {
    const /** @type {?} */ list = [];
    for (let /** @type {?} */ idx = start; idx <= end; idx++) {
        list.push(idx);
    }
    return list;
}
/**
 * Create an array of dates between two points
 * @param {?} start the date to start the array
 * @param {?} end the date to end the array
 * @return {?}
 */
function dateRange(start, end) {
    let /** @type {?} */ dates = [];
    // loop through all the days between the date range
    while (start <= end) {
        // add the date to the array
        dates.push(new Date(start));
        // move to the next day
        start.setDate(start.getDate() + 1);
    }
    return dates;
}
/**
 * Compare two dates to see if they are on the same day
 * @param {?} day1 the first date to compare
 * @param {?} day2 the second date to compare
 * @return {?}
 */
function compareDays(day1, day2) {
    return day1.getDate() === day2.getDate() &&
        day1.getMonth() === day2.getMonth() &&
        day1.getFullYear() === day2.getFullYear();
}
/**
 * Date comparison for use primarily with distinctUntilChanged
 * @param {?} dateOne
 * @param {?} dateTwo
 * @return {?}
 */
function dateComparator(dateOne, dateTwo) {
    return dateOne.getTime() === dateTwo.getTime();
}
/**
 * Timezone comparison for use primarily with distinctUntilChanged
 * @param {?} zoneOne
 * @param {?} zoneTwo
 * @return {?}
 */
function timezoneComparator(zoneOne, zoneTwo) {
    return zoneOne.name === zoneTwo.name && zoneOne.offset === zoneTwo.offset;
}
/**
 * Export an array of all the available months
 */
const /** @type {?} */ months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const /** @type {?} */ monthsShort = months.map(month => month.substring(0, 3));
/**
 * Export an array of all the available days of the week
 */
const /** @type {?} */ weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const /** @type {?} */ weekdaysShort = weekdays.map(weekday => weekday.substring(0, 3));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DateTimePickerConfig {
    constructor() {
        this.showDate = true;
        this.showTime = true;
        this.showTimezone = true;
        this.showSeconds = false;
        this.showMeridian = true;
        this.showSpinners = true;
        this.weekdays = weekdaysShort;
        this.nowBtnText = 'Today';
        this.timezones = [
            { name: 'GMT-11', offset: 660 },
            { name: 'GMT-10', offset: 600 },
            { name: 'GMT-9', offset: 540 },
            { name: 'GMT-8', offset: 480 },
            { name: 'GMT-7', offset: 420 },
            { name: 'GMT-6', offset: 360 },
            { name: 'GMT-5', offset: 300 },
            { name: 'GMT-4', offset: 240 },
            { name: 'GMT-3', offset: 180 },
            { name: 'GMT-2', offset: 120 },
            { name: 'GMT-1', offset: 60 },
            { name: 'GMT', offset: 0 },
            { name: 'GMT+1', offset: -60 },
            { name: 'GMT+2', offset: -120 },
            { name: 'GMT+3', offset: -180 },
            { name: 'GMT+4', offset: -240 },
            { name: 'GMT+5', offset: -300 },
            { name: 'GMT+6', offset: -360 },
            { name: 'GMT+7', offset: -420 },
            { name: 'GMT+8', offset: -480 },
            { name: 'GMT+9', offset: -540 },
            { name: 'GMT+10', offset: -600 },
            { name: 'GMT+11', offset: -660 },
            { name: 'GMT+12', offset: -720 }
        ];
    }
}
DateTimePickerConfig.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DateTimePickerService {
    /**
     * @param {?} _config
     */
    constructor(_config) {
        this._config = _config;
        this.mode$ = new BehaviorSubject(DatePickerMode.Day);
        this.date$ = new BehaviorSubject(new Date());
        this.timezone$ = new BehaviorSubject(this.getCurrentTimezone());
        this.selected$ = new BehaviorSubject(new Date());
        // the month and year to display in the viewport
        this.month$ = new BehaviorSubject(new Date().getMonth());
        this.year$ = new BehaviorSubject(new Date().getFullYear());
        this.showDate$ = new BehaviorSubject(this._config.showDate);
        this.showTime$ = new BehaviorSubject(this._config.showTime);
        this.showTimezone$ = new BehaviorSubject(this._config.showTimezone);
        this.showSeconds$ = new BehaviorSubject(this._config.showSeconds);
        this.showMeridian$ = new BehaviorSubject(this._config.showMeridian);
        this.showSpinners$ = new BehaviorSubject(this._config.showSpinners);
        this.weekdays$ = new BehaviorSubject(this._config.weekdays);
        this.nowBtnText$ = new BehaviorSubject(this._config.nowBtnText);
        this.timezones$ = new BehaviorSubject(this._config.timezones);
        this.header$ = new BehaviorSubject(null);
        this.headerEvent$ = new Subject();
        this.modeDirection = ModeDirection.None;
        // when the active date changes set the currently selected date
        this._subscription = this.selected$.pipe(distinctUntilChanged(dateComparator)).subscribe(date => {
            // the month and year displayed in the viewport should reflect the newly selected items
            this.setViewportMonth(date.getMonth());
            this.setViewportYear(date.getFullYear());
            // emit the new date to the component host
            this.date$.next(date);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} month
     * @return {?}
     */
    setViewportMonth(month) {
        if (month < 0) {
            this.month$.next(11);
            this.year$.next(this.year$.value - 1);
        }
        else if (month > 11) {
            this.month$.next(0);
            this.year$.next(this.year$.value + 1);
        }
        else {
            this.month$.next(month);
        }
    }
    /**
     * @param {?} year
     * @return {?}
     */
    setViewportYear(year) {
        this.year$.next(year);
    }
    /**
     * @param {?} day
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    setDate(day, month, year) {
        const /** @type {?} */ date = new Date(this.selected$.value);
        date.setDate(day);
        date.setMonth(month);
        date.setFullYear(year);
        this.selected$.next(date);
    }
    /**
     * @return {?}
     */
    setDateToNow() {
        this.selected$.next(new Date());
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    setViewportMode(mode) {
        this.mode$.next(mode);
    }
    /**
     * @return {?}
     */
    goToChildMode() {
        this.modeDirection = ModeDirection.Descend;
        switch (this.mode$.value) {
            case DatePickerMode.Year:
                return this.setViewportMode(DatePickerMode.Month);
            case DatePickerMode.Month:
                return this.setViewportMode(DatePickerMode.Day);
        }
    }
    /**
     * @return {?}
     */
    goToParentMode() {
        this.modeDirection = ModeDirection.Ascend;
        switch (this.mode$.value) {
            case DatePickerMode.Day:
                return this.setViewportMode(DatePickerMode.Month);
            case DatePickerMode.Month:
                return this.setViewportMode(DatePickerMode.Year);
        }
    }
    /**
     * @return {?}
     */
    goToNext() {
        this.headerEvent$.next(DatePickerHeaderEvent.Next);
    }
    /**
     * @return {?}
     */
    goToPrevious() {
        this.headerEvent$.next(DatePickerHeaderEvent.Previous);
    }
    /**
     * @param {?} header
     * @return {?}
     */
    setHeader(header) {
        this.header$.next(header);
    }
    /**
     * @return {?}
     */
    getCurrentTimezone() {
        const /** @type {?} */ offset = new Date().getTimezoneOffset();
        return this._config.timezones.find(timezone => timezone.offset === offset);
    }
    /**
     * @param {?} timezone
     * @return {?}
     */
    setTimezone(timezone) {
        this.timezone$.next(timezone);
    }
}
DateTimePickerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DateTimePickerService.ctorParameters = () => [
    { type: DateTimePickerConfig }
];
/** @enum {number} */
const DatePickerMode = {
    Day: 0,
    Month: 1,
    Year: 2,
};
DatePickerMode[DatePickerMode.Day] = "Day";
DatePickerMode[DatePickerMode.Month] = "Month";
DatePickerMode[DatePickerMode.Year] = "Year";
/** @enum {number} */
const ModeDirection = {
    None: 0,
    Ascend: 1,
    Descend: 2,
};
ModeDirection[ModeDirection.None] = "None";
ModeDirection[ModeDirection.Ascend] = "Ascend";
ModeDirection[ModeDirection.Descend] = "Descend";
/** @enum {number} */
const DatePickerHeaderEvent = {
    Previous: 0,
    Next: 1,
};
DatePickerHeaderEvent[DatePickerHeaderEvent.Previous] = "Previous";
DatePickerHeaderEvent[DatePickerHeaderEvent.Next] = "Next";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DateTimePickerComponent {
    /**
     * @param {?} datepicker
     */
    constructor(datepicker) {
        this.datepicker = datepicker;
        this.dateChange = new EventEmitter();
        this.timezoneChange = new EventEmitter();
        // expose enum to view
        this.DatePickerMode = DatePickerMode;
        this._subscription = new Subscription();
        const /** @type {?} */ valueChange = datepicker.selected$.pipe(distinctUntilChanged(dateComparator))
            .subscribe(date => this.dateChange.emit(date));
        const /** @type {?} */ timezoneChange = datepicker.timezone$.pipe(distinctUntilChanged(timezoneComparator))
            .subscribe((timezone) => this.timezoneChange.emit(timezone));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showDate(value) {
        this.datepicker.showDate$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showTime(value) {
        this.datepicker.showTime$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showTimezone(value) {
        this.datepicker.showTimezone$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showSeconds(value) {
        this.datepicker.showSeconds$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showMeridian(value) {
        this.datepicker.showMeridian$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set showSpinners(value) {
        this.datepicker.showSpinners$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set weekdays(value) {
        this.datepicker.weekdays$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set nowBtnText(value) {
        this.datepicker.nowBtnText$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set timezones(value) {
        this.datepicker.timezones$.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set date(value) {
        if (!dateComparator(value, this.datepicker.selected$.value)) {
            this.datepicker.selected$.next(new Date(value));
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set timezone(value) {
        this.datepicker.timezone$.next(value);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * Change the date to the current date and time
     * @return {?}
     */
    setToNow() {
        // set the date to the current moment
        this.datepicker.setDateToNow();
    }
}
DateTimePickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-date-time-picker',
                template: "<div class=\"calendar-container\">\n\n  <ux-date-time-picker-header></ux-date-time-picker-header>\n\n  <ng-container *ngIf=\"datepicker.showDate$ | async\" [ngSwitch]=\"datepicker.mode$ | async\">\n\n      <!-- Display days in the current month -->\n      <ux-date-time-picker-day-view *ngSwitchCase=\"DatePickerMode.Day\"></ux-date-time-picker-day-view>\n\n      <!-- Display the months in the current year -->\n      <ux-date-time-picker-month-view *ngSwitchCase=\"DatePickerMode.Month\"></ux-date-time-picker-month-view>\n\n      <!-- Display a decade -->\n      <ux-date-time-picker-year-view *ngSwitchCase=\"DatePickerMode.Year\"></ux-date-time-picker-year-view>\n\n  </ng-container>\n\n  <!-- Display a Time Picker -->\n  <ux-date-time-picker-time-view *ngIf=\"datepicker.showTime$ | async\"></ux-date-time-picker-time-view>\n\n</div>\n\n<button class=\"now-button\" aria-label=\"Set date to now\" (click)=\"setToNow()\">{{ datepicker.nowBtnText$ | async }}</button>",
                providers: [DateTimePickerService],
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
DateTimePickerComponent.ctorParameters = () => [
    { type: DateTimePickerService }
];
DateTimePickerComponent.propDecorators = {
    showDate: [{ type: Input }],
    showTime: [{ type: Input }],
    showTimezone: [{ type: Input }],
    showSeconds: [{ type: Input }],
    showMeridian: [{ type: Input }],
    showSpinners: [{ type: Input }],
    weekdays: [{ type: Input }],
    nowBtnText: [{ type: Input }],
    timezones: [{ type: Input }],
    dateChange: [{ type: Output }],
    timezoneChange: [{ type: Output }],
    date: [{ type: Input }],
    timezone: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DayViewService {
    /**
     * @param {?} _datepicker
     */
    constructor(_datepicker) {
        this._datepicker = _datepicker;
        this.grid$ = new BehaviorSubject([[]]);
        this.focused$ = new BehaviorSubject(null);
        this._subscription = combineLatest(_datepicker.month$, _datepicker.year$)
            .subscribe(([month, year]) => this.createDayGrid(month, year));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} day
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    setFocus(day, month, year) {
        this.focused$.next({ day: day, month: month, year: year });
        // update the date picker to show the required month and year
        this._datepicker.setViewportMonth(month);
        this._datepicker.setViewportYear(year);
    }
    /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    createDayGrid(month, year) {
        // update the header
        this._datepicker.setHeader(months[month] + ' ' + year);
        // find the lower and upper boundaries
        const /** @type {?} */ start = new Date(year, month, 1);
        const /** @type {?} */ end = new Date(year, month + 1, 0);
        // we always want to show from the sunday - this may include showing some dates from the previous month
        start.setDate(start.getDate() - start.getDay());
        // we also want to make sure that the range ends on a saturday
        end.setDate(end.getDate() + (6 - end.getDay()));
        // create an array of all the days to display
        const /** @type {?} */ dates = dateRange(start, end).map(date => ({
            day: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            date: date,
            isToday: this.isToday(date),
            isActive: this.isActive(date),
            isCurrentMonth: date.getMonth() === month
        }));
        // turn the dates into a grid
        const /** @type {?} */ items = gridify(dates, 7);
        this.grid$.next(items);
        // if no item has yet been focused then focus the first day of the month
        if ((this._datepicker.modeDirection === ModeDirection.None || this._datepicker.modeDirection === ModeDirection.Descend) && this.focused$.value === null) {
            // check if the selected item is visible
            const /** @type {?} */ selectedDay = dates.find(day => day.isCurrentMonth && day.isActive);
            if (selectedDay) {
                this.setFocus(selectedDay.day, selectedDay.month, selectedDay.year);
            }
            else {
                // find the first day of the month
                const /** @type {?} */ first$$1 = dates.find(date => date.day === 1);
                // focus the date
                this.setFocus(first$$1.day, first$$1.month, first$$1.year);
            }
        }
    }
    /**
     * Determine whether or not a specific date is today
     * @param {?} date The date to check
     * @return {?}
     */
    isToday(date) {
        return compareDays(new Date(), date);
    }
    /**
     * Determines whether or not a specific date is the selected one
     * @param {?} date the date to check
     * @return {?}
     */
    isActive(date) {
        return compareDays(this._datepicker.selected$.value, date);
    }
}
DayViewService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DayViewService.ctorParameters = () => [
    { type: DateTimePickerService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DayViewComponent {
    /**
     * @param {?} datePicker
     * @param {?} dayService
     */
    constructor(datePicker, dayService) {
        this.datePicker = datePicker;
        this.dayService = dayService;
        this._subscription = datePicker.headerEvent$
            .subscribe(event => event === DatePickerHeaderEvent.Next ? this.next() : this.previous());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * Navigate to the previous page of dates
     * @return {?}
     */
    previous() {
        this.datePicker.setViewportMonth(this.datePicker.month$.value - 1);
    }
    /**
     * Navigate to the next page of dates
     * @return {?}
     */
    next() {
        this.datePicker.setViewportMonth(this.datePicker.month$.value + 1);
    }
    /**
     * Select a particular date
     * @param {?} date the date to select
     * @return {?}
     */
    select(date) {
        // update the current date object
        this.datePicker.setDate(date.getDate(), date.getMonth(), date.getFullYear());
        // focus the newly selected date
        this.dayService.setFocus(date.getDate(), date.getMonth(), date.getFullYear());
    }
    /**
     * @param {?} index
     * @return {?}
     */
    trackWeekByFn(index) {
        return index;
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackDayByFn(index, item) {
        return `${item.day} ${item.month} ${item.year}`;
    }
    /**
     * @param {?} item
     * @param {?} dayOffset
     * @return {?}
     */
    focusDate(item, dayOffset) {
        // determine the date of the day
        const /** @type {?} */ target = new Date(item.date.setDate(item.date.getDate() + dayOffset));
        // identify which date should be focused
        this.dayService.setFocus(target.getDate(), target.getMonth(), target.getFullYear());
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getTabbable(item) {
        const /** @type {?} */ focused = this.dayService.focused$.value;
        const /** @type {?} */ grid = this.dayService.grid$.value;
        // if there is a focused month check if this is it
        if (focused) {
            // check if the focused day is visible
            const /** @type {?} */ isFocusedDayVisible = !!grid.find(row => !!row.find(_item => _item.day === focused.day && _item.month === focused.month && _item.year === focused.year));
            if (isFocusedDayVisible) {
                return focused.day === item.day && focused.month === item.month && focused.year === item.year;
            }
        }
        // if there is no focusable day then check if there is a selected day
        const /** @type {?} */ isSelectedDayVisible = !!grid.find(row => !!row.find(day => day.isActive));
        if (isSelectedDayVisible) {
            return item.isActive;
        }
        // otherwise make the first day tabbable
        return item.day === 1;
    }
}
DayViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-date-time-picker-day-view',
                template: "<table class=\"calendar\">\n    <thead>\n        <tr>\n            <th *ngFor=\"let day of datePicker.weekdays$ | async\" class=\"weekday\" [attr.aria-label]=\"day\">{{ day }}</th>\n        </tr>\n    </thead>\n\n    <tbody role=\"grid\">\n        <tr role=\"row\" *ngFor=\"let row of dayService.grid$ | async; trackBy: trackWeekByFn\">\n\n            <td *ngFor=\"let item of row; trackBy: trackDayByFn\" class=\"date-cell\" role=\"gridcell\">\n\n                <button class=\"date-button\"\n                        [focusIf]=\"(dayService.focused$ | async)?.day === item.day && (dayService.focused$ | async)?.month === item.month && (dayService.focused$ | async)?.year === item.year\"\n                        [attr.aria-label]=\"item.date | date\"\n                        [attr.aria-selected]=\"item.isActive\"\n                        [attr.aria-hidden]=\"!item.isCurrentMonth\"\n                        [class.current]=\"item.isToday\"\n                        [class.active]=\"item.isActive\"\n                        [class.preview]=\"!item.isCurrentMonth\"\n                        [tabindex]=\"getTabbable(item) ? 0 : -1\"\n                        (click)=\"select(item.date); $event.stopPropagation()\"\n                        (keydown.ArrowLeft)=\"focusDate(item, -1); $event.preventDefault()\"\n                        (keydown.ArrowRight)=\"focusDate(item, 1); $event.preventDefault()\"\n                        (keydown.ArrowUp)=\"focusDate(item, -7); $event.preventDefault()\"\n                        (keydown.ArrowDown)=\"focusDate(item, 7); $event.preventDefault()\">\n\n                    {{ item.date.getDate() }}\n                </button>\n\n            </td>\n        </tr>\n    </tbody>\n</table>",
                providers: [DayViewService],
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
DayViewComponent.ctorParameters = () => [
    { type: DateTimePickerService },
    { type: DayViewService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HeaderComponent {
    /**
     * @param {?} datepicker
     */
    constructor(datepicker) {
        this.datepicker = datepicker;
        this.canAscend$ = this.datepicker.mode$.pipe(map(mode => mode !== DatePickerMode.Year));
        this.mode$ = this.datepicker.mode$.pipe(map(mode => {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Day';
                case DatePickerMode.Month:
                    return 'Month';
                case DatePickerMode.Year:
                    return 'Year';
            }
        }));
        this.headerAria$ = this.datepicker.mode$.pipe(map(mode => {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Switch to show months in the year';
                case DatePickerMode.Month:
                    return 'Switch to show years in the decade';
                case DatePickerMode.Year:
                    return '';
            }
        }));
        this.previousAria$ = this.datepicker.mode$.pipe(map(mode => {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Previous month';
                case DatePickerMode.Month:
                    return 'Previous year';
                case DatePickerMode.Year:
                    return 'Previous decade';
            }
        }));
        this.nextAria$ = this.datepicker.mode$.pipe(map(mode => {
            switch (mode) {
                case DatePickerMode.Day:
                    return 'Next month';
                case DatePickerMode.Month:
                    return 'Next year';
                case DatePickerMode.Year:
                    return 'Next decade';
            }
        }));
    }
    /**
     * @return {?}
     */
    previous() {
        this.datepicker.goToPrevious();
    }
    /**
     * @return {?}
     */
    ascend() {
        this.datepicker.goToParentMode();
    }
    /**
     * @return {?}
     */
    next() {
        this.datepicker.goToNext();
    }
}
HeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-date-time-picker-header',
                template: "<header class=\"header\">\n\n  <button class=\"header-navigation\"\n          (click)=\"previous(); $event.stopPropagation()\"\n          [attr.aria-label]=\"previousAria$ | async\"\n          tabindex=\"0\">\n\n    <i class=\"hpe-icon hpe-previous\"></i>\n  </button>\n\n  <button class=\"header-title\"\n          [attr.aria-label]=\"headerAria$ | async\"\n          [class.active]=\"canAscend$ | async\"\n          (click)=\"ascend(); $event.stopPropagation()\"\n          [tabindex]=\"(canAscend$ | async) ? 0 : -1\">\n       {{ datepicker.header$ | async }}\n  </button>\n\n  <button class=\"header-navigation\"\n          (click)=\"next(); $event.stopPropagation()\"\n          [attr.aria-label]=\"nextAria$ | async\"\n          tabindex=\"0\">\n\n    <i class=\"hpe-icon hpe-next\"></i>\n  </button>\n</header>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
HeaderComponent.ctorParameters = () => [
    { type: DateTimePickerService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MonthViewService {
    /**
     * @param {?} _datepicker
     */
    constructor(_datepicker) {
        this._datepicker = _datepicker;
        this.grid$ = new BehaviorSubject([[]]);
        this.focused$ = new BehaviorSubject(null);
        this._subscription = _datepicker.year$.subscribe(year => this.createMonthGrid(year));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} month
     * @param {?} year
     * @return {?}
     */
    setFocus(month, year) {
        this.focused$.next({ month: month, year: year });
        // update the viewport to ensure focused month is visible
        this._datepicker.setViewportYear(year);
    }
    /**
     * @param {?} year
     * @return {?}
     */
    createMonthGrid(year) {
        // update the header
        this._datepicker.setHeader(year.toString());
        // get the current year and month
        const /** @type {?} */ currentMonth = new Date().getMonth();
        const /** @type {?} */ currentYear = new Date().getFullYear();
        // get the currently selected month
        const /** @type {?} */ activeMonth = this._datepicker.selected$.value.getMonth();
        const /** @type {?} */ activeYear = this._datepicker.selected$.value.getFullYear();
        // create a 4x3 grid of month numbers
        const /** @type {?} */ months$$1 = range(0, 11).map(month => {
            return {
                name: monthsShort[month],
                month: month,
                year: year,
                isCurrentMonth: year === currentYear && month === currentMonth,
                isActiveMonth: year === activeYear && month === activeMonth
            };
        });
        // map these to the appropriate format
        const /** @type {?} */ items = gridify(months$$1, 4);
        // update the grid
        this.grid$.next(items);
        // if there is no focused month select the first one
        if (this._datepicker.modeDirection === ModeDirection.Descend && this.focused$.value === null) {
            // check if the selected month is in view
            const /** @type {?} */ selectedMonth = months$$1.find(month => month.isActiveMonth);
            this.setFocus(selectedMonth ? selectedMonth.month : 0, year);
        }
    }
}
MonthViewService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MonthViewService.ctorParameters = () => [
    { type: DateTimePickerService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MonthViewComponent {
    /**
     * @param {?} _datePicker
     * @param {?} monthService
     */
    constructor(_datePicker, monthService) {
        this._datePicker = _datePicker;
        this.monthService = monthService;
        this._subscription = _datePicker.headerEvent$
            .subscribe(event => event === DatePickerHeaderEvent.Next ? this.next() : this.previous());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * Go to the previous year
     * @return {?}
     */
    previous() {
        this._datePicker.setViewportYear(this._datePicker.year$.value - 1);
    }
    /**
     * Go to the next year
     * @return {?}
     */
    next() {
        this._datePicker.setViewportYear(this._datePicker.year$.value + 1);
    }
    /**
     * Select a month in the calendar
     * @param {?} month the index of the month to select
     * @return {?}
     */
    select(month) {
        this._datePicker.setViewportMonth(month);
        // show the day picker
        this._datePicker.goToChildMode();
    }
    /**
     * @param {?} item
     * @param {?} monthOffset
     * @return {?}
     */
    focusMonth(item, monthOffset) {
        let /** @type {?} */ targetMonth = item.month + monthOffset;
        let /** @type {?} */ targetYear = item.year;
        if (targetMonth < 0) {
            targetMonth += 12;
            targetYear -= 1;
        }
        if (targetMonth >= 12) {
            targetMonth -= 12;
            targetYear += 1;
        }
        this.monthService.setFocus(targetMonth, targetYear);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    trackRowByFn(index) {
        return index;
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackMonthByFn(index, item) {
        return `${item.month} ${item.year}`;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getTabbable(item) {
        const /** @type {?} */ focused = this.monthService.focused$.value;
        const /** @type {?} */ grid = this.monthService.grid$.value;
        // if there is a focused month check if this is it
        if (focused) {
            // check if the focused month is visible
            const /** @type {?} */ isFocusedMonthVisible = !!grid.find(row => !!row.find(_item => _item.month === focused.month && _item.year === focused.year));
            if (isFocusedMonthVisible) {
                return focused.month === item.month && focused.year === item.year;
            }
        }
        // if there is no focusable month then check if there is a selected month
        const /** @type {?} */ isSelectedMonthVisible = !!grid.find(row => !!row.find(month => month.isActiveMonth));
        if (isSelectedMonthVisible) {
            return item.isActiveMonth;
        }
        // otherwise make the first month tabbable
        return item.month === 0;
    }
}
MonthViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-date-time-picker-month-view',
                template: "<div class=\"calendar\" role=\"grid\">\n  <div class=\"calendar-row\" *ngFor=\"let row of monthService.grid$ | async; trackBy: trackRowByFn\" role=\"row\">\n\n    <button role=\"gridcell\"\n         class=\"calendar-item\"\n         *ngFor=\"let item of row; trackBy: trackMonthByFn\"\n         [focusIf]=\"(monthService.focused$ | async)?.month === item.month && (monthService.focused$ | async)?.year === item.year\"\n         [tabindex]=\"getTabbable(item) ? 0 : -1\"\n         [attr.aria-label]=\"item.name + ' ' + item.year\"\n         [attr.aria-selected]=\"item.isActiveMonth\"\n         [class.active]=\"item.isActiveMonth\"\n         [class.current]=\"item.isCurrentMonth\"\n         (click)=\"select(item.month); $event.stopPropagation()\"\n         (keydown.ArrowLeft)=\"focusMonth(item, -1); $event.preventDefault()\"\n         (keydown.ArrowRight)=\"focusMonth(item, 1); $event.preventDefault()\"\n         (keydown.ArrowUp)=\"focusMonth(item, -4); $event.preventDefault()\"\n         (keydown.ArrowDown)=\"focusMonth(item, 4); $event.preventDefault()\">\n         {{ item.name }}\n    </button>\n  </div>\n</div>\n",
                providers: [MonthViewService],
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
MonthViewComponent.ctorParameters = () => [
    { type: DateTimePickerService },
    { type: MonthViewService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TimeViewComponent {
    /**
     * @param {?} datepicker
     */
    constructor(datepicker) {
        this.datepicker = datepicker;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    selectTimezone(name) {
        const /** @type {?} */ timezones = this.datepicker.timezones$.value;
        // find matching timezone
        const /** @type {?} */ timezone = timezones.find(_timezone => _timezone.name === name);
        if (timezone) {
            this.datepicker.setTimezone(timezone);
        }
    }
    /**
     * @return {?}
     */
    incrementTimezone() {
        const /** @type {?} */ timezone = this.datepicker.timezone$.value;
        const /** @type {?} */ timezones = this.datepicker.timezones$.value;
        const /** @type {?} */ currentZone = timezones.findIndex(zone => zone.name === timezone.name && zone.offset === timezone.offset);
        // try to get the previous zone
        this.datepicker.setTimezone(timezones[currentZone + 1] ? timezones[currentZone + 1] : timezones[currentZone]);
    }
    /**
     * @return {?}
     */
    decrementTimezone() {
        const /** @type {?} */ timezone = this.datepicker.timezone$.value;
        const /** @type {?} */ timezones = this.datepicker.timezones$.value;
        const /** @type {?} */ currentZone = timezones.findIndex(zone => zone.name === timezone.name && zone.offset === timezone.offset);
        // try to get the previous zone
        this.datepicker.setTimezone(timezones[currentZone - 1] ? timezones[currentZone - 1] : timezones[currentZone]);
    }
}
TimeViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-date-time-picker-time-view',
                template: "<ux-time-picker *ngIf=\"datepicker.showTime$ | async\"\n    [value]=\"datepicker.selected$ | async\"\n    (valueChange)=\"datepicker.selected$.next($event)\"\n    [showSeconds]=\"datepicker.showSeconds$ | async\"\n    [showMeridian]=\"datepicker.showMeridian$ | async\"\n    [showSpinners]=\"datepicker.showSpinners$ | async\">\n</ux-time-picker>\n\n<ng-container *ngIf=\"datepicker.showTimezone$ | async\">\n\n    <div class=\"time-zone-picker\" *ngIf=\"datepicker.showSpinners$ | async\">\n\n        <ux-spin-button\n            class=\"time-zone-spinner\"\n            [value]=\"(datepicker.timezone$ | async).name\"\n            [readOnly]=\"true\"\n            (increment)=\"incrementTimezone()\"\n            (decrement)=\"decrementTimezone()\"\n            inputAriaLabel=\"Time Zone\"\n            incrementAriaLabel=\"Switch to the next time zone\"\n            decrementAriaLabel=\"Switch to the previous time zone\">\n        </ux-spin-button>\n    </div>\n\n    <div class=\"time-zone-picker\" *ngIf=\"!(datepicker.showSpinners$ | async)\">\n\n        <select class=\"form-control time-zone-select\"\n                tabindex=\"0\"\n                [ngModel]=\"(datepicker.timezone$ | async).name\"\n                (ngModelChange)=\"selectTimezone($event)\"\n                aria-label=\"Timezone\"\n                [attr.aria-valuenow]=\"(datepicker.timezone$ | async).name\">\n\n            <option *ngFor=\"let zone of datepicker.timezones$ | async\"\n                    [selected]=\"zone.name === (datepicker.timezone$ | async).name\"\n                    [value]=\"zone.name\">\n                {{ zone?.name }}\n            </option>\n\n        </select>\n    </div>\n\n</ng-container>\n",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
TimeViewComponent.ctorParameters = () => [
    { type: DateTimePickerService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class YearViewService {
    /**
     * @param {?} _datepicker
     */
    constructor(_datepicker) {
        this._datepicker = _datepicker;
        this.grid$ = new BehaviorSubject([[]]);
        this.focused$ = new BehaviorSubject(null);
        this._year = new Date().getFullYear();
        this._subscription = new Subscription();
        const /** @type {?} */ year = _datepicker.year$.subscribe(_year => this.createYearGrid(_year));
        const /** @type {?} */ event = _datepicker.headerEvent$
            .subscribe(_event => _event === DatePickerHeaderEvent.Next ? this.goToNextDecade() : this.goToPreviousDecade());
        this._subscription.add(year);
        this._subscription.add(event);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} year
     * @return {?}
     */
    setFocus(year) {
        this.focused$.next(year);
        this.createYearGrid(year);
    }
    /**
     * @return {?}
     */
    goToPreviousDecade() {
        this.createYearGrid(this._year - 10);
    }
    /**
     * @return {?}
     */
    goToNextDecade() {
        this.createYearGrid(this._year + 10);
    }
    /**
     * @param {?=} year
     * @return {?}
     */
    createYearGrid(year = this._year) {
        this._year = year;
        // get the years to display
        const /** @type {?} */ decade = this.getDecade(year);
        const /** @type {?} */ currentYear = new Date().getFullYear();
        // produce items in the correct format
        const /** @type {?} */ items = decade.range.map(_year => {
            return {
                year: _year,
                isCurrentYear: _year === currentYear,
                isActiveYear: _year === this._datepicker.year$.value
            };
        });
        // update the header text
        this._datepicker.setHeader(decade.start + ' - ' + decade.end);
        // create the grid
        this.grid$.next(gridify(items, 4));
    }
    /**
     * Get the years in the current decade to display
     * @param {?} year
     * @return {?}
     */
    getDecade(year) {
        // figure the start and end points
        const /** @type {?} */ start = (year - (year % 10));
        const /** @type {?} */ end = start + 9;
        // create an array containing all the numbers between the start and end points
        return { start: start, end: end, range: range(start, end) };
    }
}
YearViewService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
YearViewService.ctorParameters = () => [
    { type: DateTimePickerService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class YearViewComponent {
    /**
     * @param {?} _datePicker
     * @param {?} yearService
     */
    constructor(_datePicker, yearService) {
        this._datePicker = _datePicker;
        this.yearService = yearService;
    }
    /**
     * @param {?} year
     * @return {?}
     */
    select(year) {
        this._datePicker.setViewportYear(year);
        // show the month picker
        this._datePicker.goToChildMode();
    }
    /**
     * @param {?} item
     * @param {?} yearOffset
     * @return {?}
     */
    focusYear(item, yearOffset) {
        this.yearService.setFocus(item.year + yearOffset);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    trackRowByFn(index) {
        return index;
    }
    /**
     * @param {?} index
     * @param {?} item
     * @return {?}
     */
    trackYearByFn(index, item) {
        return item.year;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getTabbable(item) {
        const /** @type {?} */ focused = this.yearService.focused$.value;
        const /** @type {?} */ grid = this.yearService.grid$.value;
        // if there is a focused year check if this is it
        if (focused) {
            // check if the focused year is visible
            const /** @type {?} */ isFocusedYearVisible = !!grid.find(row => !!row.find(_item => _item.year === focused));
            if (isFocusedYearVisible) {
                return focused === item.year;
            }
        }
        // if there is no focusable year then check if there is a selected year
        const /** @type {?} */ isSelectedYearVisible = !!grid.find(row => !!row.find(year => year.isActiveYear));
        if (isSelectedYearVisible) {
            return item.isActiveYear;
        }
        // otherwise make the first month tabbable
        return grid[0][0].year === item.year;
    }
}
YearViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-date-time-picker-year-view',
                template: "<div class=\"calendar\" role=\"grid\">\n  <div class=\"calendar-row\" role=\"row\" *ngFor=\"let row of yearService.grid$ | async; trackBy: trackRowByFn\">\n\n    <button *ngFor=\"let item of row; trackBy: trackYearByFn\"\n         role=\"gridcell\"\n         class=\"calendar-item\"\n         [focusIf]=\"(yearService.focused$ | async) === item.year\"\n         [attr.aria-label]=\"item.year\"\n         [attr.aria-selected]=\"item.isActiveYear\"\n         [class.current]=\"item.isCurrentYear\"\n         [class.active]=\"item.isActiveYear\"\n         (click)=\"select(item.year); $event.stopPropagation()\"\n         (keydown.ArrowLeft)=\"focusYear(item, -1); $event.preventDefault()\"\n         (keydown.ArrowRight)=\"focusYear(item, 1); $event.preventDefault()\"\n         (keydown.ArrowUp)=\"focusYear(item, -4); $event.preventDefault()\"\n         (keydown.ArrowDown)=\"focusYear(item, 4); $event.preventDefault()\"\n         [tabindex]=\"getTabbable(item) ? 0 : -1\">\n         {{ item.year }}\n    </button>\n  </div>\n</div>\n",
                providers: [YearViewService],
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
YearViewComponent.ctorParameters = () => [
    { type: DateTimePickerService },
    { type: YearViewService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FocusIfDirective {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.focusIfDelay = 0;
        this._timeout = null;
    }
    /**
     * @param {?} focus
     * @return {?}
     */
    set focusIf(focus) {
        // if a timeout is pending then cancel it
        if (!focus && this._timeout !== null) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        if (focus && this._timeout === null) {
            this._timeout = window.setTimeout(() => {
                this._elementRef.nativeElement.focus();
                this._timeout = null;
            }, this.focusIfDelay);
        }
    }
}
FocusIfDirective.decorators = [
    { type: Directive, args: [{
                selector: '[focusIf]'
            },] }
];
/** @nocollapse */
FocusIfDirective.ctorParameters = () => [
    { type: ElementRef }
];
FocusIfDirective.propDecorators = {
    focusIfDelay: [{ type: Input }],
    focusIf: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FocusIfModule {
}
FocusIfModule.decorators = [
    { type: NgModule, args: [{
                exports: [FocusIfDirective],
                declarations: [FocusIfDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DateTimePickerModule {
}
DateTimePickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    TimePickerModule,
                    SpinButtonModule,
                    FocusIfModule
                ],
                exports: [DateTimePickerComponent],
                declarations: [DateTimePickerComponent, HeaderComponent, DayViewComponent, MonthViewComponent, YearViewComponent, TimeViewComponent],
                providers: [
                    DateTimePickerConfig
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class EboxComponent {
}
EboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-ebox',
                template: "<div class=\"ux-ebox-header\">\n    <ng-content select=\"ux-ebox-header\"></ng-content>\n</div>\n\n<div class=\"ux-ebox-content\">\n    <ng-content select=\"ux-ebox-content\"></ng-content>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
class EboxHeaderDirective {
}
EboxHeaderDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ux-ebox-header'
            },] }
];
class EboxContentDirective {
}
EboxContentDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ux-ebox-content'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class EboxModule {
}
EboxModule.decorators = [
    { type: NgModule, args: [{
                exports: [EboxComponent, EboxContentDirective, EboxHeaderDirective],
                declarations: [EboxComponent, EboxContentDirective, EboxHeaderDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ uniqueTooltipId = 0;
class TooltipComponent {
    /**
     * @param {?} _changeDetectorRef
     */
    constructor(_changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        /**
         * Define a unique id for each tooltip
         */
        this.id = `ux-tooltip-${++uniqueTooltipId}`;
        /**
         * Define the tooltip role
         */
        this.role = 'tooltip';
        /**
         * Allow a custom class to be added to the tooltip to allow custom styling
         */
        this.customClass = '';
        /**
         * Indicates whether or not the content is a string or a TemplateRef
         */
        this.isTemplateRef = false;
        /**
         * Emit when the tooltip need to update it's position
         */
        this.reposition$ = new Subject();
    }
    /**
     * Cleanup after the component is destroyed
     * @return {?}
     */
    ngOnDestroy() {
        this.reposition$.complete();
    }
    /**
     * Inform the parent directive that it needs to recalulate the position
     * @return {?}
     */
    reposition() {
        this.reposition$.next();
    }
    /**
     * This will update the content of the tooltip and trigger change detection
     * @param {?} content
     * @return {?}
     */
    setContent(content) {
        this.content = content;
        this.isTemplateRef = content instanceof TemplateRef;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * This will update the tooltip placement and trigger change detection
     * @param {?} placement
     * @return {?}
     */
    setPlacement(placement) {
        if (!placement) {
            return;
        }
        this.placement = placement;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * This will set a custom class on the tooltip and trigger change detection
     * @param {?} customClass
     * @return {?}
     */
    setClass(customClass) {
        if (!customClass) {
            return;
        }
        this.customClass = customClass;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Updates the context used by the TemplateRef
     * @param {?} context
     * @return {?}
     */
    setContext(context) {
        if (!context) {
            return;
        }
        this.context = context;
        this._changeDetectorRef.markForCheck();
    }
    /**
     * Specify the tooltip role attribute
     * @param {?} role
     * @return {?}
     */
    setRole(role) {
        if (!role) {
            return;
        }
        this.role = role;
        this._changeDetectorRef.markForCheck();
    }
}
TooltipComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-tooltip',
                template: "<div class=\"tooltip in\" [id]=\"id\" [attr.role]=\"role\" [ngClass]=\"[placement, customClass]\">\n    <div class=\"tooltip-arrow\"></div>\n    <div class=\"tooltip-inner\" (cdkObserveContent)=\"reposition()\">\n        <ng-container *ngIf=\"!isTemplateRef\">{{ content }}</ng-container>\n        <ng-container *ngIf=\"isTemplateRef\" [ngTemplateOutlet]=\"content\" [ngTemplateOutletContext]=\"context\"></ng-container>\n    </div>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
TooltipComponent.ctorParameters = () => [
    { type: ChangeDetectorRef }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TooltipService {
    constructor() {
        this.shown$ = new Subject();
    }
}
TooltipService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TooltipDirective$1 {
    /**
     * @param {?} _elementRef
     * @param {?} _viewContainerRef
     * @param {?} _overlay
     * @param {?} _scrollDispatcher
     * @param {?} _changeDetectorRef
     * @param {?} _renderer
     * @param {?} _tooltipService
     */
    constructor(_elementRef, _viewContainerRef, _overlay, _scrollDispatcher, _changeDetectorRef, _renderer, _tooltipService) {
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        this._overlay = _overlay;
        this._scrollDispatcher = _scrollDispatcher;
        this._changeDetectorRef = _changeDetectorRef;
        this._renderer = _renderer;
        this._tooltipService = _tooltipService;
        /**
         * All the user to add a custom class to the tooltip
         */
        this.customClass = '';
        /**
         * All the user to add a role to the tooltip - default is tooltip
         */
        this.role = 'tooltip';
        /**
         * Provide the TemplateRef a context object
         */
        this.context = {};
        /**
         * Delay the showing of the tooltip by a number of miliseconds
         */
        this.delay = 0;
        /**
         * Programmatically show and hide the tooltip
         */
        this.isOpen = false;
        /**
         * Customize how the tooltip should be positioned relative to the element
         */
        this.placement = 'top';
        /**
         * Specify which events should show the tooltip
         */
        this.showTriggers = ['mouseenter', 'focus'];
        /**
         * Specify which events should hide the tooltip
         */
        this.hideTriggers = ['mouseleave', 'blur'];
        /**
         * Emits an event when the tooltip is shown
         */
        this.shown = new EventEmitter();
        /**
         * Emits a event when the tooltip is hidden
         */
        this.hidden = new EventEmitter();
        /**
         * Allow two way binding to track the visibility of the tooltip
         */
        this.isOpenChange = new EventEmitter();
        /**
         * Keep track of the tooltip visibility
         */
        this.isVisible = false;
        /**
         * This will emit when the directive is destroyed allowing us to unsubscribe all subscriptions automatically
         */
        this._onDestroy = new Subject();
        /**
         * Internally store the type of this component - usual for distinctions when extending this class
         */
        this._type = 'tooltip';
    }
    /**
     * Set up the triggers and bind to the show/hide events to keep visibility in sync
     * @return {?}
     */
    ngOnInit() {
        // set up show and hide event triggers
        fromEvent(this._elementRef.nativeElement, 'click').pipe(takeUntil(this._onDestroy)).subscribe(this.onClick.bind(this));
        fromEvent(this._elementRef.nativeElement, 'mouseenter').pipe(takeUntil(this._onDestroy)).subscribe(this.onMouseEnter.bind(this));
        fromEvent(this._elementRef.nativeElement, 'mouseleave').pipe(takeUntil(this._onDestroy)).subscribe(this.onMouseLeave.bind(this));
        fromEvent(this._elementRef.nativeElement, 'focus').pipe(takeUntil(this._onDestroy)).subscribe(this.onFocus.bind(this));
        fromEvent(this._elementRef.nativeElement, 'blur').pipe(takeUntil(this._onDestroy)).subscribe(this.onBlur.bind(this));
        // when any other tooltips open hide this one
        this._tooltipService.shown$.pipe(filter(() => this._type === 'tooltip'), filter(tooltip => tooltip !== this._instance), takeUntil(this._onDestroy)).subscribe(this.hide.bind(this));
        // if the tooltip should be initially visible then open it
        if (this.isOpen) {
            this.show();
        }
    }
    /**
     * We need to send input changes to the tooltip component
     * We can't use setters as they may trigger before tooltip initialised and can't resend once initialised
     *
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // we can ignore the first change as it's handled in ngOnInit
        if (changes["isOpen"] && !changes["isOpen"].firstChange && changes["isOpen"].currentValue !== this.isVisible) {
            changes["isOpen"].currentValue ? this.show() : this.hide();
        }
        // destroy the overlay ref so a new correctly positioned instance will be created next time
        if (changes["placement"]) {
            this.destroyOverlay();
        }
        if (this._instance && changes["placement"]) {
            this._instance.setPlacement(changes["placement"].currentValue);
        }
        if (this._instance && changes["content"]) {
            this._instance.setContent(changes["content"].currentValue);
        }
        if (this._instance && changes["customClass"]) {
            this._instance.setClass(changes["customClass"].currentValue);
        }
        if (this._instance && changes["context"]) {
            this._instance.setContext(changes["context"].currentValue);
        }
        if (this._instance && changes["role"]) {
            this._instance.setContext(changes["role"].currentValue);
        }
    }
    /**
     * Ensure we clean up after ourselves
     * @return {?}
     */
    ngOnDestroy() {
        // ensure we close the tooltip when the host is destroyed
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._instance = null;
        }
        // emit this event to automatically unsubscribe from all subscriptions
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Make the tooltip open
     * @return {?}
     */
    show() {
        // if the tooltip is disabled then do nothing
        if (this.disabled || this.isVisible || this._showTimeoutId || !this.content) {
            return;
        }
        // delay the show by the delay amount
        this._showTimeoutId = window.setTimeout(() => {
            // create the tooltip and get the overlay ref
            const /** @type {?} */ overlayRef = this.createOverlay();
            // create the portal to create the tooltip component
            this._portal = this.createPortal();
            this._instance = this.createInstance(overlayRef);
            // watch for any changes to the content
            this._instance.reposition$.pipe(takeUntil(this._onDestroy)).subscribe(this.reposition.bind(this));
            // store the visible state
            this.isVisible = true;
            // ensure the overlay has the correct initial position
            this.reposition();
            // emit the show events
            this.shown.emit();
            this.isOpenChange.next(true);
            // clear the interval id
            this._showTimeoutId = null;
            // emit the show event to close any other tooltips
            this._tooltipService.shown$.next(this._instance);
            // ensure change detection is run
            this._changeDetectorRef.detectChanges();
        }, this.delay);
    }
    /**
     * If a tooltip exists and is visible, hide it
     * @return {?}
     */
    hide() {
        // if we are waiting to show a tooltip then cancel the pending timeout
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
            this._showTimeoutId = null;
            return;
        }
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
        this.setAriaDescribedBy(null);
        this._instance = null;
        // store the visible state
        this.isVisible = false;
        // emit the hide events
        this.hidden.emit();
        this.isOpenChange.next(false);
        // ensure change detection is run
        this._changeDetectorRef.detectChanges();
    }
    /**
     * Toggle the visibility of the tooltip
     * @return {?}
     */
    toggle() {
        this.isVisible ? this.hide() : this.show();
    }
    /**
     * Recalculate the position of the popover
     * @return {?}
     */
    reposition() {
        if (this.isVisible && this._overlayRef) {
            this._overlayRef.updatePosition();
        }
    }
    /**
     * Create an instance from the overlay ref - allows overriding and additional logic here
     * @param {?} overlayRef
     * @return {?}
     */
    createInstance(overlayRef) {
        const /** @type {?} */ instance = /** @type {?} */ (overlayRef.attach(this._portal).instance);
        // supply the tooltip with the correct properties
        instance.setContent(this.content);
        instance.setPlacement(this.placement);
        instance.setClass(this.customClass);
        instance.setContext(this.context);
        instance.setRole(this.role);
        // Update the aria-describedby attribute
        this.setAriaDescribedBy(instance.id);
        return instance;
    }
    /**
     * Create the component portal - allows overriding to allow other portals eg. popovers
     * @return {?}
     */
    createPortal() {
        return this._portal || new ComponentPortal(TooltipComponent, this._viewContainerRef);
    }
    /**
     * Create the overlay and set up the scroll handling behavior
     * @return {?}
     */
    createOverlay() {
        // if the tooltip has already been created then just return the existing instance
        if (this._overlayRef) {
            return this._overlayRef;
        }
        // configure the tooltip
        const /** @type {?} */ strategy = this._overlay.position()
            .connectedTo(this._elementRef, this.getOrigin(), this.getOverlayPosition());
        // correctly handle scrolling
        const /** @type {?} */ scrollableAncestors = this._scrollDispatcher
            .getAncestorScrollContainers(this._elementRef);
        strategy.withScrollableContainers(scrollableAncestors);
        this._overlayRef = this._overlay.create({
            positionStrategy: strategy,
            panelClass: 'ux-overlay-pane',
            scrollStrategy: this._overlay.scrollStrategies.reposition({ scrollThrottle: 0 }),
            hasBackdrop: false
        });
        return this._overlayRef;
    }
    /**
     * Recreate the overlay ref using the updated origin and overlay positions
     * @return {?}
     */
    destroyOverlay() {
        // destroy the existing overlay
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
        this.isVisible = false;
    }
    /**
     * Get the origin position based on the specified tooltip placement
     * @return {?}
     */
    getOrigin() {
        // ensure placement is defined
        this.placement = this.placement || 'top';
        if (this.placement == 'top' || this.placement == 'bottom') {
            return { originX: 'center', originY: this.placement };
        }
        else if (this.placement == 'left') {
            return { originX: 'start', originY: 'center' };
        }
        else if (this.placement == 'right') {
            return { originX: 'end', originY: 'center' };
        }
    }
    /**
     * Calculate the overlay position based on the specified tooltip placement
     * @return {?}
     */
    getOverlayPosition() {
        // ensure placement is defined
        this.placement = this.placement || 'top';
        if (this.placement == 'top') {
            return { overlayX: 'center', overlayY: 'bottom' };
        }
        else if (this.placement == 'bottom') {
            return { overlayX: 'center', overlayY: 'top' };
        }
        else if (this.placement == 'left') {
            return { overlayX: 'end', overlayY: 'center' };
        }
        else if (this.placement == 'right') {
            return { overlayX: 'start', overlayY: 'center' };
        }
    }
    /**
     * Simple utility method - because IE doesn't support array.includes
     * And it isn't included in the core-js/es6 polyfills which are the
     * only ones required by Angular and guaranteed to be there
     *
     * @template T
     * @param {?} array
     * @param {?} value
     * @return {?}
     */
    includes(array, value) {
        return Array.isArray(array) && !!array.find(item => item === value);
    }
    /**
     * Handle the click event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        // if its not visible and click is a show trigger open it
        if (!this.isVisible && this.includes(this.showTriggers, 'click')) {
            return this.show();
        }
        // if its visible and click is a hide trigger close it
        if (this.isVisible && this.includes(this.hideTriggers, 'click')) {
            return this.hide();
        }
    }
    /**
     * Handle the mouse enter event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    onMouseEnter(event) {
        // this is an show only trigger - if already open or it isn't a trigger do nothing
        if (this.isVisible || !this.includes(this.showTriggers, 'mouseenter')) {
            return;
        }
        // otherwise open the tooltip
        this.show();
    }
    /**
     * Handle the mouse leave event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    onMouseLeave(event) {
        // this is an hide only trigger - if not open or it isn't a trigger do nothing
        if (!this.isVisible || !this.includes(this.hideTriggers, 'mouseleave')) {
            return;
        }
        // otherwise close the tooltip
        this.hide();
    }
    /**
     * Handle the focus event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    onFocus(event) {
        // this is an show only trigger - if already open or it isn't a trigger do nothing
        if (this.isVisible || !this.includes(this.showTriggers, 'focus')) {
            return;
        }
        // otherwise open the tooltip
        this.show();
    }
    /**
     * Handle the blur event - show or hide accordingly
     * @param {?} event
     * @return {?}
     */
    onBlur(event) {
        // this is an hide only trigger - if not open or it isn't a trigger do nothing
        if (!this.isVisible || !this.includes(this.hideTriggers, 'blur')) {
            return;
        }
        // otherwise close the tooltip
        this.hide();
    }
    /**
     * Determine if the trigger element is focused
     * @return {?}
     */
    isFocused() {
        return document.activeElement === this._elementRef.nativeElement;
    }
    /**
     * Programmatically update the aria-describedby property
     * @param {?} id
     * @return {?}
     */
    setAriaDescribedBy(id) {
        if (id === null) {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
        }
        else {
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', id);
        }
    }
}
TooltipDirective$1.decorators = [
    { type: Directive, args: [{
                selector: '[uxTooltip]',
                exportAs: 'ux-tooltip'
            },] }
];
/** @nocollapse */
TooltipDirective$1.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: Overlay },
    { type: ScrollDispatcher },
    { type: ChangeDetectorRef },
    { type: Renderer2 },
    { type: TooltipService }
];
TooltipDirective$1.propDecorators = {
    content: [{ type: Input, args: ['uxTooltip',] }],
    disabled: [{ type: Input, args: ['tooltipDisabled',] }],
    customClass: [{ type: Input, args: ['tooltipClass',] }],
    role: [{ type: Input, args: ['tooltipRole',] }],
    context: [{ type: Input, args: ['tooltipContext',] }],
    delay: [{ type: Input, args: ['tooltipDelay',] }],
    isOpen: [{ type: Input }],
    placement: [{ type: Input }],
    showTriggers: [{ type: Input }],
    hideTriggers: [{ type: Input }],
    shown: [{ type: Output }],
    hidden: [{ type: Output }],
    isOpenChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TooltipModule {
}
TooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    OverlayModule,
                    ObserversModule
                ],
                exports: [TooltipDirective$1],
                declarations: [TooltipComponent, TooltipDirective$1],
                providers: [TooltipService],
                entryComponents: [TooltipComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TypeaheadOptionEvent {
    /**
     * @param {?} option
     */
    constructor(option) {
        this.option = option;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TypeaheadKeyService {
    /**
     * @param {?} event
     * @param {?} typeahead
     * @return {?}
     */
    handleKey(event, typeahead) {
        if (typeahead) {
            switch (event.key) {
                case 'ArrowUp':
                case 'Up':
                    if (!typeahead.open) {
                        typeahead.open = true;
                    }
                    else {
                        typeahead.moveHighlight(-1);
                    }
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                case 'Down':
                    if (!typeahead.open) {
                        typeahead.open = true;
                    }
                    else {
                        typeahead.moveHighlight(1);
                    }
                    event.preventDefault();
                    break;
                case 'Escape':
                case 'Esc':
                    typeahead.open = false;
                    break;
                case 'Enter':
                    if (typeahead.selectOnEnter) {
                        typeahead.selectHighlighted();
                    }
            }
        }
    }
}
TypeaheadKeyService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TypeaheadService {
    constructor() {
        this.open$ = new BehaviorSubject(false);
        this.highlightedElement$ = new BehaviorSubject(null);
    }
}
TypeaheadService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ uniqueId = 0;
class TypeaheadComponent {
    /**
     * @param {?} typeaheadElement
     * @param {?} _changeDetector
     * @param {?} _service
     */
    constructor(typeaheadElement, _changeDetector, _service) {
        this.typeaheadElement = typeaheadElement;
        this._changeDetector = _changeDetector;
        this._service = _service;
        this.id = `ux-typeahead-${++uniqueId}`;
        this.openChange = new EventEmitter();
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.multiselectable = false;
        this.openOnFilterChange = true;
        this.pageSize = 20;
        this.selectFirst = true;
        this.selectOnEnter = false;
        this.loading = false;
        this.optionSelected = new EventEmitter();
        this.highlightedChange = new EventEmitter();
        this.highlightedElementChange = new EventEmitter();
        this.visibleOptions$ = new BehaviorSubject([]);
        this.clicking = false;
        this.highlighted$ = new BehaviorSubject(null);
        this.highlightedKey = null;
        this._onDestroy = new Subject();
        this.optionApi = {
            getKey: this.getKey.bind(this),
            getDisplay: this.getDisplay.bind(this),
            getDisplayHtml: this.getDisplayHtml.bind(this)
        };
        this.loadOptionsCallback = (pageNum, pageSize, filter$$1) => {
            if (typeof this.options === 'function') {
                // Invoke the callback which may return an array or a promise.
                const /** @type {?} */ arrayOrPromise = this.options(pageNum, pageSize, filter$$1);
                // Map the results to an array of TypeaheadVisibleOption.
                return Promise.resolve(arrayOrPromise).then(newOptions => {
                    if (!Array.isArray(newOptions)) {
                        return newOptions;
                    }
                    return newOptions.map((option) => {
                        return {
                            value: option,
                            key: this.getKey(option)
                        };
                    });
                });
            }
            return null;
        };
        this._service.open$.pipe(distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe((next) => {
            this.openChange.emit(next);
            if (next) {
                this.initOptions();
            }
        });
        this.highlighted$.pipe(takeUntil(this._onDestroy)).subscribe((next) => {
            this.highlightedKey = next ? next.key : null;
            this.highlightedChange.emit(next ? next.value : null);
        });
        combineLatest(this._service.open$, this._service.highlightedElement$, this.visibleOptions$)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(([open, highlightedElement, visibleOptions]) => {
            this.highlightedElementChange.emit(open && visibleOptions.length > 0 ? highlightedElement : null);
        });
    }
    /**
     * @return {?}
     */
    get open() {
        return this._service.open$.getValue();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set open(value) {
        this._service.open$.next(value);
    }
    /**
     * @return {?}
     */
    get highlighted() {
        const /** @type {?} */ value = this.highlighted$.getValue();
        return value ? value.value : null;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // Open the dropdown if the filter value updates
        if (changes["filter"]) {
            if (this.openOnFilterChange && changes["filter"].currentValue && changes["filter"].currentValue.length > 0) {
                this.open = true;
            }
        }
        // Re-filter visibleOptions
        this.updateOptions();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @return {?}
     */
    mousedownHandler() {
        this.clicking = true;
    }
    /**
     * @return {?}
     */
    mouseupHandler() {
        this.clicking = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    optionMousedownHandler(event) {
        // Workaround to prevent focus changing when an option is clicked
        event.preventDefault();
    }
    /**
     * @param {?} event
     * @param {?} option
     * @return {?}
     */
    optionClickHandler(event, option) {
        this.select(option);
    }
    /**
     * Returns the unique key value of the given option.
     * @param {?} option
     * @return {?}
     */
    getKey(option) {
        if (typeof this.key === 'function') {
            return this.key(option);
        }
        if (typeof this.key === 'string' && option && option.hasOwnProperty(this.key)) {
            return option[/** @type {?} */ (this.key)];
        }
        return this.getDisplay(option);
    }
    /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    getDisplay(option) {
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option && option.hasOwnProperty(this.display)) {
            return option[/** @type {?} */ (this.display)];
        }
        return option;
    }
    /**
     * Returns the display value of the given option with HTML markup added to highlight the part which matches the current filter value.
     * @param {?} option
     * @return {?}
     */
    getDisplayHtml(option) {
        const /** @type {?} */ displayText = this.getDisplay(option).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        let /** @type {?} */ displayHtml = displayText;
        if (this.filter) {
            const /** @type {?} */ length = this.filter.length;
            const /** @type {?} */ matchIndex = displayText.toLowerCase().indexOf(this.filter.toLowerCase());
            if (matchIndex >= 0) {
                var /** @type {?} */ highlight = `<span class="ux-filter-match">${displayText.substr(matchIndex, length)}</span>`;
                displayHtml = displayText.substr(0, matchIndex) + highlight + displayText.substr(matchIndex + length);
            }
        }
        return displayHtml;
    }
    /**
     * Returns true if the infinite scroll component should load
     * @return {?}
     */
    isInfiniteScroll() {
        return typeof this.options === 'function';
    }
    /**
     * Selects the given option, emitting the optionSelected event and closing the dropdown.
     * @param {?} option
     * @return {?}
     */
    select(option) {
        if (!this.isDisabled(option)) {
            this.optionSelected.emit(new TypeaheadOptionEvent(option.value));
            this.highlighted$.next(null);
            this.open = false;
        }
    }
    /**
     * Returns true if the given option is part of the disabledOptions array.
     * @param {?} option
     * @return {?}
     */
    isDisabled(option) {
        if (this.disabledOptions) {
            const /** @type {?} */ result = this.disabledOptions.find((selectedOption) => {
                return this.getKey(selectedOption) === option.key;
            });
            return result !== undefined;
        }
        return false;
    }
    /**
     * Set the given option as the current highlighted option, available in the highlightedOption parameter.
     * @param {?} option
     * @return {?}
     */
    highlight(option) {
        if (!this.isDisabled(option)) {
            this.highlighted$.next(option);
            this._changeDetector.detectChanges();
        }
    }
    /**
     * Increment or decrement the highlighted option in the list. Disabled options are skipped.
     * @param {?} d Value to be added to the index of the highlighted option, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    moveHighlight(d) {
        const /** @type {?} */ visibleOptions = this.visibleOptions$.getValue();
        const /** @type {?} */ highlightIndex = this.indexOfVisibleOption(this.highlighted);
        let /** @type {?} */ newIndex = highlightIndex;
        let /** @type {?} */ disabled = true;
        let /** @type {?} */ inBounds = true;
        do {
            newIndex = newIndex + d;
            inBounds = (newIndex >= 0 && newIndex < visibleOptions.length);
            disabled = inBounds && this.isDisabled(visibleOptions[newIndex]);
        } while (inBounds && disabled);
        if (!disabled && inBounds) {
            this.highlight(visibleOptions[newIndex]);
        }
        return this.highlighted;
    }
    /**
     * @return {?}
     */
    selectHighlighted() {
        if (this.highlighted) {
            this.select({ value: this.highlighted, key: this.getKey(this.highlighted) });
        }
    }
    /**
     * Set up the options before the dropdown is displayed.
     * @return {?}
     */
    initOptions() {
        // Clear previous highlight
        this.highlighted$.next(null);
        if (this.selectFirst) {
            // This will highlight the first non-disabled option.
            this.moveHighlight(1);
        }
    }
    /**
     * Update the visibleOptions array with the current filter.
     * @return {?}
     */
    updateOptions() {
        if (typeof this.options === 'object') {
            const /** @type {?} */ normalisedInput = (this.filter || '').toLowerCase();
            const /** @type {?} */ visibleOptions = this.options
                .filter((option) => {
                return this.getDisplay(option).toLowerCase().indexOf(normalisedInput) >= 0;
            })
                .map((value) => {
                return {
                    value: value,
                    key: this.getKey(value)
                };
            });
            this.visibleOptions$.next(visibleOptions);
        }
        this.initOptions();
        this._changeDetector.detectChanges();
    }
    /**
     * Return the index of the given option in the visibleOptions array. Returns -1 if the option is not currently visible.
     * @param {?} option
     * @return {?}
     */
    indexOfVisibleOption(option) {
        if (option) {
            const /** @type {?} */ optionKey = this.getKey(option);
            return this.visibleOptions$.getValue().findIndex((el) => {
                return el.key === optionKey;
            });
        }
        return -1;
    }
}
TypeaheadComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-typeahead',
                template: "<div class=\"ux-typeahead-options\"\n    [uxInfiniteScroll]=\"loadOptionsCallback\"\n    [collection]=\"visibleOptions$ | async\"\n    (collectionChange)=\"visibleOptions$.next($event)\"\n    [enabled]=\"isInfiniteScroll()\"\n    [filter]=\"filter\"\n    [loadOnScroll]=\"true\"\n    [pageSize]=\"pageSize\"\n    [scrollElement]=\"typeaheadElement\"\n    (loading)=\"loading = true\"\n    (loaded)=\"loading = false\">\n\n    <ol *ngIf=\"(visibleOptions$ | async).length > 0\">\n        <li *ngFor=\"let option of (visibleOptions$ | async); let i = index\"\n            [attr.id]=\"id + '-option-' + i\"\n            [class.disabled]=\"isDisabled(option)\"\n            [class.highlighted]=\"highlightedKey === option.key\"\n            [attr.aria-selected]=\"multiselectable ? isDisabled(option) : null\"\n            [uxTypeaheadHighlight]=\"highlightedKey === option.key\"\n            [uxScrollIntoViewIf]=\"highlightedKey === option.key\"\n            [scrollParent]=\"typeaheadElement.nativeElement\"\n            (mousedown)=\"optionMousedownHandler($event)\"\n            (click)=\"optionClickHandler($event, option)\"\n            (mouseover)=\"highlight(option)\">\n\n            <ng-container [ngTemplateOutlet]=\"optionTemplate || defaultOptionTemplate\"\n                [ngTemplateOutletContext]=\"{option: option.value, api: optionApi}\">\n            </ng-container>\n\n        </li>\n    </ol>\n\n    <div *uxInfiniteScrollLoading>\n        <ng-container [ngTemplateOutlet]=\"loadingTemplate || defaultLoadingTemplate\"></ng-container>\n    </div>\n\n    <div *ngIf=\"isInfiniteScroll() === false && (visibleOptions$ | async).length === 0 && loading\">\n        <ng-container [ngTemplateOutlet]=\"loadingTemplate || defaultLoadingTemplate\"></ng-container>\n    </div>\n\n</div>\n<div *ngIf=\"(visibleOptions$ | async).length === 0 && !loading\">\n    <ng-container [ngTemplateOutlet]=\"noOptionsTemplate || defaultNoOptionsTemplate\">\n    </ng-container>\n</div>\n\n<ng-template #defaultLoadingTemplate>\n    <div class=\"ux-typeahead-loading\">\n        <div class=\"spinner spinner-accent spinner-bounce-middle\"></div>\n        <div>Loading...</div>\n    </div>\n</ng-template>\n\n<ng-template #defaultOptionTemplate let-option=\"option\" let-api=\"api\">\n    <span class=\"ux-typeahead-option\" [innerHtml]=\"api.getDisplayHtml(option)\"></span>\n</ng-template>\n\n<ng-template #defaultNoOptionsTemplate>\n    <span class=\"ux-typeahead-no-options\">No results</span>\n</ng-template>",
                providers: [TypeaheadService],
                host: {
                    'role': 'listbox',
                    '[class.open]': 'open',
                    '[class.drop-up]': 'dropDirection === "up"',
                    '[style.maxHeight]': 'maxHeight'
                }
            }] }
];
/** @nocollapse */
TypeaheadComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: TypeaheadService }
];
TypeaheadComponent.propDecorators = {
    id: [{ type: Input }, { type: HostBinding, args: ['attr.id',] }],
    options: [{ type: Input }],
    filter: [{ type: Input }],
    open: [{ type: Input }],
    openChange: [{ type: Output }],
    display: [{ type: Input }],
    key: [{ type: Input }],
    disabledOptions: [{ type: Input }],
    dropDirection: [{ type: Input }],
    maxHeight: [{ type: Input }],
    multiselectable: [{ type: Input }, { type: HostBinding, args: ['attr.aria-multiselectable',] }],
    openOnFilterChange: [{ type: Input }],
    pageSize: [{ type: Input }],
    selectFirst: [{ type: Input }],
    selectOnEnter: [{ type: Input }],
    loading: [{ type: Input }],
    loadingTemplate: [{ type: Input }],
    optionTemplate: [{ type: Input }],
    noOptionsTemplate: [{ type: Input }],
    optionSelected: [{ type: Output }],
    highlightedChange: [{ type: Output }],
    highlightedElementChange: [{ type: Output }],
    mousedownHandler: [{ type: HostListener, args: ['mousedown',] }],
    mouseupHandler: [{ type: HostListener, args: ['mouseup',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class InfiniteScrollLoadButtonDirective {
    /**
     * @param {?} _element
     * @param {?} _template
     * @param {?} _viewContainer
     * @param {?} _renderer
     */
    constructor(_element, _template, _viewContainer, _renderer) {
        this._element = _element;
        this._template = _template;
        this._viewContainer = _viewContainer;
        this._renderer = _renderer;
        this._visible = false;
        this._load = new Subject();
        this.load = /** @type {?} */ (this._load.asObservable());
    }
    /**
     * @return {?}
     */
    get visible() {
        return this._visible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set visible(value) {
        if (value !== this._visible) {
            if (value) {
                this._viewContainer.createEmbeddedView(this._template);
                // Template content follows the elementRef, which is a comment.
                const /** @type {?} */ clickTarget = this.getNextElementSibling(this._template.elementRef.nativeElement);
                this._renderer.listen(clickTarget, 'click', this.onClick.bind(this));
            }
            else {
                this._viewContainer.clear();
            }
        }
        this._visible = value;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        this._load.next(event);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    getNextElementSibling(element) {
        var /** @type {?} */ next = element;
        while (next = next.nextSibling) {
            if (next.nodeType === 1) {
                return next;
            }
        }
        return null;
    }
}
InfiniteScrollLoadButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxInfiniteScrollLoadButton]'
            },] }
];
/** @nocollapse */
InfiniteScrollLoadButtonDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: TemplateRef },
    { type: ViewContainerRef },
    { type: Renderer2 }
];
InfiniteScrollLoadButtonDirective.propDecorators = {
    visible: [{ type: Input, args: ['uxInfiniteScrollLoadButton',] }],
    load: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class InfiniteScrollLoadingDirective {
    /**
     * @param {?} _templateRef
     * @param {?} _viewContainer
     */
    constructor(_templateRef, _viewContainer) {
        this._templateRef = _templateRef;
        this._viewContainer = _viewContainer;
        this._visible = false;
    }
    /**
     * @return {?}
     */
    get visible() {
        return this._visible;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set visible(value) {
        if (value !== this._visible) {
            if (value) {
                this._viewContainer.createEmbeddedView(this._templateRef);
            }
            else {
                this._viewContainer.clear();
            }
        }
        this._visible = value;
    }
}
InfiniteScrollLoadingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxInfiniteScrollLoading]'
            },] }
];
/** @nocollapse */
InfiniteScrollLoadingDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef }
];
InfiniteScrollLoadingDirective.propDecorators = {
    visible: [{ type: Input, args: ['uxInfiniteScrollLoading',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class InfiniteScrollDirective {
    /**
     * @param {?} _element
     */
    constructor(_element) {
        this._element = _element;
        this._collection = [];
        this.enabled = true;
        this.loadOnInit = true;
        this.loadOnScroll = true;
        this.pageSize = 20;
        this.collectionChange = new EventEmitter();
        this.loadingEvent = new EventEmitter();
        this.loadedEvent = new EventEmitter();
        this.loadErrorEvent = new EventEmitter();
        this._nextPageNum = 0;
        this._updateRequests = new Subject();
        this._isLoading = new BehaviorSubject(false);
        this._isExhausted = new BehaviorSubject(false);
        this._loadButtonEnabled = new BehaviorSubject(false);
        this._subscriptions = [];
        this._loadButtonSubscriptions = [];
        this._onDestroy = new Subject();
        this._canLoadManually = this._isLoading.pipe(combineLatest$1(this._isExhausted, this._loadButtonEnabled, (isLoading, isExhausted, loadButtonEnabled) => {
            return !isLoading && !isExhausted && loadButtonEnabled;
        }));
    }
    /**
     * @return {?}
     */
    get collection() {
        return this._collection;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set collection(value) {
        this.collectionChange.emit(value);
        this._collection = value;
    }
    /**
     * @param {?} element
     * @return {?}
     */
    set scrollElement(element) {
        this._scrollElement = element instanceof ElementRef ? element : new ElementRef(element);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this._scrollElement) {
            this._scrollElement = this._element;
        }
        this._loadButtonEnabled.next(!this.loadOnScroll);
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // There are two kinds of update requests: check and load.
        // Check requests are throttled and will only cause an update if more data is required
        // to fill the scrolling view, and it isn't already loading some.
        // Load requests are not throttled and always request a page of data.
        this._updateRequests.pipe(filter(request => request.check), auditTime(200), takeUntil(this._onDestroy)).subscribe(this.doRequest.bind(this));
        this._updateRequests.pipe(filter(request => !request.check), takeUntil(this._onDestroy)).subscribe(this.doRequest.bind(this));
        if (this.enabled) {
            // Subscribe to scroll events and DOM changes.
            this.attachEventHandlers();
        }
        // Connect the Load More button visible state.
        this._canLoadManually.pipe(takeUntil(this._onDestroy)).subscribe(canLoad => {
            this._loadButtonQuery.forEach(loadButton => {
                loadButton.visible = canLoad;
            });
        });
        // Connect the loading indicator visible state.
        this._isLoading.pipe(takeUntil(this._onDestroy)).subscribe(isLoading => {
            this._loadingIndicatorQuery.forEach(loading => {
                loading.visible = isLoading;
            });
        });
        // Link the Load More button click event to trigger an update.
        this.attachLoadButtonEvents();
        this._loadButtonQuery.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.attachLoadButtonEvents();
        });
        // Initial update.
        if (this.loadOnInit) {
            this.loadNextPage();
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        let /** @type {?} */ check = true;
        if (changes["enabled"] && changes["enabled"].currentValue !== changes["enabled"].previousValue) {
            if (changes["enabled"].currentValue) {
                this.attachEventHandlers();
                this.reset();
                check = false;
            }
            else {
                this.detachEventHandlers();
            }
        }
        if (this.enabled) {
            if (changes["filter"] && changes["filter"].currentValue !== changes["filter"].previousValue) {
                this.reset();
                check = false;
            }
            if (changes["loadOnScroll"]) {
                this._loadButtonEnabled.next(!changes["loadOnScroll"].currentValue);
            }
            if (changes["pageSize"] && changes["pageSize"].currentValue !== changes["pageSize"].previousValue) {
                this.reset();
                check = false;
            }
            this._updateRequests.next({
                check: check,
                pageNumber: this._nextPageNum,
                pageSize: this.pageSize,
                filter: this.filter
            });
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.detachEventHandlers();
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Request an additional page of data.
     * @return {?}
     */
    loadNextPage() {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: false,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    }
    /**
     * Request a check for whether an additional page of data is required. This is throttled.
     * @return {?}
     */
    check() {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: true,
            pageNumber: this._nextPageNum,
            pageSize: this.pageSize,
            filter: this.filter
        });
    }
    /**
     * Clear the collection. Future requests will load from page 0.
     * @return {?}
     */
    reset() {
        if (!this.enabled) {
            return;
        }
        // Reset the page counter.
        this._nextPageNum = 0;
        this._pages = [];
        // Clear the collection (without changing the reference).
        if (this.collection) {
            this.collection.length = 0;
        }
        // Reset the exhausted flag, allowing the Load More button to appear.
        this._isExhausted.next(false);
        // Cancel any pending requests
        if (this._subscriptions) {
            this._subscriptions.forEach(request => request.unsubscribe());
        }
    }
    /**
     * Reload the data without clearing the view.
     * @return {?}
     */
    reload() {
        this._pages.forEach((page, i) => this.reloadPage(i));
    }
    /**
     * Reload the data in a specific page without clearing the view.
     * @param {?} pageNum Page number
     * @return {?}
     */
    reloadPage(pageNum) {
        if (!this.enabled) {
            return;
        }
        this._updateRequests.next({
            check: false,
            pageNumber: pageNum,
            pageSize: this.pageSize,
            filter: this.filter,
            reload: true
        });
    }
    /**
     * Attach scroll event handler and DOM observer.
     * @return {?}
     */
    attachEventHandlers() {
        // if the scrollElement is documentElement we must watch for a scroll event on the document
        const /** @type {?} */ target = this._scrollElement.nativeElement instanceof HTMLHtmlElement ? document : this._scrollElement.nativeElement;
        // Subscribe to the scroll event on the target element.
        this._scrollEventSub = fromEvent(target, 'scroll').subscribe(this.check.bind(this));
        // Subscribe to child DOM changes. The main effect of this is to check whether even more data is
        // required after the initial load.
        this._domObserver = new MutationObserver(this.check.bind(this));
        this._domObserver.observe(this._scrollElement.nativeElement, {
            childList: true,
            subtree: true
        });
    }
    /**
     * Detach scroll event handler and DOM observer.
     * @return {?}
     */
    detachEventHandlers() {
        if (this._scrollEventSub) {
            this._scrollEventSub.unsubscribe();
            this._scrollEventSub = null;
        }
        if (this._domObserver) {
            this._domObserver.disconnect();
            this._domObserver = null;
        }
    }
    /**
     * Remove any existing event subscriptions for the load button `load` event, then attach subscriptions
     * for any in the query.
     * @return {?}
     */
    attachLoadButtonEvents() {
        this._loadButtonSubscriptions.forEach(s => s.unsubscribe());
        this._loadButtonSubscriptions = this._loadButtonQuery.map(loadButton => loadButton.load.subscribe(this.loadNextPage.bind(this)));
    }
    /**
     * Conditionally loads a page into the collection based on directive state and request parameters.
     * @param {?} request
     * @return {?}
     */
    doRequest(request) {
        // Load a new page if the scroll position is beyond the threshhold and if the client code did not
        // cancel.
        if (this.needsData(request) && this.beginLoading(request)) {
            // Invoke the callback load function, which returns a promose or plain data.
            const /** @type {?} */ loadResult = this.load(request.pageNumber, request.pageSize, request.filter);
            const /** @type {?} */ observable = Array.isArray(loadResult) ? of(loadResult) : from(loadResult);
            const /** @type {?} */ subscription = observable.pipe(first()).subscribe(items => {
                // Make sure that the parameters have not changed since the load started;
                // otherwise discard the results.
                if (request.filter === this.filter && request.pageSize === this.pageSize) {
                    if (items && items.length) {
                        this.setPageItems(request.pageNumber, items);
                    }
                    // Emit the loaded event
                    this.endLoading(request, items);
                }
            }, reason => {
                // Emit the loadError event
                this.endLoadingWithError(request, reason);
            }, () => {
                // remove this request from the list
                this._subscriptions = this._subscriptions.filter(s => s !== subscription);
            });
            // add the subscription to the list of requests
            this._subscriptions.push(subscription);
        }
    }
    /**
     * Returns true if the request should be fulfilled.
     * @param {?} request
     * @return {?}
     */
    needsData(request) {
        if (!this.enabled) {
            return false;
        }
        // Always load for a load request
        if (!request.check) {
            return true;
        }
        // Ignore a check request when the end of data has been detected, or if data is currently loading.
        if (this._isExhausted.getValue() || this._isLoading.getValue()) {
            return false;
        }
        // Load if the remaining scroll area is <= the element height.
        if (this._scrollElement && this.loadOnScroll) {
            const /** @type {?} */ element = /** @type {?} */ (this._scrollElement.nativeElement);
            const /** @type {?} */ remainingScroll = element.scrollHeight -
                (element.scrollTop + element.clientHeight);
            return remainingScroll <= element.clientHeight;
        }
        return false;
    }
    /**
     * Updates state for the beginning of a load. Returns false if the `loading` event was cancelled.
     * @param {?} request
     * @return {?}
     */
    beginLoading(request) {
        const /** @type {?} */ event = new InfiniteScrollLoadingEvent(request.pageNumber, request.pageSize, request.filter);
        this.loadingEvent.emit(event);
        this._isLoading.next(!event.defaultPrevented());
        return !event.defaultPrevented();
    }
    /**
     * @param {?} pageNum
     * @param {?} items
     * @return {?}
     */
    setPageItems(pageNum, items) {
        this._pages[pageNum] = items;
        this.collection = this._pages.reduce((previous, current) => previous.concat(current), []);
    }
    /**
     * Updates state from a successful load. Raises the `loaded` event.
     * @param {?} request
     * @param {?=} data
     * @return {?}
     */
    endLoading(request, data) {
        this._isLoading.next(false);
        const /** @type {?} */ isExhausted = !!(data && data.length < this.pageSize);
        this._isExhausted.next(isExhausted);
        this.loadedEvent.emit(new InfiniteScrollLoadedEvent(request.pageNumber, request.pageSize, request.filter, data, isExhausted));
        if (!request.reload) {
            this._nextPageNum += 1;
        }
    }
    /**
     * Updates state from a failed load. Raises the `loadError` event.
     * @param {?} request
     * @param {?} error
     * @return {?}
     */
    endLoadingWithError(request, error) {
        this._isLoading.next(false);
        this.loadErrorEvent.emit(new InfiniteScrollLoadErrorEvent(request.pageNumber, request.pageSize, request.filter, error));
    }
}
InfiniteScrollDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxInfiniteScroll]',
                exportAs: 'uxInfiniteScroll'
            },] }
];
/** @nocollapse */
InfiniteScrollDirective.ctorParameters = () => [
    { type: ElementRef }
];
InfiniteScrollDirective.propDecorators = {
    load: [{ type: Input, args: ['uxInfiniteScroll',] }],
    _collection: [{ type: Input, args: ['collection',] }],
    scrollElement: [{ type: Input }],
    enabled: [{ type: Input }],
    filter: [{ type: Input }],
    loadOnInit: [{ type: Input }],
    loadOnScroll: [{ type: Input }],
    pageSize: [{ type: Input }],
    collectionChange: [{ type: Output }],
    loadingEvent: [{ type: Output, args: ['loading',] }],
    loadedEvent: [{ type: Output, args: ['loaded',] }],
    loadErrorEvent: [{ type: Output, args: ['loadError',] }],
    _loadButtonQuery: [{ type: ContentChildren, args: [InfiniteScrollLoadButtonDirective,] }],
    _loadingIndicatorQuery: [{ type: ContentChildren, args: [InfiniteScrollLoadingDirective,] }]
};
/**
 * Event raised before the `loading` function is called.
 */
class InfiniteScrollLoadingEvent {
    /**
     * @param {?} pageNumber
     * @param {?} pageSize
     * @param {?} filter
     */
    constructor(pageNumber, pageSize, filter$$1) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter$$1;
        this._defaultPrevented = false;
    }
    /**
     * Prevents the default behaviour of the `loading` event (loading function will not be called).
     * @return {?}
     */
    preventDefault() {
        this._defaultPrevented = true;
    }
    /**
     * @return {?}
     */
    defaultPrevented() {
        return this._defaultPrevented;
    }
}
/**
 * Event raised when the loading function result has been resolved and added to the collection.
 */
class InfiniteScrollLoadedEvent {
    /**
     * @param {?} pageNumber
     * @param {?} pageSize
     * @param {?} filter
     * @param {?} data
     * @param {?} exhausted
     */
    constructor(pageNumber, pageSize, filter$$1, data, exhausted) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter$$1;
        this.data = data;
        this.exhausted = exhausted;
    }
}
/**
 * Event raised if the loading function returns a rejected promise.
 */
class InfiniteScrollLoadErrorEvent {
    /**
     * @param {?} pageNumber
     * @param {?} pageSize
     * @param {?} filter
     * @param {?} error
     */
    constructor(pageNumber, pageSize, filter$$1, error) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.filter = filter$$1;
        this.error = error;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class InfiniteScrollModule {
}
InfiniteScrollModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [
                    InfiniteScrollDirective,
                    InfiniteScrollLoadButtonDirective,
                    InfiniteScrollLoadingDirective
                ],
                declarations: [
                    InfiniteScrollDirective,
                    InfiniteScrollLoadButtonDirective,
                    InfiniteScrollLoadingDirective
                ],
                providers: [],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ScrollIntoViewService {
    /**
     * @param {?} elem
     * @param {?} scrollParent
     * @return {?}
     */
    scrollIntoView(elem, scrollParent) {
        const /** @type {?} */ offsetTop = (elem.getBoundingClientRect().top + scrollParent.scrollTop) - scrollParent.getBoundingClientRect().top;
        if (offsetTop < scrollParent.scrollTop) {
            scrollParent.scrollTop = offsetTop;
        }
        else {
            const /** @type {?} */ offsetBottom = offsetTop + elem.offsetHeight;
            if (offsetBottom > (scrollParent.scrollTop + scrollParent.clientHeight)) {
                scrollParent.scrollTop = offsetBottom - scrollParent.clientHeight;
            }
        }
    }
}
ScrollIntoViewService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ScrollIntoViewIfDirective {
    /**
     * @param {?} _element
     * @param {?} _scrollIntoViewService
     */
    constructor(_element, _scrollIntoViewService) {
        this._element = _element;
        this._scrollIntoViewService = _scrollIntoViewService;
        this.condition = false;
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (this.condition) {
            setTimeout(() => this._scrollIntoViewService.scrollIntoView(this._element.nativeElement, this.scrollParent));
        }
    }
}
ScrollIntoViewIfDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxScrollIntoViewIf]',
                providers: [ScrollIntoViewService]
            },] }
];
/** @nocollapse */
ScrollIntoViewIfDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ScrollIntoViewService }
];
ScrollIntoViewIfDirective.propDecorators = {
    condition: [{ type: Input, args: ['uxScrollIntoViewIf',] }],
    scrollParent: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ScrollIntoViewDirective {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        /**
         * Allow a condition around whether or not this should scroll into view
         */
        this.uxScrollIntoView = true;
        /**
         * Allow user to provide the browser supported options
         */
        this.scrollIntoViewOptions = true;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        if (this.uxScrollIntoView) {
            this._elementRef.nativeElement.scrollIntoView(this.scrollIntoViewOptions);
        }
    }
}
ScrollIntoViewDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxScrollIntoView]'
            },] }
];
/** @nocollapse */
ScrollIntoViewDirective.ctorParameters = () => [
    { type: ElementRef }
];
ScrollIntoViewDirective.propDecorators = {
    uxScrollIntoView: [{ type: Input }],
    scrollIntoViewOptions: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ScrollModule {
}
ScrollModule.decorators = [
    { type: NgModule, args: [{
                exports: [ScrollIntoViewIfDirective, ScrollIntoViewDirective],
                declarations: [ScrollIntoViewIfDirective, ScrollIntoViewDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TypeaheadHighlightDirective {
    /**
     * @param {?} _service
     * @param {?} _elementRef
     */
    constructor(_service, _elementRef) {
        this._service = _service;
        this._elementRef = _elementRef;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set highlight(value) {
        if (value) {
            this._service.highlightedElement$.next(this._elementRef.nativeElement);
        }
    }
}
TypeaheadHighlightDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxTypeaheadHighlight]'
            },] }
];
/** @nocollapse */
TypeaheadHighlightDirective.ctorParameters = () => [
    { type: TypeaheadService },
    { type: ElementRef }
];
TypeaheadHighlightDirective.propDecorators = {
    highlight: [{ type: Input, args: ['uxTypeaheadHighlight',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TypeaheadModule {
}
TypeaheadModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    InfiniteScrollModule,
                    ScrollModule
                ],
                exports: [TypeaheadComponent],
                declarations: [TypeaheadComponent, TypeaheadHighlightDirective],
                providers: [TypeaheadKeyService],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ReorderableHandleDirective {
}
ReorderableHandleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxReorderableHandle]'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ReorderableModelDirective {
    /**
     * @param {?} elementRef
     */
    constructor(elementRef) {
        this.elementRef = elementRef;
    }
}
ReorderableModelDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxReorderableModel]'
            },] }
];
/** @nocollapse */
ReorderableModelDirective.ctorParameters = () => [
    { type: ElementRef }
];
ReorderableModelDirective.propDecorators = {
    uxReorderableModel: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ dragula = dragulaNamespace__default || dragulaNamespace;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ReorderableService {
    constructor() {
        this._groups = {};
        this._uniqueGroupId = 0;
    }
    /**
     * Returns a unique string which can be used as a group name if one was not configured.
     * @return {?}
     */
    getUniqueGroupName() {
        return '_uxReorderable_' + this._uniqueGroupId++;
    }
    /**
     * Adds the container to the named group.
     * @param {?} groupName
     * @param {?} container
     * @return {?}
     */
    register(groupName, container) {
        if (!this._groups[groupName]) {
            this._groups[groupName] = new ReorderableGroup();
        }
        this._groups[groupName].register(container);
        return this._groups[groupName];
    }
    /**
     * Removes the container from the named group. If it was the last container in the group, destroys the group.
     * @param {?} groupName
     * @param {?} container
     * @return {?}
     */
    unregister(groupName, container) {
        const /** @type {?} */ group = this._groups[groupName];
        if (group) {
            group.unregister(container);
            if (group.isEmpty()) {
                group.destroy();
                delete this._groups[groupName];
            }
        }
    }
    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     * @param {?} groupName
     * @return {?}
     */
    initialize(groupName) {
        const /** @type {?} */ group = this._groups[groupName];
        if (group) {
            group.initialize();
        }
        return group;
    }
    /**
     * Returns the group object for the given name.
     * @param {?} group
     * @return {?}
     */
    getGroup(group) {
        return this._groups[group];
    }
}
ReorderableService.decorators = [
    { type: Injectable }
];
/**
 * Represents a collection of drag-and-drop containers (uxReorderable) that items can be dragged between.
 */
class ReorderableGroup {
    constructor() {
        this.drag = new EventEmitter();
        this.dragEnd = new EventEmitter();
        this.drop = new EventEmitter();
        this.cancel = new EventEmitter();
        this.cloned = new EventEmitter();
        this._containers = [];
        this._config = {
            moves: this.canMove.bind(this)
        };
    }
    /**
     * Returns true if there are no containers registered with the group.
     * @return {?}
     */
    isEmpty() {
        return this._containers.length === 0;
    }
    /**
     * Returns the model object (uxReorderableModel) for an elements in one of the containers in the group.
     * @param {?} element
     * @return {?}
     */
    getModelForElement(element) {
        for (const /** @type {?} */ container of this._containers) {
            const /** @type {?} */ model = container.getModelFromElement(element);
            if (model) {
                return model;
            }
        }
        return null;
    }
    /**
     * Adds the container to the group.
     * @param {?} container
     * @return {?}
     */
    register(container) {
        this._containers.push(container);
        if (this._instance) {
            this._instance.containers = this._containers.map((c) => c.element);
        }
        if (!this._config.mirrorContainer) {
            this._config.mirrorContainer = container.element;
        }
    }
    /**
     * Removes the container from the group.
     * @param {?} container
     * @return {?}
     */
    unregister(container) {
        const /** @type {?} */ index = this._containers.indexOf(container);
        if (index >= 0) {
            this._containers.splice(index, 1);
            if (this._instance) {
                this._instance.containers = this._containers.map((c) => c.element);
            }
        }
    }
    /**
     * Creates the dragula instance with the current config and attaches the events, if not already created.
     * @return {?}
     */
    initialize() {
        if (this._instance) {
            return;
        }
        this._instance = dragula(this._containers.map((c) => c.element), this._config);
        this._instance.on('drag', (element, source) => {
            this.drag.emit({
                model: this.getModelForElement(element),
                element: element,
                source: source
            });
        });
        this._instance.on('dragend', (element) => {
            this.dragEnd.emit({
                model: this.getModelForElement(element),
                element: element
            });
        });
        this._instance.on('drop', (element, target, source, sibling) => {
            this.drop.emit({
                model: this.getModelForElement(element),
                element: element,
                target: target,
                source: source,
                sibling: sibling
            });
        });
        this._instance.on('cancel', (element) => {
            this.cancel.emit({
                model: this.getModelForElement(element),
                element: element
            });
        });
        this._instance.on('cloned', (clone, element, type) => {
            this.cloned.emit({
                clone: clone,
                element: element,
                type: type
            });
        });
    }
    /**
     * Destroys the dragula instance.
     * @return {?}
     */
    destroy() {
        if (this._instance) {
            this._instance.destroy();
            this._instance = null;
        }
    }
    /**
     * Finds the container for the containerElement and returns the results of canMove.
     * @param {?} element
     * @param {?} containerElement
     * @param {?} handle
     * @return {?}
     */
    canMove(element, containerElement, handle) {
        for (let /** @type {?} */ container of this._containers) {
            if (container.element.isSameNode(containerElement)) {
                return container.canMove(element, containerElement, handle);
            }
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ReorderableDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _service
     */
    constructor(_elementRef, _renderer, _service) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._service = _service;
        this.reorderingDisabled = false;
        this.reorderableModelChange = new EventEmitter();
        this.reorderStart = new EventEmitter();
        this.reorderCancel = new EventEmitter();
        this.reorderEnd = new EventEmitter();
        this.dragging = false;
        this._subscriptions = new Subscription();
    }
    /**
     * Initialise dragula and bind to all the required events
     * @return {?}
     */
    ngOnInit() {
        // If no group name then generate a unique one for this instance only
        if (!this.reorderableGroup) {
            this.reorderableGroup = this._service.getUniqueGroupName();
        }
        this._container = {
            element: this._elementRef.nativeElement,
            getModelFromElement: this.getModelFromElement.bind(this),
            canMove: this.canMove.bind(this)
        };
        // Register for drag events on this element
        const /** @type {?} */ group = this._service.register(this.reorderableGroup, this._container);
        this._subscriptions.add(group.drag.subscribe(this.onDrag.bind(this)));
        this._subscriptions.add(group.dragEnd.subscribe(this.onDragEnd.bind(this)));
        this._subscriptions.add(group.drop.subscribe(this.onDrop.bind(this)));
        this._subscriptions.add(group.cancel.subscribe((event) => this.reorderCancel.emit({ element: event.element, model: event.model })));
        this._subscriptions.add(group.cloned.subscribe(this.onClone.bind(this)));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._service.initialize(this.reorderableGroup);
    }
    /**
     * We need to destroy the dragula instance on component destroy
     * @return {?}
     */
    ngOnDestroy() {
        this._service.unregister(this.reorderableGroup, this._container);
        this._subscriptions.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDrag(event) {
        this.dragging = true;
        this.reorderStart.emit({ element: event.element, model: event.model });
    }
    /**
     * This is fired when items get reordered - we need to emit the new order of the models
     * @param {?} event
     * @return {?}
     */
    onDrop(event) {
        // if there is no provided module we can skip this
        if (!this.reorderableModel) {
            return;
        }
        let /** @type {?} */ changed = false;
        if (event.source.isSameNode(this._elementRef.nativeElement)) {
            // remove this model from the list of models
            const /** @type {?} */ index = this.reorderableModel.indexOf(event.model);
            if (index >= 0) {
                this.reorderableModel.splice(index, 1);
                changed = true;
            }
        }
        if (event.target.isSameNode(this._elementRef.nativeElement)) {
            // get the position of sibling element
            const /** @type {?} */ index = event.sibling && !event.sibling.classList.contains('gu-mirror') ?
                this.reorderableModel.indexOf(this.getModelFromElement(event.sibling)) :
                this.reorderableModel.length;
            // insert the model at its new location
            this.reorderableModel.splice(index, 0, event.model);
            changed = true;
        }
        // Emit event if any changes were made
        if (changed) {
            this.reorderableModelChange.emit(this.reorderableModel);
        }
    }
    /**
     * Return the model assciated with a particular element in the list.
     * This should ensure that the items have the draggable model directive applied
     * @param {?} element
     * @return {?}
     */
    getModelFromElement(element) {
        const /** @type {?} */ model = this.models.find(_model => _model.elementRef.nativeElement === element);
        if (!model) {
            return null;
        }
        return model.uxReorderableModel;
    }
    /**
     * When we finish dragging remove the utillity class from the element being moved
     * @param {?} event
     * @return {?}
     */
    onDragEnd(event) {
        this.dragging = false;
        if (this._elementRef.nativeElement.contains(event.element)) {
            this._renderer.removeClass(event.element, 'ux-reorderable-moving');
            this.reorderEnd.emit({
                element: event.element,
                model: event.model
            });
        }
    }
    /**
     * We want to ensure that the cloned element is identical
     * to the original, regardless of it's location in the DOM tree
     * @param {?} event
     * @return {?}
     */
    onClone(event) {
        if (this._elementRef.nativeElement.contains(event.element)) {
            this.setTableCellWidths(event.element, event.clone);
            this.captureCanvases(event.element, event.clone);
            this._renderer.addClass(event.element, 'ux-reorderable-moving');
        }
    }
    /**
     * If elements contain handles then only drag when the handle is dragged
     * otherwise drag whenever an immediate child is specified
     * @param {?} element
     * @param {?} container
     * @param {?} handle
     * @return {?}
     */
    canMove(element, container, handle) {
        if (this.reorderingDisabled) {
            return false;
        }
        return this.handles.length === 0 ? true : !!this.handles.find(_handle => _handle.nativeElement === handle);
    }
    /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    setTableCellWidths(source, target) {
        // if it is not a table row then skip this
        if (source.tagName !== 'TR') {
            return;
        }
        // find any immediate td children and fix their width
        const /** @type {?} */ sourceCells = /** @type {?} */ (Array.from(source.children));
        const /** @type {?} */ targetCells = /** @type {?} */ (Array.from(target.children));
        // fix the width of these cells
        sourceCells.forEach((cell, idx) => targetCells[idx].style.minWidth = getComputedStyle(cell).getPropertyValue('width'));
    }
    /**
     * @param {?} source
     * @param {?} target
     * @return {?}
     */
    captureCanvases(source, target) {
        // find all child canvas elements
        const /** @type {?} */ sourceCanvases = Array.from(source.querySelectorAll('canvas'));
        const /** @type {?} */ targetCanvases = Array.from(target.querySelectorAll('canvas'));
        // replicate the canvas content
        targetCanvases.map(canvas => canvas.getContext('2d'))
            .forEach((context, idx) => context.drawImage(sourceCanvases[idx], 0, 0));
    }
}
ReorderableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxReorderable]'
            },] }
];
/** @nocollapse */
ReorderableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ReorderableService }
];
ReorderableDirective.propDecorators = {
    reorderableModel: [{ type: Input }],
    reorderableGroup: [{ type: Input }],
    reorderingDisabled: [{ type: Input }],
    reorderableModelChange: [{ type: Output }],
    reorderStart: [{ type: Output }],
    reorderCancel: [{ type: Output }],
    reorderEnd: [{ type: Output }],
    handles: [{ type: ContentChildren, args: [ReorderableHandleDirective, { read: ElementRef, descendants: true },] }],
    models: [{ type: ContentChildren, args: [ReorderableModelDirective,] }],
    dragging: [{ type: HostBinding, args: ['class.ux-reorderable-container-moving',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ReorderableModule {
}
ReorderableModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [
                    ReorderableDirective,
                    ReorderableHandleDirective,
                    ReorderableModelDirective
                ],
                exports: [
                    ReorderableDirective,
                    ReorderableHandleDirective,
                    ReorderableModelDirective
                ],
                providers: [
                    ReorderableService
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FacetSelect {
    /**
     * @param {?} facet
     */
    constructor(facet) {
        this.facet = facet;
    }
}
class FacetDeselect {
    /**
     * @param {?} facet
     */
    constructor(facet) {
        this.facet = facet;
    }
}
class FacetDeselectAll {
    constructor() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FacetContainerComponent {
    /**
     * @param {?} _announcer
     */
    constructor(_announcer) {
        this._announcer = _announcer;
        this.header = 'Selected:';
        this.clearTooltip = 'Clear All';
        this.emptyText = 'No Items';
        this.facets = [];
        this.facetsReorderable = false;
        this.facetsChange = new EventEmitter();
        this.events = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.events.complete();
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    selectFacet(facet) {
        // push the facet on to the list
        this.facets.push(facet);
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetSelect(facet));
    }
    /**
     * @param {?} facet
     * @param {?=} tag
     * @return {?}
     */
    deselectFacet(facet, tag) {
        // find the index of the item in the selected array
        const /** @type {?} */ idx = this.facets.findIndex(selectedFacet => facet === selectedFacet);
        // if match there was no match then finish
        if (idx === -1) {
            return;
        }
        // remove the last item
        this.facets.splice(idx, 1);
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetDeselect(facet));
        // announce the facet removal
        this._announcer.announce(`Option ${facet.title} deselected.`, 'assertive');
        // focus another tag if there is one
        if (tag) {
            const /** @type {?} */ sibling = tag.previousElementSibling || tag.nextElementSibling;
            // if there is a sibling then focus it
            if (sibling) {
                (/** @type {?} */ (sibling)).focus();
            }
        }
    }
    /**
     * @return {?}
     */
    deselectAllFacets() {
        // empty the selected array
        this.facets = [];
        // update the two way binding
        this.facetsChange.emit(this.facets);
        // trigger event
        this.triggerEvent(new FacetDeselectAll());
        // announce the facet removal
        this._announcer.announce(`All options deselected.`, 'assertive');
    }
    /**
     * @param {?} _index
     * @param {?} facet
     * @return {?}
     */
    trackBy(_index, facet) {
        return facet.id || facet.title;
    }
    /**
     * @param {?} facet
     * @param {?} element
     * @return {?}
     */
    shiftRight(facet, element) {
        // only move the item if reordering is allowed
        if (this.facetsReorderable === false) {
            return;
        }
        // perform the movement
        this.shiftFacet(facet, 1);
        // the item may become unfocused during the reorder so we should refocus it
        requestAnimationFrame(() => element.focus());
        // announce the move
        this._announcer.announce(`Option ${facet.title} moved down.`);
    }
    /**
     * @param {?} facet
     * @param {?} element
     * @return {?}
     */
    shiftLeft(facet, element) {
        // only move the item if reordering is allowed
        if (this.facetsReorderable === false) {
            return;
        }
        // perform the movement
        this.shiftFacet(facet, -1);
        // the item may become unfocused during the reorder so we should refocus it
        requestAnimationFrame(() => element.focus());
        // announce the move
        this._announcer.announce(`Option ${facet.title} moved up.`);
    }
    /**
     * @param {?} facet
     * @param {?} distance
     * @return {?}
     */
    shiftFacet(facet, distance) {
        const /** @type {?} */ index = this.facets.indexOf(facet);
        const /** @type {?} */ target = index + distance;
        // Ensure the move is valid
        if (target < 0 || target === this.facets.length) {
            return;
        }
        // Perform the move
        this.facets.splice(index, 1);
        this.facets.splice(target, 0, facet);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    triggerEvent(event) {
        this.events.next(event);
    }
}
FacetContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-container',
                template: "<!-- Display Any Selected Facets -->\n<div class=\"facets-selected-container\">\n\n    <!-- Display Title an Clear Button -->\n    <div class=\"facets-selected-header-container\">\n\n        <!-- Show The Selected Text -->\n        <span class=\"facets-selected-header-label\">{{ header }}</span>\n\n        <!-- Add a Clear Button -->\n        <button class=\"btn btn-link btn-icon button-secondary\"\n            tabindex=\"0\"\n            [attr.aria-label]=\"clearTooltip\"\n            [uxTooltip]=\"clearTooltip\"\n            placement=\"left\"\n            (click)=\"deselectAllFacets()\"\n            *ngIf=\"facets.length > 0\">\n\n            <svg class=\"facets-selected-clear-graphic\" focusable=\"false\" viewBox=\"0 0 19 12\" shape-rendering=\"geometricPrecision\">\n                <rect class=\"light-grey\" x=\"0\" y=\"2\" width=\"7\" height=\"2\"></rect>\n                <rect class=\"dark-grey\" x=\"0\" y=\"5\" width=\"9\" height=\"2\"></rect>\n                <rect class=\"light-grey\" x=\"0\" y=\"8\" width=\"7\" height=\"2\"></rect>\n                <path class=\"dark-grey\" d=\"M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z\"></path>\n                <path class=\"dark-grey\" d=\"M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z\"></path>\n            </svg>\n        </button>\n\n    </div>\n\n    <!-- Display Tags For Selected Items -->\n    <div class=\"facets-selected-list\"\n        uxReorderable\n        role=\"list\"\n        [reorderingDisabled]=\"!facetsReorderable\"\n        [(reorderableModel)]=\"facets\"\n        (reorderableModelChange)=\"facetsChange.emit(facets)\">\n\n        <!-- Show Selected Tags -->\n        <div #tag\n            class=\"facet-selected-tag\"\n            role=\"listitem\"\n            tabindex=\"0\"\n            uxReorderableHandle\n            *ngFor=\"let facet of facets; trackBy: trackBy\"\n            [attr.aria-label]=\"facet.title\"\n            [uxReorderableModel]=\"facet\"\n            (mousedown)=\"tag.focus()\"\n            (keydown.ArrowRight)=\"shiftRight(facet, tag)\"\n            (keydown.ArrowLeft)=\"shiftLeft(facet, tag)\">\n\n            <!-- Display Label -->\n            <span class=\"facet-selected-tag-label\">{{ facet.title }}</span>\n\n            <!-- Display Remove Icon -->\n            <button class=\"facet-selected-remove-btn\"\n                i18n-aria-label\n                aria-label=\"Deselect Facet\"\n                (click)=\"deselectFacet(facet, tag)\">\n\n                <i class=\"hpe-icon hpe-close\"></i>\n            </button>\n        </div>\n\n    </div>\n\n    <!-- Show Message Here if No Facets Selected -->\n    <p class=\"facets-selected-none-label\" *ngIf=\"emptyText && facets.length === 0\">{{ emptyText }}</p>\n\n</div>\n\n<!-- Any Facet Elements Should be Added Here By User -->\n<div class=\"facets-region\">\n    <ng-content></ng-content>\n</div>"
            }] }
];
/** @nocollapse */
FacetContainerComponent.ctorParameters = () => [
    { type: LiveAnnouncer }
];
FacetContainerComponent.propDecorators = {
    header: [{ type: Input }],
    clearTooltip: [{ type: Input }],
    emptyText: [{ type: Input }],
    facets: [{ type: Input }],
    facetsReorderable: [{ type: Input }],
    facetsChange: [{ type: Output }],
    events: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FacetBaseComponent {
    /**
     * @param {?} facetContainer
     * @param {?} _elementRef
     */
    constructor(facetContainer, _elementRef) {
        this.facetContainer = facetContainer;
        this._elementRef = _elementRef;
        this.selected = [];
        this.selectedChange = new EventEmitter();
        this.events = new Subject();
        this._onDestroy = new Subject();
        if (facetContainer) {
            // subscribe to any deselect events from the facet container
            facetContainer.events.pipe(filter(event => event instanceof FacetDeselect), filter((event) => !!this.selected.find(facet => facet === event.facet)), takeUntil(this._onDestroy)).subscribe((event) => this.deselectFacet(event.facet));
            // subscribe to any deselect all events from facet container
            facetContainer.events.pipe(filter(event => event instanceof FacetDeselectAll), takeUntil(this._onDestroy)).subscribe(_ => this.deselectAll());
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // check if there should be any facets initially selected
        if (this.facetContainer) {
            this.selected.forEach(facet => this.facetContainer.selectFacet(facet));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    selectFacet(facet) {
        // if the facet is disabled it should not be selected
        if (facet.disabled) {
            return;
        }
        // add the facet to the list of selected facets
        this.selected.push(facet);
        // send the new value to the event emitter
        this.selectedChange.emit(this.selected);
        // fire the event to the observable
        this.triggerEvent(new FacetSelect(facet));
        // tell the facet container about the selected facet
        if (this.facetContainer) {
            this.facetContainer.selectFacet(facet);
        }
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    deselectFacet(facet) {
        // find facet to remove
        const /** @type {?} */ index = this.selected.findIndex(selectedFacet => selectedFacet === facet);
        // only continue if facet is found
        if (index !== -1) {
            // remove the facet from the selected list
            this.selected.splice(index, 1);
            // emit the changes to selected event emitter
            this.selectedChange.emit(this.selected);
            // fire the event to the observable
            this.triggerEvent(new FacetDeselect(facet));
            // deselect the facet in the facet container
            if (this.facetContainer) {
                this.facetContainer.deselectFacet(facet);
            }
        }
    }
    /**
     * @return {?}
     */
    deselectAll() {
        // remove all selected facets
        this.selected = [];
        // fire the event to the observable
        this.triggerEvent(new FacetDeselectAll());
        // emit the changes to the selected event emitter
        this.selectedChange.emit(this.selected);
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    toggleFacetSelection(facet) {
        // if the facet is selected then deselect - otherwise select it
        if (this.isFacetSelected(facet)) {
            this.deselectFacet(facet);
        }
        else {
            this.selectFacet(facet);
        }
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    isFacetSelected(facet) {
        // determine if a facet is currently selected
        return !!this.selected.find(selectedFacet => selectedFacet === facet);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    triggerEvent(event) {
        this.events.next(event);
    }
}
FacetBaseComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-base',
                template: ''
            }] }
];
/** @nocollapse */
FacetBaseComponent.ctorParameters = () => [
    { type: FacetContainerComponent, decorators: [{ type: Host }] },
    { type: ElementRef }
];
FacetBaseComponent.propDecorators = {
    selected: [{ type: Input }],
    selectedChange: [{ type: Output }],
    events: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FacetHeaderComponent {
    constructor() {
        this.canExpand = true;
        this.expanded = true;
        this.expandedChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    toggleExpand() {
        // if not expandable then do nothing
        if (this.canExpand) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
}
FacetHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-header',
                template: "<span class=\"facet-header-title\">{{ header }}</span>\n<span class=\"hpe-icon\" [class.hpe-down]=\"expanded\" [class.hpe-previous]=\"!expanded\" *ngIf=\"canExpand\"></span>",
                host: {
                    'role': 'button',
                    'tabindex': '0',
                    '(click)': 'toggleExpand()',
                    '(keyup.enter)': 'toggleExpand()',
                    '[attr.aria-expanded]': 'expanded',
                    '[attr.aria-label]': 'header + \' Facet: Activate to \' + (expanded ? \'collapse\' : \'expand\')'
                }
            }] }
];
FacetHeaderComponent.propDecorators = {
    header: [{ type: Input }],
    canExpand: [{ type: Input }],
    expanded: [{ type: Input }],
    expandedChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Facet {
    /**
     * @param {?} title
     * @param {?=} data
     * @param {?=} count
     * @param {?=} disabled
     * @param {?=} id
     */
    constructor(title, data = {}, count, disabled = false, id) {
        this.title = title;
        this.data = data;
        this.count = count;
        this.disabled = disabled;
        this.id = id;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FacetCheckListItemComponent {
    constructor() {
        this.facet = null;
        this.selected = false;
        this.tabbable = false;
        this.selectedChange = new EventEmitter();
        this.itemFocus = new EventEmitter();
        this.itemBlur = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this.facet && this.facet.disabled;
    }
    /**
     * @return {?}
     */
    getLabel() {
        return this.facet ? this.facet.title : '';
    }
    /**
     * @return {?}
     */
    focus() {
        this.option.nativeElement.focus();
    }
}
FacetCheckListItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-check-list-item',
                template: "<div #option\n    class=\"facet-check-list-item\"\n    [class.facet-active]=\"selected\"\n    [attr.aria-checked]=\"selected\"\n    role=\"option\"\n    [tabindex]=\"tabbable ? 0 : -1\"\n    (focus)=\"itemFocus.emit()\"\n    (blur)=\"itemBlur.emit()\"\n    (click)=\"selectedChange.emit(facet)\"\n    (keydown.enter)=\"selectedChange.emit(facet)\"\n    (keydown.space)=\"selectedChange.emit(facet); $event.preventDefault()\"\n    (keydown.spacebar)=\"selectedChange.emit(facet); $event.preventDefault()\"\n    [class.disabled]=\"facet?.disabled\">\n\n    <!-- Show check icon to indicate the state -->\n    <span class=\"facet-check-list-item-check\" aria-hidden=\"true\">\n        <span class=\"hpe-icon hpe-active\"></span>\n    </span>\n\n    <!-- Display the title -->\n    <span class=\"facet-check-list-item-title\">\n        {{ facet?.title }}\n    </span>\n\n    <!-- Display the count if specified -->\n    <span class=\"facet-check-list-item-count\"\n        *ngIf=\"facet?.count !== undefined\"\n        attr.aria-label=\"{{ facet?.count }}\"\n        i18n-aria-label>\n        ({{ facet?.count }})\n    </span>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
FacetCheckListItemComponent.propDecorators = {
    facet: [{ type: Input }],
    selected: [{ type: Input }],
    tabbable: [{ type: Input }],
    selectedChange: [{ type: Output }],
    itemFocus: [{ type: Output }],
    itemBlur: [{ type: Output }],
    option: [{ type: ViewChild, args: ['option',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FacetCheckListComponent extends FacetBaseComponent {
    constructor() {
        super(...arguments);
        this.facets = [];
        this.scrollbar = true;
        this.expanded = true;
        this.isFocused = false;
        this.activeIndex = 0;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._focusKeyManager = new FocusKeyManager(this.options)
            .withVerticalOrientation();
        this._focusKeyManager.change.pipe(takeUntil(this._onDestroy)).subscribe(index => this.activeIndex = index);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onFocus(index) {
        if (this._focusKeyManager.activeItemIndex === -1) {
            this._focusKeyManager.setActiveItem(index);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        this._focusKeyManager.onKeydown(event);
    }
    /**
     * @param {?} index
     * @param {?} facet
     * @return {?}
     */
    toggleFacet(index, facet) {
        this.toggleFacetSelection(facet);
        this._focusKeyManager.setActiveItem(index);
    }
}
FacetCheckListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-check-list',
                template: "<ux-facet-header [header]=\"header\" [(expanded)]=\"expanded\"></ux-facet-header>\n\n<!-- Create a container which will show when section is expanded -->\n<div class=\"facet-check-list-container\"\n    tabindex=\"-1\"\n    role=\"listbox\"\n    [class.facet-check-list-scrollbar]=\"scrollbar\"\n    [class.facet-check-list-scrollbar-focused]=\"isFocused\"\n    *ngIf=\"expanded\">\n\n    <!-- Iterate through each possible facet -->\n    <ux-facet-check-list-item *ngFor=\"let facet of facets; let index = index\"\n        [facet]=\"facet\"\n        [tabbable]=\"activeIndex === index\"\n        [selected]=\"isFacetSelected(facet)\"\n        (selectedChange)=\"toggleFacet(index, facet)\"\n        (keydown)=\"onKeydown($event)\"\n        (itemFocus)=\"isFocused = true; onFocus(index)\"\n        (itemBlur)=\"isFocused = false\">\n    </ux-facet-check-list-item>\n\n</div>"
            }] }
];
FacetCheckListComponent.propDecorators = {
    facets: [{ type: Input }],
    header: [{ type: Input }],
    scrollbar: [{ type: Input }],
    expanded: [{ type: Input }],
    options: [{ type: ViewChildren, args: [FacetCheckListItemComponent,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FacetTypeaheadListItemComponent {
    constructor() {
        this.selected = false;
        this.simplified = false;
        this.tabbable = false;
        this.itemFocus = new EventEmitter();
        this.selectedChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this.facet && this.facet.disabled;
    }
    /**
     * @return {?}
     */
    getLabel() {
        return this.facet ? this.facet.title : null;
    }
    /**
     * @return {?}
     */
    focus() {
        this.option.nativeElement.focus();
    }
}
FacetTypeaheadListItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-typeahead-list-item',
                template: "<div #option\n    role=\"option\"\n    class=\"facet-typeahead-list-selected-option\"\n    [attr.aria-checked]=\"selected\"\n    [tabindex]=\"tabbable ? 0 : -1\"\n    (focus)=\"itemFocus.emit()\"\n    (click)=\"selectedChange.emit(facet)\"\n    (keydown.enter)=\"selectedChange.emit(facet)\"\n    (keydown.space)=\"selectedChange.emit(facet); $event.preventDefault()\"\n    (keydown.spacebar)=\"selectedChange.emit(facet); $event.preventDefault()\">\n\n    <ux-checkbox [clickable]=\"false\" [value]=\"selected\" [simplified]=\"simplified\" [tabindex]=\"-1\" [disabled]=\"disabled\">\n        <span class=\"facet-typeahead-list-selected-option-title\">{{ facet?.title }}</span>\n        <span class=\"facet-typeahead-list-selected-option-count\">({{ facet?.count }})</span>\n    </ux-checkbox>\n\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
FacetTypeaheadListItemComponent.propDecorators = {
    facet: [{ type: Input }],
    selected: [{ type: Input }],
    simplified: [{ type: Input }],
    tabbable: [{ type: Input }],
    itemFocus: [{ type: Output }],
    selectedChange: [{ type: Output }],
    option: [{ type: ViewChild, args: ['option',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ uniqueId$1 = 1;
class FacetTypeaheadListComponent extends FacetBaseComponent {
    /**
     * @param {?} typeaheadKeyService
     * @param {?} facetContainer
     * @param {?} elementRef
     * @param {?} _announcer
     */
    constructor(typeaheadKeyService, facetContainer, elementRef, _announcer) {
        super(facetContainer, elementRef);
        this.typeaheadKeyService = typeaheadKeyService;
        this._announcer = _announcer;
        this.expanded = true;
        this.suggestions = [];
        this.simplified = true;
        this.query$ = new BehaviorSubject('');
        this.loading = false;
        this.activeIndex = 0;
        this.typeaheadId = `ux-facet-typeahead-${uniqueId$1++}`;
        this.typeaheadOpen = false;
        this.typeaheadOptions = [];
        this._config = { placeholder: '', maxResults: 50, minCharacters: 1 };
    }
    /**
     * @param {?} config
     * @return {?}
     */
    set typeaheadConfig(config) {
        this._config = Object.assign({ placeholder: '', maxResults: 50, minCharacters: 1 }, config);
    }
    /**
     * @return {?}
     */
    get typeaheadConfig() {
        return this._config;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // set up search query subscription
        this.query$.pipe(takeUntil(this._onDestroy), tap(() => {
            this.loading = true;
            this.typeaheadOptions = [];
        }), mergeMap(() => this.getFacetObservable().pipe(map(facets => {
            return facets.filter(facet => !facet.disabled && !this.selected.find(selectedFacet => selectedFacet === facet))
                .slice(0, this._config.maxResults);
        })))).subscribe(facets => {
            this.loading = false;
            this.typeaheadOptions = facets;
        });
        this._focusKeyManager = new FocusKeyManager(this.options).withVerticalOrientation();
        this._focusKeyManager.change.pipe(takeUntil(this._onDestroy)).subscribe(index => this.activeIndex = index);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        this._focusKeyManager.onKeydown(event);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    onFocus(index) {
        if (this._focusKeyManager.activeItemIndex === -1) {
            this._focusKeyManager.setActiveItem(index);
        }
    }
    /**
     * @param {?} index
     * @param {?} facet
     * @return {?}
     */
    toggleFacet(index, facet) {
        this.toggleFacetSelection(facet);
        this._focusKeyManager.setActiveItem(index);
    }
    /**
     * Only show typeahead if we have enough characters
     * @param {?=} query
     * @return {?}
     */
    updateTypeahead(query$$1 = '') {
        this.typeaheadOpen = query$$1.length >= this._config.minCharacters;
    }
    /**
     * @return {?}
     */
    getFacetObservable() {
        return this.facets instanceof Observable ? this.facets : of(this.facets);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    select(event) {
        // check to make sure that the item is not currently selected
        if (this.selected.find(facet => facet === event.option)) {
            return;
        }
        // select the facet
        this.selectFacet(event.option);
        // clear the typeahead
        this.query$.next('');
        // announce the selected facet
        this._announcer.announce(`${((/** @type {?} */ (event.option))).title} selected.`);
    }
}
FacetTypeaheadListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-typeahead-list',
                template: "<ux-facet-header [header]=\"header\" [(expanded)]=\"expanded\"></ux-facet-header>\n\n<div class=\"facet-typeahead-list-container\" role=\"listbox\" *ngIf=\"expanded\">\n\n    <div class=\"facet-typeahead-list-selected-container\" tabindex=\"-1\" *ngIf=\"suggestions?.length > 0\">\n\n        <ux-facet-typeahead-list-item\n            *ngFor=\"let facet of suggestions; let index = index\"\n            [facet]=\"facet\"\n            [tabbable]=\"activeIndex === index\"\n            [selected]=\"isFacetSelected(facet)\"\n            (selectedChange)=\"toggleFacet(index, facet)\"\n            (keydown)=\"onKeydown($event)\"\n            (itemFocus)=\"onFocus(index)\">\n        </ux-facet-typeahead-list-item>\n\n    </div>\n\n    <div class=\"facet-typeahead-list-control\">\n\n        <!-- Create Typeahead Control -->\n        <input type=\"text\"\n            class=\"form-control\"\n            [placeholder]=\"typeaheadConfig?.placeholder\"\n            [attr.aria-activedescendant]=\"highlightedElement?.id\"\n            aria-autocomplete=\"list\"\n            aria-multiline=\"false\"\n            [attr.aria-controls]=\"typeaheadId\"\n            [ngModel]=\"query$ | async\"\n            (ngModelChange)=\"query$.next($event); updateTypeahead($event)\"\n            (keydown)=\"typeaheadKeyService.handleKey($event, typeahead)\"\n            (blur)=\"typeaheadOpen = false\">\n\n        <ux-typeahead #typeahead\n            [id]=\"typeaheadId\"\n            [(open)]=\"typeaheadOpen\"\n            [loading]=\"loading\"\n            display=\"title\"\n            [options]=\"typeaheadOptions\"\n            [optionTemplate]=\"facetOptionTemplate\"\n            [selectOnEnter]=\"true\"\n            (optionSelected)=\"select($event)\"\n            (highlightedElementChange)=\"highlightedElement = $event\">\n        </ux-typeahead>\n\n    </div>\n\n</div>\n\n<ng-template #facetOptionTemplate let-option=\"option\" let-api=\"api\">\n    <p class=\"facet-typeahead-list-option\" [attr.aria-label]=\"option.title\">\n        <span [innerHTML]=\"option.title | facetTypeaheadHighlight: (query$ | async)\"></span>\n        <span class=\"facet-typeahead-list-option-count\"\n            *ngIf=\"option.count\">\n            ({{ option.count }})\n        </span>\n    </p>\n</ng-template>"
            }] }
];
/** @nocollapse */
FacetTypeaheadListComponent.ctorParameters = () => [
    { type: TypeaheadKeyService },
    { type: FacetContainerComponent },
    { type: ElementRef },
    { type: LiveAnnouncer }
];
FacetTypeaheadListComponent.propDecorators = {
    facets: [{ type: Input }],
    header: [{ type: Input }],
    expanded: [{ type: Input }],
    suggestions: [{ type: Input }],
    simplified: [{ type: Input }],
    typeaheadConfig: [{ type: Input }],
    options: [{ type: ViewChildren, args: [FacetTypeaheadListItemComponent,] }]
};
class FacetTypeaheadHighlight {
    /**
     * @param {?} value
     * @param {?} searchQuery
     * @return {?}
     */
    transform(value, searchQuery) {
        let /** @type {?} */ regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, `<b class="facet-typeahead-highlighted">${value.match(regex)}</b>`);
    }
}
FacetTypeaheadHighlight.decorators = [
    { type: Pipe, args: [{
                name: 'facetTypeaheadHighlight'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DECLARATIONS$1 = [
    FacetContainerComponent,
    FacetHeaderComponent,
    FacetBaseComponent,
    FacetCheckListComponent,
    FacetCheckListItemComponent,
    FacetTypeaheadListComponent,
    FacetTypeaheadListItemComponent,
    FacetTypeaheadHighlight
];
class FacetsModule {
}
FacetsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    A11yModule,
                    CommonModule,
                    FormsModule,
                    CheckboxModule,
                    TooltipModule,
                    ReorderableModule,
                    TypeaheadModule
                ],
                exports: DECLARATIONS$1,
                declarations: DECLARATIONS$1
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MenuNavigationService {
    constructor() {
        this.active$ = new BehaviorSubject(null);
    }
}
MenuNavigationService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MenuNavigationItemDirective {
    /**
     * @param {?} service
     * @param {?} _elementRef
     */
    constructor(service, _elementRef) {
        this._elementRef = _elementRef;
        this.activated = new EventEmitter();
        this._subscription = service.active$.subscribe((next) => {
            if (next === this) {
                this.setActive();
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    setActive() {
        this._elementRef.nativeElement.focus();
        this.activated.emit();
    }
}
MenuNavigationItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxMenuNavigationItem]'
            },] }
];
/** @nocollapse */
MenuNavigationItemDirective.ctorParameters = () => [
    { type: MenuNavigationService },
    { type: ElementRef }
];
MenuNavigationItemDirective.propDecorators = {
    activated: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MenuNavigationToggleDirective {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.menuPosition = 'bottom';
        this.menuOpenChange = new EventEmitter();
        this.keyEnter = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get menuOpen() {
        return this._menuOpen;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set menuOpen(value) {
        this._menuOpen = value;
        this.menuOpenChange.emit(value);
    }
    /**
     * @return {?}
     */
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keydownHandler(event) {
        if (this.isKeyMatch(event.key)) {
            // Open the menu
            this.menuOpen = true;
            // Allow the menu to init, then send the event to give it focus
            setTimeout(() => {
                this.keyEnter.emit();
            });
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * @param {?} key
     * @return {?}
     */
    isKeyMatch(key) {
        switch (key) {
            case 'Enter':
            case ' ':
                return true;
            case 'ArrowUp':
            case 'Up':
                return this.menuPosition === 'top';
            case 'ArrowDown':
            case 'Down':
                return this.menuPosition === 'bottom';
            case 'ArrowLeft':
            case 'Left':
                return this.menuPosition === 'left';
            case 'ArrowRight':
            case 'Right':
                return this.menuPosition === 'right';
        }
        return false;
    }
}
MenuNavigationToggleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxMenuNavigationToggle]',
                exportAs: 'uxMenuNavigationToggle'
            },] }
];
/** @nocollapse */
MenuNavigationToggleDirective.ctorParameters = () => [
    { type: ElementRef }
];
MenuNavigationToggleDirective.propDecorators = {
    menuOpen: [{ type: Input }],
    menuPosition: [{ type: Input }],
    menuOpenChange: [{ type: Output }],
    keydownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MenuNavigationDirective {
    /**
     * @param {?} _service
     * @param {?} _elementRef
     * @param {?} document
     */
    constructor(_service, _elementRef, document) {
        this._service = _service;
        this._elementRef = _elementRef;
        this.toggleButtonPosition = 'top';
        this.navigatedOut = new EventEmitter();
        this._subscription = new Subscription();
        this._document = document;
    }
    /**
     * @return {?}
     */
    get activeIndex() {
        return this._itemsOrdered.indexOf(this._service.active$.value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.toggleButton) {
            this._subscription.add(this.toggleButton.keyEnter.subscribe(this.focusFirst.bind(this)));
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._subscription.add(this.items.changes.subscribe(() => {
            this._itemsOrdered = this.items.toArray();
        }));
        this._itemsOrdered = this.items.toArray();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    focusFirst() {
        this.moveFirst();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keydownHandler(event) {
        // Only handle events when focus in within the list of menu items
        if (!this._elementRef.nativeElement.contains(this._document.activeElement)) {
            return;
        }
        let /** @type {?} */ handled = false;
        switch (event.key) {
            case 'ArrowUp':
            case 'Up':
                this.movePrevious(event);
                handled = true;
                break;
            case 'ArrowDown':
            case 'Down':
                this.moveNext(event);
                handled = true;
                break;
            case 'ArrowLeft':
            case 'Left':
                if (this.toggleButtonPosition === 'left') {
                    this.moveToToggleButton(event);
                    handled = true;
                }
                break;
            case 'ArrowRight':
            case 'Right':
                if (this.toggleButtonPosition === 'right') {
                    this.moveToToggleButton(event);
                    handled = true;
                }
                break;
            case 'Home':
                this.moveFirst();
                handled = true;
                break;
            case 'End':
                this.moveLast();
                handled = true;
                break;
            case 'Escape':
                this.navigatedOut.emit(event);
                handled = true;
                break;
        }
        if (handled) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    moveNext(event) {
        // Do nothing if there's no active menu item registered
        if (this.activeIndex < 0) {
            return;
        }
        const /** @type {?} */ nextIndex = this.activeIndex + 1;
        if (nextIndex < this._itemsOrdered.length) {
            // Activate the next menu item
            // (uxMenuNavigationItem subscribes to this and applies focus if it matches)
            this._service.active$.next(this._itemsOrdered[nextIndex]);
        }
        else {
            // Check if focus went out of bounds in the direction of the origin toggle button
            if (this.toggleButtonPosition === 'bottom') {
                this.moveToToggleButton(event);
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    movePrevious(event) {
        // Do nothing if there's no active menu item registered
        if (this.activeIndex < 0) {
            return;
        }
        const /** @type {?} */ nextIndex = this.activeIndex - 1;
        if (nextIndex >= 0) {
            // Activate the previous menu item
            // (uxMenuNavigationItem subscribes to this and applies focus if it matches)
            this._service.active$.next(this._itemsOrdered[nextIndex]);
        }
        else {
            // Check if focus went out of bounds in the direction of the origin toggle button
            if (this.toggleButtonPosition === 'top') {
                this.moveToToggleButton(event);
            }
        }
    }
    /**
     * @return {?}
     */
    moveFirst() {
        if (this._itemsOrdered.length > 0) {
            this._service.active$.next(this._itemsOrdered[0]);
        }
    }
    /**
     * @return {?}
     */
    moveLast() {
        if (this._itemsOrdered.length > 0) {
            this._service.active$.next(this._itemsOrdered[this._itemsOrdered.length - 1]);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    moveToToggleButton(event) {
        if (this.toggleButton) {
            this.toggleButton.focus();
            this.toggleButton.menuOpen = false;
        }
        this.navigatedOut.emit(event);
    }
}
MenuNavigationDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxMenuNavigation]',
                exportAs: 'uxMenuNavigation',
                providers: [MenuNavigationService]
            },] }
];
/** @nocollapse */
MenuNavigationDirective.ctorParameters = () => [
    { type: MenuNavigationService },
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
MenuNavigationDirective.propDecorators = {
    toggleButton: [{ type: Input }],
    toggleButtonPosition: [{ type: Input }],
    navigatedOut: [{ type: Output }],
    items: [{ type: ContentChildren, args: [MenuNavigationItemDirective, { descendants: true },] }],
    keydownHandler: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ EXPORTS = [
    MenuNavigationDirective,
    MenuNavigationItemDirective,
    MenuNavigationToggleDirective
];
class MenuNavigationModule {
}
MenuNavigationModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: EXPORTS,
                declarations: EXPORTS,
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FilterContainerComponent {
    constructor() {
        this.filters = [];
        this.filtersChange = new EventEmitter();
        this.events = new EventEmitter();
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    addFilter(filter$$1) {
        this.filters.push(filter$$1);
        this.events.next(new FilterAddEvent(filter$$1));
        this.filtersChange.emit(this.filters);
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    removeFilter(filter$$1) {
        let /** @type {?} */ idx = this.filters.findIndex(filters => filters === filter$$1);
        if (idx !== -1) {
            this.filters.splice(idx, 1);
            this.events.next(new FilterRemoveEvent(filter$$1));
            this.filtersChange.emit(this.filters);
        }
    }
    /**
     * @return {?}
     */
    removeAll() {
        this.events.next(new FilterRemoveAllEvent());
    }
}
FilterContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-filter-container',
                template: "<ng-content></ng-content>\n\n<!-- Add a Clear Button -->\n<button class=\"btn btn-link btn-icon btn-secondary m-l-xs\"\n    tabindex=\"0\"\n    aria-label=\"Clear all filters\"\n    i18n-aria-label\n    *ngIf=\"filters.length > 0\"\n    [uxTooltip]=\"clearTooltip || 'Clear All'\"\n    (click)=\"removeAll()\">\n\n    <svg class=\"filter-selected-clear-graphic\" width=\"100%\" viewBox=\"0 0 19 12\" shape-rendering=\"geometricPrecision\">\n        <rect class=\"light-grey\" x=\"0\" y=\"2\" width=\"7\" height=\"2\"></rect>\n        <rect class=\"dark-grey\" x=\"0\" y=\"5\" width=\"9\" height=\"2\"></rect>\n        <rect class=\"light-grey\" x=\"0\" y=\"8\" width=\"7\" height=\"2\"></rect>\n        <path class=\"dark-grey\" d=\"M9,1 h1 l9,9 v1 h-1 l-9,-9 v-1 Z\"></path>\n        <path class=\"dark-grey\" d=\"M9,11 v-1 l9,-9 h1 v1 l-9,9 h-1 Z\"></path>\n    </svg>\n\n</button>"
            }] }
];
FilterContainerComponent.propDecorators = {
    filters: [{ type: Input }],
    clearTooltip: [{ type: Input }],
    filtersChange: [{ type: Output }],
    events: [{ type: Output }]
};
class FilterAddEvent {
    /**
     * @param {?} filter
     */
    constructor(filter$$1) {
        this.filter = filter$$1;
    }
}
class FilterRemoveEvent {
    /**
     * @param {?} filter
     */
    constructor(filter$$1) {
        this.filter = filter$$1;
    }
}
class FilterRemoveAllEvent {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FilterBaseComponent {
    /**
     * @param {?} filtersContainer
     * @param {?} _announcer
     */
    constructor(filtersContainer, _announcer) {
        this.filtersContainer = filtersContainer;
        this._announcer = _announcer;
        this._subscription = filtersContainer.events.pipe(filter(event => event instanceof FilterRemoveAllEvent)).subscribe(this.removeFilter.bind(this));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} _filter
     * @return {?}
     */
    addFilter(_filter) {
        if (!_filter.initial) {
            this.filtersContainer.addFilter(_filter);
            this._announcer.announce(`Filter ${_filter.name} selected.`);
        }
    }
    /**
     * @param {?} _filter
     * @return {?}
     */
    removeFilter(_filter) {
        if (!_filter) {
            return;
        }
        this.filtersContainer.removeFilter(_filter);
        this._announcer.announce(`Filter ${_filter.name} deselected.`);
    }
}
FilterBaseComponent.decorators = [
    { type: Directive, args: [{
                selector: 'ux-filter-base'
            },] }
];
/** @nocollapse */
FilterBaseComponent.ctorParameters = () => [
    { type: FilterContainerComponent, decorators: [{ type: Host }] },
    { type: LiveAnnouncer }
];
FilterBaseComponent.propDecorators = {
    filters: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FilterDropdownComponent extends FilterBaseComponent {
    /**
     * @return {?}
     */
    removeFilter() {
        super.removeFilter(this.selected);
        this.selected = this.initial;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selected = this.initial;
    }
    /**
     * @param {?} filter
     * @param {?} event
     * @return {?}
     */
    selectFilter(filter$$1, event) {
        this.removeFilter();
        this.selected = filter$$1;
        this.addFilter(this.selected);
        event.stopPropagation();
        event.preventDefault();
    }
}
FilterDropdownComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-filter-dropdown',
                template: "<div class=\"btn-group\" dropdown [autoClose]=\"true\" #dropdown=\"bs-dropdown\">\n\n    <button\n        type=\"button\"\n        tabindex=\"0\"\n        dropdownToggle\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"dropdown.isOpen\"\n        aria-haspopup=\"true\"\n        [attr.aria-expanded]=\"dropdown.isOpen\"\n        class=\"filter-dropdown btn dropdown-toggle\"\n        [class.active]=\"selected !== initial\">\n        {{ selected?.title }}\n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n\n    <ul *dropdownMenu\n        uxMenuNavigation\n        [toggleButton]=\"menuNavigationToggle\"\n        class=\"dropdown-menu\" role=\"menu\">\n\n        <li class=\"dropdown-list-item\"\n            *ngFor=\"let filter of filters\"\n            role=\"none\">\n\n            <a class=\"dropdown-item\"\n                role=\"listitem\"\n                tabindex=\"-1\"\n                uxMenuNavigationItem\n                [attr.aria-selected]=\"filter === selected\"\n                (click)=\"selectFilter(filter, $event); dropdown.hide(); menuNavigationToggle.focus()\"\n                (keydown.enter)=\"selectFilter(filter, $event); dropdown.hide(); menuNavigationToggle.focus()\">\n\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n            </a>\n        </li>\n    </ul>\n</div>"
            }] }
];
FilterDropdownComponent.propDecorators = {
    initial: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ uniqueId$2 = 1;
class FilterDynamicComponent extends FilterBaseComponent {
    /**
     * @param {?} typeaheadKeyService
     * @param {?} container
     * @param {?} announcer
     */
    constructor(typeaheadKeyService, container, announcer) {
        super(container, announcer);
        this.typeaheadKeyService = typeaheadKeyService;
        this.defaultOptions = {
            placeholder: '',
            minCharacters: 3,
            maxResults: Infinity
        };
        this.typeaheadId = `ux-filter-dynamic-typeahead-${uniqueId$2++}`;
        this.query$ = new BehaviorSubject('');
        this.showTypeahead = true;
        this.typeaheadItems = [];
        this.typeaheadOpen = false;
        this._config = Object.assign({}, this.defaultOptions);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) {
        this._config = Object.assign({}, this.defaultOptions, options);
    }
    /**
     * @return {?}
     */
    get options() {
        return this._config;
    }
    /**
     * @return {?}
     */
    getItems() {
        const /** @type {?} */ query$$1 = this.query$.value.toLowerCase();
        return this.filters.filter(item => item !== this.initial && item.name.toLowerCase().indexOf(query$$1) !== -1)
            .map(item => item.name)
            .slice(0, this._config.maxResults);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.selected = this.initial;
        this.typeaheadItems = this.getItems();
        if (this.options && this.options.maxIndividualItems && this.options.maxIndividualItems + 1 >= this.filters.length) {
            this.showTypeahead = false;
        }
    }
    /**
     * @param {?} typeaheadOption
     * @return {?}
     */
    selectOption(typeaheadOption) {
        this.removeFilter();
        const /** @type {?} */ idx = this.filters.findIndex(filter$$1 => filter$$1.name === typeaheadOption.value);
        this.selected = this.filters[idx];
        this.addFilter(this.selected);
        this.query$.next('');
        this.dropdown.hide();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickOff(event) {
        let /** @type {?} */ target = /** @type {?} */ (event.target);
        let /** @type {?} */ hideDropdown = true;
        while (target && target.nodeName !== 'BODY') {
            if (target.classList.contains('ux-dynamic-filter')) {
                hideDropdown = false;
                break;
            }
            else {
                target = target.parentElement;
            }
        }
        if (hideDropdown) {
            this.query$.next('');
            this.dropdown.hide();
        }
    }
    /**
     * @return {?}
     */
    removeFilter() {
        if (this.selected !== this.initial) {
            super.removeFilter(this.selected);
            this.selected = this.initial;
        }
        this.query$.next('');
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    selectFilter(filter$$1) {
        this.removeFilter();
        this.selected = filter$$1;
        this.addFilter(this.selected);
    }
    /**
     * @param {?} query
     * @return {?}
     */
    updateTypeahead(query$$1) {
        this.typeaheadOpen = query$$1.length >= this._config.minCharacters;
        this.typeaheadItems = this.getItems();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    select(event) {
        // find the filter with the matching name
        const /** @type {?} */ filter$$1 = this.filters.find(_filter => _filter.name === event.option);
        if (filter$$1) {
            this.selectFilter(filter$$1);
        }
    }
}
FilterDynamicComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-filter-dynamic',
                template: "<div class=\"btn-group ux-dynamic-filter\"\n    dropdown\n    [autoClose]=\"true\"\n    #dynamicDropdown=\"bs-dropdown\">\n\n    <button\n        type=\"button\"\n        tabindex=\"0\"\n        dropdownToggle\n        aria-haspopup=\"true\"\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"dynamicDropdown.isOpen\"\n        [attr.aria-expanded]=\"dynamicDropdown.isOpen\"\n        [class.active]=\"selected !== initial\"\n        class=\"filter-dropdown btn dropdown-toggle\">\n        {{ selected?.title }}\n        <span class=\"hpe-icon hpe-down\"></span>\n    </button>\n\n    <ul *dropdownMenu\n        class=\"dropdown-menu\"\n        role=\"menu\"\n        uxMenuNavigation\n        [toggleButton]=\"menuNavigationToggle\">\n\n        <li class=\"dropdown-list-item\"\n            *ngIf=\"showTypeahead\"\n            role=\"none\">\n\n            <a class=\"dropdown-item\"\n                role=\"menuitem\"\n                tabindex=\"-1\"\n                uxMenuNavigationItem\n                [attr.aria-selected]=\"initial === selected\"\n                (click)=\"removeFilter(); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                (keydown.enter)=\"removeFilter(); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\">\n\n                <i class=\"hpe-icon\" [class.hpe-checkmark]=\"initial === selected\"></i>\n                <span class=\"filter-dropdown-title\">{{ initial.name }}</span>\n            </a>\n        </li>\n\n        <li class=\"dropdown-list-item\"\n            *ngIf=\"selected !== initial && showTypeahead\"\n            role=\"none\">\n\n            <a class=\"dropdown-item\"\n                role=\"menuitem\"\n                tabindex=\"-1\"\n                uxMenuNavigationItem>\n                <i class=\"hpe-icon hpe-checkmark\"></i>\n                <span class=\"filter-dropdown-title\">{{ selected.name }}</span>\n            </a>\n        </li>\n\n        <hr>\n\n        <li *ngIf=\"showTypeahead\" class=\"typeahead-box\" role=\"none\">\n\n                <input type=\"text\"\n                    class=\"form-control\"\n                    [placeholder]=\"options?.placeholder || defaultOptions.placeholder\"\n                    [attr.aria-activedescendant]=\"highlightedElement?.id\"\n                    [attr.aria-controls]=\"typeaheadId\"\n                    aria-autocomplete=\"list\"\n                    aria-multiline=\"false\"\n                    [ngModel]=\"query$ | async\"\n                    (ngModelChange)=\"query$.next($event); updateTypeahead($event)\"\n                    (keydown)=\"typeaheadKeyService.handleKey($event, typeahead); $event.stopPropagation();\"\n                    (keydown.enter)=\"$event.preventDefault()\"\n                    (blur)=\"typeaheadOpen = false\"\n                    (click)=\"$event.stopPropagation()\">\n\n                <ux-typeahead #typeahead\n                    [id]=\"typeaheadId\"\n                    [(open)]=\"typeaheadOpen\"\n                    display=\"title\"\n                    [selectOnEnter]=\"true\"\n                    [options]=\"typeaheadItems\"\n                    [optionTemplate]=\"filterOptionTemplate\"\n                    (optionSelected)=\"select($event); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                    (highlightedElementChange)=\"highlightedElement = $event\">\n                </ux-typeahead>\n        </li>\n\n        <ng-container *ngIf=\"!showTypeahead\">\n\n            <li class=\"dropdown-list-item\"\n                *ngFor=\"let filter of filters\"\n                role=\"none\">\n\n                <a class=\"dropdown-item\"\n                    role=\"menuitem\"\n                    tabindex=\"-1\"\n                    uxMenuNavigationItem\n                    [attr.aria-selected]=\"filter === selected\"\n                    (click)=\"selectFilter(filter); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\"\n                    (keydown.enter)=\"selectFilter(filter); $event.stopPropagation(); $event.preventDefault(); dynamicDropdown.hide(); menuNavigationToggle.focus()\">\n\n                    <i class=\"hpe-icon\" [class.hpe-checkmark]=\"filter === selected\"></i>\n                    <span class=\"filter-dropdown-title\">{{ filter.name }}</span>\n                </a>\n            </li>\n\n        </ng-container>\n\n    </ul>\n</div>\n\n<ng-template #filterOptionTemplate let-option=\"option\" let-api=\"api\">\n    <span [attr.aria-label]=\"option\" [innerHTML]=\"option | filterTypeaheadHighlight: (query$ | async)\"></span>\n</ng-template>",
                host: {
                    '(document:click)': 'clickOff($event)',
                }
            }] }
];
/** @nocollapse */
FilterDynamicComponent.ctorParameters = () => [
    { type: TypeaheadKeyService },
    { type: FilterContainerComponent },
    { type: LiveAnnouncer }
];
FilterDynamicComponent.propDecorators = {
    filters: [{ type: Input }],
    initial: [{ type: Input }],
    options: [{ type: Input }],
    dropdown: [{ type: ViewChild, args: [BsDropdownDirective,] }]
};
class FilterTypeaheadHighlight {
    /**
     * @param {?} value
     * @param {?} searchQuery
     * @return {?}
     */
    transform(value, searchQuery) {
        const /** @type {?} */ regex = new RegExp(searchQuery, 'i');
        return value.replace(regex, `<b class="filter-typeahead-highlighted">${value.match(regex)}</b>`);
    }
}
FilterTypeaheadHighlight.decorators = [
    { type: Pipe, args: [{
                name: 'filterTypeaheadHighlight'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DECLARATIONS$2 = [
    FilterBaseComponent,
    FilterContainerComponent,
    FilterDropdownComponent,
    FilterDynamicComponent,
    FilterTypeaheadHighlight
];
class FilterModule {
}
FilterModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    BsDropdownModule.forRoot(),
                    TooltipModule,
                    FormsModule,
                    MenuNavigationModule,
                    CommonModule,
                    TypeaheadModule,
                    A11yModule
                ],
                exports: DECLARATIONS$2,
                declarations: DECLARATIONS$2
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FlippableCardComponent {
    constructor() {
        this.direction = 'horizontal';
        this.trigger = 'hover';
        this.width = 280;
        this.height = 200;
        this.flipped = false;
        this.flippedChange = new EventEmitter();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    setFlipped(state$$1) {
        this.flipped = state$$1;
        this.flippedChange.emit(this.flipped);
    }
    /**
     * @return {?}
     */
    toggleFlipped() {
        this.setFlipped(!this.flipped);
    }
    /**
     * @return {?}
     */
    clickTrigger() {
        // add or remove the class depending on whether or not the card has been flipped
        if (this.trigger === 'click') {
            this.toggleFlipped();
        }
    }
    /**
     * @return {?}
     */
    hoverEnter() {
        // if the trigger is hover then begin to flip
        if (this.trigger === 'hover') {
            this.setFlipped(true);
        }
    }
    /**
     * @return {?}
     */
    hoverExit() {
        if (this.trigger === 'hover') {
            this.setFlipped(false);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        if (this.trigger !== 'manual') {
            this.toggleFlipped();
            event.preventDefault();
        }
    }
}
FlippableCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-flippable-card',
                template: "<div class=\"ux-flipper\"\n     [class.ux-flip-card]=\"flipped\"\n     [style.width.px]=\"width\"\n     [style.height.px]=\"height\">\n\n    <div class=\"ux-flippable-card-front\"\n         [style.width.px]=\"width\"\n         [style.height.px]=\"height\"\n         [attr.aria-hidden]=\"flipped\">\n\n        <ng-content select=\"ux-flippable-card-front\"></ng-content>\n    </div>\n\n    <div class=\"ux-flippable-card-back\"\n         [style.width.px]=\"width\"\n         [style.height.px]=\"height\"\n         [attr.aria-hidden]=\"!flipped\">\n\n        <ng-content select=\"ux-flippable-card-back\"></ng-content>\n    </div>\n</div>",
                host: {
                    'tabindex': '0',
                    '[class.horizontal]': 'direction === "horizontal"',
                    '[class.vertical]': 'direction === "vertical"'
                },
                exportAs: 'ux-flippable-card'
            }] }
];
FlippableCardComponent.propDecorators = {
    direction: [{ type: Input }],
    trigger: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    flipped: [{ type: Input }],
    flippedChange: [{ type: Output }],
    clickTrigger: [{ type: HostListener, args: ['click',] }],
    hoverEnter: [{ type: HostListener, args: ['mouseenter',] }],
    hoverExit: [{ type: HostListener, args: ['mouseleave',] }],
    onKeyDown: [{ type: HostListener, args: ['keydown.enter', ['$event'],] }, { type: HostListener, args: ['keydown.space', ['$event'],] }, { type: HostListener, args: ['keydown.spacebar', ['$event'],] }]
};
class FlippableCardFrontDirective {
}
FlippableCardFrontDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ux-flippable-card-front'
            },] }
];
class FlippableCardBackDirective {
}
FlippableCardBackDirective.decorators = [
    { type: Directive, args: [{
                selector: 'ux-flippable-card-back'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FlippableCardModule {
}
FlippableCardModule.decorators = [
    { type: NgModule, args: [{
                exports: [FlippableCardComponent, FlippableCardBackDirective, FlippableCardFrontDirective],
                declarations: [FlippableCardComponent, FlippableCardBackDirective, FlippableCardFrontDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FloatingActionButtonsService {
    constructor() {
        this.open$ = new BehaviorSubject(false);
    }
    /**
     * @return {?}
     */
    open() {
        this.open$.next(true);
    }
    /**
     * @return {?}
     */
    toggle() {
        this.open$.next(!this.open$.getValue());
    }
    /**
     * @return {?}
     */
    close() {
        this.open$.next(false);
    }
}
FloatingActionButtonsService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FloatingActionButtonsComponent {
    /**
     * @param {?} fab
     * @param {?} _elementRef
     */
    constructor(fab, _elementRef) {
        this.fab = fab;
        this._elementRef = _elementRef;
        this.direction = 'top';
        this.openChange = new EventEmitter();
        this._subscription = new Subscription();
        this._subscription.add(this.fab.open$.subscribe(value => this.openChange.emit(value)));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._subscription.add(this.fab.open$.pipe(filter(open => open === false))
            .subscribe(() => this.tooltips.forEach(tooltip => tooltip.hide())));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} target
     * @return {?}
     */
    close(target) {
        if (!this._elementRef.nativeElement.contains(target)) {
            this.fab.close();
        }
    }
}
FloatingActionButtonsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-floating-action-buttons',
                template: "<ng-content select=\"[fab-primary]\"></ng-content>\n\n<div class=\"floating-action-button-list\" [@fabAnimation]=\"fab.open$ | async\" [ngClass]=\"direction\" *ngIf=\"fab.open$ | async\">\n    <ng-content></ng-content>\n</div>",
                providers: [FloatingActionButtonsService],
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false,
                animations: [
                    trigger('fabAnimation', [
                        transition('void => true', [
                            query('ux-floating-action-button', style({ opacity: 0 })),
                            query('ux-floating-action-button', stagger(50, animate(250, style({ opacity: 1 }))))
                        ]),
                        transition('true => void', [
                            query('ux-floating-action-button', stagger(-50, animate(250, style({ opacity: 0 }))))
                        ])
                    ])
                ]
            }] }
];
/** @nocollapse */
FloatingActionButtonsComponent.ctorParameters = () => [
    { type: FloatingActionButtonsService },
    { type: ElementRef }
];
FloatingActionButtonsComponent.propDecorators = {
    direction: [{ type: Input }],
    tooltips: [{ type: ContentChildren, args: [TooltipDirective,] }],
    openChange: [{ type: Output }],
    close: [{ type: HostListener, args: ['document:click', ['$event.target'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FloatingActionButtonComponent {
    /**
     * @param {?} primary
     * @param {?} fab
     */
    constructor(primary, fab) {
        this.fab = fab;
        this.tabindex = 1;
        this.primary = false;
        this.primary = primary !== null;
    }
}
FloatingActionButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-floating-action-button',
                template: "<button class=\"btn floating-action-button\" \n        [class.button-primary]=\"primary\" \n        [class.button-secondary]=\"!primary\" \n        (click)=\"primary ? fab.toggle() : fab.close()\">\n\n    <span class=\"hpe-icon floating-action-button-icon\" *ngIf=\"icon\" [ngClass]=\"icon\"></span>\n    <ng-content *ngIf=\"!icon\"></ng-content>\n\n</button>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                preserveWhitespaces: false
            }] }
];
/** @nocollapse */
FloatingActionButtonComponent.ctorParameters = () => [
    { type: String, decorators: [{ type: Attribute, args: ['fab-primary',] }] },
    { type: FloatingActionButtonsService }
];
FloatingActionButtonComponent.propDecorators = {
    icon: [{ type: Input }],
    tabindex: [{ type: HostBinding }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FloatingActionButtonsModule {
}
FloatingActionButtonsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    FloatingActionButtonsComponent,
                    FloatingActionButtonComponent
                ],
                declarations: [
                    FloatingActionButtonsComponent,
                    FloatingActionButtonComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HierarchyBarService {
    constructor() {
        this.nodes$ = new BehaviorSubject([]);
        this._nodes = [];
    }
    /**
     * Store the root node of the hierarchy tree
     * @param {?} root
     * @return {?}
     */
    setRootNode(root) {
        // store the root node
        this._root = root;
        // create a flat structure of nodes
        this._nodes = this.getNodeList(root);
        // flatten the array - based on the selected node
        this.nodes$.next(this.getSelectedChildren(root));
    }
    /**
     * Select a node. This causes all nodes to be
     * deselected and the path to the selected node
     * to be selected
     * @param {?} node
     * @return {?}
     */
    selectNode(node) {
        // deselect all nodes
        this.deselectAll();
        // ensure the current node is selected and its parents
        this.select(node);
        // emit a new node list to trigger change detection
        this.nodes$.next(this.getSelectedChildren(this._root));
    }
    /**
     * Handles getting children with support for both arrays and observables
     * @param {?} node
     * @return {?}
     */
    getChildren(node) {
        if (Array.isArray(node.children)) {
            return of({ loading: false, children: node.children });
        }
        const /** @type {?} */ children$ = node.children;
        // if it is an observable then handle loading
        return Observable.create((observer) => {
            // emit initial value
            observer.next({ loading: true, children: [] });
            // now wait until the children observable completes
            children$.pipe(first()).subscribe(children => {
                // replace the observable with an array for future loading
                node.children = children;
                // rebuild the node tree
                this.setRootNode(this._root);
                // emit the latest value
                observer.next({ loading: false, children: children });
                // close the observable stream
                observer.complete();
            });
        });
    }
    /**
     * Traverses all the parents to ensure they are selected
     * @param {?} node
     * @return {?}
     */
    select(node) {
        node.selected = true;
        if (node.parent) {
            this.select(node.parent);
        }
    }
    /**
     * Deselects all nodes
     * @return {?}
     */
    deselectAll() {
        this._nodes.forEach(node => node.selected = false);
    }
    /**
     * Gets all the nodes in the tree as a flat array.
     * It also stores the parent node in a parent property
     * on the node for easy traversal in both directions
     * @param {?} node
     * @return {?}
     */
    getNodeList(node) {
        // if there are no children then return only itself
        if (!node.children || node.children instanceof Observable || node.children.length === 0) {
            return [node];
        }
        // store the parent property
        node.children.forEach(child => child.parent = node);
        // get all descendants of this node
        const /** @type {?} */ descendants = node.children.reduce((nodes, current) => [...nodes, ...this.getNodeList(current)], []);
        return [node, ...descendants];
    }
    /**
     * Gets all selected nodes from the parent node.
     * @param {?} node
     * @return {?}
     */
    getSelectedChildren(node) {
        if (node.children instanceof Observable) {
            return [node];
        }
        // get the children - and account for when there is none
        const /** @type {?} */ children = node.children || [];
        // check if any child is selected
        const /** @type {?} */ child = children.find(_child => _child.selected);
        // return the remaining chain of selected items
        return child ? [node, ...this.getSelectedChildren(child)] : [node];
    }
}
HierarchyBarService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HierarchyBarComponent {
    /**
     * @param {?} hierarchyBar
     */
    constructor(hierarchyBar) {
        this.hierarchyBar = hierarchyBar;
        this.selectedChange = new EventEmitter();
        this.overflow$ = new BehaviorSubject(false);
        this.overflowNodes$ = new BehaviorSubject([]);
        this._subscription = new Subscription();
        // subscribe to changes in the selected node
        const /** @type {?} */ selected = hierarchyBar.nodes$.subscribe(nodes => this.selectedChange.emit(nodes.length === 0 ? null : nodes[nodes.length - 1]));
        const /** @type {?} */ changed = hierarchyBar.nodes$.pipe(debounceTime(0)).subscribe(() => this.scrollIntoView());
        // store subscriptions
        this._subscription.add(selected);
        this._subscription.add(changed);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    set root(node) {
        this.hierarchyBar.setRootNode(node);
    }
    /**
     * @param {?} node
     * @return {?}
     */
    set selected(node) {
        this.hierarchyBar.selectNode(node);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * When there is overflow ensure that the rightmost
     * node remains in view at all times. The nodes no longer
     * visible be be displayed in a popover available on the
     * overflow indicator
     * @return {?}
     */
    scrollIntoView() {
        if (!this.nodelist) {
            return;
        }
        // get the native element
        const { nativeElement } = this.nodelist;
        // emit whether or not there is overflow
        this.overflow$.next(nativeElement.scrollWidth > nativeElement.offsetWidth);
        // if the hierarchy bar contents do not overflow then do nothing
        if (nativeElement.scrollWidth > nativeElement.offsetWidth) {
            // determine the amount of overflow
            const /** @type {?} */ overflowAmount = nativeElement.scrollWidth - nativeElement.offsetWidth;
            // determine which nodes are not fully visible
            this.overflowNodes$.next(this.nodes.filter(node => node.nativeElement.offsetLeft < overflowAmount)
                .map((node, index) => this.hierarchyBar.nodes$.value[index]));
            // move the scroll position to always show the last itme
            this.nodelist.nativeElement.scrollLeft = overflowAmount;
        }
    }
}
HierarchyBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-hierarchy-bar',
                template: "<!-- Allow content to be placed on the left of the items -->\n<aside class=\"hierarchy-bar-addons\">\n    <ng-content select=\"[uxHierarchyBarLeftAddon]\"></ng-content>\n</aside>\n\n<main #nodelist class=\"hierarchy-bar-nodes\" (uxResize)=\"scrollIntoView()\">\n\n    <div *ngIf=\"overflow$ | async\"\n         #popover=\"ux-popover\"\n         class=\"hierarchy-bar-overflow-indicator\"\n         [style.left.px]=\"nodelist.scrollLeft\"\n         [uxPopover]=\"overflow\"\n         [popoverContext]=\"{ popover: popover }\"\n         placement=\"bottom\"\n         popoverClass=\"hierarchy-bar-popover\">\n        . . .\n    </div>\n\n    <div #nodeElement class=\"hierarchy-bar-node\"\n         *ngFor=\"let node of hierarchyBar.nodes$ | async\">\n\n        <button class=\"hierarchy-bar-node-content\"\n                [attr.aria-label]=\"node.title\"\n                (click)=\"hierarchyBar.selectNode(node)\">\n\n            <!-- Show an icon if specifed -->\n            <img class=\"hierarchy-bar-node-icon\" *ngIf=\"node.icon\" [src]=\"node.icon\" alt=\"Hierarchy Bar Icon\">\n\n            <!-- Show the name of the current node -->\n            <span class=\"hierarchy-bar-node-title\">{{ node.title }}</span>\n\n        </button>\n\n        <!-- Show a dropdown arrow if there are children -->\n        <button *ngIf=\"node.children\"\n              #popover=\"ux-popover\"\n              aria-label=\"Show children\"\n              role=\"button\"\n              class=\"hierarchy-bar-node-arrow hpe-icon hpe-next\"\n              [uxPopover]=\"content\"\n              [popoverContext]=\"{ node: node, popover: popover }\"\n              placement=\"bottom\"\n              popoverClass=\"hierarchy-bar-popover\"\n              tabindex=\"0\">\n        </button>\n\n    </div>\n\n</main>\n\n<!-- Allow content to be placed on the right of the items -->\n<aside class=\"hierarchy-bar-addons\">\n    <ng-content select=\"[uxHierarchyBarRightAddon]\"></ng-content>\n</aside>\n\n<!-- Template for the popover list -->\n<ng-template #content let-node=\"node\" let-popover=\"popover\">\n\n    <!-- Loading Indicator -->\n    <ul class=\"hierarchy-bar-node-list\" *ngIf=\"(hierarchyBar.getChildren(node) | async).loading\">\n\n        <li class=\"hierarchy-bar-node-list-item\">\n            <ng-container [ngTemplateOutlet]=\"loadingIndicator || defaultLoadingIndicator\"></ng-container>\n        </li>\n    </ul>\n\n    <!-- List of children -->\n    <ul class=\"hierarchy-bar-node-list\" *ngIf=\"!(hierarchyBar.getChildren(node) | async).loading\">\n\n        <li *ngFor=\"let child of (hierarchyBar.getChildren(node) | async).children; let first = first\"\n            class=\"hierarchy-bar-node-list-item\"\n            [focusIf]=\"first\"\n            tabindex=\"0\"\n            (keydown.enter)=\"hierarchyBar.selectNode(child); popover.hide()\"\n            (click)=\"hierarchyBar.selectNode(child); popover.hide()\">\n\n            <!-- Show an icon if specifed -->\n            <img class=\"hierarchy-bar-node-icon\" *ngIf=\"child.icon\" [src]=\"child.icon\" alt=\"Hierarchy Bar Icon\">\n\n            <!-- Show the name of the current node -->\n            <span class=\"hierarchy-bar-node-title\">{{ child.title }}</span>\n\n        </li>\n\n    </ul>\n</ng-template>\n\n<!-- Template for the overflow popover list -->\n<ng-template #overflow let-popover=\"popover\">\n\n    <ul class=\"hierarchy-bar-node-list\">\n\n        <li *ngFor=\"let child of overflowNodes$ | async; let first = first\"\n            class=\"hierarchy-bar-node-list-item\"\n            tabindex=\"0\"\n            [focusIf]=\"first\"\n            (click)=\"hierarchyBar.selectNode(child); popover.hide()\"\n            (keydown.enter)=\"hierarchyBar.selectNode(child); popover.hide()\">\n\n            <!-- Show an icon if specifed -->\n            <img class=\"hierarchy-bar-node-icon\" *ngIf=\"child.icon\" [src]=\"child.icon\" alt=\"Hierarchy Bar Icon\">\n\n            <!-- Show the name of the current node -->\n            <span class=\"hierarchy-bar-node-title\">{{ child.title }}</span>\n\n        </li>\n\n    </ul>\n</ng-template>\n\n<!-- Loading Indicator Template -->\n<ng-template #defaultLoadingIndicator>\n    <div class=\"hierarchy-bar-node-icon\" alt=\"Hierarchy Bar Loading Indicator\">\n        <div class=\"spinner spinner-accent spinner-bounce-middle\"></div>\n    </div>\n\n    <!-- Show the name of the current node -->\n    <span class=\"hierarchy-bar-node-title\">Loading...</span>\n</ng-template>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                viewProviders: [HierarchyBarService]
            }] }
];
/** @nocollapse */
HierarchyBarComponent.ctorParameters = () => [
    { type: HierarchyBarService }
];
HierarchyBarComponent.propDecorators = {
    root: [{ type: Input }],
    selected: [{ type: Input }],
    loadingIndicator: [{ type: Input }],
    selectedChange: [{ type: Output }],
    nodelist: [{ type: ViewChild, args: ['nodelist',] }],
    nodes: [{ type: ViewChildren, args: ['nodeElement',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClickOutsideDirective {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.uxClickOutside = new EventEmitter();
        /**
         * Often a click event makes the element appear - if so we can end up closing it immediately
         */
        this._initialised = false;
        setTimeout(() => this._initialised = true);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    click(event) {
        if (this._initialised && this._elementRef.nativeElement !== event.target && !this._elementRef.nativeElement.contains(event.target)) {
            this.uxClickOutside.emit(event);
        }
    }
}
ClickOutsideDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxClickOutside]'
            },] }
];
/** @nocollapse */
ClickOutsideDirective.ctorParameters = () => [
    { type: ElementRef }
];
ClickOutsideDirective.propDecorators = {
    uxClickOutside: [{ type: Output }],
    click: [{ type: HostListener, args: ['document:click', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ClickOutsideModule {
}
ClickOutsideModule.decorators = [
    { type: NgModule, args: [{
                exports: [ClickOutsideDirective],
                declarations: [ClickOutsideDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ uniquePopoverId = 0;
class PopoverComponent extends TooltipComponent {
    constructor() {
        super(...arguments);
        /**
         * Define a unique id for each popover
         */
        this.id = `ux-popover-${++uniquePopoverId}`;
        /**
         * This will emit an event any time the user clicks outside the popover
         */
        this.clickOutside$ = new Subject();
    }
    /**
     * This will update the title of the popover and trigger change detection
     * @param {?} title
     * @return {?}
     */
    setTitle(title) {
        this.title = title;
        this._changeDetectorRef.markForCheck();
    }
}
PopoverComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-popover',
                template: "<div class=\"popover show\" [ngClass]=\"[placement, customClass]\" [id]=\"id\" [attr.role]=\"role\" (uxClickOutside)=\"clickOutside$.next($event)\">\n    <div class=\"arrow\"></div>\n    <h3 class=\"popover-title\" *ngIf=\"title\">{{ title }}</h3>\n    <div class=\"popover-content\" (cdkObserveContent)=\"reposition()\">\n        <ng-container *ngIf=\"!isTemplateRef\">{{ content }}</ng-container>\n        <ng-container *ngIf=\"isTemplateRef\" [ngTemplateOutlet]=\"content\" [ngTemplateOutletContext]=\"context\"></ng-container>\n    </div>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PopoverDirective extends TooltipDirective$1 {
    constructor() {
        super(...arguments);
        /**
         * All the user to add a custom class to the popover
         */
        this.customClass = '';
        /**
         * All the user to add a role to the popover - default is tooltip
         */
        this.role = 'tooltip';
        /**
         * Provide the TemplateRef a context object
         */
        this.context = {};
        /**
         * Delay the showing of the popover by a number of miliseconds
         */
        this.delay = 0;
        /**
         * Specify which events should show the popover
         */
        this.showTriggers = ['click'];
        /**
         * Specify which events should hide the popover
         */
        this.hideTriggers = ['click', 'clickoutside', 'escape'];
        /**
         * Keep track of the tooltip visibility and update aria-expanded attribute
         */
        this.isVisible = false;
        /**
         * Internally store the type of this component - usual for distinctions when extending the tooltip class
         */
        this._type = 'popover';
    }
    /**
     * Set up the triggers and bind to the show/hide events to keep visibility in sync
     * @return {?}
     */
    ngOnInit() {
        // set up the event triggers
        fromEvent(document, 'keydown').pipe(takeUntil(this._onDestroy)).subscribe(this.onKeyDown.bind(this));
        // check if there is an aria-described by attribute
        this._ariaDescribedBy = this._elementRef.nativeElement.hasAttribute('aria-describedby');
        // set up the default event triggers
        super.ngOnInit();
    }
    /**
     * We need to send input changes to the popover component
     * We can't use setters as they may trigger before popover initialised and can't resend once initialised
     *
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        super.ngOnChanges(changes);
        if (this._instance && changes["title"]) {
            this._instance.setTitle(changes["title"].currentValue);
        }
    }
    /**
     * @param {?} overlayRef
     * @return {?}
     */
    createInstance(overlayRef) {
        const /** @type {?} */ instance = /** @type {?} */ (overlayRef.attach(this._portal).instance);
        // supply the tooltip with the correct properties
        instance.setTitle(this.title);
        instance.setContent(this.content);
        instance.setPlacement(this.placement);
        instance.setClass(this.customClass);
        instance.setContext(this.context);
        instance.setRole(this.role);
        // Update the aria-describedby attribute
        this.setAriaDescribedBy(instance.id);
        // subscribe to the outside click event
        instance.clickOutside$.pipe(takeUntil(this._onDestroy)).subscribe(this.onClickOutside.bind(this));
        return instance;
    }
    /**
     * @return {?}
     */
    createPortal() {
        return this._portal || new ComponentPortal(PopoverComponent, this._viewContainerRef);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyDown(event) {
        // if visible and the escape key is pressed and it is one of the hide triggers
        if (this.isVisible && event.keyCode === ESCAPE && this.includes(this.hideTriggers, 'escape')) {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    onClickOutside() {
        // if visible and it is one of the hide triggers
        if (this.isVisible && this.includes(this.hideTriggers, 'clickoutside')) {
            this.hide();
        }
    }
    /**
     * Programmatically update the aria-describedby property
     * @param {?} id
     * @return {?}
     */
    setAriaDescribedBy(id) {
        // we only want to set the aria-describedby attr when the content is a string and there was no user defined attribute already
        if (this._ariaDescribedBy === false && typeof this.content === 'string') {
            super.setAriaDescribedBy(id);
        }
    }
}
PopoverDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxPopover]',
                exportAs: 'ux-popover'
            },] }
];
PopoverDirective.propDecorators = {
    content: [{ type: Input, args: ['uxPopover',] }],
    title: [{ type: Input, args: ['popoverTitle',] }],
    disabled: [{ type: Input, args: ['popoverDisabled',] }],
    customClass: [{ type: Input, args: ['popoverClass',] }],
    role: [{ type: Input, args: ['popoverRole',] }],
    context: [{ type: Input, args: ['popoverContext',] }],
    delay: [{ type: Input, args: ['popoverDelay',] }],
    showTriggers: [{ type: Input }],
    hideTriggers: [{ type: Input }],
    isVisible: [{ type: HostBinding, args: ['attr.aria-expanded',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PopoverModule {
}
PopoverModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    OverlayModule,
                    ObserversModule,
                    ClickOutsideModule,
                    TooltipModule
                ],
                exports: [PopoverDirective],
                declarations: [PopoverComponent, PopoverDirective],
                entryComponents: [PopoverComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HierarchyBarModule {
}
HierarchyBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ResizeModule,
                    FocusIfModule,
                    PopoverModule
                ],
                exports: [HierarchyBarComponent],
                declarations: [HierarchyBarComponent],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SidePanelService {
    constructor() {
        this.open$ = new BehaviorSubject(false);
    }
    /**
     * @return {?}
     */
    open() {
        this.open$.next(true);
    }
    /**
     * @return {?}
     */
    close() {
        this.open$.next(false);
    }
}
SidePanelService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SidePanelComponent {
    /**
     * @param {?} service
     * @param {?} _elementRef
     */
    constructor(service, _elementRef) {
        this.service = service;
        this._elementRef = _elementRef;
        this.inline = false;
        this.attachTo = 'window';
        this.width = '50%';
        this.top = '0';
        this.modal = false;
        this.animate = false;
        this.closeOnExternalClick = false;
        this.openChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get open() {
        return this.service.open$.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set open(value) {
        this.service.open$.next(value);
    }
    /**
     * @return {?}
     */
    get position() {
        if (this.inline) {
            return 'static';
        }
        if (this.attachTo === 'container') {
            return 'absolute';
        }
        return 'fixed';
    }
    /**
     * @return {?}
     */
    get cssWidth() {
        if (typeof this.width === 'number') {
            return this.width === 0 ? '0' : this.width + 'px';
        }
        return this.width;
    }
    /**
     * @return {?}
     */
    get cssTop() {
        if (typeof this.top === 'number') {
            return this.top === 0 ? '0' : this.top + 'px';
        }
        return this.top;
    }
    /**
     * @return {?}
     */
    get componentWidth() {
        if (this.inline) {
            return this.open ? this.cssWidth : '0';
        }
        return null;
    }
    /**
     * @return {?}
     */
    get hostWidth() {
        return this.inline ? '100%' : this.cssWidth;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._subscription = this.service.open$.subscribe((next) => {
            this.openChange.emit(next);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    openPanel() {
        this.service.open();
    }
    /**
     * @return {?}
     */
    closePanel() {
        this.service.close();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    clickHandler(event) {
        if (!this.open || !this.closeOnExternalClick) {
            return;
        }
        const /** @type {?} */ target = /** @type {?} */ (event.target);
        if (!this._elementRef.nativeElement.contains(target) ||
            (target && target.classList.contains('modal-backdrop'))) {
            this.closePanel();
        }
    }
}
SidePanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-side-panel',
                exportAs: 'ux-side-panel',
                template: "<div *ngIf=\"modal && open\" class=\"modal-backdrop\"\r\n    [style.position]=\"position\"\r\n    [style.top]=\"cssTop\"></div>\r\n\r\n<div class=\"ux-side-panel-host\"\r\n    [class.modal-panel]=\"modal\"\r\n    [style.position]=\"position\"\r\n    [style.width]=\"hostWidth\"\r\n    [style.top]=\"cssTop\">\r\n    <ng-content></ng-content>\r\n</div>\r\n",
                providers: [SidePanelService],
                host: {
                    'class': 'ux-side-panel'
                }
            }] }
];
/** @nocollapse */
SidePanelComponent.ctorParameters = () => [
    { type: SidePanelService },
    { type: ElementRef }
];
SidePanelComponent.propDecorators = {
    open: [{ type: Input }, { type: HostBinding, args: ['class.open',] }],
    inline: [{ type: Input }, { type: HostBinding, args: ['class.inline',] }],
    attachTo: [{ type: Input }],
    width: [{ type: Input }],
    top: [{ type: Input }],
    modal: [{ type: Input }, { type: HostBinding, args: ['attr.aria-modal',] }],
    animate: [{ type: Input }, { type: HostBinding, args: ['class.animate',] }],
    closeOnExternalClick: [{ type: Input }],
    openChange: [{ type: Output }],
    componentWidth: [{ type: HostBinding, args: ['style.width',] }],
    closePanel: [{ type: HostListener, args: ['document:keyup.escape',] }],
    clickHandler: [{ type: HostListener, args: ['document:click', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ItemDisplayPanelContentDirective {
}
ItemDisplayPanelContentDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxItemDisplayPanelContent]'
            },] }
];
class ItemDisplayPanelFooterDirective {
}
ItemDisplayPanelFooterDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxItemDisplayPanelFooter]'
            },] }
];
class ItemDisplayPanelComponent extends SidePanelComponent {
    /**
     * @param {?} service
     * @param {?} elementRef
     */
    constructor(service, elementRef) {
        super(service, elementRef);
        this.boxShadow = true;
        this.closeVisible = true;
        this.shadow = false;
        this.visibleChange = new EventEmitter();
        this.animate = false;
        this.closeOnExternalClick = true;
    }
    /**
     * @return {?}
     */
    get preventClose() {
        return !this.closeOnExternalClick;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set preventClose(value) {
        this.closeOnExternalClick = !value;
    }
    /**
     * @deprecated
     * Title used for adding tooltips and shouldn't be used as an input
     * instead header will be used. This is here to support backward compatibility only
     * this property should not be used.
     * @param {?} value
     * @return {?}
     */
    set title(value) {
        this.header = value;
    }
    /**
     * @return {?}
     */
    get title() {
        return this.header;
    }
    /**
     * @param {?} visible
     * @return {?}
     */
    set visible(visible) {
        this.open = visible;
    }
    /**
     * @return {?}
     */
    get visible() {
        return this.open;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._itemDisplayPanelSubscription = this.service.open$.subscribe((next) => {
            this.visibleChange.emit(next);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._itemDisplayPanelSubscription.unsubscribe();
    }
}
ItemDisplayPanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-item-display-panel',
                template: "<div class=\"ux-side-panel-host ux-item-display-panel\"\r\n    [class.box-shadow]=\"boxShadow\"\r\n    [style.position]=\"position\"\r\n    [style.width]=\"hostWidth\"\r\n    [style.top]=\"cssTop\">\r\n\r\n    <div class=\"ux-side-panel-header\" [class.item-display-panel-shadow]=\"shadow\">\r\n        <h3>{{ header }}</h3>\r\n        <button *ngIf=\"closeVisible\" type=\"button\" class=\"btn btn-lg btn-link btn-icon button-secondary\" (click)=\"visible = false\">\r\n            <i class=\"hpe-icon hpe-close\"></i>\r\n        </button>\r\n    </div>\r\n\r\n    <div class=\"ux-side-panel-content\">\r\n        <ng-content select=\"[uxItemDisplayPanelContent]\"></ng-content>\r\n    </div>\r\n\r\n    <div class=\"ux-side-panel-footer\" *ngIf=\"footer\">\r\n        <ng-content select=\"[uxItemDisplayPanelFooter]\"></ng-content>\r\n    </div>\r\n\r\n</div>\r\n",
                providers: [SidePanelService],
                host: {
                    'class': 'ux-side-panel ux-item-display-panel'
                }
            }] }
];
/** @nocollapse */
ItemDisplayPanelComponent.ctorParameters = () => [
    { type: SidePanelService },
    { type: ElementRef }
];
ItemDisplayPanelComponent.propDecorators = {
    header: [{ type: Input }],
    boxShadow: [{ type: Input }],
    closeVisible: [{ type: Input }],
    preventClose: [{ type: Input }],
    shadow: [{ type: Input }],
    footer: [{ type: ContentChild, args: [ItemDisplayPanelFooterDirective,] }],
    visibleChange: [{ type: Output }],
    title: [{ type: Input }],
    visible: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DECLARATIONS$3 = [
    ItemDisplayPanelComponent,
    ItemDisplayPanelContentDirective,
    ItemDisplayPanelFooterDirective
];
class ItemDisplayPanelModule {
}
ItemDisplayPanelModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: DECLARATIONS$3,
                declarations: DECLARATIONS$3
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class WizardStepComponent {
    constructor() {
        this.valid = true;
        this.visitedChange = new EventEmitter();
        this._active = false;
        this._visited = false;
    }
    /**
     * @return {?}
     */
    get visited() {
        return this._visited;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set visited(value) {
        this._visited = value;
        this.visitedChange.next(value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set active(value) {
        // store the active state of the step
        this._active = value;
        // if the value is true then the step should also be marked as visited
        if (value === true) {
            this.visited = true;
        }
    }
    /**
     * @return {?}
     */
    get active() {
        return this._active;
    }
}
WizardStepComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-wizard-step',
                template: "<ng-container *ngIf=\"active\">\n    <ng-content></ng-content>\n</ng-container>"
            }] }
];
WizardStepComponent.propDecorators = {
    header: [{ type: Input }],
    valid: [{ type: Input }],
    visitedChange: [{ type: Input }],
    visited: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class WizardComponent {
    constructor() {
        this._step = 0;
        this.steps = new QueryList();
        this.orientation = 'horizontal';
        this.nextText = 'Next';
        this.previousText = 'Previous';
        this.cancelText = 'Cancel';
        this.finishText = 'Finish';
        this.nextTooltip = 'Go to the next step';
        this.previousTooltip = 'Go to the previous step';
        this.cancelTooltip = 'Cancel the wizard';
        this.finishTooltip = 'Finish the wizard';
        this.nextDisabled = false;
        this.previousDisabled = false;
        this.cancelDisabled = false;
        this.finishDisabled = false;
        this.nextVisible = true;
        this.previousVisible = true;
        this.cancelVisible = true;
        this.finishVisible = true;
        this.cancelAlwaysVisible = false;
        this.finishAlwaysVisible = false;
        this.onNext = new EventEmitter();
        this.onPrevious = new EventEmitter();
        this.onCancel = new EventEmitter();
        this.onFinishing = new EventEmitter();
        this.onFinish = new EventEmitter();
        this.stepChanging = new EventEmitter();
        this.stepChange = new EventEmitter();
        this.invalidIndicator = false;
    }
    /**
     * @return {?}
     */
    get step() {
        return this._step;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set step(value) {
        // only accept numbers as valid options
        if (typeof value === 'number') {
            // store the active step
            this._step = value;
            // update which steps should be active
            this.update();
            // emit the change event
            this.stepChange.next(this.step);
            // reset the invalid state
            this.invalidIndicator = false;
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // initially set the correct visibility of the steps
        setTimeout(this.update.bind(this));
    }
    /**
     * Navigate to the next step
     * @return {?}
     */
    next() {
        this.stepChanging.next(new StepChangingEvent(this.step, this.step + 1));
        // check if current step is invalid
        if (!this.getCurrentStep().valid) {
            this.invalidIndicator = true;
            return;
        }
        // check if we are currently on the last step
        if ((this.step + 1) < this.steps.length) {
            this.step++;
            // emit the current step
            this.onNext.next(this.step);
        }
    }
    /**
     * Navigate to the previous step
     * @return {?}
     */
    previous() {
        this.stepChanging.next(new StepChangingEvent(this.step, this.step - 1));
        // check if we are currently on the last step
        if (this.step > 0) {
            this.step--;
            // emit the current step
            this.onPrevious.next(this.step);
        }
    }
    /**
     * Perform actions when the finish button is clicked
     * @return {?}
     */
    finish() {
        // fires when the finish button is clicked always
        this.onFinishing.next();
        /**
                 * This is required because we need to ensure change detection has run
                 * to determine whether or not we have the latest value for the 'valid' input
                 * on the current step. Unfortunately we can't use ChangeDetectorRef as we are looking to run
                 * on content children, and we cant use ApplicationRef.tick() as this does not work in a hybrid app, eg. our docs
                 */
        return new Promise(resolve => {
            setTimeout(() => {
                // only fires when the finish button is clicked and the step is valid
                if (this.getCurrentStep().valid) {
                    this.onFinish.next();
                }
                resolve();
            });
        });
    }
    /**
     * Perform actions when the cancel button is clicked
     * @return {?}
     */
    cancel() {
        this.onCancel.next();
    }
    /**
     * Update the active state of each step
     * @return {?}
     */
    update() {
        // update which steps should be active
        this.steps.forEach((step, idx) => step.active = idx === this.step);
    }
    /**
     * Jump to a specific step only if the step has previously been visited
     * @param {?} step
     * @return {?}
     */
    gotoStep(step) {
        if (step.visited) {
            const /** @type {?} */ stepIndex = this.steps.toArray().findIndex(stp => stp === step);
            this.stepChanging.next(new StepChangingEvent(this.step, stepIndex));
            this.step = stepIndex;
        }
    }
    /**
     * Determine if the current step is the last step
     * @return {?}
     */
    isLastStep() {
        return this.step === (this.steps.length - 1);
    }
    /**
     * Reset the wizard - goes to first step and resets visited state
     * @return {?}
     */
    reset() {
        // mark all steps as not visited
        this.steps.forEach(step => step.visited = false);
        // go to the first step
        this.step = 0;
    }
    /**
     * Get the step at the current index
     * @return {?}
     */
    getCurrentStep() {
        return this.getStepAtIndex(this.step);
    }
    /**
     * Return a step at a specific index
     * @param {?} index
     * @return {?}
     */
    getStepAtIndex(index) {
        return this.steps.toArray()[index];
    }
}
WizardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-wizard',
                template: "<div class=\"wizard-body\">\n\n    <div class=\"wizard-steps\">\n\n        <div class=\"wizard-step\" [class.active]=\"stp.active\" [class.visited]=\"stp.visited\" [class.invalid]=\"stp.active && !stp.valid && invalidIndicator\" (click)=\"gotoStep(stp)\" *ngFor=\"let stp of steps\">\n            {{ stp.header }}\n        </div>\n\n    </div>\n\n    <div class=\"wizard-content\">\n        <ng-content></ng-content>\n    </div>\n\n</div>\n\n<div class=\"wizard-footer\">\n    <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"previousVisible\" [uxTooltip]=\"previousTooltip\" [disabled]=\"previousDisabled || step === 0\"\n        (click)=\"previous(); tip.hide()\">{{ previousText }}</button>\n\n    <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"nextVisible && !isLastStep()\" [uxTooltip]=\"nextTooltip\" [disabled]=\"nextDisabled\"\n        (click)=\"next(); tip.hide()\">{{ nextText }}</button>\n\n    <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"finishVisible && isLastStep() || finishAlwaysVisible\" [uxTooltip]=\"finishTooltip\"\n        [disabled]=\"finishDisabled\" (click)=\"finish(); tip.hide()\">{{ finishText }}</button>\n\n    <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"cancelVisible && !isLastStep() || cancelAlwaysVisible\" [uxTooltip]=\"cancelTooltip\"\n        [disabled]=\"cancelDisabled\" (click)=\"cancel(); tip.hide()\">{{ cancelText }}</button>\n</div>",
                host: {
                    '[class]': 'orientation'
                }
            }] }
];
WizardComponent.propDecorators = {
    steps: [{ type: ContentChildren, args: [WizardStepComponent,] }],
    orientation: [{ type: Input }],
    nextText: [{ type: Input }],
    previousText: [{ type: Input }],
    cancelText: [{ type: Input }],
    finishText: [{ type: Input }],
    nextTooltip: [{ type: Input }],
    previousTooltip: [{ type: Input }],
    cancelTooltip: [{ type: Input }],
    finishTooltip: [{ type: Input }],
    nextDisabled: [{ type: Input }],
    previousDisabled: [{ type: Input }],
    cancelDisabled: [{ type: Input }],
    finishDisabled: [{ type: Input }],
    nextVisible: [{ type: Input }],
    previousVisible: [{ type: Input }],
    cancelVisible: [{ type: Input }],
    finishVisible: [{ type: Input }],
    cancelAlwaysVisible: [{ type: Input }],
    finishAlwaysVisible: [{ type: Input }],
    onNext: [{ type: Output }],
    onPrevious: [{ type: Output }],
    onCancel: [{ type: Output }],
    onFinishing: [{ type: Output }],
    onFinish: [{ type: Output }],
    stepChanging: [{ type: Output }],
    stepChange: [{ type: Output }],
    step: [{ type: Input }]
};
class StepChangingEvent {
    /**
     * @param {?} from
     * @param {?} to
     */
    constructor(from$$1, to) {
        this.from = from$$1;
        this.to = to;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DECLARATIONS$4 = [
    WizardComponent,
    WizardStepComponent
];
class WizardModule {
}
WizardModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    TooltipModule
                ],
                exports: DECLARATIONS$4,
                declarations: DECLARATIONS$4
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * This service is required to provide a form of communication
 * between the marquee wizard steps and the containing marquee wizard.
 * We cannot inject the Host due to the steps being content children
 * rather than view children.
 */
class MarqueeWizardService {
    constructor() {
        this.valid$ = new Subject();
    }
}
MarqueeWizardService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MarqueeWizardStepComponent extends WizardStepComponent {
    /**
     * @param {?} _marqueeWizardService
     */
    constructor(_marqueeWizardService) {
        super();
        this._marqueeWizardService = _marqueeWizardService;
        this.completed = false;
        this.completedChange = new EventEmitter();
        this._valid = true;
    }
    /**
     * @return {?}
     */
    get valid() {
        return this._valid;
    }
    /**
     * @param {?} valid
     * @return {?}
     */
    set valid(valid) {
        this._valid = valid;
        if (this._marqueeWizardService) {
            this._marqueeWizardService.valid$.next({ step: this, valid: valid });
        }
    }
    /**
     * Update the completed state and emit the latest value
     * @param {?} completed whether or not the step is completed
     * @return {?}
     */
    setCompleted(completed) {
        this.completed = completed;
        this.completedChange.emit(completed);
    }
}
MarqueeWizardStepComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-marquee-wizard-step',
                template: "<ng-container *ngIf=\"active\">\n    <ng-content></ng-content>\n</ng-container>"
            }] }
];
/** @nocollapse */
MarqueeWizardStepComponent.ctorParameters = () => [
    { type: MarqueeWizardService }
];
MarqueeWizardStepComponent.propDecorators = {
    icon: [{ type: Input }],
    completed: [{ type: Input }],
    completedChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MarqueeWizardComponent extends WizardComponent {
    /**
     * @param {?} marqueeWizardService
     */
    constructor(marqueeWizardService) {
        super();
        this.steps = new QueryList();
        marqueeWizardService.valid$.pipe(filter((event) => !event.valid)).subscribe(this.validChange.bind(this));
    }
    /**
     * @return {?}
     */
    get isTemplate() {
        return this.description && this.description instanceof TemplateRef;
    }
    /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     * @return {?}
     */
    next() {
        // get the current step
        const /** @type {?} */ step = /** @type {?} */ (this.getCurrentStep());
        if (step.valid) {
            super.next();
            // mark this step as completed
            step.setCompleted(true);
        }
    }
    /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     * @return {?}
     */
    finish() {
        // get the current step
        const /** @type {?} */ step = /** @type {?} */ (this.getCurrentStep());
        // call the original finish function
        return super.finish().then(() => {
            // if the step is valid indicate that it is now complete
            if (step.valid) {
                step.setCompleted(true);
            }
        });
    }
    /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     * @param {?} state
     * @return {?}
     */
    validChange(state$$1) {
        const /** @type {?} */ steps = this.steps.toArray();
        const /** @type {?} */ current = steps.findIndex(step => step === state$$1.step);
        const /** @type {?} */ affected = steps.slice(current);
        affected.forEach(step => {
            // the step should no longer be completed
            step.completed = false;
            // if the step is not the current step then also mark it as unvisited
            if (step !== state$$1.step) {
                step.visited = false;
            }
        });
    }
}
MarqueeWizardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-marquee-wizard',
                template: "<div class=\"marquee-wizard-side-panel\">\n\n    <div class=\"marquee-wizard-description-container\" *ngIf=\"description\">\n        <!-- If a template was provided display it -->\n        <ng-container *ngIf=\"isTemplate\" [ngTemplateOutlet]=\"description\"></ng-container>\n\n        <!-- Otherwise wimply display the string -->\n        <ng-container *ngIf=\"!isTemplate\">\n            <p>{{ description }}</p>\n        </ng-container>\n    </div>\n\n    <ul class=\"marquee-wizard-steps\">\n\n        <li class=\"marquee-wizard-step\" *ngFor=\"let step of steps\" (click)=\"gotoStep(step)\" [class.active]=\"step.active\" [class.visited]=\"step.visited\" [class.invalid]=\"!step.valid\">\n            <i class=\"marquee-wizard-step-icon\" [ngClass]=\"step.icon\"></i>\n            <span class=\"marquee-wizard-step-title\">{{ step.header }}</span>\n            <span class=\"marquee-wizard-step-status hpe-icon hpe-checkmark\" *ngIf=\"step.completed\"></span>\n        </li>\n\n    </ul>\n</div>\n\n<div class=\"marquee-wizard-content-panel\">\n    <div class=\"marquee-wizard-content\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"modal-footer\">\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"previousVisible\" [uxTooltip]=\"previousTooltip\" container=\"body\"\n            [disabled]=\"previousDisabled || step === 0\" (click)=\"previous(); tip.hide()\">{{ previousText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"nextVisible && !isLastStep()\" [uxTooltip]=\"nextTooltip\" container=\"body\"\n            [disabled]=\"nextDisabled\" (click)=\"next(); tip.hide()\">{{ nextText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"finishVisible && isLastStep() || finishAlwaysVisible\" [uxTooltip]=\"finishTooltip\"\n            container=\"body\" [disabled]=\"finishDisabled\" (click)=\"finish(); tip.hide()\">{{ finishText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"cancelVisible && !isLastStep() || cancelAlwaysVisible\" [uxTooltip]=\"cancelTooltip\"\n            container=\"body\" [disabled]=\"cancelDisabled\" (click)=\"cancel(); tip.hide()\">{{ cancelText }}</button>\n    </div>\n</div>",
                providers: [MarqueeWizardService]
            }] }
];
/** @nocollapse */
MarqueeWizardComponent.ctorParameters = () => [
    { type: MarqueeWizardService }
];
MarqueeWizardComponent.propDecorators = {
    description: [{ type: Input }],
    steps: [{ type: ContentChildren, args: [MarqueeWizardStepComponent,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MarqueeWizardModule {
}
MarqueeWizardModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    WizardModule,
                    TooltipModule
                ],
                exports: [
                    MarqueeWizardComponent,
                    MarqueeWizardStepComponent
                ],
                declarations: [
                    MarqueeWizardComponent,
                    MarqueeWizardStepComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FrameExtractionService {
    /**
     * @param {?} source
     * @return {?}
     */
    createVideoPlayer(source) {
        let /** @type {?} */ videoPlayer = document.createElement('video');
        videoPlayer.preload = 'auto';
        videoPlayer.src = source;
        return videoPlayer;
    }
    /**
     * @param {?} width
     * @param {?} height
     * @return {?}
     */
    createCanvas(width, height) {
        let /** @type {?} */ canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        return canvas;
    }
    /**
     * @param {?} videoPlayer
     * @param {?} time
     * @return {?}
     */
    goToFrame(videoPlayer, time) {
        videoPlayer.currentTime = time;
        return fromEvent(videoPlayer, time === 0 ? 'loadeddata' : 'seeked');
    }
    /**
     * @param {?} videoPlayer
     * @param {?} canvas
     * @param {?} time
     * @param {?=} width
     * @param {?=} height
     * @return {?}
     */
    getThumbnail(videoPlayer, canvas, time, width = 160, height = 90) {
        return Observable.create((observer) => {
            // go to specified frame
            let /** @type {?} */ subscription = this.goToFrame(videoPlayer, time).subscribe(() => {
                // create image from current frame
                canvas.getContext('2d').drawImage(videoPlayer, 0, 0, width, height);
                observer.next({ image: canvas.toDataURL(), width: width, height: height, time: time });
                observer.complete();
                subscription.unsubscribe();
            });
        });
    }
    /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} time
     * @return {?}
     */
    getFrameThumbnail(source, width, height, time) {
        // create required elements
        let /** @type {?} */ videoPlayer = this.createVideoPlayer(source);
        let /** @type {?} */ canvas = this.createCanvas(width, height);
        let /** @type {?} */ frameSubscription = this.getThumbnail(videoPlayer, canvas, time, width, height);
        // ensure we release memory after we are finished
        frameSubscription.subscribe(null, null, () => {
            videoPlayer = null;
            canvas = null;
        });
        return frameSubscription;
    }
    /**
     * @param {?} source
     * @param {?} width
     * @param {?} height
     * @param {?} start
     * @param {?} end
     * @param {?=} skip
     * @return {?}
     */
    getFrameThumbnails(source, width, height, start, end, skip = 5) {
        // create required elements
        let /** @type {?} */ videoPlayer = this.createVideoPlayer(source);
        let /** @type {?} */ canvas = this.createCanvas(width, height);
        return Observable.create((observer) => {
            fromEvent(videoPlayer, 'loadedmetadata').subscribe(() => {
                // calculate the frames required
                let /** @type {?} */ frames = [];
                for (let /** @type {?} */ idx = start; idx < end; idx += skip) {
                    frames.push(this.getThumbnail(videoPlayer, canvas, idx, width, height));
                }
                concat(...frames).subscribe((frame) => observer.next(frame), null, () => {
                    videoPlayer = null;
                    canvas = null;
                    observer.complete();
                });
            });
        });
    }
}
FrameExtractionService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FrameExtractionModule {
}
FrameExtractionModule.decorators = [
    { type: NgModule, args: [{
                providers: [FrameExtractionService],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MediaPlayerService {
    /**
     * @param {?} _frameExtractionService
     */
    constructor(_frameExtractionService) {
        this._frameExtractionService = _frameExtractionService;
        this.type = 'video';
        this.loaded = false;
        /*
                Create observables for media player events
            */
        this.playing = new BehaviorSubject(false);
        this.initEvent = new ReplaySubject();
        this.abortEvent = new Subject();
        this.canPlayEvent = new BehaviorSubject(false);
        this.canPlayThroughEvent = new BehaviorSubject(false);
        this.durationChangeEvent = new Subject();
        this.endedEvent = new Subject();
        this.errorEvent = new Subject();
        this.loadedDataEvent = new Subject();
        this.loadedMetadataEvent = new Subject();
        this.loadStartEvent = new Subject();
        this.pauseEvent = new Subject();
        this.playEvent = new Subject();
        this.playingEvent = new Subject();
        this.rateChangeEvent = new Subject();
        this.seekedEvent = new Subject();
        this.seekingEvent = new Subject();
        this.stalledEvent = new Subject();
        this.suspendEvent = new Subject();
        this.timeUpdateEvent = new Subject();
        this.volumeChangeEvent = new Subject();
        this.waitingEvent = new Subject();
        this.mediaClickEvent = new Subject();
        this.fullscreenEvent = new BehaviorSubject(false);
        this.quietModeEvent = new BehaviorSubject(false);
        this.progressEvent = Observable.create((observer) => {
            // repeat until the whole video has fully loaded
            const /** @type {?} */ interval = setInterval(() => {
                const /** @type {?} */ buffered = /** @type {?} */ (this._mediaPlayer.buffered);
                observer.next(buffered);
                if (buffered.length === 1 && buffered.start(0) === 0 && buffered.end(0) === this.duration) {
                    observer.complete();
                    clearInterval(interval);
                }
            }, 1000);
        });
        this._fullscreen = false;
    }
    /**
     * @return {?}
     */
    get mediaPlayer() {
        return this._mediaPlayer;
    }
    /**
     * @return {?}
     */
    get quietMode() {
        return this._quietMode;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set quietMode(value) {
        // quiet mode cannot be enabled on audio player
        if (this.type === 'audio') {
            value = false;
        }
        this._quietMode = value;
        this.quietModeEvent.next(value);
    }
    /**
     * @return {?}
     */
    get mediaPlayerWidth() {
        return this._mediaPlayer ? this._mediaPlayer.offsetWidth : 0;
    }
    /**
     * @return {?}
     */
    get mediaPlayerHeight() {
        return this._mediaPlayer ? this._mediaPlayer.offsetHeight : 0;
    }
    /**
     * @return {?}
     */
    get audioTracks() {
        return this._mediaPlayer ? this._mediaPlayer.audioTracks : [];
    }
    /**
     * @return {?}
     */
    get autoplay() {
        return this._mediaPlayer ? this._mediaPlayer.autoplay : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set autoplay(value) {
        this._mediaPlayer.autoplay = value;
    }
    /**
     * @return {?}
     */
    get buffered() {
        return this._mediaPlayer ? this._mediaPlayer.buffered : new TimeRanges();
    }
    /**
     * @return {?}
     */
    get crossOrigin() {
        return this._mediaPlayer ? this._mediaPlayer.crossOrigin : null;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set crossOrigin(value) {
        this._mediaPlayer.crossOrigin = value;
    }
    /**
     * @return {?}
     */
    get currentSrc() {
        return this._mediaPlayer ? this._mediaPlayer.currentSrc : null;
    }
    /**
     * @return {?}
     */
    get currentTime() {
        return this._mediaPlayer ? this._mediaPlayer.currentTime : 0;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set currentTime(value) {
        this._mediaPlayer.currentTime = value;
    }
    /**
     * @return {?}
     */
    get defaultMuted() {
        return this._mediaPlayer ? this._mediaPlayer.defaultMuted : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set defaultMuted(value) {
        this._mediaPlayer.defaultMuted = value;
    }
    /**
     * @return {?}
     */
    get defaultPlaybackRate() {
        return this._mediaPlayer ? this._mediaPlayer.defaultPlaybackRate : 1;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set defaultPlaybackRate(value) {
        this._mediaPlayer.defaultPlaybackRate = value;
    }
    /**
     * @return {?}
     */
    get duration() {
        return this._mediaPlayer ? this._mediaPlayer.duration : 0;
    }
    /**
     * @return {?}
     */
    get ended() {
        return this._mediaPlayer ? this._mediaPlayer.ended : false;
    }
    /**
     * @return {?}
     */
    get loop() {
        return this._mediaPlayer ? this._mediaPlayer.loop : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loop(value) {
        this._mediaPlayer.loop = value;
    }
    /**
     * @return {?}
     */
    get muted() {
        return this._mediaPlayer ? this._mediaPlayer.muted : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set muted(value) {
        this._mediaPlayer.muted = value;
    }
    /**
     * @return {?}
     */
    get networkState() {
        return this._mediaPlayer.networkState;
    }
    /**
     * @return {?}
     */
    get paused() {
        return this._mediaPlayer ? this._mediaPlayer.paused : true;
    }
    /**
     * @return {?}
     */
    get playbackRate() {
        return this._mediaPlayer ? this._mediaPlayer.playbackRate : 1;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set playbackRate(value) {
        this._mediaPlayer.playbackRate = value;
    }
    /**
     * @return {?}
     */
    get played() {
        return this._mediaPlayer ? this._mediaPlayer.played : new TimeRanges();
    }
    /**
     * @return {?}
     */
    get preload() {
        return this._mediaPlayer ? this._mediaPlayer.preload : 'auto';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set preload(value) {
        this._mediaPlayer.preload = value;
    }
    /**
     * @return {?}
     */
    get readyState() {
        return this._mediaPlayer ? this._mediaPlayer.readyState : 0;
    }
    /**
     * @return {?}
     */
    get seekable() {
        return this._mediaPlayer ? this._mediaPlayer.seekable : new TimeRanges();
    }
    /**
     * @return {?}
     */
    get seeking() {
        return this._mediaPlayer ? this._mediaPlayer.seeking : false;
    }
    /**
     * @return {?}
     */
    get src() {
        return this._mediaPlayer ? this._mediaPlayer.src : '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set src(value) {
        this._mediaPlayer.src = value;
    }
    /**
     * @return {?}
     */
    get textTracks() {
        return this._mediaPlayer ? Array.from(this._mediaPlayer.textTracks) : [];
    }
    /**
     * @return {?}
     */
    get videoTracks() {
        return this._mediaPlayer ? Array.from(this._mediaPlayer.videoTracks) : [];
    }
    /**
     * @return {?}
     */
    get volume() {
        return this._mediaPlayer ? this._mediaPlayer.volume : 1;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set volume(value) {
        if (this._mediaPlayer) {
            this._mediaPlayer.volume = value;
        }
    }
    /**
     * @return {?}
     */
    get fullscreen() {
        return this._mediaPlayer ? this._fullscreen : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set fullscreen(value) {
        this._fullscreen = value;
        this.fullscreenEvent.next(value);
    }
    /**
     * @param {?} hostElement
     * @param {?} mediaPlayer
     * @return {?}
     */
    setMediaPlayer(hostElement, mediaPlayer) {
        this._hostElement = hostElement;
        this._mediaPlayer = mediaPlayer;
        this.initEvent.next(true);
    }
    /**
     * Toggle playing state
     * @return {?}
     */
    togglePlay() {
        // prevent any action is not loaded
        if (this.loaded === false) {
            return;
        }
        if (this.paused) {
            this.play();
        }
        else {
            this.pause();
        }
    }
    /**
     * Starts playing the audio/video
     * @return {?}
     */
    play() {
        this._mediaPlayer.play();
    }
    /**
     * Pauses the currently playing audio/video
     * @return {?}
     */
    pause() {
        this._mediaPlayer.pause();
    }
    /**
     * Re-loads the audio/video element
     * @return {?}
     */
    load() {
        this._mediaPlayer.load();
    }
    /**
     * Checks if the browser can play the specified audio/video type
     * @param {?} type
     * @return {?}
     */
    canPlayType(type) {
        return this._mediaPlayer.canPlayType(type);
    }
    /**
     * Adds a new text track to the audio/video
     * @param {?} kind
     * @param {?} label
     * @param {?} language
     * @return {?}
     */
    addTextTrack(kind, label, language) {
        return this._mediaPlayer.addTextTrack(kind, label, language);
    }
    /**
     * Attempt to display media in fullscreen mode
     * @return {?}
     */
    requestFullscreen() {
        if (this._hostElement.requestFullscreen) {
            this._hostElement.requestFullscreen();
        }
        else if (this._hostElement.webkitRequestFullscreen) {
            this._hostElement.webkitRequestFullscreen();
        }
        else if ((/** @type {?} */ (this._hostElement)).msRequestFullscreen) {
            (/** @type {?} */ (this._hostElement)).msRequestFullscreen();
        }
        else if ((/** @type {?} */ (this._hostElement)).mozRequestFullScreen) {
            (/** @type {?} */ (this._hostElement)).mozRequestFullScreen();
        }
    }
    /**
     * Exit full screen mode
     * @return {?}
     */
    exitFullscreen() {
        if ((/** @type {?} */ (this._hostElement)).exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else if ((/** @type {?} */ (document)).msExitFullscreen) {
            (/** @type {?} */ (document)).msExitFullscreen();
        }
        else if ((/** @type {?} */ (document)).mozCancelFullScreen) {
            (/** @type {?} */ (document)).mozCancelFullScreen();
        }
    }
    /**
     * @return {?}
     */
    fullscreenChange() {
        this.fullscreen = (/** @type {?} */ (document)).fullscreen || document.webkitIsFullScreen || (/** @type {?} */ (document)).mozFullScreen || (/** @type {?} */ (document)).msFullscreenElement !== null && (/** @type {?} */ (document)).msFullscreenElement !== undefined;
        this.fullscreenEvent.next(this.fullscreen);
    }
    /**
     * Toggle Fullscreen State
     * @return {?}
     */
    toggleFullscreen() {
        if (this.fullscreen) {
            this.exitFullscreen();
        }
        else {
            this.requestFullscreen();
        }
    }
    /**
     * Extract the frames from the video
     * @param {?} width
     * @param {?} height
     * @param {?} skip
     * @return {?}
     */
    getFrames(width, height, skip) {
        if (this.type === 'video') {
            return this._frameExtractionService.getFrameThumbnails(this.source, width, height, 0, this.duration, 10);
        }
        return from([]);
    }
    /**
     * @return {?}
     */
    hideSubtitleTracks() {
        for (let /** @type {?} */ index = 0; index < this.textTracks.length; index++) {
            this.textTracks[index].mode = 'hidden';
        }
    }
}
MediaPlayerService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
MediaPlayerService.ctorParameters = () => [
    { type: FrameExtractionService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MediaPlayerBaseExtensionDirective {
    /**
     * @param {?} mediaPlayerService
     */
    constructor(mediaPlayerService) {
        this.mediaPlayerService = mediaPlayerService;
    }
}
MediaPlayerBaseExtensionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[mediaPlayerBaseExtension]'
            },] }
];
/** @nocollapse */
MediaPlayerBaseExtensionDirective.ctorParameters = () => [
    { type: MediaPlayerService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ColorService {
    constructor() {
        this._colorSet = colorSets.keppel;
        if (this._colorSet.colorClassSet) {
            this.setColors();
        }
        else {
            for (let /** @type {?} */ key in this._colorSet.colorValueSet) {
                this._colors[key] = this.getColorValueByHex(this._colorSet.colorValueSet[key]);
            }
        }
    }
    /**
     * @return {?}
     */
    setColors() {
        this._html = '';
        for (let /** @type {?} */ key in this._colorSet.colorClassSet) {
            this._html += '<div class="' + this._colorSet.colorClassSet[key] + '-color"></div>';
        }
        this._element = document.createElement('div');
        this._element.className = 'color-chart';
        this._element.innerHTML = this._html;
        document.body.appendChild(this._element);
        this._colors = {};
        for (let /** @type {?} */ key in this._colorSet.colorClassSet) {
            this._colors[key] = this.getColorValue(this._colorSet.colorClassSet[key]);
        }
        this._element.parentNode.removeChild(this._element);
    }
    /**
     * @param {?} color
     * @return {?}
     */
    getColorValueByHex(color) {
        const /** @type {?} */ hex = color.replace('#', '');
        const /** @type {?} */ r = parseInt(hex.substring(0, 2), 16).toString();
        const /** @type {?} */ g = parseInt(hex.substring(2, 4), 16).toString();
        const /** @type {?} */ b = parseInt(hex.substring(4, 6), 16).toString();
        return new ThemeColor(r, g, b, '1');
    }
    /**
     * @param {?} color
     * @return {?}
     */
    getColorValue(color) {
        const /** @type {?} */ target = this._element.querySelector('.' + this._colorSet.colorClassSet[color] + '-color');
        if (!target) {
            throw new Error('Invalid color');
        }
        const /** @type {?} */ colorValue = window.getComputedStyle(target).backgroundColor;
        const /** @type {?} */ rgba = colorValue.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        return new ThemeColor(rgba[1], rgba[2], rgba[3], rgba[4]);
    }
    /**
     * @param {?} color
     * @return {?}
     */
    getColor(color) {
        const /** @type {?} */ themeColor = this._colors[this.resolveColorName(color)];
        if (!themeColor) {
            throw new Error('Color not found: ' + color);
        }
        return new ThemeColor(themeColor.getRed(), themeColor.getGreen(), themeColor.getBlue(), themeColor.getAlpha());
    }
    /**
     * @return {?}
     */
    getColorSet() {
        return this._colorSet;
    }
    /**
     * @param {?} colorSet
     * @return {?}
     */
    setColorSet(colorSet) {
        this._colorSet = colorSet;
        this._colors = {};
        if (this._colorSet.colorClassSet) {
            this.setColors();
        }
        else {
            for (let /** @type {?} */ key in this._colorSet.colorValueSet) {
                this._colors[key] = this.getColorValueByHex(this._colorSet.colorValueSet[key]);
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    resolve(value) {
        if (!value) {
            return;
        }
        const /** @type {?} */ colorName = this.resolveColorName(value);
        for (let /** @type {?} */ color in this._colors) {
            if (colorName === color.toLowerCase()) {
                return this.getColor(colorName).toRgba();
            }
        }
        return value;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    resolveColorName(value = '') {
        return value.replace(/\s+/g, '-').toLowerCase();
    }
}
ColorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ColorService.ctorParameters = () => [];
class ThemeColor {
    /**
     * @param {?} r
     * @param {?} g
     * @param {?} b
     * @param {?} a
     */
    constructor(r, g, b, a) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a === undefined ? '1' : a;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static parse(value) {
        let /** @type {?} */ r, /** @type {?} */ g, /** @type {?} */ b, /** @type {?} */ a = '1';
        const /** @type {?} */ rgbaPattern = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
        const /** @type {?} */ shortHexPattern = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const /** @type {?} */ longHexPattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/;
        const /** @type {?} */ rgbaMatch = value.match(rgbaPattern);
        const /** @type {?} */ shortHexMatch = value.match(shortHexPattern);
        const /** @type {?} */ longHexMatch = value.match(longHexPattern);
        if (rgbaMatch) {
            r = rgbaMatch[1];
            g = rgbaMatch[2];
            b = rgbaMatch[3];
            a = rgbaMatch[4] ? rgbaMatch[4] : '1';
        }
        else if (longHexMatch) {
            r = parseInt(longHexMatch[1], 16).toString();
            g = parseInt(longHexMatch[2], 16).toString();
            b = parseInt(longHexMatch[3], 16).toString();
        }
        else if (shortHexMatch) {
            r = parseInt(shortHexMatch[1] + shortHexMatch[1], 16).toString();
            g = parseInt(shortHexMatch[2] + shortHexMatch[2], 16).toString();
            b = parseInt(shortHexMatch[3] + shortHexMatch[3], 16).toString();
        }
        else {
            throw new Error(`Cannot parse color - ${value} is not a valid color.`);
        }
        return new ThemeColor(r, g, b, a);
    }
    /**
     * @return {?}
     */
    toHex() {
        let /** @type {?} */ red = parseInt(this._r).toString(16);
        let /** @type {?} */ green = parseInt(this._g).toString(16);
        let /** @type {?} */ blue = parseInt(this._b).toString(16);
        if (red.length < 2) {
            red = '0' + red;
        }
        if (green.length < 2) {
            green = '0' + green;
        }
        if (blue.length < 2) {
            blue = '0' + blue;
        }
        return '#' + red + green + blue;
    }
    /**
     * @return {?}
     */
    toRgb() {
        return 'rgb(' + this._r + ', ' + this._g + ', ' + this._b + ')';
    }
    /**
     * @return {?}
     */
    toRgba() {
        return 'rgba(' + this._r + ', ' + this._g + ', ' + this._b + ', ' + this._a + ')';
    }
    /**
     * @return {?}
     */
    getRed() {
        return this._r;
    }
    /**
     * @return {?}
     */
    getGreen() {
        return this._g;
    }
    /**
     * @return {?}
     */
    getBlue() {
        return this._b;
    }
    /**
     * @return {?}
     */
    getAlpha() {
        return this._a;
    }
    /**
     * @param {?} red
     * @return {?}
     */
    setRed(red) {
        this._r = red;
        return this;
    }
    /**
     * @param {?} green
     * @return {?}
     */
    setGreen(green) {
        this._g = green;
        return this;
    }
    /**
     * @param {?} blue
     * @return {?}
     */
    setBlue(blue) {
        this._b = blue;
        return this;
    }
    /**
     * @param {?} alpha
     * @return {?}
     */
    setAlpha(alpha) {
        this._a = alpha.toString();
        return this;
    }
}
const /** @type {?} */ colorSets = {
    keppel: {
        colorClassSet: {
            'primary': 'primary',
            'accent': 'accent',
            'secondary': 'secondary',
            'alternate1': 'alternate1',
            'alternate2': 'alternate2',
            'alternate3': 'alternate3',
            'vibrant1': 'vibrant1',
            'vibrant2': 'vibrant2',
            'grey1': 'grey1',
            'grey2': 'grey2',
            'grey3': 'grey3',
            'grey4': 'grey4',
            'grey5': 'grey5',
            'grey6': 'grey6',
            'grey7': 'grey7',
            'grey8': 'grey8',
            'chart1': 'chart1',
            'chart2': 'chart2',
            'chart3': 'chart3',
            'chart4': 'chart4',
            'chart5': 'chart5',
            'chart6': 'chart6',
            'ok': 'ok',
            'warning': 'warning',
            'critical': 'critical',
            'partition1': 'partition1',
            'partition9': 'partition9',
            'partition10': 'partition10',
            'partition11': 'partition11',
            'partition12': 'partition12',
            'partition13': 'partition13',
            'partition14': 'partition14',
            'social-chart-node': 'social-chart-node',
            'social-chart-edge': 'social-chart-edge'
        }
    },
    microFocus: {
        'colorValueSet': {
            'cerulean': '#1668c1',
            'aqua': '#29ceff',
            'aquamarine': '#2fd6c3',
            'fuchsia': '#c6179d',
            'indigo': '#7425ad',
            'dark-blue': '#231ca5',
            'white': '#ffffff',
            'slightly-gray': '#f5f7f8',
            'bright-gray': '#f1f2f3',
            'gray': '#dcdedf',
            'silver': '#bdbec0',
            'dim-gray': '#656668',
            'dark-gray': '#323435',
            'black': '#000000',
            'crimson-negative': '#e5004c',
            'apricot': '#f48b34',
            'yellow': '#fcdb1f',
            'green-positive': '#1aac60',
            'ultramarine': '#3939c6',
            'skyblue': '#00abf3',
            'pale-aqua': '#43e4ff',
            'pale-green': '#1ffbba',
            'lime': '#75da4d',
            'orange': '#ffce00',
            'magenta': '#eb23c2',
            'pale-purple': '#ba47e2',
            'dark-ultramarine': '#271782',
            'steelblue': '#014272',
            'arctic-blue': '#0b8eac',
            'emerald': '#00a989',
            'olive': '#5bba36',
            'goldenrod': '#ffb000',
            'purple': '#9b1e83',
            'pale-eggplant': '#5216ac',
            'red': '#ff454f',
            'pale-amber': '#ffb24d',
            'pale-lemon': '#fde159',
            'pale-emerald': '#33c180',
            'plum': '#b21646',
            'copper': '#e57828',
            'amber': '#ffc002',
            'leaf-green': '#118c4f',
            'forest-green': '#00645a',
            'primary': '#0073e7',
            'accent': '#7425ad',
            'secondary': '#ffffff',
            'alternate1': '#29ceff',
            'alternate2': '#2fd6c3',
            'alternate3': '#c6179d',
            'vibrant1': '#43e4ff',
            'vibrant2': '#ffce00',
            'grey1': '#000000',
            'grey2': '#323435',
            'grey3': '#656668',
            'grey4': '#bdbec0',
            'grey5': '#dcdedf',
            'grey6': '#f1f2f3',
            'grey7': '#f5f7f8',
            'grey8': '#ffffff',
            'chart1': '#3939c6',
            'chart2': '#00abf3',
            'chart3': '#75da4d',
            'chart4': '#ffce00',
            'chart5': '#eb23c2',
            'chart6': '#ba47e2',
            'ok': '#1aac60',
            'warning': '#f48b34',
            'critical': 'e5004c',
            'partition1': '#7425ad',
            'partition9': '#5216ac',
            'partition10': '#5bba36',
            'partition11': '#014272',
            'partition12': '#ffb000',
            'partition13': '#bdbec0',
            'partition14': '#271782',
            'social-chart-node': '#ff00ff',
            'social-chart-edge': '#ff00ff'
        }
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ColorServiceModule {
}
ColorServiceModule.decorators = [
    { type: NgModule, args: [{
                providers: [ColorService],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SliderComponent {
    /**
     * @param {?} colorService
     * @param {?} _changeDetectorRef
     */
    constructor(colorService, _changeDetectorRef) {
        this._changeDetectorRef = _changeDetectorRef;
        this.value = 0;
        this.valueChange = new EventEmitter();
        // expose enums to Angular view
        this.sliderType = SliderType;
        this.sliderStyle = SliderStyle;
        this.sliderSize = SliderSize;
        this.sliderSnap = SliderSnap;
        this.sliderThumb = SliderThumb;
        this.sliderTickType = SliderTickType;
        this.sliderThumbEvent = SliderThumbEvent;
        this.sliderCalloutTrigger = SliderCalloutTrigger;
        this.tracks = {
            lower: {
                size: 0,
                color: ''
            },
            middle: {
                size: 0,
                color: ''
            },
            upper: {
                size: 0,
                color: ''
            }
        };
        this.tooltips = {
            lower: {
                visible: false,
                position: 0,
                label: ''
            },
            upper: {
                visible: false,
                position: 0,
                label: ''
            }
        };
        this.thumbs = {
            lower: {
                hover: false,
                drag: false,
                position: 0,
                order: 100,
                value: /** @type {?} */ (null)
            },
            upper: {
                hover: false,
                drag: false,
                position: 0,
                order: 101,
                value: /** @type {?} */ (null)
            }
        };
        // store all the ticks to display
        this.ticks = [];
        // setup default options
        this.defaultOptions = {
            type: SliderType.Value,
            handles: {
                style: SliderStyle.Button,
                callout: {
                    trigger: SliderCalloutTrigger.None,
                    background: colorService.getColor('grey2').toHex(),
                    color: '#fff',
                    formatter: (value) => value
                },
                keyboard: {
                    major: 5,
                    minor: 1
                },
                aria: {
                    thumb: 'Slider value',
                    lowerThumb: 'Slider lower value',
                    upperThumb: 'Slider upper value'
                }
            },
            track: {
                height: SliderSize.Wide,
                min: 0,
                max: 100,
                ticks: {
                    snap: SliderSnap.None,
                    major: {
                        show: true,
                        steps: 10,
                        labels: true,
                        formatter: (value) => value
                    },
                    minor: {
                        show: true,
                        steps: 5,
                        labels: false,
                        formatter: (value) => value
                    }
                },
                colors: {
                    lower: colorService.getColor('grey6').toHex(),
                    range: colorService.getColor('accent').setAlpha(0.75).toRgba(),
                    higher: colorService.getColor('grey6').toHex()
                }
            }
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.updateOptions();
        this.updateValues();
        this.setThumbState(SliderThumb.Lower, false, false);
        this.setThumbState(SliderThumb.Upper, false, false);
        // emit the initial value
        this.valueChange.next(this.clone(this.value));
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.detectValueChange(this.value, this._value)) {
            this.updateValues();
            this._value = this.clone(this.value);
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // persistent tooltips will need positioned correctly at this stage
        setTimeout(() => {
            this.updateTooltipPosition(SliderThumb.Lower);
            this.updateTooltipPosition(SliderThumb.Upper);
            // mark as dirty
            this._changeDetectorRef.markForCheck();
        });
    }
    /**
     * @param {?} thumb
     * @param {?} snapTarget
     * @param {?} forwards
     * @return {?}
     */
    snapToNearestTick(thumb, snapTarget, forwards) {
        // get the value for the thumb
        const { value } = this.getThumbState(thumb);
        // get the closest ticks - remove any tick if we are currently on it
        const /** @type {?} */ closest = this.getTickDistances(value, thumb, snapTarget)
            .filter(tick => tick.value !== value)
            .find(tick => forwards ? tick.value > value : tick.value < value);
        // If we have no ticks then move by a predefined amount
        if (closest) {
            return this.setThumbValue(thumb, this.validateValue(thumb, closest.value));
        }
        const /** @type {?} */ step = snapTarget === SliderSnap.Major ? this.options.handles.keyboard.major : this.options.handles.keyboard.minor;
        this.setThumbValue(thumb, this.validateValue(thumb, value + (forwards ? step : -step)));
    }
    /**
     * @param {?} thumb
     * @param {?} forwards
     * @return {?}
     */
    snapToEnd(thumb, forwards) {
        this.setThumbValue(thumb, this.validateValue(thumb, forwards ? this.options.track.max : this.options.track.min));
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    getThumbValue(thumb) {
        return this.getThumbState(thumb).value;
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    getFormattedValue(thumb) {
        return this.options.handles.callout.formatter(this.getThumbState(thumb).value);
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    getThumbState(thumb) {
        return thumb === SliderThumb.Lower ? this.thumbs.lower : this.thumbs.upper;
    }
    /**
     * @param {?} thumb
     * @param {?} hover
     * @param {?} drag
     * @return {?}
     */
    setThumbState(thumb, hover, drag) {
        if (thumb === SliderThumb.Lower) {
            this.thumbs.lower.hover = hover;
            this.thumbs.lower.drag = drag;
        }
        else {
            this.thumbs.upper.hover = hover;
            this.thumbs.upper.drag = drag;
        }
        // update the visibility of the tooltips
        this.updateTooltips(thumb);
    }
    /**
     * @param {?} thumb
     * @param {?} event
     * @return {?}
     */
    thumbEvent(thumb, event) {
        // get the current thumb state
        const /** @type {?} */ state$$1 = this.getThumbState(thumb);
        // update based upon event
        switch (event) {
            case SliderThumbEvent.DragStart:
                state$$1.drag = true;
                break;
            case SliderThumbEvent.DragEnd:
                state$$1.drag = false;
                break;
            case SliderThumbEvent.MouseOver:
                state$$1.hover = true;
                break;
            case SliderThumbEvent.MouseLeave:
                state$$1.hover = false;
                break;
            case SliderThumbEvent.None:
                state$$1.drag = false;
                state$$1.hover = false;
                break;
        }
        // update the thumb state
        this.setThumbState(thumb, state$$1.hover, state$$1.drag);
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    getAriaValueText(thumb) {
        // get the current thumb value
        const /** @type {?} */ value = this.getThumbValue(thumb);
        // get all the ticks
        const /** @type {?} */ tick = this.ticks.find(_tick => _tick.value === value);
        if (tick && tick.label) {
            return tick.label;
        }
        // otherwise simply display the formatted value
        return this.getFormattedValue(thumb);
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    updateTooltips(thumb) {
        let /** @type {?} */ visible = false;
        const /** @type {?} */ state$$1 = this.getThumbState(thumb);
        switch (this.options.handles.callout.trigger) {
            case SliderCalloutTrigger.Persistent:
                visible = true;
                break;
            case SliderCalloutTrigger.Drag:
                visible = state$$1.drag;
                break;
            case SliderCalloutTrigger.Hover:
                visible = state$$1.hover || state$$1.drag;
                break;
            case SliderCalloutTrigger.Dynamic:
                visible = true;
                break;
        }
        // update the state for the corresponding thumb
        this.getTooltip(thumb).visible = visible;
        // update the tooltip text
        this.updateTooltipText(thumb);
        // update the tooltip positions
        this.updateTooltipPosition(thumb);
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    updateTooltipText(thumb) {
        // get the thumb value
        let /** @type {?} */ state$$1 = this.getThumbState(thumb);
        let /** @type {?} */ tooltip = this.getTooltip(thumb);
        // store the formatted label
        tooltip.label = this.getFormattedValue(thumb).toString();
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    getTooltipElement(thumb) {
        return thumb === SliderThumb.Lower ? this.lowerTooltip : this.upperTooltip;
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    getTooltip(thumb) {
        return thumb === SliderThumb.Lower ? this.tooltips.lower : this.tooltips.upper;
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    updateTooltipPosition(thumb) {
        const /** @type {?} */ tooltip = this.getTooltip(thumb);
        // if tooltip is not visible then stop here
        if (tooltip.visible === false) {
            return;
        }
        let /** @type {?} */ tooltipElement = this.getTooltipElement(thumb);
        // get the element widths
        let /** @type {?} */ thumbWidth;
        if (this.options.handles.style === SliderStyle.Button) {
            thumbWidth = this.options.track.height === SliderSize.Narrow ? 16 : 24;
        }
        else {
            thumbWidth = 2;
        }
        let /** @type {?} */ tooltipWidth = tooltipElement.nativeElement.offsetWidth;
        // calculate the tooltips new position
        let /** @type {?} */ tooltipPosition = Math.ceil((tooltipWidth - thumbWidth) / 2);
        // update tooltip position
        tooltip.position = -tooltipPosition;
        if (this.options.type === SliderType.Range && this.options.handles.callout.trigger === SliderCalloutTrigger.Dynamic) {
            this.preventTooltipOverlap(tooltip);
        }
    }
    /**
     * @param {?} tooltip
     * @return {?}
     */
    preventTooltipOverlap(tooltip) {
        const /** @type {?} */ trackWidth = this.track.nativeElement.offsetWidth;
        const /** @type {?} */ lower = (trackWidth / 100) * this.thumbs.lower.position;
        const /** @type {?} */ upper = (trackWidth / 100) * this.thumbs.upper.position;
        const /** @type {?} */ lowerWidth = this.lowerTooltip.nativeElement.offsetWidth / 2;
        const /** @type {?} */ upperWidth = this.upperTooltip.nativeElement.offsetWidth / 2;
        const /** @type {?} */ diff = (lower + lowerWidth) - (upper - upperWidth);
        // if the tooltips are closer than 16px then adjust so the dont move any close
        if (diff > 0) {
            if (tooltip === this.tooltips.lower && this.thumbs.lower.drag === false) {
                tooltip.position -= (diff / 2);
            }
            else if (tooltip === this.tooltips.upper && this.thumbs.upper.drag === false) {
                tooltip.position += (diff / 2);
            }
        }
    }
    /**
     * @param {?} value
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    /**
     * @param {?} event
     * @param {?} thumb
     * @return {?}
     */
    updateThumbPosition(event, thumb) {
        // get event position - either mouse or touch
        let /** @type {?} */ eventPosition = event instanceof MouseEvent ? event.clientX : event.touches && event.touches.length > 0 ? event.touches[0].clientX : null;
        // if event position is null do nothing
        if (eventPosition === null) {
            return;
        }
        // get mouse position
        let /** @type {?} */ mouseX = window.pageXOffset + eventPosition;
        // get track size and position
        let /** @type {?} */ trackBounds = this.track.nativeElement.getBoundingClientRect();
        // restrict the value within the range size
        let /** @type {?} */ position = this.clamp(mouseX - trackBounds.left, 0, trackBounds.width);
        // get fraction representation of location within the track
        let /** @type {?} */ fraction = (position / trackBounds.width);
        // convert to value within the range
        let /** @type {?} */ value = ((this.options.track.max - this.options.track.min) * fraction) + this.options.track.min;
        // ensure value is valid
        value = this.validateValue(thumb, value);
        // snap to a tick if required
        value = this.snapToTick(value, thumb);
        // update the value accordingly
        this.setThumbValue(thumb, value);
        this.updateOrder(thumb);
        this.updateValues();
        // update tooltip text & position
        this.updateTooltipText(thumb);
        // update the position of all visible tooltips
        this.updateTooltipPosition(SliderThumb.Lower);
        this.updateTooltipPosition(SliderThumb.Upper);
        // mark as dirty for change detection
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @param {?} thumb
     * @return {?}
     */
    updateOrder(thumb) {
        let /** @type {?} */ lower = thumb === SliderThumb.Lower ? 101 : 100;
        let /** @type {?} */ upper = thumb === SliderThumb.Lower ? 100 : 101;
        // The most recently used thumb should be above
        this.thumbs.lower.order = lower;
        this.thumbs.upper.order = upper;
    }
    /**
     * @param {?} value
     * @param {?} thumb
     * @param {?} snapTarget
     * @return {?}
     */
    getTickDistances(value, thumb, snapTarget) {
        // if snap target is none then return original value
        if (snapTarget === SliderSnap.None) {
            return [];
        }
        // get filtered ticks
        let /** @type {?} */ ticks;
        switch (snapTarget) {
            case SliderSnap.Minor:
                ticks = this.ticks.filter(tick => tick.type === SliderTickType.Minor);
                break;
            case SliderSnap.Major:
                ticks = this.ticks.filter(tick => tick.type === SliderTickType.Major);
                break;
            default:
                ticks = this.ticks.slice(0);
        }
        // get the track limit
        let /** @type {?} */ lowerLimit = this.options.track.min;
        let /** @type {?} */ upperLimit = this.options.track.max;
        if (this.options.type === SliderType.Range && thumb === SliderThumb.Lower) {
            upperLimit = this.thumbs.upper.value;
        }
        if (this.options.type === SliderType.Range && thumb === SliderThumb.Upper) {
            lowerLimit = this.thumbs.lower.value;
        }
        // Find the closest tick to the current position
        const /** @type {?} */ range = ticks.filter(tick => tick.value >= lowerLimit && tick.value <= upperLimit);
        // If there are no close ticks in the valid range then dont snap
        if (range.length === 0) {
            return [];
        }
        return range.sort((tickOne, tickTwo) => {
            const /** @type {?} */ tickOneDelta = Math.max(tickOne.value, value) - Math.min(tickOne.value, value);
            const /** @type {?} */ tickTwoDelta = Math.max(tickTwo.value, value) - Math.min(tickTwo.value, value);
            return tickOneDelta - tickTwoDelta;
        });
    }
    /**
     * @param {?} value
     * @param {?} thumb
     * @return {?}
     */
    snapToTick(value, thumb) {
        const /** @type {?} */ tickDistances = this.getTickDistances(value, thumb, this.options.track.ticks.snap);
        // if there are no ticks return the current value
        if (tickDistances.length === 0) {
            return value;
        }
        // get the closest tick
        return tickDistances[0].value;
    }
    /**
     * @param {?} thumb
     * @param {?} value
     * @return {?}
     */
    validateValue(thumb, value) {
        // if slider is not a range value is always valid providing it is within the chart min and max values
        if (this.options.type === SliderType.Value) {
            return Math.max(Math.min(value, this.options.track.max), this.options.track.min);
        }
        // check if value is with chart ranges
        if (value > this.options.track.max) {
            return thumb === SliderThumb.Lower ? Math.min(this.options.track.max, this.thumbs.upper.value) : this.options.track.max;
        }
        if (value < this.options.track.min) {
            return thumb === SliderThumb.Upper ? Math.max(this.options.track.min, this.thumbs.lower.value) : this.options.track.min;
        }
        // otherwise we need to check to make sure lower thumb cannot go above higher and vice versa
        if (thumb === SliderThumb.Lower) {
            if (this.thumbs.upper.value === null) {
                return value;
            }
            return value <= this.thumbs.upper.value ? value : this.thumbs.upper.value;
        }
        if (thumb === SliderThumb.Upper) {
            if (this.thumbs.lower.value === null) {
                return value;
            }
            return value >= this.thumbs.lower.value ? value : this.thumbs.lower.value;
        }
    }
    /**
     * @return {?}
     */
    updateOptions() {
        // add in the default options that user hasn't specified
        this.options = this.deepMerge(this.options || {}, this.defaultOptions);
        this.updateTrackColors();
        this.updateTicks();
        this.updateValues();
    }
    /**
     * @return {?}
     */
    updateValues() {
        if (this.value === undefined || this.value === null) {
            this.value = 0;
        }
        let /** @type {?} */ lowerValue = typeof this.value === 'number' ? this.value : this.value.low;
        let /** @type {?} */ upperValue = typeof this.value === 'number' ? this.value : this.value.high;
        // validate values
        lowerValue = this.validateValue(SliderThumb.Lower, Number(lowerValue.toFixed(4)));
        upperValue = this.validateValue(SliderThumb.Upper, Number(upperValue.toFixed(4)));
        // calculate the positions as percentages
        let /** @type {?} */ lowerPosition = (((lowerValue - this.options.track.min) / (this.options.track.max - this.options.track.min)) * 100);
        let /** @type {?} */ upperPosition = (((upperValue - this.options.track.min) / (this.options.track.max - this.options.track.min)) * 100);
        // update thumb positions
        this.thumbs.lower.position = lowerPosition;
        this.thumbs.upper.position = upperPosition;
        // calculate the track sizes
        this.tracks.lower.size = lowerPosition;
        this.tracks.middle.size = upperPosition - lowerPosition;
        this.tracks.upper.size = this.options.type === SliderType.Value ? 100 - lowerPosition : 100 - upperPosition;
        // update the value input
        this.setValue(lowerValue, upperValue);
    }
    /**
     * @param {?} low
     * @param {?=} high
     * @return {?}
     */
    setValue(low, high) {
        this.thumbs.lower.value = low;
        this.thumbs.upper.value = high;
        let /** @type {?} */ previousValue = this.clone(this._value);
        this.value = this.options.type === SliderType.Value ? low : { low: low, high: high };
        // call the event emitter if changes occured
        if (this.detectValueChange(this.value, previousValue)) {
            this.valueChange.emit(this.clone(this.value));
            this.updateTooltipText(SliderThumb.Lower);
            this.updateTooltipText(SliderThumb.Upper);
        }
        else {
            this.valueChange.emit(this.clone(this.value));
        }
    }
    /**
     * @param {?} thumb
     * @param {?} value
     * @return {?}
     */
    setThumbValue(thumb, value) {
        // update the thumb value
        this.getThumbState(thumb).value = value;
        // forward these changes to the value
        this.setValue(this.thumbs.lower.value, this.thumbs.upper.value);
    }
    /**
     * @return {?}
     */
    updateTicks() {
        // get tick options
        const /** @type {?} */ majorOptions = this.options.track.ticks.major;
        const /** @type {?} */ minorOptions = this.options.track.ticks.minor;
        // check if we should show ticks
        if (majorOptions.show === false && minorOptions.show === false) {
            this.ticks = [];
        }
        // create ticks for both major and minor - only get the ones to be shown
        const /** @type {?} */ majorTicks = this.getTicks(majorOptions, SliderTickType.Major).filter(tick => tick.showTicks);
        const /** @type {?} */ minorTicks = this.getTicks(minorOptions, SliderTickType.Minor).filter(tick => tick.showTicks);
        // remove any minor ticks that are on a major interval
        this.ticks = this.unionTicks(majorTicks, minorTicks);
    }
    /**
     * @return {?}
     */
    updateTrackColors() {
        // get colors for each part of the track
        const { lower, range, higher } = this.options.track.colors;
        // update the controller value
        this.tracks.lower.color = typeof lower === 'string' ? lower : `linear-gradient(to right, ${lower.join(', ')})`;
        this.tracks.middle.color = typeof range === 'string' ? range : `linear-gradient(to right, ${range.join(', ')})`;
        this.tracks.upper.color = typeof higher === 'string' ? higher : `linear-gradient(to right, ${higher.join(', ')})`;
    }
    /**
     * @param {?} steps
     * @return {?}
     */
    getSteps(steps) {
        // if they are already an array just return it
        if (steps instanceof Array) {
            return steps;
        }
        let /** @type {?} */ output = [];
        // otherwise calculate the steps
        for (let /** @type {?} */ idx = this.options.track.min; idx <= this.options.track.max; idx += steps) {
            output.push(idx);
        }
        return output;
    }
    /**
     * @param {?} options
     * @param {?} type
     * @return {?}
     */
    getTicks(options, type) {
        // create an array to store the ticks and step points
        let /** @type {?} */ steps = this.getSteps(options.steps);
        // get some chart options
        let /** @type {?} */ min = this.options.track.min;
        let /** @type {?} */ max = this.options.track.max;
        // convert each step to a slider tick and remove invalid ticks
        return steps.map(step => {
            return {
                showTicks: options.show,
                showLabels: options.labels,
                type: type,
                position: ((step - min) / (max - min)) * 100,
                value: step,
                label: options.formatter(step)
            };
        }).filter(tick => tick.position >= 0 && tick.position <= 100);
    }
    /**
     * @param {?} majorTicks
     * @param {?} minorTicks
     * @return {?}
     */
    unionTicks(majorTicks, minorTicks) {
        // get all ticks combined removing any minor ticks with the same value as major ticks
        return majorTicks.concat(minorTicks)
            .filter((tick, index, array) => tick.type === SliderTickType.Major || !array.find(tk => tk.type === SliderTickType.Major && tk.position === tick.position))
            .sort((t1, t2) => t1.value - t2.value);
    }
    /**
     * @template T
     * @param {?} destination
     * @param {?} source
     * @return {?}
     */
    deepMerge(destination, source) {
        // loop though all of the properties in the source object
        for (let /** @type {?} */ prop in source) {
            // check if the destination object has the property
            if (!destination.hasOwnProperty(prop)) {
                // copy the property across
                destination[prop] = source[prop];
                continue;
            }
            // if the property exists and is not an object then skip
            if (typeof destination[prop] !== 'object') {
                continue;
            }
            // check if property is an array
            if (destination[prop] instanceof Array) {
                continue;
            }
            // if it is an object then perform a recursive check
            destination[prop] = this.deepMerge(destination[prop], source[prop]);
        }
        return destination;
    }
    /**
     * @param {?} value1
     * @param {?} value2
     * @return {?}
     */
    detectValueChange(value1, value2) {
        // compare two slider values
        if (this.isSliderValue(value1) && this.isSliderValue(value2)) {
            // references to the objects in the correct types
            const /** @type {?} */ obj1 = /** @type {?} */ (value1);
            const /** @type {?} */ obj2 = /** @type {?} */ (value2);
            return obj1.low !== obj2.low || obj1.high !== obj2.high;
        }
        // if not a slider value - should be number of nullable type - compare normally
        return value1 !== value2;
    }
    /**
     * Determines whether or not an object conforms to the
     * SliderValue interface.
     * @param {?} value - The object to check - this must be type any
     * @return {?}
     */
    isSliderValue(value) {
        // check if is an object
        if (typeof value !== 'object') {
            return false;
        }
        // next check if it contains the necessary properties
        return 'low' in value && 'high' in value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    clone(value) {
        // if it is not an object simply return the value
        if (typeof value !== 'object') {
            return value;
        }
        // create a new object from the existing one
        const /** @type {?} */ instance = Object.assign({}, value);
        // delete remove the value from the old object
        value = undefined;
        // return the new instance of the object
        return instance;
    }
}
SliderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-slider',
                template: "<div class=\"track\" #track [class.narrow]=\"options.track.height === sliderSize.Narrow\" [class.wide]=\"options.track.height === sliderSize.Wide\" [class.range]=\"options.type === sliderType.Range\">\n\n    <!-- Section Beneath Lower Thumb -->\n    <div class=\"track-section track-lower\" [style.flex-grow]=\"tracks.lower.size\" [style.background]=\"tracks.lower.color\"></div>\n\n    <!-- Lower Thumb Button / Line -->\n    <div class=\"thumb lower\"\n        uxDrag\n        role=\"slider\"\n        tabindex=\"0\"\n        #lowerthumb\n        [attr.aria-label]=\"options.type === sliderType.Range ? options.handles.aria.lowerThumb : options.handles.aria.thumb\"\n        [attr.aria-valuemin]=\"options?.track?.min\"\n        [attr.aria-valuemax]=\"options.type === sliderType.Range ? getThumbValue(sliderThumb.Upper) : options?.track?.max\"\n        [attr.aria-valuenow]=\"getThumbValue(sliderThumb.Lower)\"\n        [attr.aria-valuetext]=\"getAriaValueText(sliderThumb.Lower)\"\n        [style.left.%]=\"thumbs.lower.position\"\n        [class.active]=\"thumbs.lower.drag\"\n        [style.z-index]=\"thumbs.lower.order\"\n        [class.button]=\"options.handles.style === sliderStyle.Button\"\n        [class.line]=\"options.handles.style === sliderStyle.Line\"\n        [class.narrow]=\"options.track.height === sliderSize.Narrow\"\n        [class.wide]=\"options.track.height === sliderSize.Wide\"\n        (dragstart)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.DragStart); lowerthumb.focus()\"\n        (drag)=\"updateThumbPosition($event, sliderThumb.Lower)\"\n        (dragend)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.DragEnd)\"\n        (mouseenter)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseOver)\"\n        (mouseleave)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseLeave)\"\n        (focus)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseOver)\"\n        (blur)=\"thumbEvent(sliderThumb.Lower, sliderThumbEvent.MouseLeave)\"\n        (keydown.ArrowLeft)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.All, false); $event.preventDefault()\"\n        (keydown.ArrowRight)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.All, true); $event.preventDefault()\"\n        (keydown.ArrowUp)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.All, false); $event.preventDefault()\"\n        (keydown.ArrowDown)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.All, true); $event.preventDefault()\"\n        (keydown.PageDown)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.Major, false); $event.preventDefault()\"\n        (keydown.PageUp)=\"snapToNearestTick(sliderThumb.Lower, sliderSnap.Major, true); $event.preventDefault()\"\n        (keydown.Home)=\"snapToEnd(sliderThumb.Lower, false); $event.preventDefault()\"\n        (keydown.End)=\"snapToEnd(sliderThumb.Lower, true); $event.preventDefault()\">\n\n        <!-- Lower Thumb Callout -->\n        <div class=\"tooltip top tooltip-lower\" #lowerTooltip\n            [class.tooltip-dynamic]=\"options.handles.callout.trigger === sliderCalloutTrigger.Dynamic && thumbs.lower.drag === false\"\n            [style.opacity]=\"tooltips.lower.visible ? 1 : 0\"\n            [style.left.px]=\"tooltips.lower.position\">\n\n            <div class=\"tooltip-arrow\" [style.border-top-color]=\"options.handles.callout.background\"></div>\n\n            <div class=\"tooltip-inner\"\n                [style.background-color]=\"options.handles.callout.background\"\n                [style.color]=\"options.handles.callout.color\">\n                {{ tooltips.lower.label }}\n            </div>\n        </div>\n\n    </div>\n\n    <!-- Section of Track Between Lower and Upper Thumbs -->\n    <div class=\"track-section track-range\" *ngIf=\"options.type === sliderType.Range\" [style.flex-grow]=\"tracks.middle.size\" [style.background]=\"tracks.middle.color\">\n    </div>\n\n    <!-- Upper Thumb Button / Line -->\n    <div class=\"thumb upper\"\n        uxDrag\n        role=\"slider\"\n        tabindex=\"0\"\n        #upperthumb\n        [attr.aria-label]=\"options.handles.aria.upperThumb\"\n        [attr.aria-valuemin]=\"getThumbValue(sliderThumb.Lower) || options?.track?.min\"\n        [attr.aria-valuemax]=\"options?.track?.max\"\n        [attr.aria-valuenow]=\"getThumbValue(sliderThumb.Upper)\"\n        [attr.aria-valuetext]=\"getAriaValueText(sliderThumb.Upper)\"\n        [hidden]=\"options.type !== sliderType.Range\"\n        [class.active]=\"thumbs.upper.drag\"\n        [style.left.%]=\"thumbs.upper.position\"\n        [style.z-index]=\"thumbs.upper.order\"\n        [class.button]=\"options.handles.style === sliderStyle.Button\"\n        [class.line]=\"options.handles.style === sliderStyle.Line\"\n        [class.narrow]=\"options.track.height === sliderSize.Narrow\"\n        [class.wide]=\"options.track.height === sliderSize.Wide\"\n        (dragstart)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.DragStart); upperthumb.focus()\"\n        (drag)=\"updateThumbPosition($event, sliderThumb.Upper)\"\n        (dragend)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.DragEnd)\"\n        (mouseenter)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseOver)\"\n        (mouseleave)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseLeave)\"\n        (focus)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseOver)\"\n        (blur)=\"thumbEvent(sliderThumb.Upper, sliderThumbEvent.MouseLeave)\"\n        (keydown.ArrowLeft)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.All, false); $event.preventDefault()\"\n        (keydown.ArrowRight)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.All, true); $event.preventDefault()\"\n        (keydown.ArrowUp)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.All, false); $event.preventDefault()\"\n        (keydown.ArrowDown)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.All, true); $event.preventDefault()\"\n        (keydown.PageDown)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.Major, false); $event.preventDefault()\"\n        (keydown.PageUp)=\"snapToNearestTick(sliderThumb.Upper, sliderSnap.Major, true); $event.preventDefault()\"\n        (keydown.Home)=\"snapToEnd(sliderThumb.Upper, false); $event.preventDefault()\"\n        (keydown.End)=\"snapToEnd(sliderThumb.Upper, true); $event.preventDefault()\">\n\n        <!-- Upper Thumb Callout -->\n        <div class=\"tooltip top tooltip-upper\" #upperTooltip\n            [class.tooltip-dynamic]=\"options.handles.callout.trigger === sliderCalloutTrigger.Dynamic && thumbs.upper.drag === false\"\n            [style.opacity]=\"tooltips.upper.visible ? 1 : 0\"\n            [style.left.px]=\"tooltips.upper.position\">\n\n            <div class=\"tooltip-arrow\" [style.border-top-color]=\"options.handles.callout.background\"></div>\n\n            <div class=\"tooltip-inner\"\n                *ngIf=\"options.type === sliderType.Range\"\n                [style.background-color]=\"options.handles.callout.background\"\n                [style.color]=\"options.handles.callout.color\">\n                {{ tooltips.upper.label }}\n            </div>\n        </div>\n    </div>\n\n    <!-- Section of Track Abover Upper Thumb -->\n    <div class=\"track-section track-higher\" [style.flex-grow]=\"tracks.upper.size\" [style.background]=\"tracks.upper.color\"></div>\n\n</div>\n\n<!-- Chart Ticks and Tick Labels -->\n<div class=\"tick-container\"\n    role=\"presentation\"\n    *ngIf=\"(options.track.ticks.major.show || options.track.ticks.minor.show) && options.handles.callout.trigger !== sliderCalloutTrigger.Dynamic\"\n    [class.show-labels]=\"options.track.ticks.major.labels || options.track.ticks.minor.labels\">\n\n    <div class=\"tick\"\n        *ngFor=\"let tick of ticks\"\n        [class.major]=\"tick.type === sliderTickType.Major\"\n        [class.minor]=\"tick.type === sliderTickType.Minor\"\n        [style.left.%]=\"tick.position\"\n        [hidden]=\"!tick.showTicks\">\n\n        <div class=\"tick-indicator\"></div>\n        <div class=\"tick-label\" aria-hidden=\"true\" [hidden]=\"!tick.showLabels\">{{ tick.label }}</div>\n    </div>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
SliderComponent.ctorParameters = () => [
    { type: ColorService },
    { type: ChangeDetectorRef }
];
SliderComponent.propDecorators = {
    value: [{ type: Input }],
    options: [{ type: Input }],
    valueChange: [{ type: Output }],
    lowerTooltip: [{ type: ViewChild, args: ['lowerTooltip',] }],
    upperTooltip: [{ type: ViewChild, args: ['upperTooltip',] }],
    track: [{ type: ViewChild, args: ['track',] }]
};
/** @enum {number} */
const SliderType = {
    Value: 0,
    Range: 1,
};
SliderType[SliderType.Value] = "Value";
SliderType[SliderType.Range] = "Range";
/** @enum {number} */
const SliderStyle = {
    Button: 0,
    Line: 1,
};
SliderStyle[SliderStyle.Button] = "Button";
SliderStyle[SliderStyle.Line] = "Line";
/** @enum {number} */
const SliderSize = {
    Narrow: 0,
    Wide: 1,
};
SliderSize[SliderSize.Narrow] = "Narrow";
SliderSize[SliderSize.Wide] = "Wide";
/** @enum {number} */
const SliderCalloutTrigger = {
    None: 0,
    Hover: 1,
    Drag: 2,
    Persistent: 3,
    Dynamic: 4,
};
SliderCalloutTrigger[SliderCalloutTrigger.None] = "None";
SliderCalloutTrigger[SliderCalloutTrigger.Hover] = "Hover";
SliderCalloutTrigger[SliderCalloutTrigger.Drag] = "Drag";
SliderCalloutTrigger[SliderCalloutTrigger.Persistent] = "Persistent";
SliderCalloutTrigger[SliderCalloutTrigger.Dynamic] = "Dynamic";
/** @enum {number} */
const SliderSnap = {
    None: 0,
    Minor: 1,
    Major: 2,
    All: 3,
};
SliderSnap[SliderSnap.None] = "None";
SliderSnap[SliderSnap.Minor] = "Minor";
SliderSnap[SliderSnap.Major] = "Major";
SliderSnap[SliderSnap.All] = "All";
/** @enum {number} */
const SliderTickType = {
    Minor: 0,
    Major: 1,
};
SliderTickType[SliderTickType.Minor] = "Minor";
SliderTickType[SliderTickType.Major] = "Major";
/** @enum {number} */
const SliderThumbEvent = {
    None: 0,
    MouseOver: 1,
    MouseLeave: 2,
    DragStart: 3,
    DragEnd: 4,
};
SliderThumbEvent[SliderThumbEvent.None] = "None";
SliderThumbEvent[SliderThumbEvent.MouseOver] = "MouseOver";
SliderThumbEvent[SliderThumbEvent.MouseLeave] = "MouseLeave";
SliderThumbEvent[SliderThumbEvent.DragStart] = "DragStart";
SliderThumbEvent[SliderThumbEvent.DragEnd] = "DragEnd";
/** @enum {number} */
const SliderThumb = {
    Lower: 0,
    Upper: 1,
};
SliderThumb[SliderThumb.Lower] = "Lower";
SliderThumb[SliderThumb.Upper] = "Upper";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SliderModule {
}
SliderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ColorServiceModule,
                    DragModule
                ],
                exports: [SliderComponent],
                declarations: [SliderComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ uniqueId$3 = 1;
class MediaPlayerControlsExtensionComponent extends MediaPlayerBaseExtensionDirective {
    constructor() {
        super(...arguments);
        this.volumeActive = false;
        this.volumeFocus = false;
        this.returnFocus = true;
        this.subtitlesId = `ux-media-player-subtitle-popover-${uniqueId$3++}`;
        this.subtitlesOpen = false;
        this.mouseEnterVolume = new Subject();
        this.mouseLeaveVolume = new Subject();
        this.options = {
            handles: {
                aria: {
                    thumb: 'Volume'
                }
            },
            track: {
                colors: {
                    lower: '#666'
                },
                height: SliderSize.Narrow,
                ticks: {
                    major: {
                        show: false
                    },
                    minor: {
                        show: false
                    }
                }
            }
        };
        this._volume = 50;
        this._previousVolume = 50;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    get volume() {
        return this._volume;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set volume(value) {
        if (value === 0 && this._volume !== 0) {
            this._previousVolume = this._volume;
        }
        this._volume = Math.min(Math.max(value, 0), 100);
        this.mediaPlayerService.volume = this._volume / 100;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.mediaPlayerService.volumeChangeEvent.pipe(takeUntil(this._onDestroy)).subscribe(volume => this.volume = volume * 100);
        this.mediaPlayerService.initEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.volume = this.mediaPlayerService.volume * 100);
        this.mouseEnterVolume.pipe(takeUntil(this._onDestroy)).subscribe(() => this.volumeActive = true);
        this.mouseLeaveVolume.pipe(switchMap(() => timer(1500).pipe(takeUntil(this.mouseEnterVolume))), takeUntil(this._onDestroy)).subscribe(() => this.volumeActive = false);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @return {?}
     */
    toggleMute() {
        this.volume = this.volume === 0 ? this._previousVolume : 0;
    }
    /**
     * @return {?}
     */
    goToStart() {
        this.mediaPlayerService.currentTime = 0;
    }
    /**
     * @return {?}
     */
    goToEnd() {
        this.mediaPlayerService.currentTime = this.mediaPlayerService.duration;
    }
    /**
     * @return {?}
     */
    isSubtitleActive() {
        for (let /** @type {?} */ idx = 0; idx < this.mediaPlayerService.textTracks.length; idx++) {
            if (this.mediaPlayerService.textTracks[idx].mode === 'showing') {
                return true;
            }
        }
        return false;
    }
    /**
     * @param {?} track
     * @return {?}
     */
    setSubtitleTrack(track) {
        // hide all tracks
        this.mediaPlayerService.hideSubtitleTracks();
        // set the position of the subtitle track
        for (let /** @type {?} */ idx = 0; idx < track.cues.length; idx++) {
            const /** @type {?} */ cue = track.cues[idx];
            cue.line = -3;
        }
        // activate the selected one
        track.mode = 'showing';
    }
    /**
     * @return {?}
     */
    getSubtitleTrack() {
        for (let /** @type {?} */ idx = 0; idx < this.mediaPlayerService.textTracks.length; idx++) {
            if (this.mediaPlayerService.textTracks[idx].mode === 'showing') {
                return this.mediaPlayerService.textTracks[idx].label;
            }
        }
        return 'No subtitles';
    }
}
MediaPlayerControlsExtensionComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-media-player-controls',
                template: "<div class=\"volume-container\">\n\n    <div class=\"volume-slider-container\"\n        #volumeContainer\n        [class.active]=\"volumeActive || volumeFocus\"\n        (mouseenter)=\"mouseEnterVolume.next()\"\n        (mouseleave)=\"mouseLeaveVolume.next()\"\n        (focusWithin)=\"volumeFocus = true\"\n        (blurWithin)=\"volumeFocus = false\">\n\n        <button #volumeIcon\n                class=\"volume-slider-icon\"\n                attr.aria-label=\"{{ volume === 0 ? 'Unmute' : 'Mute' }}\"\n                i18n-aria-label\n                [uxTooltip]=\"muteTooltip\"\n                [showTriggers]=\"['mouseenter']\"\n                [hideTriggers]=\"['mouseleave']\"\n                (click)=\"toggleMute()\"\n                (mouseup)=\"volumeIcon.blur()\">\n\n            <span class=\"hpe-icon\"\n                  [class.hpe-volume-mute]=\"volume === 0\"\n                  [class.hpe-volume-low]=\"volume > 0 && volume <= 70\"\n                  [class.hpe-volume]=\"volume > 70\">\n            </span>\n        </button>\n\n        <div class=\"volume-slider-node\">\n            <ux-slider [(value)]=\"volume\" [options]=\"options\"></ux-slider>\n        </div>\n    </div>\n</div>\n\n<button #startButton\n    class=\"control-button\"\n    (click)=\"goToStart()\"\n    (mouseup)=\"startButton.blur()\"\n    aria-label=\"Go to start\"\n    i18n-aria-label>\n\n    <svg viewBox=\"0 0 51.5 64\" width=\"14\" height=\"17\" focusable=\"false\">\n        <rect x=\"0\" y=\"0\" width=\"7.5\" height=\"64\" />\n        <polygon points=\"51.5,64 51.5,0 7.4,32 \" />\n    </svg>\n</button>\n\n<button #playButton\n    class=\"control-button\"\n    attr.aria-label=\"{{ (mediaPlayerService.playing | async) ? 'Pause' : 'Play' }}\"\n    i18n-aria-label\n    (click)=\"mediaPlayerService.togglePlay()\"\n    (mouseup)=\"playButton.blur()\">\n\n    <svg *ngIf=\"!(mediaPlayerService.playing | async)\" viewBox=\"0 0 45 64\" width=\"20\" height=\"29\" focusable=\"false\">\n        <polygon points=\"0.4,0 0.4,64 44.6,32\" />\n    </svg>\n    <svg *ngIf=\"mediaPlayerService.playing | async\" viewBox=\"0 0 43 56.9\" width=\"20\" height=\"29\" focusable=\"false\">\n        <rect y=\"0.1\" width=\"15.7\" height=\"56.9\" />\n        <rect x=\"27.3\" y=\"0.1\" width=\"15.7\" height=\"56.9\" />\n    </svg>\n</button>\n\n<button #endButton\n    class=\"control-button\"\n    (click)=\"goToEnd()\"\n    (mouseup)=\"endButton.blur()\"\n    aria-label=\"Go to end\"\n    i18n-aria-label>\n\n    <svg viewBox=\"0 0 51.5 64\" width=\"14\" height=\"17\" focusable=\"false\">\n        <rect x=\"44.1\" y=\"0\" width=\"7.5\" height=\"64\" />\n        <polygon points=\"0,64 0,0 44.1,32\" />\n    </svg>\n</button>\n\n<div class=\"actions-list\">\n\n    <ng-content></ng-content>\n\n    <div class=\"action-button-container\" *ngIf=\"mediaPlayerService.textTracks.length > 0 && mediaPlayerService.type === 'video'\">\n        <button #subtitlesButton\n            class=\"action-button\"\n            (keydown)=\"returnFocus = true\"\n            (click)=\"subtitlesOpen = !subtitlesOpen\"\n            (mouseup)=\"subtitlesButton.blur(); returnFocus = false\"\n            i18n-aria-label\n            attr.aria-label=\"Select subtitles, {{ getSubtitleTrack() }} currently selected.\"\n            [attr.aria-expanded]=\"subtitlesOpen\"\n            [attr.aria-describedby]=\"subtitlesId\"\n            aria-haspopup=\"true\">\n            <span class=\"hpe-icon hpe-subtitles\"></span>\n        </button>\n\n        <div #subtitles\n            [style.top.px]=\"-subtitles.offsetHeight\"\n            class=\"popover top media-player-subtitles-popover show\"\n            [id]=\"subtitlesId\"\n            (keydown.escape)=\"subtitlesOpen = false\"\n            (uxClickOutside)=\"subtitlesOpen = false\"\n            *ngIf=\"subtitlesOpen\">\n            <div class=\"arrow\"></div>\n            <h3 class=\"popover-title\" i18n>Subtitles</h3>\n            <div class=\"popover-content\">\n                <ul class=\"subtitles-list\" uxTabbableList [focusOnShow]=\"returnFocus\" [returnFocus]=\"returnFocus\">\n                    <li uxTabbableListItem\n                        tabindex=\"0\"\n                        class=\"subtitles-list-item\"\n                        [class.active]=\"!isSubtitleActive()\"\n                        [attr.aria-selected]=\"isSubtitleActive()\"\n                        (click)=\"mediaPlayerService.hideSubtitleTracks(); subtitlesOpen = false\"\n                        (keydown.enter)=\"mediaPlayerService.hideSubtitleTracks(); subtitlesOpen = false; returnFocus = true\">\n\n                        <i class=\"hpe-icon hpe-checkmark m-r-xs\"></i>\n                        <span i18n>Subtitles Off</span>\n                    </li>\n                    <li uxTabbableListItem\n                        class=\"subtitles-list-item\"\n                        *ngFor=\"let track of mediaPlayerService.textTracks\"\n                        [class.active]=\"track.mode === 'showing'\"\n                        [attr.aria-selected]=\"isSubtitleActive()\"\n                        (click)=\"setSubtitleTrack(track); subtitlesOpen = false\"\n                        (keydown.enter)=\"setSubtitleTrack(track); subtitlesOpen = false; returnFocus = true\">\n                        <i class=\"hpe-icon hpe-checkmark m-r-xs\"></i>\n                        <span>{{ track.label }}</span>\n                    </li>\n                </ul>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"action-button-container\">\n        <button #fullscreenButton\n            *ngIf=\"mediaPlayerService.type !== 'audio'\"\n            class=\"action-button\"\n            attr.aria-label=\"{{ mediaPlayerService.fullscreen ? 'Exit full screen' : 'Full screen' }}\"\n            i18n-aria-label\n            (click)=\"mediaPlayerService.toggleFullscreen()\"\n            (mouseup)=\"fullscreenButton.blur()\">\n\n            <span class=\"hpe-icon\"\n                  [class.hpe-expand]=\"!mediaPlayerService.fullscreen\"\n                  [class.hpe-contract]=\"mediaPlayerService.fullscreen\">\n            </span>\n        </button>\n    </div>\n</div>\n\n\n\n<ng-template #muteTooltip>\n    <span aria-hidden=\"true\">{{ volume === 0 ? 'Unmute' : 'Mute' }}</span>\n</ng-template>",
                host: {
                    '[class.quiet]': 'mediaPlayerService.quietMode || mediaPlayerService.fullscreen'
                }
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MediaPlayerCustomControlDirective {
}
MediaPlayerCustomControlDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxMediaPlayerCustomControl]',
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MediaPlayerTimelineExtensionComponent extends MediaPlayerBaseExtensionDirective {
    constructor() {
        super(...arguments);
        this.current = 0;
        this.position = 0;
        this.buffered = [];
        this.mouseDown = false;
        this.scrub = { visible: false, position: 0, time: 0 };
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // watch for changes to the current time
        this.mediaPlayerService.fullscreenEvent.pipe(takeUntil(this._onDestroy)).subscribe(fullscreen => {
            this.scrub.position = 0;
        });
        this.mediaPlayerService.timeUpdateEvent.pipe(takeUntil(this._onDestroy)).subscribe(current => {
            this.current = current;
            this.position = (this.current / this.mediaPlayerService.duration) * 100;
        });
        this.mediaPlayerService.progressEvent.pipe(takeUntil(this._onDestroy)).subscribe((buffered) => {
            this.buffered = [];
            for (let /** @type {?} */ idx = 0; idx < buffered.length; idx++) {
                this.buffered.push({
                    start: (buffered.start(idx) / this.mediaPlayerService.duration) * 100,
                    end: (buffered.end(idx) / this.mediaPlayerService.duration) * 100
                });
            }
        });
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        const /** @type {?} */ mousedown$ = fromEvent(this.thumb.nativeElement, 'mousedown');
        const /** @type {?} */ mousemove$ = fromEvent(document, 'mousemove');
        const /** @type {?} */ mouseup$ = fromEvent(document, 'mouseup');
        mousedown$.pipe(switchMap(() => mousemove$.pipe(takeUntil(mouseup$))), takeUntil(this._onDestroy)).subscribe(() => this.scrub.visible = false);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateScrub(event) {
        const /** @type {?} */ target = /** @type {?} */ (event.target);
        if (target.classList.contains('media-progress-bar-thumb')) {
            return;
        }
        const /** @type {?} */ timeline = /** @type {?} */ (this.timelineRef.nativeElement);
        const /** @type {?} */ bounds = timeline.getBoundingClientRect();
        this.scrub.position = event.offsetX;
        this.scrub.time = (event.offsetX / bounds.width) * this.mediaPlayerService.duration;
        if (this.mouseDown) {
            this.mediaPlayerService.pause();
            this.mediaPlayerService.currentTime = this.scrub.time;
        }
    }
    /**
     * Skip a number of seconds in any direction
     * @param {?} seconds
     * @return {?}
     */
    skip(seconds) {
        let /** @type {?} */ target = this.current + seconds;
        // ensure that the target position is within the bounds of the clip
        if (target < 0) {
            target = 0;
        }
        if (target > this.mediaPlayerService.duration) {
            target = this.mediaPlayerService.duration;
        }
        this.mediaPlayerService.currentTime = target;
    }
}
MediaPlayerTimelineExtensionComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-media-player-timeline',
                template: "<p class=\"current-time\">{{ current | duration }}</p>\n\n<div #timeline\n     class=\"timeline-bar\"\n     tabindex=\"0\"\n     role=\"slider\"\n     aria-label=\"Seek slider\"\n     i18n-aria-label\n     aria-valuemin=\"0\"\n     [attr.aria-valuemax]=\"mediaPlayerService.duration | number: '0.0-0'\"\n     [attr.aria-valuenow]=\"mediaPlayerService.currentTime | number: '0.0-0'\"\n     attr.aria-valuetext=\"{{ mediaPlayerService.currentTime | duration }} of {{ mediaPlayerService.duration | duration }}\"\n     (keydown.ArrowLeft)=\"skip(-5)\"\n     (keydown.ArrowRight)=\"skip(5)\"\n     (mouseenter)=\"scrub.visible = true; tooltip.show()\"\n     (mouseleave)=\"scrub.visible = false; tooltip.hide()\"\n     (mousemove)=\"updateScrub($event); tooltip.reposition()\"\n     (mouseup)=\"updateScrub($event)\"\n     (mousedown)=\"mouseDown = true; $event.preventDefault()\">\n\n    <div class=\"buffered-bar\"\n         *ngFor=\"let buffer of buffered\"\n         [style.left.%]=\"buffer.start\"\n         [style.width.%]=\"buffer.end - buffer.start\">\n    </div>\n\n    <div class=\"media-progress-bar\" [style.width.%]=\"position\">\n        <div #progressThumb\n             class=\"media-progress-bar-thumb\"\n             (mouseenter)=\"scrub.visible = false; tooltip.hide(); $event.stopPropagation()\"\n             (mouseleave)=\"scrub.visible = true; tooltip.show(); $event.stopPropagation()\">\n        </div>\n    </div>\n\n    <div #tooltip=\"ux-tooltip\"\n         class=\"scrub-handle\"\n         [class.scrub-handle-hidden]=\"!scrub.visible\"\n         [style.left.px]=\"scrub.position\"\n         [uxTooltip]=\"popTemplate\"\n         tooltipClass=\"ux-media-player-timeline-tooltip\"\n         placement=\"top\"\n         [showTriggers]=\"[]\"\n         [hideTriggers]=\"[]\"\n         [tooltipDelay]=\"100\"\n         [tooltipDisabled]=\"mediaPlayerService.duration === 0\"></div>\n</div>\n\n<p class=\"duration-time\">{{ mediaPlayerService.duration | duration }}</p>\n\n<ng-template #popTemplate>\n    <span>{{ scrub.time | duration }}</span>\n</ng-template>",
                host: {
                    '(document:mouseup)': 'mouseDown = false',
                    '[class.quiet]': 'mediaPlayerService.quietMode || mediaPlayerService.fullscreen'
                }
            }] }
];
MediaPlayerTimelineExtensionComponent.propDecorators = {
    thumb: [{ type: ViewChild, args: ['progressThumb',] }],
    timelineRef: [{ type: ViewChild, args: ['timeline',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AudioService {
    /**
     * @param {?} _http
     */
    constructor(_http) {
        this._http = _http;
    }
    /**
     * @param {?} mediaElement
     * @return {?}
     */
    getAudioFileMetadata(mediaElement) {
        return Observable.create((observer) => {
            this._http.get(mediaElement.src, { responseType: 'blob' }).subscribe(response => {
                const /** @type {?} */ filename = mediaElement.src.substring(mediaElement.src.lastIndexOf('/') + 1);
                const /** @type {?} */ extension = mediaElement.src.substring(mediaElement.src.lastIndexOf('.') + 1).toLowerCase();
                let /** @type {?} */ description;
                switch (extension) {
                    case 'mp3':
                        description = 'MPEG audio layer 3 file';
                        break;
                    case 'wma':
                        description = 'Windows media audio file';
                        break;
                    case 'wav':
                        description = 'WAVE audio file';
                        break;
                    case 'ogg':
                        description = 'Ogg Vorbis file';
                        break;
                    case 'aac':
                        description = 'Advanced audio coding file';
                        break;
                    case 'midi':
                        description = 'Musical instrument digital interface file';
                        break;
                    default:
                        description = 'Audio file';
                        break;
                }
                observer.next({
                    filename: filename,
                    extension: extension,
                    description: description,
                    size: response.size
                });
            });
        });
    }
    /**
     * @param {?} url
     * @return {?}
     */
    getWaveformFromUrl(url) {
        // if audio context is not support return a stream of empty data
        if (!(/** @type {?} */ (window)).AudioContext) {
            return of([new Float32Array(0)]);
        }
        this._audioContext = new AudioContext();
        this.createVolumeNode();
        this.createAnalyserNode();
        return Observable.create((observer) => {
            // load the media from the URL provided
            this._http.get(url, { responseType: 'arraybuffer' }).subscribe(response => {
                this.getAudioBuffer(response).subscribe(audioBuffer => {
                    // create the buffer source
                    this.createBufferSource(audioBuffer);
                    let /** @type {?} */ dataPoints = [];
                    const /** @type {?} */ channels = this._audioBuffer.numberOfChannels;
                    // extract the data from each channel
                    for (let /** @type {?} */ channelIdx = 0; channelIdx < channels; channelIdx++) {
                        dataPoints[channelIdx] = this._audioBuffer.getChannelData(channelIdx);
                    }
                    observer.next(dataPoints);
                    observer.complete();
                    // cleanup after ourselves
                    dataPoints = null;
                }, (error) => observer.error(error));
            }, (error) => observer.error(error));
        });
    }
    /**
     * @param {?=} channels
     * @param {?=} skip
     * @return {?}
     */
    getWaveformPoints(channels = [], skip = 1000) {
        const /** @type {?} */ waveform = [];
        const /** @type {?} */ duration = channels.length > 0 ? channels[0].length : 0;
        // convert each channel data to a series of waveform points
        for (let /** @type {?} */ idx = 0; idx < duration; idx += skip) {
            // get all the channel data for a specific point
            const /** @type {?} */ points = channels.map(channel => channel[idx]);
            // find the minimum point and maximum points at each position across all channels
            waveform.push({
                min: points.reduce((previous, current) => current < previous ? current : previous),
                max: points.reduce((previous, current) => current > previous ? current : previous)
            });
        }
        return waveform;
    }
    /**
     * @param {?} arrayBuffer
     * @return {?}
     */
    getAudioBuffer(arrayBuffer) {
        return Observable.create((observer) => {
            this.getOfflineAudioContext().decodeAudioData(arrayBuffer, (audioBuffer) => {
                observer.next(audioBuffer);
                observer.complete();
            }, (error) => observer.error(error));
        });
    }
    /**
     * @return {?}
     */
    getOfflineAudioContext() {
        return new OfflineAudioContext(1, 2, this._audioContext.sampleRate || 44100);
    }
    /**
     * @param {?} audioBuffer
     * @return {?}
     */
    createBufferSource(audioBuffer) {
        this.disconnectSource();
        this._audioBuffer = audioBuffer;
        this._audioBufferSource = this._audioContext.createBufferSource();
        this._audioBufferSource.buffer = this._audioBuffer;
        this._audioBufferSource.connect(this._analyserNode);
    }
    /**
     * @return {?}
     */
    createVolumeNode() {
        this._gainNode = this._audioContext.createGain();
        this._gainNode.connect(this._audioContext.destination);
    }
    /**
     * @return {?}
     */
    createAnalyserNode() {
        this._analyserNode = this._audioContext.createAnalyser();
        this._analyserNode.connect(this._gainNode);
    }
    /**
     * @return {?}
     */
    disconnectSource() {
        if (this._audioBufferSource) {
            this._audioBufferSource.disconnect();
        }
    }
}
AudioService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AudioService.ctorParameters = () => [
    { type: HttpClient }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AudioServiceModule {
}
AudioServiceModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpClientModule],
                providers: [AudioService]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MediaPlayerComponent {
    /**
     * @param {?} mediaPlayerService
     * @param {?} _audioService
     * @param {?} _elementRef
     */
    constructor(mediaPlayerService, _audioService, _elementRef) {
        this.mediaPlayerService = mediaPlayerService;
        this._audioService = _audioService;
        this._elementRef = _elementRef;
        this.hovering = false;
        this.focused = false;
        this.crossorigin = 'use-credentials';
        this._onDestroy = new Subject();
        // show controls when hovering and in quiet mode
        fromEvent(this._elementRef.nativeElement, 'mousemove').pipe(tap(() => this.hovering = true), debounceTime(2000), takeUntil(this._onDestroy)).subscribe(() => this.hovering = false);
    }
    /**
     * @return {?}
     */
    get source() {
        return this.mediaPlayerService.source;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set source(value) {
        this.mediaPlayerService.source = value;
    }
    /**
     * @return {?}
     */
    get type() {
        return this.mediaPlayerService.type;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        this.mediaPlayerService.type = value;
    }
    /**
     * @return {?}
     */
    get quietMode() {
        return this.mediaPlayerService.quietMode;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set quietMode(value) {
        this.mediaPlayerService.quietMode = value;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.mediaPlayerService.setMediaPlayer(this._elementRef.nativeElement, this._playerRef.nativeElement);
        this.audioMetadata = this._audioService.getAudioFileMetadata(this._playerRef.nativeElement);
        this.mediaPlayerService.playingEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.mediaPlayerService.playing.next(true));
        this.mediaPlayerService.pauseEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.mediaPlayerService.playing.next(false));
        this.mediaPlayerService.mediaClickEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.mediaPlayerService.togglePlay());
        this.mediaPlayerService.loadedMetadataEvent.pipe(takeUntil(this._onDestroy)).subscribe(() => this.mediaPlayerService.loaded = true);
        // initially hide all text tracks
        this.mediaPlayerService.hideSubtitleTracks();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
MediaPlayerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-media-player',
                template: "<div class=\"player-container\"\n     tabindex=\"0\"\n     aria-label=\"Media Player\"\n     i18n-aria-label\n     [cdkTrapFocus]=\"mediaPlayerService.fullscreen\">\n\n    <div class=\"video-player-container\" *ngIf=\"type === 'video'\">\n\n        <video class=\"video-player\"\n            #player\n            tabindex=\"-1\"\n            [src]=\"source\"\n            [crossOrigin]=\"crossorigin\"\n            (abort)=\"mediaPlayerService.abortEvent.next()\"\n            (canplay)=\"mediaPlayerService.canPlayEvent.next(true)\"\n            (canplaythrough)=\"mediaPlayerService.canPlayThroughEvent.next(true)\"\n            (durationchange)=\"mediaPlayerService.durationChangeEvent.next(player.duration)\"\n            (ended)=\"mediaPlayerService.endedEvent.next()\"\n            (error)=\"mediaPlayerService.errorEvent.next($event)\"\n            (loadeddata)=\"mediaPlayerService.loadedDataEvent.next($event)\"\n            (loadedmetadata)=\"mediaPlayerService.loadedMetadataEvent.next($event)\"\n            (loadstart)=\"mediaPlayerService.loadStartEvent.next()\"\n            (pause)=\"mediaPlayerService.pauseEvent.next()\"\n            (play)=\"mediaPlayerService.playEvent.next()\"\n            (playing)=\"mediaPlayerService.playingEvent.next(!player.paused)\"\n            (ratechange)=\"mediaPlayerService.rateChangeEvent.next(player.playbackRate)\"\n            (seeked)=\"mediaPlayerService.seekedEvent.next(player.currentTime)\"\n            (seeking)=\"mediaPlayerService.seekingEvent.next(player.currentTime)\"\n            (stalled)=\"mediaPlayerService.stalledEvent.next()\"\n            (suspend)=\"mediaPlayerService.suspendEvent.next()\"\n            (timeupdate)=\"mediaPlayerService.timeUpdateEvent.next(player.currentTime)\"\n            (volumechange)=\"mediaPlayerService.volumeChangeEvent.next(player.volume)\"\n            (waiting)=\"mediaPlayerService.waitingEvent.next()\"\n            (click)=\"mediaPlayerService.mediaClickEvent.next($event)\">\n\n            <ng-content select=\"track\"></ng-content>\n        </video>\n\n        <div class=\"video-overlay\" [class.playing]=\"mediaPlayerService.playing | async\">\n            <svg class=\"play-graphic\" x=\"0px\" y=\"0px\" viewBox=\"0 0 64 64\">\n                <circle class=\"play-circle\" cx=\"32.2\" cy=\"31.8\" r=\"31.8\" />\n                <polygon class=\"play-triangle\" points=\"23,14.1 23,50.8 48.3,32.5\" />\n            </svg>\n        </div>\n\n    </div>\n\n    <div class=\"audio-player\" *ngIf=\"type === 'audio'\">\n\n        <svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\">\n            <g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                <g transform=\"translate(-98.000000, -458.000000)\">\n                    <g transform=\"translate(98.000000, 458.000000)\">\n                        <path d=\"M4.5,0.5 L18.0435308,0.5 L23.5,6.22251502 L23.5,23.5 L4.5,23.5 L4.5,0.5 Z\" fill=\"#CCEAE2\"></path>\n                        <path d=\"M4.5,8 L4.5,0.5 L18,0.5 L23.5,6 L23.5,23.5 L18,23.5\" stroke=\"#60798D\" fill=\"#CCEAE2\"></path>\n                        <path d=\"M4,13.5 L0.5,13.5 L0.5,18.5 L4,18.5 L9.5,22.5 L9.5,9.5 L4,13.5 Z\" stroke=\"#60798D\" fill=\"#85D2BE\"></path>\n                        <path d=\"M11.5,12.5137939 C13.7576225,12.5137939 14.5,14.3709236 14.5,16 C14.5,17.6849236 13.7089152,19.5420532 11.5,19.5420532\"\n                            stroke=\"#60798D\"></path>\n                        <path d=\"M11.5,9 C15.8037643,9.04168701 18.5,11.6604805 18.5,16 C18.5,20.3395195 15.8804302,23.0079956 11.5,23\" stroke=\"#60798D\"></path>\n                        <path d=\"M17.5219116,0.761413574 L17.5219116,6 L23,6\" stroke=\"#60798D\" fill=\"#85D2BE\"></path>\n                    </g>\n                </g>\n            </g>\n        </svg>\n\n        <p class=\"audio-file-name\">{{ (audioMetadata | async)?.filename }}</p>\n        <p class=\"audio-file-format\">{{ (audioMetadata | async)?.description }}</p>\n        <p class=\"audio-file-size\">{{ (audioMetadata | async)?.size | fileSize }}</p>\n\n        <audio #player\n            [src]=\"source\"\n            (abort)=\"mediaPlayerService.abortEvent.next()\"\n            (canplay)=\"mediaPlayerService.canPlayEvent.next(true)\"\n            (canplaythrough)=\"mediaPlayerService.canPlayThroughEvent.next(true)\"\n            (durationchange)=\"mediaPlayerService.durationChangeEvent.next(player.duration)\"\n            (ended)=\"mediaPlayerService.endedEvent.next()\"\n            (error)=\"mediaPlayerService.errorEvent.next($event)\"\n            (loadeddata)=\"mediaPlayerService.loadedDataEvent.next($event)\"\n            (loadedmetadata)=\"mediaPlayerService.loadedMetadataEvent.next($event)\"\n            (loadstart)=\"mediaPlayerService.loadStartEvent.next()\"\n            (pause)=\"mediaPlayerService.pauseEvent.next()\"\n            (play)=\"mediaPlayerService.playEvent.next()\"\n            (playing)=\"mediaPlayerService.playingEvent.next(!player.paused)\"\n            (ratechange)=\"mediaPlayerService.rateChangeEvent.next(player.playbackRate)\"\n            (seeked)=\"mediaPlayerService.seekedEvent.next(player.currentTime)\"\n            (seeking)=\"mediaPlayerService.seekingEvent.next(player.currentTime)\"\n            (stalled)=\"mediaPlayerService.stalledEvent.next()\"\n            (suspend)=\"mediaPlayerService.suspendEvent.next()\"\n            (timeupdate)=\"mediaPlayerService.timeUpdateEvent.next(player.currentTime)\"\n            (volumechange)=\"mediaPlayerService.volumeChangeEvent.next(player.volume)\"\n            (waiting)=\"mediaPlayerService.waitingEvent.next()\"\n            (click)=\"mediaPlayerService.mediaClickEvent.next($event)\">\n        </audio>\n    </div>\n\n    <div class=\"control-bar\"\n        (focusWithin)=\"focused = true\"\n        (blurWithin)=\"focused = false\">\n\n        <ux-media-player-timeline></ux-media-player-timeline>\n        <ux-media-player-controls>\n            <ng-content select=\"[uxMediaPlayerCustomControl]\"></ng-content>\n        </ux-media-player-controls>\n    </div>\n</div>",
                providers: [MediaPlayerService],
                host: {
                    '(keydown.Space)': 'mediaPlayerService.togglePlay(); $event.preventDefault()',
                    '[class.standard]': '!mediaPlayerService.fullscreen',
                    '[class.fullscreen]': 'mediaPlayerService.fullscreen',
                    '[class.quiet]': 'quietMode && type === "video" || mediaPlayerService.fullscreen',
                    '[class.hover]': 'hovering || focused',
                    '[class.video]': 'type === "video"',
                    '[class.audio]': 'type === "audio"',
                    '(mouseenter)': 'hovering = true',
                    '(mouseleave)': 'hovering = false',
                    '(document:webkitfullscreenchange)': 'mediaPlayerService.fullscreenChange()',
                    '(document:mozfullscreenchange)': 'mediaPlayerService.fullscreenChange()',
                    '(document:MSFullscreenChange)': 'mediaPlayerService.fullscreenChange()'
                }
            }] }
];
/** @nocollapse */
MediaPlayerComponent.ctorParameters = () => [
    { type: MediaPlayerService },
    { type: AudioService },
    { type: ElementRef }
];
MediaPlayerComponent.propDecorators = {
    _playerRef: [{ type: ViewChild, args: ['player',] }],
    crossorigin: [{ type: Input }],
    source: [{ type: Input }],
    type: [{ type: Input }],
    quietMode: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FocusWithinDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _focusMonitor
     * @param {?} ngZone
     */
    constructor(_elementRef, _focusMonitor, ngZone) {
        this._elementRef = _elementRef;
        this._focusMonitor = _focusMonitor;
        this.focusWithin = new EventEmitter();
        this.blurWithin = new EventEmitter();
        _focusMonitor.monitor(this._elementRef.nativeElement, true)
            .subscribe(origin => ngZone.run(() => origin ? this.focusWithin.emit() : this.blurWithin.emit()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
}
FocusWithinDirective.decorators = [
    { type: Directive, args: [{
                selector: '[focusWithin],[blurWithin]',
            },] }
];
/** @nocollapse */
FocusWithinDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: FocusMonitor },
    { type: NgZone }
];
FocusWithinDirective.propDecorators = {
    focusWithin: [{ type: Output }],
    blurWithin: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabbableListService {
    /**
     * @param {?} items
     * @param {?} direction
     * @param {?} wrap
     * @return {?}
     */
    initialize(items, direction, wrap) {
        // store the items
        this._items = items;
        // create the new focus key manager
        this.focusKeyManager = new FocusKeyManager(items);
        // set the direction of the list
        direction === 'vertical' ? this.focusKeyManager.withVerticalOrientation() : this.focusKeyManager.withHorizontalOrientation('ltr');
        // enable wrapping if required
        if (wrap) {
            this.focusKeyManager.withWrap();
        }
        // make sure the first item in the list is tabbable
        if (this._items.first) {
            this._items.first.tabindex = 0;
        }
        // call the init function on each item
        this._items.forEach(item => item.onInit());
    }
    /**
     * @param {?} item
     * @return {?}
     */
    activate(item) {
        // get the item index
        const /** @type {?} */ index = this._items.toArray().indexOf(item);
        // active the item if it is not already active
        if (this.focusKeyManager.activeItemIndex !== index) {
            this.focusKeyManager.setActiveItem(index);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    isItemActive(item) {
        // get the item index
        const /** @type {?} */ index = this._items.toArray().indexOf(item);
        // active the item if it is not already active
        return this.focusKeyManager.activeItemIndex === index;
    }
}
TabbableListService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabbableListItemDirective {
    /**
     * @param {?} _tabbableList
     * @param {?} _elementRef
     */
    constructor(_tabbableList, _elementRef) {
        this._tabbableList = _tabbableList;
        this._elementRef = _elementRef;
        this.disabled = false;
        this.tabindex = -1;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @return {?}
     */
    onInit() {
        this._tabbableList.focusKeyManager.change.pipe(takeUntil(this._onDestroy), map(index => this._tabbableList.isItemActive(this)))
            .subscribe(active => this.tabindex = active ? 0 : -1);
    }
    /**
     * @return {?}
     */
    focus() {
        // apply focus to the element
        this._elementRef.nativeElement.focus();
        // ensure the focus key manager updates the active item correctly
        this._tabbableList.activate(this);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydown(event) {
        this._tabbableList.focusKeyManager.onKeydown(event);
    }
}
TabbableListItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxTabbableListItem]',
            },] }
];
/** @nocollapse */
TabbableListItemDirective.ctorParameters = () => [
    { type: TabbableListService },
    { type: ElementRef }
];
TabbableListItemDirective.propDecorators = {
    disabled: [{ type: Input }],
    tabindex: [{ type: HostBinding }],
    focus: [{ type: HostListener, args: ['focus',] }],
    onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabbableListDirective {
    /**
     * @param {?} _tabbableList
     */
    constructor(_tabbableList) {
        this._tabbableList = _tabbableList;
        /**
         * Determine whether the up/down arrows should be used or the left/right arrows
         */
        this.direction = 'vertical';
        /**
         * Indicate whether or not focus should loop back to the first element after the last
         */
        this.wrap = true;
        /**
         * Indicate whether or not the first item should receive focus on show - useful for modals and popovers
         */
        this.focusOnShow = false;
        /**
         * Indicate whether or not focus should be returned to the previous element (only applicable when using focusOnShow)
         */
        this.returnFocus = false;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // store the currently focused element
        this._focusedElement = /** @type {?} */ (document.activeElement);
        // Set up the focus monitoring
        this._tabbableList.initialize(this.items, this.direction, this.wrap);
        // focus the first element if specified
        if (this.focusOnShow) {
            this._tabbableList.focusKeyManager.setFirstItemActive();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.returnFocus && this._focusedElement instanceof HTMLElement) {
            setTimeout(() => this._focusedElement.focus());
        }
    }
}
TabbableListDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxTabbableList]',
                providers: [TabbableListService]
            },] }
];
/** @nocollapse */
TabbableListDirective.ctorParameters = () => [
    { type: TabbableListService }
];
TabbableListDirective.propDecorators = {
    direction: [{ type: Input }],
    wrap: [{ type: Input }],
    focusOnShow: [{ type: Input }],
    returnFocus: [{ type: Input }],
    items: [{ type: ContentChildren, args: [TabbableListItemDirective,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AccessibilityModule {
}
AccessibilityModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    FocusWithinDirective,
                    TabbableListDirective,
                    TabbableListItemDirective
                ],
                imports: [
                    A11yModule
                ],
                exports: [
                    FocusWithinDirective,
                    TabbableListDirective,
                    TabbableListItemDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DurationPipe {
    /**
     * @param {?} seconds
     * @return {?}
     */
    transform(seconds) {
        let /** @type {?} */ minutes = Math.floor(seconds / 60);
        let /** @type {?} */ hours = Math.floor(minutes / 60);
        let /** @type {?} */ days = Math.floor(hours / 24);
        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = Math.floor(seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60));
        if (hours > 0) {
            return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
        }
        else {
            return `${this.pad(minutes)}:${this.pad(seconds)}`;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    pad(value) {
        if (value < 10) {
            return `0${value}`;
        }
        return value.toString();
    }
}
DurationPipe.decorators = [
    { type: Pipe, args: [{
                name: 'duration'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DurationPipeModule {
}
DurationPipeModule.decorators = [
    { type: NgModule, args: [{
                exports: [DurationPipe],
                declarations: [DurationPipe]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FileSizePipe {
    /**
     * @param {?} value
     * @return {?}
     */
    transform(value) {
        // allow for async values
        if (!value) {
            return value;
        }
        let /** @type {?} */ units = ['B', 'KB', 'MB', 'GB', 'TB'];
        // calculate the which unit bracket the values should be a part of
        let /** @type {?} */ idx = Math.floor(Math.log(value) / Math.log(1024));
        let /** @type {?} */ formattedValue = value / Math.pow(1024, idx);
        return `${formattedValue.toFixed(2)} ${units[idx]}`;
    }
}
FileSizePipe.decorators = [
    { type: Pipe, args: [{
                name: 'fileSize'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FileSizePipeModule {
}
FileSizePipeModule.decorators = [
    { type: NgModule, args: [{
                exports: [FileSizePipe],
                declarations: [FileSizePipe]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DECLARATIONS$5 = [
    MediaPlayerComponent,
    MediaPlayerTimelineExtensionComponent,
    MediaPlayerBaseExtensionDirective,
    MediaPlayerControlsExtensionComponent,
    MediaPlayerCustomControlDirective
];
class MediaPlayerModule {
}
MediaPlayerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FrameExtractionModule,
                    TooltipModule,
                    AudioServiceModule,
                    DurationPipeModule,
                    FileSizePipeModule,
                    SliderModule,
                    AccessibilityModule,
                    A11yModule,
                    ClickOutsideModule
                ],
                exports: DECLARATIONS$5,
                declarations: DECLARATIONS$5
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NavigationComponent {
}
NavigationComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-navigation',
                template: "<nav class=\"tree\" role=\"navigation\">\n    <ol class=\"nav\">\n        <ng-content></ng-content>\n    </ol>\n</nav>\n"
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NavigationItemComponent {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _parent
     * @param {?} _router
     * @param {?} _activatedRoute
     */
    constructor(_elementRef, _renderer, _parent, _router, _activatedRoute) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._parent = _parent;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        this.expanded = false;
        this.level = 1;
        this.indentWithoutArrow = true;
        this.level = _parent ? _parent.level + 1 : 1;
        this._navigationEnd = _router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => this.expanded = this.hasActiveLink(this.link));
    }
    /**
     * @return {?}
     */
    get active() {
        if (this.link) {
            return this._router.isActive(this.link, true);
        }
    }
    /**
     * @return {?}
     */
    get children() {
        return this._children.filter(item => item !== this);
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // Add classes to parent for styling
        const /** @type {?} */ parentListElement = this._elementRef.nativeElement.parentElement;
        if (parentListElement) {
            const /** @type {?} */ levelClass = this.getLevelClass();
            if (levelClass.length > 0) {
                this._renderer.addClass(parentListElement, 'nav');
                this._renderer.addClass(parentListElement, levelClass);
            }
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // Set 'indentWithoutArrow'
        this.setIndentWithoutArrow();
        // Update 'indentWithoutArrow' in response to changes to children
        this._childrenChanges = this._children.changes.subscribe(() => this.setIndentWithoutArrow());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._navigationEnd.unsubscribe();
        this._childrenChanges.unsubscribe();
    }
    /**
     * @param {?} link
     * @return {?}
     */
    hasActiveLink(link) {
        const /** @type {?} */ tree = this._router.createUrlTree([link], {
            relativeTo: this._activatedRoute,
            queryParams: this._activatedRoute.snapshot.queryParams,
            fragment: this._activatedRoute.snapshot.fragment
        });
        if (link && this._router.isActive(tree, true)) {
            return true;
        }
        // If this component has children, check if any of them, or their descendants, are active.
        return this.children.some((item) => item.hasActiveLink(item.link));
    }
    /**
     * @return {?}
     */
    getLevelClass() {
        switch (this.level) {
            case 2:
                return 'nav-second-level';
            case 3:
                return 'nav-third-level';
            case 4:
                return 'nav-fourth-level';
            case 5:
                return 'nav-fifth-level';
        }
        return '';
    }
    /**
     * @return {?}
     */
    setIndentWithoutArrow() {
        if (this.children.length > 0) {
            // If this element has children it will be indented and will have an arrow
            this.indentWithoutArrow = false;
        }
        else if (this._parent) {
            // If this element has a parent, indent it if any of its siblings have children
            this.indentWithoutArrow = !this._parent.children.every((item) => item.children.length === 0);
        }
        else {
            // Top-level elements should be indented
            this.indentWithoutArrow = true;
        }
    }
}
NavigationItemComponent.decorators = [
    { type: Component, args: [{
                selector: '[ux-navigation-item]',
                template: "<a *ngIf=\"link\" [class.has-arrow]=\"children.length > 0\" [class.no-arrow]=\"indentWithoutArrow\" [routerLink]=\"link\">\r\n    <span>{{header}}</span>\r\n</a>\r\n<a *ngIf=\"!link\" (click)=\"expanded = !expanded\" [class.has-arrow]=\"children.length > 0\" [class.no-arrow]=\"indentWithoutArrow\">\r\n    <span>{{header}}</span>\r\n</a>\r\n<ng-content></ng-content>\r\n"
            }] }
];
/** @nocollapse */
NavigationItemComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NavigationItemComponent, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: Router },
    { type: ActivatedRoute }
];
NavigationItemComponent.propDecorators = {
    header: [{ type: Input }],
    icon: [{ type: Input }],
    link: [{ type: Input }],
    expanded: [{ type: Input }, { type: HostBinding, args: ['class.selected',] }],
    active: [{ type: HostBinding, args: ['class.active',] }],
    _children: [{ type: ContentChildren, args: [NavigationItemComponent, { descendants: true },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NavigationModule {
}
NavigationModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    RouterModule
                ],
                exports: [
                    NavigationComponent,
                    NavigationItemComponent
                ],
                declarations: [
                    NavigationComponent,
                    NavigationItemComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NotificationService {
    /**
     * @param {?} _colorService
     */
    constructor(_colorService) {
        this._colorService = _colorService;
        // provide default options
        this.options = {
            duration: 4,
            height: 100,
            spacing: 10,
            backgroundColor: this._colorService.getColor('accent').toHex(),
            iconColor: this._colorService.getColor('accent').toHex()
        };
        this.direction = 'above';
        this.notifications$ = new BehaviorSubject([]);
    }
    /**
     * @param {?} templateRef
     * @param {?=} options
     * @param {?=} data
     * @return {?}
     */
    show(templateRef, options = this.options, data = {}) {
        options = Object.assign({}, this.options, options);
        const /** @type {?} */ notificationRef = {
            templateRef: templateRef,
            duration: options.duration,
            date: new Date(),
            visible: true,
            height: options.height,
            spacing: options.spacing,
            backgroundColor: options.backgroundColor,
            iconColor: options.iconColor,
            data: data
        };
        const /** @type {?} */ notifications = this.notifications$.getValue();
        if (this.direction === 'above') {
            notifications.unshift(notificationRef);
        }
        else {
            notifications.push(notificationRef);
        }
        this.notifications$.next(notifications);
        // remove notification after delay
        if (options.duration !== 0) {
            setTimeout(() => this.dismiss(notificationRef), options.duration * 1000);
        }
        return notificationRef;
    }
    /**
     * @return {?}
     */
    getHistory() {
        return this.notifications$.getValue();
    }
    /**
     * @param {?} notificationRef
     * @return {?}
     */
    dismiss(notificationRef) {
        notificationRef.visible = false;
        this.notifications$.next(this.notifications$.getValue());
    }
    /**
     * @return {?}
     */
    dismissAll() {
        this.notifications$.getValue().forEach(notificationRef => notificationRef.visible = false);
        this.notifications$.next(this.notifications$.getValue());
    }
}
NotificationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NotificationService.ctorParameters = () => [
    { type: ColorService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NotificationListComponent {
    /**
     * @param {?} _notificationService
     */
    constructor(_notificationService) {
        this._notificationService = _notificationService;
        this.position = 'top-right';
        this.notifications$ = this._notificationService.notifications$.pipe(map((notificationRefs) => notificationRefs.filter(notificationRef => notificationRef.visible)));
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    set direction(direction) {
        this._notificationService.direction = direction;
    }
}
NotificationListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-notification-list',
                template: "<div class=\"notification\" *ngFor=\"let notificationRef of notifications$ | async; let idx = index\"\r\n    [style.top.px]=\"(notificationRef.height + notificationRef.spacing) * idx\"\r\n    [style.height.px]=\"notificationRef.height\"\r\n    [style.background-color]=\"notificationRef.backgroundColor\"\r\n    [@notificationState]>\r\n    <ng-container *ngTemplateOutlet=\"notificationRef.templateRef; context: { $implicit: notificationRef, data: notificationRef.data }\"></ng-container>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('notificationState', [
                        state('in', style({ transform: 'translateY(0)', opacity: 0.9 })),
                        transition(':enter', [
                            style({ transform: 'translateY(-50px)', opacity: 0 }),
                            animate(500)
                        ]),
                        transition(':leave', [
                            animate(500, style({ transform: 'translateY(50px)', opacity: 0 }))
                        ])
                    ])
                ]
            }] }
];
/** @nocollapse */
NotificationListComponent.ctorParameters = () => [
    { type: NotificationService }
];
NotificationListComponent.propDecorators = {
    direction: [{ type: Input }],
    position: [{ type: Input }, { type: HostBinding, args: ['class',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NotificationModule {
}
NotificationModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ColorServiceModule
                ],
                exports: [
                    NotificationListComponent
                ],
                declarations: [
                    NotificationListComponent
                ],
                providers: [
                    NotificationService
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ NUMBER_PICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberPickerComponent),
    multi: true
};
class NumberPickerComponent {
    constructor() {
        this._min = -Infinity;
        this._max = Infinity;
        this._step = 1;
        this._disabled = false;
        this._value = 0;
        this._propagateChange = (_) => { };
        this.valid = true;
        this.valueChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        this.valueChange.emit(value);
        this._propagateChange(value);
    }
    /**
     * @return {?}
     */
    get min() {
        return this._min;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set min(value) {
        this._min = typeof value === 'string' ? parseFloat(value) : value;
    }
    /**
     * @return {?}
     */
    get max() {
        return this._max;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set max(value) {
        this._max = typeof value === 'string' ? parseFloat(value) : value;
    }
    /**
     * @return {?}
     */
    get step() {
        return this._step;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set step(value) {
        this._step = typeof value === 'string' ? parseFloat(value) : value;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this._disabled;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        this._disabled = typeof value === 'string' && (value === '' || value === 'true' || value === 'disabled') || value === true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    increment(event) {
        event.preventDefault();
        if (!this.disabled) {
            this.value = Math.max(Math.min(this.value + this.step, this.max), this.min);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    decrement(event) {
        event.preventDefault();
        if (!this.disabled) {
            this.value = Math.min(Math.max(this.value - this.step, this.min), this.max);
        }
    }
    /**
     * @return {?}
     */
    isValid() {
        if (this.value < this.min || this.value > this.max) {
            return false;
        }
        return this.valid;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onScroll(event) {
        let /** @type {?} */ scrollValue = event.deltaY || event.wheelDelta;
        if (scrollValue < 0) {
            this.increment(event);
        }
        else {
            this.decrement(event);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== undefined) {
            this._value = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._propagateChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
NumberPickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-number-picker',
                template: "<input type=\"number\"\n       role=\"spinbutton\"\n       class=\"form-control number-picker-input\"\n       [(ngModel)]=\"value\"\n       [min]=\"min\"\n       [max]=\"max\"\n       (keydown.ArrowDown)=\"decrement($event)\"\n       (keydown.ArrowUp)=\"increment($event)\"\n       (wheel)=\"onScroll($event)\"\n       step=\"any\"\n       [disabled]=\"disabled\"\n       [attr.aria-valuemin]=\"min\"\n       [attr.aria-valuenow]=\"value\"\n       [attr.aria-valuemax]=\"max\">\n\n<div class=\"number-picker-controls\">\n\n    <div class=\"number-picker-control-up\"\n         (click)=\"increment($event)\"\n         [class.disabled]=\"disabled || value >= max\">\n\n        <span class=\"hpe-icon hpe-up\"></span>\n    </div>\n\n    <div class=\"number-picker-control-down\"\n         (click)=\"decrement($event)\"\n         [class.disabled]=\"disabled || value <= min\">\n\n        <span class=\"hpe-icon hpe-down\"></span>\n    </div>\n\n</div>",
                providers: [NUMBER_PICKER_VALUE_ACCESSOR],
                host: {
                    '[class.has-error]': '!isValid()'
                }
            }] }
];
NumberPickerComponent.propDecorators = {
    valid: [{ type: Input }],
    valueChange: [{ type: Output }],
    value: [{ type: Input, args: ['value',] }],
    min: [{ type: Input }],
    max: [{ type: Input }],
    step: [{ type: Input }],
    disabled: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NumberPickerModule {
}
NumberPickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                exports: [NumberPickerComponent],
                declarations: [NumberPickerComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PageHeaderCustomMenuDirective {
}
PageHeaderCustomMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxPageHeaderCustomMenu]'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PageHeaderService {
    constructor() {
        this.items$ = new BehaviorSubject([]);
        this.selected$ = new BehaviorSubject(null);
        this.selectedRoot$ = new BehaviorSubject(null);
        this.secondary$ = new BehaviorSubject(false);
        this.activeIconMenu$ = new BehaviorSubject(null);
        this.secondaryNavigationAutoselect = false;
        this._subscription = this.selected$.pipe(map(selected => this.getRoot(selected))).subscribe(root => this.selectedRoot$.next(root));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        if (this.secondaryNavigationAutoselect && item && item.children && item.children.length > 0) {
            // Select the first child in secondaryNavigationAutoselect mode
            this.selected$.next(item.children[0]);
        }
        else {
            // if we are in secondary navigation mode and we click a parent - dont deselect the child
            if (this.secondary$.getValue() === true && this.isParentOf(this.selected$.getValue(), item)) {
                return;
            }
            // Otherwise select the given item
            this.selected$.next(item);
        }
    }
    /**
     * @param {?} item
     * @return {?}
     */
    deselect(item) {
        // deselect the current item
        item.selected = false;
        // iterate any children and deselect them
        if (item.children) {
            item.children.forEach(_item => this.deselect(_item));
        }
    }
    /**
     * @return {?}
     */
    deselectAll() {
        this.items$.getValue().forEach(item => this.deselect(item));
    }
    /**
     * @param {?} item
     * @param {?} selected
     * @return {?}
     */
    updateItem(item, selected) {
        // Item is selected if it is the selected item, or one of the selected item's ancestors.
        item.selected = (item === selected) || this.isParentOf(selected, item);
        if (item === selected) {
            // call the select function if present
            if (item.select) {
                item.select.call(item, item);
            }
        }
    }
    /**
     * @param {?=} items
     * @return {?}
     */
    setItems(items = []) {
        // identify all parent elements
        items.forEach(item => this.setParent(item));
        this.items$.next(items);
        // Set up the initally selected item
        const /** @type {?} */ initialSelectedItem = items.find(item => item.selected === true);
        this.select(initialSelectedItem);
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    setSecondaryNavigation(enabled) {
        this.secondary$.next(enabled);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    getRoot(item) {
        return item && item.parent ? this.getRoot(item.parent) : item;
    }
    /**
     * @param {?} item
     * @param {?=} parent
     * @return {?}
     */
    setParent(item, parent) {
        // set the parent field
        item.parent = parent;
        // call this function recursively on all children
        if (item.children) {
            item.children.forEach(child => this.setParent(child, item));
        }
    }
    /**
     * @param {?} node
     * @param {?} parent
     * @return {?}
     */
    isParentOf(node, parent) {
        // if there are no parents return false
        if (!node || !node.parent) {
            return false;
        }
        // if the parent is the match we are looking for return true
        if (node.parent === parent) {
            return true;
        }
        // if there are potentially grandparents then check them too
        return this.isParentOf(node.parent, parent);
    }
}
PageHeaderService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PageHeaderService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PageHeaderIconMenuComponent {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
        this._subscription = _service.activeIconMenu$.subscribe((next) => {
            // Close all but the most recently opened menu
            if (next !== this.menu) {
                this._isOpen = false;
            }
        });
    }
    /**
     * @return {?}
     */
    get isOpen() {
        return this._isOpen;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isOpen(value) {
        this._isOpen = value;
        if (value) {
            this._service.activeIconMenu$.next(this.menu);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        if (item.select) {
            item.select.call(item, item);
        }
    }
    /**
     * @param {?} item
     * @param {?} event
     * @return {?}
     */
    keydownHandler(item, event) {
        switch (event.key) {
            case 'Enter':
            case ' ':
                this.select(item);
                this.isOpen = false;
                this.menuNavigationToggle.focus();
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }
}
PageHeaderIconMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header-icon-menu',
                template: "<div class=\"page-header-icon-menu\"\n    dropdown\n    placement=\"bottom right\"\n    [(isOpen)]=\"isOpen\">\n\n    <a role=\"button\"\n        class=\"page-header-icon-menu-button\"\n        [attr.aria-label]=\"menu.label\"\n        aria-haspopup=\"true\"\n        tabindex=\"0\"\n        (click)=\"select(menu)\"\n        dropdownToggle\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"isOpen\">\n\n        <i class=\"hpe-icon\" [ngClass]=\"menu.icon\"></i>\n        <span class=\"label label-primary\" *ngIf=\"menu?.badge\" aria-hidden=\"true\">{{ menu.badge }}</span>\n\n    </a>\n\n    <ul *dropdownMenu\n        class=\"dropdown-menu\"\n        role=\"menu\"\n        uxMenuNavigation\n        [toggleButton]=\"menuNavigationToggle\">\n\n        <li *ngFor=\"let dropdown of menu?.dropdown\"\n            role=\"none\"\n            [class.dropdown-header]=\"dropdown.header\"\n            [class.dropdown-divider]=\"dropdown.divider\">\n\n            <span class=\"font-bold\" *ngIf=\"dropdown.header\">{{ dropdown.title }}</span>\n\n            <a *ngIf=\"!dropdown.header\"\n                role=\"menuitem\"\n                class=\"dropdown-item\"\n                tabindex=\"-1\"\n                (click)=\"select(dropdown)\"\n                (keydown)=\"keydownHandler(dropdown, $event)\"\n                uxMenuNavigationItem>\n\n\n                <span class=\"dropdown-item-title\">\n                    <i class=\"hpe-icon hpe-fw\" [ngClass]=\"dropdown.icon\"></i>\n                    {{ dropdown.title }}\n                </span>\n                <span *ngIf=\"dropdown.subtitle\" class=\"dropdown-item-subtitle\">{{ dropdown.subtitle }}</span>\n\n            </a>\n        </li>\n\n    </ul>\n</div>"
            }] }
];
/** @nocollapse */
PageHeaderIconMenuComponent.ctorParameters = () => [
    { type: PageHeaderService }
];
PageHeaderIconMenuComponent.propDecorators = {
    menu: [{ type: Input }],
    menuNavigationToggle: [{ type: ViewChild, args: ['menuNavigationToggle',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PageHeaderNavigationDropdownItemComponent {
    /**
     * @param {?} _pageHeaderService
     */
    constructor(_pageHeaderService) {
        this._pageHeaderService = _pageHeaderService;
        this.dropdownOpen = false;
        this._hover$ = new Subject();
        // subscribe to stream with a debounce (a small debounce is all that is required)
        this._subscription = this._hover$.pipe(debounceTime(1)).subscribe(visible => this.dropdownOpen = visible);
        // Close submenus when selected item changes
        this._subscription.add(_pageHeaderService.selected$.subscribe(() => {
            this.dropdownOpen = false;
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        // clicking on an item with children then return
        if (item.children) {
            return;
        }
        // emit the selected item in an event
        this._pageHeaderService.select(item);
    }
    /**
     * @return {?}
     */
    focus() {
        this.button.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    hoverStart() {
        this._hover$.next(true);
    }
    /**
     * @return {?}
     */
    hoverLeave() {
        this._hover$.next(false);
    }
    /**
     * @return {?}
     */
    close() {
        this.dropdownOpen = false;
    }
    /**
     * @param {?} event
     * @param {?} item
     * @return {?}
     */
    keydownHandler(event, item) {
        switch (event.key) {
            case 'Enter':
            case ' ':
                this.select(item);
                event.preventDefault();
                event.stopPropagation();
                break;
        }
    }
}
PageHeaderNavigationDropdownItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header-horizontal-navigation-dropdown-item',
                exportAs: 'ux-page-header-horizontal-navigation-dropdown-item',
                template: "<div *ngIf=\"item.children && item.children.length > 0\"\n    dropdown\n    #subMenu=\"bs-dropdown\"\n    [isOpen]=\"dropdownOpen\"\n    container=\"body\"\n    placement=\"right\"\n    (mouseenter)=\"hoverStart()\"\n    (mouseleave)=\"hoverLeave()\">\n\n    <a role=\"menuitem\"\n        class=\"dropdown-item\"\n        [class.selected]=\"item.selected\"\n        aria-haspopup=\"true\"\n        [attr.aria-expanded]=\"dropdownOpen\"\n        [attr.aria-selected]=\"item.selected\"\n        tabindex=\"-1\"\n        #button\n        dropdownToggle\n        uxMenuNavigationToggle\n        #menuNavigationToggle=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"dropdownOpen\"\n        menuPosition=\"right\">\n\n        <span class=\"dropdown-item-title\">{{ item.title }}</span>\n        <span class=\"dropdown-item-icon hpe-icon hpe-next\"></span>\n\n    </a>\n\n    <ul *dropdownMenu\n        role=\"menu\"\n        class=\"dropdown-menu horizontal-navigation-dropdown-submenu\"\n        (mouseenter)=\"hoverStart()\"\n        (mouseleave)=\"hoverLeave()\"\n        uxMenuNavigation\n        #menuNavigation=\"uxMenuNavigation\"\n        [toggleButton]=\"menuNavigationToggle\"\n        toggleButtonPosition=\"left\">\n\n        <li *ngFor=\"let subItem of item.children\" role=\"none\">\n\n            <a role=\"menuitem\"\n                class=\"dropdown-item\"\n                [class.selected]=\"subItem.selected\"\n                [attr.aria-selected]=\"subItem.selected\"\n                tabindex=\"-1\"\n                (click)=\"select(subItem)\"\n                (keydown)=\"keydownHandler($event, subItem)\"\n                uxMenuNavigationItem>\n\n                <span class=\"dropdown-item-title\">{{ subItem.title }}</span>\n\n            </a>\n\n        </li>\n    </ul>\n\n</div>\n\n<div *ngIf=\"!item.children || item.children.length === 0\"\n    (mouseenter)=\"hoverStart()\"\n    (mouseleave)=\"hoverLeave()\">\n\n    <a role=\"menuitem\"\n        #button\n        class=\"dropdown-item\"\n        [class.selected]=\"item.selected\"\n        [attr.aria-selected]=\"item.selected\"\n        tabindex=\"-1\"\n        (click)=\"select(item)\"\n        (keydown)=\"keydownHandler($event, item)\">\n\n        <span class=\"dropdown-item-title\">{{ item.title }}</span>\n\n    </a>\n\n</div>"
            }] }
];
/** @nocollapse */
PageHeaderNavigationDropdownItemComponent.ctorParameters = () => [
    { type: PageHeaderService }
];
PageHeaderNavigationDropdownItemComponent.propDecorators = {
    item: [{ type: Input }],
    button: [{ type: ViewChild, args: ['button',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PageHeaderNavigationItemComponent {
    /**
     * @param {?} elementRef
     * @param {?} _pageHeaderService
     */
    constructor(elementRef, _pageHeaderService) {
        this.elementRef = elementRef;
        this._pageHeaderService = _pageHeaderService;
        this.secondary$ = this._pageHeaderService.secondary$;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._subscription = this._pageHeaderService.selected$.subscribe(next => {
            // Update selected state for this item
            this._pageHeaderService.updateItem(this.item, next);
            if (next && this.isOpen) {
                this.isOpen = false;
                // If menu was closed, keep focus on the toggle button
                this.button.focus();
            }
        });
        if (this.menu) {
            this._subscription.add(this.menu.onHidden.subscribe(() => this.dropdowns.forEach(dropdown => dropdown.close())));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    select() {
        // if the item has children then do nothing at this stage
        if (this.item.children && this._pageHeaderService.secondary$.getValue() === false) {
            return;
        }
        // otherwise select the current item
        this._pageHeaderService.select(this.item);
    }
}
PageHeaderNavigationItemComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header-horizontal-navigation-item',
                template: "<div *ngIf=\"item.children && item.children.length > 0 && !(secondary$ | async)\"\n    dropdown\n    #menu=\"bs-dropdown\"\n    [(isOpen)]=\"isOpen\"\n    container=\"body\"\n    placement=\"bottom left\">\n\n    <button role=\"menuitem\"\n        class=\"horizontal-navigation-button\"\n        [class.selected]=\"item.selected\"\n        [class.open]=\"isOpen\"\n        aria-haspopup=\"true\"\n        [attr.aria-expanded]=\"isOpen\"\n        [attr.aria-selected]=\"item.selected\"\n        dropdownToggle\n        uxMenuNavigationToggle\n        #button=\"uxMenuNavigationToggle\"\n        [(menuOpen)]=\"isOpen\">\n\n        <span class=\"hpe-icon navigation-item-icon\" *ngIf=\"item.icon\" [ngClass]=\"item?.icon\"></span>\n        <span class=\"navigation-item-label\">{{ item?.title }}</span>\n        <span class=\"hpe-icon hpe-down\"></span>\n\n    </button>\n\n    <div *dropdownMenu\n        role=\"menu\"\n        class=\"dropdown-menu horizontal-navigation-dropdown-menu\"\n        uxMenuNavigation\n        [toggleButton]=\"button\"\n        toggleButtonPosition=\"top\">\n\n        <div *ngFor=\"let item of item?.children\" uxMenuNavigationItem (activated)=\"dropdownItem.focus()\">\n            <ux-page-header-horizontal-navigation-dropdown-item\n                #dropdownItem=\"ux-page-header-horizontal-navigation-dropdown-item\"\n                [item]=\"item\">\n            </ux-page-header-horizontal-navigation-dropdown-item>\n        </div>\n\n    </div>\n\n</div>\n\n<button *ngIf=\"!item.children || item.children.length === 0 || (secondary$ | async)\"\n    role=\"menuitem\"\n    class=\"horizontal-navigation-button\"\n    [class.selected]=\"item.selected\"\n    [attr.aria-selected]=\"item.selected\"\n    (click)=\"select()\">\n\n    <span class=\"hpe-icon navigation-item-icon\" *ngIf=\"item.icon\" [ngClass]=\"item?.icon\"></span>\n    <span class=\"navigation-item-label\">{{ item?.title }}</span>\n\n</button>"
            }] }
];
/** @nocollapse */
PageHeaderNavigationItemComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: PageHeaderService }
];
PageHeaderNavigationItemComponent.propDecorators = {
    button: [{ type: ViewChild, args: ['button',] }],
    menu: [{ type: ViewChild, args: ['menu',] }],
    dropdowns: [{ type: ViewChildren, args: [PageHeaderNavigationDropdownItemComponent,] }],
    item: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PageHeaderNavigationSecondaryItemDirective {
    /**
     * @param {?} _pageHeaderService
     */
    constructor(_pageHeaderService) {
        this._pageHeaderService = _pageHeaderService;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._pageHeaderService.selected$.pipe(delay(0), takeUntil(this._onDestroy)).subscribe(next => {
            // Update selected state for this item
            this._pageHeaderService.updateItem(this.item, next);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
PageHeaderNavigationSecondaryItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxPageHeaderNavigationSecondaryItem]'
            },] }
];
/** @nocollapse */
PageHeaderNavigationSecondaryItemDirective.ctorParameters = () => [
    { type: PageHeaderService }
];
PageHeaderNavigationSecondaryItemDirective.propDecorators = {
    item: [{ type: Input, args: ['uxPageHeaderNavigationSecondaryItem',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PageHeaderNavigationComponent {
    /**
     * @param {?} elementRef
     * @param {?} resizeService
     * @param {?} _pageHeaderService
     */
    constructor(elementRef, resizeService, _pageHeaderService) {
        this._pageHeaderService = _pageHeaderService;
        this.items$ = this._pageHeaderService.items$;
        this.indicatorVisible = false;
        this.indicatorX = 0;
        this.indicatorWidth = 0;
        this._subscription = new Subscription();
        this._subscription.add(resizeService.addResizeListener(elementRef.nativeElement).subscribe(this.updateSelectedIndicator.bind(this)));
        this._subscription.add(_pageHeaderService.selected$.pipe(distinctUntilChanged()).subscribe(this.updateSelectedIndicator.bind(this)));
        this._subscription.add(_pageHeaderService.secondary$.pipe(distinctUntilChanged()).subscribe(this.updateSelectedIndicator.bind(this)));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.updateSelectedIndicator();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    updateSelectedIndicator() {
        setTimeout(() => {
            // find the selected item
            const /** @type {?} */ selected = this.menuItems.find(item => item.item.selected);
            // determine whether or not to show the indicator
            this.indicatorVisible = !!selected;
            // set the width of the indicator to match the width of the navigation item
            if (selected) {
                const /** @type {?} */ styles = getComputedStyle(selected.elementRef.nativeElement);
                this.indicatorX = selected.elementRef.nativeElement.offsetLeft;
                this.indicatorWidth = parseInt(styles.getPropertyValue('width'));
            }
        });
    }
}
PageHeaderNavigationComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header-horizontal-navigation',
                template: "<ux-page-header-horizontal-navigation-item\r\n    *ngFor=\"let item of items$ | async\"\r\n    [item]=\"item\">\r\n</ux-page-header-horizontal-navigation-item>\r\n\r\n<div class=\"selected-indicator\"\r\n    [style.opacity]=\"indicatorVisible ? 1 : 0\"\r\n    [style.margin-left.px]=\"indicatorX\"\r\n    [style.width.px]=\"indicatorWidth\">\r\n</div>",
                host: {
                    'role': 'menubar'
                }
            }] }
];
/** @nocollapse */
PageHeaderNavigationComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ResizeService },
    { type: PageHeaderService }
];
PageHeaderNavigationComponent.propDecorators = {
    menuItems: [{ type: ViewChildren, args: [PageHeaderNavigationItemComponent,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PageHeaderComponent {
    /**
     * @param {?} _colorService
     * @param {?} _pageHeaderService
     */
    constructor(_colorService, _pageHeaderService) {
        this._colorService = _colorService;
        this._pageHeaderService = _pageHeaderService;
        this.alignment = 'center';
        this.condensed = false;
        this.backVisible = true;
        this.secondaryNavigationAlignment = 'center';
        this.backClick = new EventEmitter();
        this.selected$ = this._pageHeaderService.selected$;
        this.selectedRoot$ = this._pageHeaderService.selectedRoot$;
        this._crumbs = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set secondaryNavigationAutoselect(value) {
        this._pageHeaderService.secondaryNavigationAutoselect = value;
    }
    /**
     * @return {?}
     */
    get secondaryNavigationAutoselect() {
        return this._pageHeaderService.secondaryNavigationAutoselect;
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set items(items) {
        this._pageHeaderService.setItems(items);
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    set secondaryNavigation(enabled) {
        this._pageHeaderService.setSecondaryNavigation(enabled);
    }
    /**
     * @return {?}
     */
    get secondaryNavigation() {
        return this._pageHeaderService.secondary$.getValue();
    }
    /**
     * @param {?} crumbs
     * @return {?}
     */
    set crumbs(crumbs) {
        this._crumbs = crumbs;
    }
    /**
     * @return {?}
     */
    get crumbs() {
        return this.condensed ? [...this._crumbs, { title: this.header }] : this._crumbs;
    }
    /**
     * @param {?} color
     * @return {?}
     */
    set familyBackground(color) {
        this._familyBackground = this._colorService.resolve(color);
    }
    /**
     * @return {?}
     */
    get familyBackground() {
        return this._familyBackground;
    }
    /**
     * @param {?} color
     * @return {?}
     */
    set familyForeground(color) {
        this._familyForeground = this._colorService.resolve(color);
    }
    /**
     * @return {?}
     */
    get familyForeground() {
        return this._familyForeground;
    }
    /**
     * @return {?}
     */
    goBack() {
        this.backClick.emit();
    }
    /**
     * @param {?} item
     * @return {?}
     */
    select(item) {
        this._pageHeaderService.select(item);
    }
}
PageHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-page-header',
                exportAs: 'ux-page-header',
                template: "<div class=\"ux-page-header\" [class.page-header-condensed]=\"condensed\" role=\"banner\">\n\n    <!-- Display Upper Section when not condensed -->\n    <div class=\"page-header-actions\" *ngIf=\"!condensed\">\n\n        <div class=\"page-header-logo-container\" role=\"presentation\" [hidden]=\"!logo\">\n            <img [attr.src]=\"logo\" class=\"page-header-logo\">\n        </div>\n\n        <div class=\"page-header-navigation\" [ngClass]=\"alignment\" role=\"navigation\" aria-label=\"Primary Navigation\">\n\n            <!-- The Top Navigation Options -->\n            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>\n        </div>\n\n        <div class=\"page-header-icon-menus\" role=\"toolbar\">\n            <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n\n            <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n        </div>\n    </div>\n\n    <!-- Display Lower Section When Not Condensed -->\n    <div class=\"page-header-details\" *ngIf=\"!condensed\">\n\n        <div class=\"page-header-state-container\" role=\"navigation\">\n\n            <button *ngIf=\"backVisible === true\" class=\"page-header-back-button\" (click)=\"goBack()\" aria-label=\"Go Back\">\n                <span class=\"hpe-icon hpe-previous text-primary\"></span>\n            </button>\n\n            <div class=\"page-header-title-container\">\n\n                <ux-breadcrumbs [crumbs]=\"crumbs\"></ux-breadcrumbs>\n\n                <h1 class=\"page-header-title\" [style.backgroundColor]=\"familyBackground\" [style.color]=\"familyForeground\">{{ header }}</h1>\n            </div>\n\n        </div>\n\n    </div>\n\n    <!-- Display This Section Optimized for Condensed Mode -->\n    <div class=\"page-header-condensed-content\" *ngIf=\"condensed\">\n\n        <div class=\"page-header-breadcrumbs\" role=\"navigation\">\n            <ux-breadcrumbs [crumbs]=\"crumbs\"></ux-breadcrumbs>\n        </div>\n\n        <div class=\"page-header-navigation\" [ngClass]=\"alignment\" role=\"navigation\" aria-label=\"Primary Navigation\">\n\n            <!-- The Top Navigation Options -->\n            <ux-page-header-horizontal-navigation></ux-page-header-horizontal-navigation>\n        </div>\n\n        <div class=\"page-header-icon-menus\" role=\"toolbar\">\n            <ng-container *ngFor=\"let menu of customMenus\" [ngTemplateOutlet]=\"menu\"></ng-container>\n            <ux-page-header-icon-menu *ngFor=\"let menu of iconMenus\" [menu]=\"menu\"></ux-page-header-icon-menu>\n        </div>\n\n    </div>\n\n</div>\n\n<div class=\"page-header-secondary\" [ngClass]=\"secondaryNavigationAlignment\" role=\"navigation\" *ngIf=\"secondaryNavigation && (selectedRoot$ | async)\">\n    <ul class=\"nav nav-tabs\" role=\"tablist\" aria-label=\"Secondary Navigation\" *ngIf=\"(selectedRoot$ | async)?.children; let children\">\n        <li *ngFor=\"let child of children\"\n            [class.active]=\"child.selected\"\n            role=\"none\"\n            [uxPageHeaderNavigationSecondaryItem]=\"child\">\n\n            <a role=\"tab\"\n                [attr.aria-selected]=\"child.selected\"\n                tabindex=\"0\"\n                (click)=\"select(child)\"\n                (keydown.enter)=\"select(child)\">{{ child.title }}</a>\n\n        </li>\n    </ul>\n</div>",
                providers: [PageHeaderService]
            }] }
];
/** @nocollapse */
PageHeaderComponent.ctorParameters = () => [
    { type: ColorService },
    { type: PageHeaderService }
];
PageHeaderComponent.propDecorators = {
    logo: [{ type: Input }],
    header: [{ type: Input }],
    alignment: [{ type: Input }],
    condensed: [{ type: Input }],
    iconMenus: [{ type: Input }],
    backVisible: [{ type: Input }],
    secondaryNavigationAlignment: [{ type: Input }],
    secondaryNavigationAutoselect: [{ type: Input }],
    items: [{ type: Input }],
    secondaryNavigation: [{ type: Input }],
    crumbs: [{ type: Input }],
    familyBackground: [{ type: Input }],
    familyForeground: [{ type: Input }],
    backClick: [{ type: Output }],
    customMenus: [{ type: ContentChildren, args: [PageHeaderCustomMenuDirective, { read: TemplateRef },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PageHeaderModule {
}
PageHeaderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    BreadcrumbsModule,
                    ColorServiceModule,
                    ResizeModule,
                    MenuNavigationModule,
                    BsDropdownModule.forRoot()
                ],
                exports: [
                    PageHeaderComponent,
                    PageHeaderCustomMenuDirective
                ],
                declarations: [
                    PageHeaderComponent,
                    PageHeaderIconMenuComponent,
                    PageHeaderCustomMenuDirective,
                    PageHeaderNavigationComponent,
                    PageHeaderNavigationItemComponent,
                    PageHeaderNavigationDropdownItemComponent,
                    PageHeaderNavigationSecondaryItemDirective
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ProgressBarComponent {
    constructor() {
        this.value = 0;
        this.max = 100;
        this.indeterminate = false;
    }
}
ProgressBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-progress-bar',
                template: "<div *ngIf=\"!indeterminate\" class=\"progressbar-track\" [style.width.%]=\"(value / max) * 100\" [style.backgroundColor]=\"barColor\">\n    <ng-content></ng-content>\n</div>\n<div *ngIf=\"indeterminate\" class=\"progressbar-track indeterminate\" [style.backgroundColor]=\"barColor\">\n    <ng-content></ng-content>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
ProgressBarComponent.propDecorators = {
    value: [{ type: Input }],
    max: [{ type: Input }],
    indeterminate: [{ type: Input }],
    trackColor: [{ type: Input }],
    barColor: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ProgressBarModule {
}
ProgressBarModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [ProgressBarComponent],
                declarations: [ProgressBarComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ RADIOBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent),
    multi: true
};
let /** @type {?} */ uniqueRadioId = 0;
class RadioButtonComponent {
    constructor() {
        this._radioButtonId = `ux-radio-button-${++uniqueRadioId}`;
        this.id = this._radioButtonId;
        this.tabindex = 0;
        this.clickable = true;
        this.disabled = false;
        this.simplified = false;
        this.ariaLabel = '';
        this.ariaLabelledby = null;
        this.ariaDescribedby = null;
        this.valueChange = new EventEmitter();
        this._value = false;
        this.focused = false;
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        // invoke change event
        this.valueChange.emit(this._value);
        // call callback
        this.onChangeCallback(this._value);
        this.onTouchedCallback();
    }
    /**
     * @return {?}
     */
    get inputId() {
        return `${this.id || this._radioButtonId}-input`;
    }
    /**
     * @return {?}
     */
    toggle() {
        if (this.disabled || !this.clickable) {
            return;
        }
        // toggle the checked state
        this.value = this.option;
        // call callback
        this.onChangeCallback(this.value);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value !== this._value) {
            this._value = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
RadioButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-radio-button',
                template: "<label [attr.for]=\"inputId\" class=\"ux-radio-button\"\n       [class.ux-radio-button-checked]=\"value === option\"\n       [class.ux-radio-button-simplified]=\"simplified\"\n       [class.ux-radio-button-disabled]=\"disabled\"\n       [class.ux-radio-button-focused]=\"focused\">\n\n    <div class=\"ux-radio-button-container\">\n        <input class=\"ux-radio-button-input\"\n            type=\"radio\"\n            [id]=\"inputId\"\n            [checked]=\"value === option\"\n            [disabled]=\"disabled\"\n            [tabindex]=\"tabindex || value === option ? 0 : -1\"\n            [attr.name]=\"name\"\n            [required]=\"required\"\n            [attr.aria-label]=\"ariaLabel\"\n            [attr.aria-labelledby]=\"ariaLabelledby\"\n            [attr.aria-describedby]=\"ariaDescribedby\"\n            [attr.aria-checked]=\"value === option\"\n            (focus)=\"focused = true\"\n            (blur)=\"focused = false\"\n            (change)=\"toggle()\"\n            (click)=\"$event.stopPropagation()\">\n    </div>\n\n    <span class=\"ux-radio-button-label\">\n        <ng-content></ng-content>\n    </span>\n\n</label>",
                providers: [RADIOBUTTON_VALUE_ACCESSOR]
            }] }
];
RadioButtonComponent.propDecorators = {
    id: [{ type: Input }],
    name: [{ type: Input }],
    required: [{ type: Input }],
    tabindex: [{ type: Input }],
    clickable: [{ type: Input }],
    disabled: [{ type: Input }],
    simplified: [{ type: Input }],
    option: [{ type: Input }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    ariaDescribedby: [{ type: Input, args: ['aria-describedby',] }],
    valueChange: [{ type: Output }],
    value: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RadioButtonModule {
}
RadioButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [FormsModule],
                exports: [RadioButtonComponent],
                declarations: [RadioButtonComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SearchBuilderService {
    constructor() {
        this.query = {};
        this.queryChange = new Subject();
        this.validationChange = new BehaviorSubject(true);
        this._componentId = 0;
        this._components = [];
        this._validation = {};
    }
    /**
     * Add a component to the internal list of components
     * @param {?} component
     * @return {?}
     */
    registerComponent(component) {
        // ensure there are no components with a matching name
        if (this._components.find(cmp => cmp.name === component.name)) {
            throw new Error(`Search builder components must have a unique name. The name ${component.name} has already been used.`);
        }
        // if unique then add the component to the list
        this._components.push(component);
    }
    /**
     * Bulk registration of components
     * (Just a helper method)
     * @param {?} components
     * @return {?}
     */
    registerComponents(components) {
        components.forEach(component => this.registerComponent(component));
    }
    /**
     * Get a registered component class
     * @param {?} name
     * @return {?}
     */
    getComponent(name) {
        // find the component
        const /** @type {?} */ component = this._components.find(cmp => cmp.name === name);
        // if there is no match throw an exception
        if (!component) {
            throw new Error(`No search build component with the name ${name} exists`);
        }
        // ensure config is defined - at least to an empty object
        component.config = component.config || {};
        return component;
    }
    /**
     * Update the internal search query state
     * note that the query will be immutable
     * @param {?} query
     * @return {?}
     */
    setQuery(query$$1) {
        this.query = Object.assign({}, query$$1);
    }
    /**
     * Return the current query state
     * @return {?}
     */
    getQuery() {
        return this.query;
    }
    /**
     * Trigger the observable to indicate the query has been updated
     * @return {?}
     */
    queryHasChanged() {
        this.queryChange.next(this.query);
    }
    /**
     * Store the validation state of the query
     * @param {?} id
     * @param {?} valid
     * @return {?}
     */
    setValid(id, valid) {
        // store the state for this specific component
        this._validation[id] = valid;
        // evaluate the entire validation state
        this.validationChange.next(!Object.keys(this._validation).some(key => !this._validation[key]));
    }
    /**
     * Generate a unique id for each component
     * @return {?}
     */
    generateComponentId() {
        return this._componentId++;
    }
}
SearchBuilderService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SearchBuilderGroupService {
    /**
     * @param {?} _searchBuilderService
     */
    constructor(_searchBuilderService) {
        this._searchBuilderService = _searchBuilderService;
    }
    /**
     * Initialise the group by defining an id
     * @param {?} id
     * @return {?}
     */
    init(id) {
        // store the name of the group
        this._id = id;
        // create the entry in the query object if it doesn't exist
        if (!this._searchBuilderService.query[this._id]) {
            // create the section
            this._searchBuilderService.query[this._id] = [];
            // emit the changes after the initial setup
            setTimeout(() => this._searchBuilderService.queryHasChanged());
        }
    }
    /**
     * Remove a field from the search builder query
     * @param {?} field
     * @return {?}
     */
    remove(field) {
        // get the query for this group
        const /** @type {?} */ query$$1 = this.getQuery();
        // remove the field from the array
        query$$1.splice(query$$1.indexOf(field), 1);
    }
    /**
     * Get the query for this specific search group
     * @return {?}
     */
    getQuery() {
        return this._searchBuilderService.query[this._id] ? this._searchBuilderService.query[this._id] : [];
    }
}
SearchBuilderGroupService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SearchBuilderGroupService.ctorParameters = () => [
    { type: SearchBuilderService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SearchBuilderGroupComponent {
    /**
     * @param {?} searchBuilderGroupService
     * @param {?} _searchBuilderService
     */
    constructor(searchBuilderGroupService, _searchBuilderService) {
        this.searchBuilderGroupService = searchBuilderGroupService;
        this._searchBuilderService = _searchBuilderService;
        this.operator = 'and';
        this.addText = 'Add a field';
        this.showPlaceholder = false;
        this.add = new EventEmitter();
        this.remove = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // ensure we have a name otherwise throw an error
        if (!this.id) {
            throw new Error('Search builder group must have a name attribute.');
        }
        // otherwise register the group
        this.searchBuilderGroupService.init(this.id);
    }
    /**
     * @param {?} field
     * @return {?}
     */
    removeField(field) {
        this.searchBuilderGroupService.remove(field);
        this.remove.emit(field);
    }
}
SearchBuilderGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-search-builder-group',
                template: "<h4 class=\"search-group-title\">{{ header }}</h4>\n\n<main class=\"search-group-content\">\n\n  <section class=\"search-group-operator search-group-operator-{{ operator }}\" [class.hidden-operator]=\"searchBuilderGroupService.getQuery().length < 2\">{{ operator }}</section>\n\n  <section class=\"search-group-items\">\n\n    <div class=\"search-group-item-container\" *ngFor=\"let field of searchBuilderGroupService.getQuery()\">\n\n      <div class=\"search-group-item\">\n        <ng-container *uxSearchBuilderOutlet=\"field.type; context: field\"></ng-container>\n      </div>\n\n      <div class=\"search-group-item-remove\" (click)=\"removeField(field)\">\n        <span class=\"hpe-icon hpe-close\"></span>\n      </div>\n    </div>\n\n    <!-- Placeholder Item -->\n    <ng-container *ngIf=\"showPlaceholder\">\n\n      <!-- The Default Placeholder -->\n      <div class=\"search-group-item-container placeholder-item\" *ngIf=\"!placeholder\">\n        \n        <div class=\"search-group-item\">\n          <label class=\"form-label\">New field</label>\n          <div class=\"form-control\"></div>\n        </div>\n  \n      </div>\n\n      <!-- Allow a custom placeholder -->\n    <ng-container *ngTemplateOutlet=\"placeholder\"></ng-container>\n\n    </ng-container>\n\n  </section>\n\n  <section class=\"search-builder-group-add-field\" (click)=\"add.emit($event)\">\n\n    <button type=\"button\" class=\"btn btn-icon btn-circular button-accent\" aria-label=\"Add Field\">\n      <span class=\"hpe-icon hpe-add\" aria-hidden=\"true\"></span>\n    </button>\n\n    <span class=\"search-builder-group-add-field-label\">{{ addText }}</span>\n\n  </section>\n\n</main>\n\n<hr class=\"search-builder-group-divider\">\n",
                providers: [SearchBuilderGroupService]
            }] }
];
/** @nocollapse */
SearchBuilderGroupComponent.ctorParameters = () => [
    { type: SearchBuilderGroupService },
    { type: SearchBuilderService }
];
SearchBuilderGroupComponent.propDecorators = {
    id: [{ type: Input }],
    header: [{ type: Input }],
    operator: [{ type: Input }],
    addText: [{ type: Input }],
    placeholder: [{ type: Input }],
    showPlaceholder: [{ type: Input }],
    add: [{ type: Output }],
    remove: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SearchBuilderOutletDirective {
    /**
     * @param {?} _viewContainerRef
     * @param {?} _componentFactoryResolver
     * @param {?} _searchBuilderService
     */
    constructor(_viewContainerRef, _componentFactoryResolver, _searchBuilderService) {
        this._viewContainerRef = _viewContainerRef;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._searchBuilderService = _searchBuilderService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // get the class from the type
        const /** @type {?} */ componentDefinition = this._searchBuilderService.getComponent(this.uxSearchBuilderOutlet);
        // create the component factory
        const /** @type {?} */ componentFactory = this._componentFactoryResolver.resolveComponentFactory(componentDefinition.component);
        // create the component instance
        this._componentRef = this._viewContainerRef.createComponent(componentFactory);
        // combine the predefined config with any dynmaic config
        const /** @type {?} */ config = Object.assign({}, componentDefinition.config, this.uxSearchBuilderOutletContext.config || {});
        // set the context and config property on the component instance
        this._componentRef.instance.context = this.uxSearchBuilderOutletContext;
        this._componentRef.instance.config = config;
    }
}
SearchBuilderOutletDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxSearchBuilderOutlet]'
            },] }
];
/** @nocollapse */
SearchBuilderOutletDirective.ctorParameters = () => [
    { type: ViewContainerRef },
    { type: ComponentFactoryResolver },
    { type: SearchBuilderService }
];
SearchBuilderOutletDirective.propDecorators = {
    uxSearchBuilderOutlet: [{ type: Input }],
    uxSearchBuilderOutletContext: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BaseSearchComponent {
    /**
     * @param {?} _searchBuilderService
     * @param {?} _searchBuilderGroupService
     */
    constructor(_searchBuilderService, _searchBuilderGroupService) {
        this._searchBuilderService = _searchBuilderService;
        this._searchBuilderGroupService = _searchBuilderGroupService;
        this._id = this._searchBuilderService.generateComponentId();
        this._valid = true;
    }
    /**
     * Get the current value of the component
     * @return {?}
     */
    get value() {
        return this.context.value;
    }
    /**
     * Set the current value of the component
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this.context.value = value;
        this._searchBuilderService.queryHasChanged();
        // if value has been set perform validation
        this.validate();
    }
    /**
     * @return {?}
     */
    get valid() {
        return this._valid;
    }
    /**
     * @param {?} valid
     * @return {?}
     */
    set valid(valid) {
        this._valid = valid;
        this._searchBuilderService.setValid(this._id, valid);
    }
    /**
     * Make sure we clean up after ourselves
     * @return {?}
     */
    ngOnDestroy() {
        this.valid = true;
    }
    /**
     * Perform any required validation on the value
     * @return {?}
     */
    validate() {
        // if a custom validation function has been provided then use it
        this.valid = this.config.validation ? this.config.validation(this, this.value) : true;
    }
}
BaseSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-base-search',
                template: ''
            }] }
];
/** @nocollapse */
BaseSearchComponent.ctorParameters = () => [
    { type: SearchBuilderService },
    { type: SearchBuilderGroupService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SearchTextComponent extends BaseSearchComponent {
    constructor() {
        super(...arguments);
        this.type = 'text';
    }
    /**
     * @return {?}
     */
    get label() {
        return this.config.label;
    }
    /**
     * @return {?}
     */
    get placeholder() {
        return this.config.placeholder || 'Enter text';
    }
}
SearchTextComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-search-text',
                template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n<input [placeholder]=\"placeholder\" [(ngModel)]=\"value\" class=\"form-control\">"
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SearchDateComponent extends BaseSearchComponent {
    constructor() {
        super(...arguments);
        this.type = 'date';
    }
    /**
     * @return {?}
     */
    get label() {
        return this.config.label;
    }
    /**
     * @return {?}
     */
    get placeholder() {
        return this.config.placeholder || 'Enter date';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // by default set to the current date if not specified
        if (!this.value) {
            this.value = new Date();
        }
    }
}
SearchDateComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-search-date',
                template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n<div class=\"input-group date m-nil\">\n    <span class=\"input-group-addon\" tabindex=\"1\" (click)=\"popover.show()\">\n        <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n    </span>\n    <input type=\"text\" #popover=\"ux-popover\" [ngModel]=\"value | date:'dd MMMM yyyy'\" [uxPopover]=\"popoverTemplate\"\n        placement=\"bottom\" popoverClass=\"date-time-picker-popover\" class=\"form-control\" aria-label=\"Selected date\" [placeholder]=\"placeholder\">\n</div>\n\n<ng-template #popoverTemplate>\n    <ux-date-time-picker [(date)]=\"value\" [showTime]=\"false\"></ux-date-time-picker>\n</ng-template>"
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SearchDateRangeComponent extends BaseSearchComponent {
    constructor() {
        super(...arguments);
        this.type = 'date-range';
    }
    /**
     * @return {?}
     */
    get label() {
        return this.config.label;
    }
    /**
     * @return {?}
     */
    get from() {
        // if value does not exist the set it
        if (!this.value || !this.value.from) {
            this.from = new Date();
        }
        // ensure that the from value is a date object
        if (this.value.from instanceof Date === false) {
            this.value.from = new Date(this.value.from);
        }
        return this.value.from;
    }
    /**
     * @param {?} fromValue
     * @return {?}
     */
    set from(fromValue) {
        // create new object based on the current value
        const /** @type {?} */ value = Object.assign({}, this.value);
        // ensure that the from value is a date
        if (fromValue instanceof Date === false) {
            fromValue = new Date(fromValue);
        }
        // set the latest value
        value.from = fromValue;
        // update the value object while ensuring immutability
        this.value = value;
    }
    /**
     * @return {?}
     */
    get to() {
        // if value does not exist the set it
        if (!this.value || !this.value.to) {
            this.to = new Date();
        }
        // ensure that the to value is a date object
        if (this.value.to instanceof Date === false) {
            this.value.to = new Date(this.value.to);
        }
        return this.value.to;
    }
    /**
     * @param {?} toValue
     * @return {?}
     */
    set to(toValue) {
        // create new object based on the current value
        const /** @type {?} */ value = Object.assign({}, this.value);
        // ensure that the to value is a date
        if (toValue instanceof Date === false) {
            toValue = new Date(toValue);
        }
        // set the latest value
        value.to = toValue;
        // update the value object while ensuring immutability
        this.value = value;
    }
    /**
     * @return {?}
     */
    get fromLabel() {
        return this.config.fromLabel || 'From';
    }
    /**
     * @return {?}
     */
    get toLabel() {
        return this.config.toLabel || 'To';
    }
    /**
     * @return {?}
     */
    get fromPlaceholder() {
        return this.config.fromPlaceholder;
    }
    /**
     * @return {?}
     */
    get toPlaceholder() {
        return this.config.toPlaceholder;
    }
    /**
     * Override the default validation
     * @return {?}
     */
    validate() {
        // check if there is a config validation function
        if (this.config.validation) {
            return super.validate();
        }
        // create copies of the dates so we can modify time value (to ignore it)
        const /** @type {?} */ from$$1 = new Date(this.value.from);
        const /** @type {?} */ to = new Date(this.value.to);
        // set the time to the same so we dont compare it
        from$$1.setHours(0, 0, 0, 0);
        to.setHours(0, 0, 0, 0);
        // valid if the from date is less than or equal to the to date
        this.valid = from$$1 <= to;
    }
}
SearchDateRangeComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-search-date-range',
                template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n<div class=\"row\">\n    <div class=\"col-sm-12\">\n        <div class=\"form-inline\" [class.has-error]=\"!valid\">\n\n            <div class=\"form-group p-r-md\">\n                <label class=\"form-label m-r-xs\">{{ fromLabel }}</label>\n\n                <div class=\"input-group date m-nil\">\n                    <span class=\"input-group-addon p-r-xs\" tabindex=\"1\" (click)=\"fromPopover.show()\">\n                        <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n                    </span>\n                    <input type=\"text\" #fromPopover=\"ux-popover\" [ngModel]=\"from | date:'dd MMMM yyyy'\" [uxPopover]=\"fromPopoverTemplate\" placement=\"bottom\"\n                        popoverClass=\"date-time-picker-popover\" class=\"form-control\" aria-label=\"Selected date\" [placeholder]=\"fromPlaceholder\">\n                </div>\n            </div>\n\n            <div class=\"form-group p-r-xs\">\n                <label class=\"form-label m-r-xs\">{{ toLabel }}</label>\n\n                <div class=\"input-group date m-nil\">\n                    <span class=\"input-group-addon\" tabindex=\"1\" (click)=\"toPopover.show()\">\n                        <i class=\"hpe-icon hpe-calendar\" aria-hidden=\"true\"></i>\n                    </span>\n                    <input type=\"text\" #toPopover=\"ux-popover\" [ngModel]=\"to | date:'dd MMMM yyyy'\" [uxPopover]=\"toPopoverTemplate\" placement=\"bottom\"\n                        popoverClass=\"date-time-picker-popover\" class=\"form-control\" aria-label=\"Selected date\" [placeholder]=\"toPlaceholder\">\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n\n<ng-template #fromPopoverTemplate>\n    <ux-date-time-picker [(date)]=\"from\" [showTime]=\"false\"></ux-date-time-picker>\n</ng-template>\n\n<ng-template #toPopoverTemplate>\n    <ux-date-time-picker [(date)]=\"to\" [showTime]=\"false\"></ux-date-time-picker>\n</ng-template>"
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SearchSelectComponent extends BaseSearchComponent {
    constructor() {
        super(...arguments);
        this.type = 'select';
    }
    /**
     * Provide defaults for undefined properties
     * @return {?}
     */
    get label() {
        return this.config.label;
    }
    /**
     * @return {?}
     */
    get options() {
        return this.config.options || [];
    }
    /**
     * @return {?}
     */
    get multiple() {
        return this.config.multiple || false;
    }
    /**
     * @return {?}
     */
    get placeholder() {
        return this.config.placeholder || 'Select item';
    }
    /**
     * @return {?}
     */
    get dropDirection() {
        return this.config.dropDirection || 'down';
    }
    /**
     * @return {?}
     */
    get allowNull() {
        return this.config.allowNull || false;
    }
    /**
     * @return {?}
     */
    get disabled() {
        return this.config.disabled || false;
    }
    /**
     * @return {?}
     */
    get maxHeight() {
        return this.config.maxHeight || '250px';
    }
    /**
     * @return {?}
     */
    get pageSize() {
        return this.config.pageSize || 20;
    }
}
SearchSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-search-select',
                template: "<label class=\"form-label\" *ngIf=\"label\">{{ label }}</label>\n\n<ux-select [(value)]=\"value\" \n           [options]=\"options\" \n           [multiple]=\"multiple\" \n           [placeholder]=\"placeholder\" \n           [dropDirection]=\"dropDirection\"\n           [pageSize]=\"pageSize\"\n           [allowNull]=\"allowNull\"\n           [disabled]=\"disabled\"\n           [maxHeight]=\"maxHeight\"\n           [key]=\"config.key\"\n           [display]=\"config.display\"\n           [loadingTemplate]=\"config.loadingTemplate\"\n           [optionTemplate]=\"config.optionTemplate\"\n           [noOptionsTemplate]=\"config.noOptionsTemplate\">\n</ux-select>"
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SearchBuilderComponent {
    /**
     * Register the default search builder components
     * @param {?} _searchBuilderService
     */
    constructor(_searchBuilderService) {
        this._searchBuilderService = _searchBuilderService;
        this.queryChange = new EventEmitter();
        this.valid = new EventEmitter(true);
        // watch for any query changes
        this._querySubscription = _searchBuilderService.queryChange.subscribe(query$$1 => this.queryChange.emit(query$$1));
        // watch for any changes to the validation
        this._validSubscription = _searchBuilderService.validationChange.pipe(distinctUntilChanged()).subscribe(valid => this.valid.emit(valid));
    }
    /**
     * @param {?} components
     * @return {?}
     */
    set components(components) {
        this._searchBuilderService.registerComponents(components);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set query(value) {
        this._searchBuilderService.setQuery(value);
    }
    /**
     * @return {?}
     */
    get query() {
        return this._searchBuilderService.getQuery();
    }
    /**
     * Remove any subscriptions and cleanup
     * @return {?}
     */
    ngOnDestroy() {
        this._querySubscription.unsubscribe();
        this._validSubscription.unsubscribe();
    }
}
SearchBuilderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-search-builder',
                template: "<ng-content></ng-content>",
                providers: [SearchBuilderService]
            }] }
];
/** @nocollapse */
SearchBuilderComponent.ctorParameters = () => [
    { type: SearchBuilderService }
];
SearchBuilderComponent.propDecorators = {
    components: [{ type: Input }],
    query: [{ type: Input }],
    queryChange: [{ type: Output }],
    valid: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ uniqueId$4 = 0;
const /** @type {?} */ SELECT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectComponent),
    multi: true
};
class SelectComponent {
    /**
     * @param {?} _element
     * @param {?} _document
     * @param {?} _typeaheadKeyService
     */
    constructor(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this.id = `ux-select-${++uniqueId$4}`;
        this.allowNull = false;
        this.disabled = false;
        this.dropDirection = 'down';
        this.maxHeight = '250px';
        this.multiple = false;
        this.pageSize = 20;
        this.valueChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.dropdownOpenChange = new EventEmitter();
        this.propagateChange = (_) => { };
        this._value$ = new BehaviorSubject(null);
        this._input$ = new BehaviorSubject('');
        this._dropdownOpen = false;
        this._onDestroy = new Subject();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value$.next(value);
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value$.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set input(value) {
        this._input$.next(value);
    }
    /**
     * @return {?}
     */
    get input() {
        return this._input$.value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set dropdownOpen(value) {
        this._dropdownOpen = value;
        this.dropdownOpenChange.emit(value);
    }
    /**
     * @return {?}
     */
    get dropdownOpen() {
        return this._dropdownOpen;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Emit change events
        this._value$.pipe(takeUntil(this._onDestroy), distinctUntilChanged()).subscribe(value => {
            this.valueChange.emit(value);
            this.propagateChange(value);
        });
        this._input$.pipe(takeUntil(this._onDestroy), distinctUntilChanged()).subscribe(value => {
            this.inputChange.emit(value);
        });
        // Changes to the input field
        this._input$.pipe(takeUntil(this._onDestroy), filter(value => this.allowNull), filter(value => !this.multiple && value !== this.getDisplay(this.value))).subscribe(value => this.value = null);
        // Set up filter from input
        this.filter$ = this._input$.pipe(map(input => !this.multiple && input === this.getDisplay(this.value) ? '' : input), debounceTime(200));
        // Open the dropdown when filter is nonempty.
        this.filter$.pipe(takeUntil(this._onDestroy), filter(value => value && value.length > 0)).subscribe(() => this.dropdownOpen = true);
        // Update the single-select input when the model changes
        this._value$.pipe(takeUntil(this._onDestroy), distinctUntilChanged(), delay(0), filter(value => value !== null && !this.multiple)).subscribe(value => {
            this.input = this.getDisplay(value);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["multiple"] && !changes["multiple"].firstChange && changes["multiple"].currentValue !== changes["multiple"].previousValue) {
            this.input = '';
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        if (obj !== undefined && obj !== this.value) {
            this.value = obj;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    inputClickHandler(event) {
        this.selectInputText();
        this.dropdownOpen = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    inputBlurHandler(event) {
        // If a click on the typeahead is in progress, just refocus the input.
        // This works around an issue in IE where clicking a scrollbar drops focus.
        if (this.singleTypeahead && this.singleTypeahead.clicking) {
            this.singleInput.nativeElement.focus();
            return;
        }
        // Close dropdown and reset text input if focus is lost
        setTimeout(() => {
            if (!this._element.nativeElement.contains(this._document.activeElement)) {
                this.dropdownOpen = false;
                if (!this.multiple) {
                    this.input = this.getDisplay(this.value);
                }
            }
        }, 200);
    }
    /**
     * Key handler for single select only. Multiple select key handling is in TagInputComponent.
     * @param {?} event
     * @return {?}
     */
    inputKeyHandler(event) {
        // Standard keys for typeahead (up/down/esc)
        this._typeaheadKeyService.handleKey(event, this.singleTypeahead);
        switch (event.key) {
            case 'Enter':
                if (this._dropdownOpen) {
                    // Set the highlighted option as the value and close
                    this.value = this.singleTypeahead.highlighted;
                    this.dropdownOpen = false;
                }
                // Update the input field. If dropdown isn't open then reset it to the previous value.
                this.input = this.getDisplay(this.value);
                event.preventDefault();
                break;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    singleOptionSelected(event) {
        if (event.option) {
            this.value = event.option;
            this.dropdownOpen = false;
        }
    }
    /**
     * Returns the display value of the given option.
     * @param {?} option
     * @return {?}
     */
    getDisplay(option) {
        if (option === null || option === undefined) {
            return '';
        }
        if (typeof this.display === 'function') {
            return this.display(option);
        }
        if (typeof this.display === 'string' && option.hasOwnProperty(this.display)) {
            return option[/** @type {?} */ (this.display)];
        }
        return option;
    }
    /**
     * @return {?}
     */
    selectInputText() {
        this.singleInput.nativeElement.select();
    }
}
SelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-select',
                template: "<ux-tag-input *ngIf=\"multiple\"\r\n    [id]=\"id + '-input'\"\r\n    [(tags)]=\"value\"\r\n    [(input)]=\"input\"\r\n    [addOnPaste]=\"false\"\r\n    [disabled]=\"disabled\"\r\n    [display]=\"display\"\r\n    [freeInput]=\"false\"\r\n    [placeholder]=\"placeholder\"\r\n    [showTypeaheadOnClick]=\"true\">\r\n\r\n    <ux-typeahead #multipleTypeahead\r\n        [id]=\"id + '-typeahead'\"\r\n        [options]=\"options\"\r\n        [filter]=\"filter$ | async\"\r\n        [(open)]=\"dropdownOpen\"\r\n        [display]=\"display\"\r\n        [key]=\"key\"\r\n        [disabledOptions]=\"value\"\r\n        [dropDirection]=\"dropDirection\"\r\n        [maxHeight]=\"maxHeight\"\r\n        [multiselectable]=\"true\"\r\n        [pageSize]=\"pageSize\"\r\n        [selectFirst]=\"true\"\r\n        [loadingTemplate]=\"loadingTemplate\"\r\n        [optionTemplate]=\"optionTemplate\"\r\n        [noOptionsTemplate]=\"noOptionsTemplate\">\r\n    </ux-typeahead>\r\n\r\n</ux-tag-input>\r\n\r\n<div *ngIf=\"!multiple\"\r\n    class=\"inner-addon right-addon\"\r\n    [class.disabled]=\"disabled\"\r\n    role=\"combobox\"\r\n    [attr.aria-expanded]=\"dropdownOpen\"\r\n    aria-haspopup=\"listbox\">\r\n\r\n    <i class=\"hpe-icon\"\r\n        [class.hpe-down]=\"dropDirection === 'down'\"\r\n        [class.hpe-up]=\"dropDirection === 'up'\"></i>\r\n\r\n    <input #singleInput type=\"text\" [attr.id]=\"id + '-input'\" class=\"form-control\"\r\n        [attr.aria-activedescendant]=\"highlightedElement?.id\"\r\n        aria-autocomplete=\"list\"\r\n        [attr.aria-controls]=\"singleTypeahead.id\"\r\n        aria-multiline=\"false\"\r\n        [(ngModel)]=\"input\"\r\n        [placeholder]=\"placeholder\"\r\n        [disabled]=\"disabled\"\r\n        (click)=\"inputClickHandler($event)\"\r\n        (blur)=\"inputBlurHandler($event)\"\r\n        (keydown)=\"inputKeyHandler($event)\">\r\n\r\n    <ux-typeahead #singleTypeahead\r\n        [id]=\"id + '-typeahead'\"\r\n        [options]=\"options\"\r\n        [filter]=\"filter$ | async\"\r\n        [(open)]=\"dropdownOpen\"\r\n        [display]=\"display\"\r\n        [key]=\"key\"\r\n        [dropDirection]=\"dropDirection\"\r\n        [maxHeight]=\"maxHeight\"\r\n        [multiselectable]=\"false\"\r\n        [openOnFilterChange]=\"false\"\r\n        [pageSize]=\"pageSize\"\r\n        [selectFirst]=\"true\"\r\n        [loadingTemplate]=\"loadingTemplate\"\r\n        [optionTemplate]=\"optionTemplate\"\r\n        [noOptionsTemplate]=\"noOptionsTemplate\"\r\n        (optionSelected)=\"singleOptionSelected($event)\"\r\n        (highlightedElementChange)=\"highlightedElement = $event\">\r\n    </ux-typeahead>\r\n\r\n</div>\r\n",
                providers: [SELECT_VALUE_ACCESSOR]
            }] }
];
/** @nocollapse */
SelectComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: TypeaheadKeyService }
];
SelectComponent.propDecorators = {
    id: [{ type: Input }, { type: HostBinding, args: ['attr.id',] }],
    value: [{ type: Input }],
    input: [{ type: Input }],
    dropdownOpen: [{ type: Input }],
    options: [{ type: Input }],
    display: [{ type: Input }],
    key: [{ type: Input }],
    allowNull: [{ type: Input }],
    disabled: [{ type: Input }],
    dropDirection: [{ type: Input }],
    maxHeight: [{ type: Input }],
    multiple: [{ type: Input }],
    pageSize: [{ type: Input }],
    placeholder: [{ type: Input }],
    loadingTemplate: [{ type: Input }],
    noOptionsTemplate: [{ type: Input }],
    optionTemplate: [{ type: Input }],
    valueChange: [{ type: Output }],
    inputChange: [{ type: Output }],
    dropdownOpenChange: [{ type: Output }],
    singleInput: [{ type: ViewChild, args: ['singleInput',] }],
    multipleTypeahead: [{ type: ViewChild, args: ['multipleTypeahead',] }],
    singleTypeahead: [{ type: ViewChild, args: ['singleTypeahead',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TagInputEvent {
    /**
     * @param {?} tag
     */
    constructor(tag) {
        this.tag = tag;
        this._defaultPrevented = false;
    }
    /**
     * @return {?}
     */
    preventDefault() {
        this._defaultPrevented = true;
    }
    /**
     * @return {?}
     */
    defaultPrevented() {
        return this._defaultPrevented;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ uniqueId$5 = 0;
const /** @type {?} */ TAGINPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
};
const /** @type {?} */ TAGINPUT_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
};
class TagInputComponent {
    /**
     * @param {?} _element
     * @param {?} _document
     * @param {?} _typeaheadKeyService
     */
    constructor(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this.id = `ux-tag-input-${++uniqueId$5}`;
        this.tagsChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.addOnPaste = true;
        this.disabled = false;
        this.enforceTagLimits = false;
        this.freeInput = true;
        this.maxTags = Number.MAX_VALUE;
        this.minTags = 0;
        this.placeholder = '';
        this.showTypeaheadOnClick = false;
        this.tagDelimiters = '';
        this.tagClass = () => undefined;
        this.validationErrors = {};
        this.tagAdding = new EventEmitter();
        this.tagAdded = new EventEmitter();
        this.tagInvalidated = new EventEmitter();
        this.tagRemoving = new EventEmitter();
        this.tagRemoved = new EventEmitter();
        this.tagClick = new EventEmitter();
        this.selectedIndex = -1;
        this.tagApi = {
            getTagDisplay: this.getTagDisplay.bind(this),
            removeTagAt: this.removeTagAt.bind(this),
            canRemoveTagAt: this.canRemoveTagAt.bind(this)
        };
        this.valid = true;
        this.inputValid = true;
        this._input = '';
        this._tags = [];
        this._onChangeHandler = () => { };
        this._onTouchedHandler = () => { };
    }
    /**
     * @return {?}
     */
    get tags() {
        if (!this._tags) {
            this._tags = [];
        }
        return this._tags;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set tags(value) {
        this._tags = value;
        this._onChangeHandler(this._tags);
        this.tagsChange.emit(this._tags);
    }
    /**
     * @return {?}
     */
    get input() {
        return this._input;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set input(value) {
        this._input = value;
        this.inputChange.emit(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.tagTemplate) {
            this.tagTemplate = this._defaultTagTemplate;
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // Watch for optional child typeahead control
        this.connectTypeahead(this.typeaheadQuery.first);
        this.typeaheadQuery.changes.subscribe((query$$1) => {
            this.connectTypeahead(query$$1.first);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["disabled"]) {
            if (changes["disabled"].currentValue) {
                // Clear selection and close dropdown
                this.selectedIndex = -1;
                if (this.typeahead) {
                    this.typeahead.open = false;
                }
            }
        }
        // Update validation status
        this.validate();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value) {
            this.tags = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChangeHandler = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouchedHandler = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._typeaheadSubscription) {
            this._typeaheadSubscription.unsubscribe();
        }
    }
    /**
     * Validate the value of the control (tags property).
     * @return {?}
     */
    validate() {
        this.valid = true;
        let /** @type {?} */ tagRangeError = null;
        if (this.tags && (this.tags.length < this.minTags || this.tags.length > this.maxTags)) {
            tagRangeError = {
                given: this.tags.length,
                min: this.minTags,
                max: this.maxTags
            };
            this.valid = false;
        }
        this.validationErrors['tagRangeError'] = tagRangeError;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyHandler(event) {
        if (this.disabled) {
            return;
        }
        // Get the input field cursor location
        const /** @type {?} */ inputCursorPos = this.tagInput.nativeElement.selectionStart;
        // Determine if the input field has any text selected
        const /** @type {?} */ hasSelection = this.tagInput.nativeElement.selectionStart !== this.tagInput.nativeElement.selectionEnd;
        // Determine if a tag has focus
        const /** @type {?} */ tagSelected = this.isValidTagIndex(this.selectedIndex);
        const /** @type {?} */ inputLength = this.input ? this.input.length : 0;
        // Check whether the arrow keys can move the selection. Otherwise the input field takes the event.
        const /** @type {?} */ canNavigateLeft = tagSelected || (inputCursorPos <= 0 && !hasSelection);
        const /** @type {?} */ canNavigateRight = tagSelected || (inputCursorPos >= inputLength && !hasSelection);
        // Forward key events to the typeahead component.
        this._typeaheadKeyService.handleKey(event, this.typeahead);
        switch (event.key) {
            case 'Enter':
                // Check if a typeahead option is highlighted
                if (this.typeahead && this.typeahead.open && this.typeahead.highlighted) {
                    // Add the typeahead option as a tag, clear the input, and close the dropdown
                    this.commitTypeahead(this.typeahead.highlighted);
                    this.typeahead.open = false;
                }
                else {
                    // Validate and add the input text as a tag, if possible
                    this.commitInput();
                }
                event.preventDefault();
                break;
            case 'Backspace':
                if (canNavigateLeft) {
                    this.backspace();
                    event.stopPropagation();
                    event.preventDefault();
                }
                break;
            case 'Delete':
            case 'Del':
                if (tagSelected) {
                    this.removeTagAt(this.selectedIndex);
                }
                break;
            case 'ArrowLeft':
            case 'Left':
                if (canNavigateLeft) {
                    this.moveSelection(-1);
                    event.preventDefault();
                }
                break;
            case 'ArrowRight':
            case 'Right':
                if (canNavigateRight) {
                    this.moveSelection(1);
                    event.preventDefault();
                }
                break;
        }
        // Check for keys in the tagDelimiters
        if (this.tagDelimiters && this.tagDelimiters.indexOf(this.getKeyChar(event)) >= 0) {
            // Commit previous text
            this.commitInput();
            event.stopPropagation();
            event.preventDefault();
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    focusOutHandler(event) {
        // If a click on the typeahead is in progress, don't do anything.
        // This works around an issue in IE where clicking a scrollbar drops focus.
        if (this.typeahead && this.typeahead.clicking) {
            return;
        }
        // Close the dropdown on blur
        setTimeout(() => {
            if (!this._element.nativeElement.contains(this._document.activeElement)) {
                this.selectedIndex = -1;
                if (this.typeahead) {
                    this.typeahead.open = false;
                }
            }
        }, 200);
    }
    /**
     * @param {?} event
     * @param {?} tag
     * @param {?} index
     * @return {?}
     */
    tagClickHandler(event, tag, index) {
        if (this.disabled) {
            return;
        }
        // Send tagClick event
        const /** @type {?} */ tagClickEvent = new TagInputEvent(tag);
        this.tagClick.emit(tagClickEvent);
        // Prevent focus if preventDefault() was called
        if (tagClickEvent.defaultPrevented()) {
            event.preventDefault();
            return;
        }
        // Select the tag (for IE that doesn't propagate focus)
        this.selectTagAt(index);
    }
    /**
     * @return {?}
     */
    inputClickHandler() {
        if (this.disabled) {
            return;
        }
        if (this.typeahead && this.showTypeaheadOnClick) {
            this.typeahead.open = true;
        }
    }
    /**
     * @return {?}
     */
    inputFocusHandler() {
        if (this.disabled) {
            return;
        }
        this.selectInput();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    inputPasteHandler(event) {
        if (this.disabled) {
            return;
        }
        if (this.addOnPaste) {
            // Get text from the clipboard
            let /** @type {?} */ input = null;
            if (event.clipboardData) {
                input = event.clipboardData.getData('text/plain');
            }
            else if ((/** @type {?} */ (window)).clipboardData) {
                // Internet Explorer only
                input = (/** @type {?} */ (window)).clipboardData.getData('Text');
            }
            // Commit the clipboard text directly
            if (this.commit(input)) {
                this.selectInput();
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    typeaheadOptionSelectedHandler(event) {
        if (this.disabled) {
            return;
        }
        // When the typeahead sends the optionSelected event, commit the object directly
        this.commitTypeahead(event.option);
    }
    /**
     * Commit the current input value and clear the input field if successful.
     * @return {?}
     */
    commitInput() {
        if (this.commit(this.input)) {
            this.selectInput();
            this.input = '';
        }
    }
    /**
     * Commit the given tag object and clear the input if successful.
     * @param {?} tag
     * @return {?}
     */
    commitTypeahead(tag) {
        if (this.addTag(tag)) {
            this.selectInput();
            this.input = '';
        }
    }
    /**
     * Commit the given string value as one or more tags, if validation passes. Returns true if the tag(s) were created.
     * @param {?} input
     * @return {?}
     */
    commit(input) {
        if (input && this.freeInput) {
            // Split the tags by the tagDelimiters if configured
            const /** @type {?} */ newTags = this.splitTagInput(input);
            // Check tag validation for all of the individual values
            let /** @type {?} */ allValid = true;
            for (let /** @type {?} */ newTag of newTags) {
                const /** @type {?} */ valid = this.validateTag(newTag);
                if (!valid) {
                    allValid = false;
                }
            }
            // Add the tags if all are valid
            if (allValid) {
                for (let /** @type {?} */ newTag of newTags) {
                    this.addTag(this.createTag(newTag));
                }
                return true;
            }
        }
        return false;
    }
    /**
     * If no tag is selected, select the rightmost tag. If a tag is selected, remove it.
     * @return {?}
     */
    backspace() {
        if (this.disabled) {
            return;
        }
        if (!this.isValidTagIndex(this.selectedIndex)) {
            this.selectTagAt(this.tags.length - 1);
        }
        else {
            this.removeTagAt(this.selectedIndex);
        }
    }
    /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param {?} d Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    moveSelection(d) {
        if (this.disabled) {
            return;
        }
        if (this.isValidSelectIndex(this.selectedIndex)) {
            this.selectedIndex += d;
            // Do wrapping of selection when out of bounds
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.tags.length;
            }
            else if (this.selectedIndex > this.tags.length) {
                this.selectedIndex = 0;
            }
        }
    }
    /**
     * Returns a value to display for the given tag. Uses display function/property name if set, otherwise assumes that the tag is a simple string.
     * @param {?} tag
     * @return {?}
     */
    getTagDisplay(tag) {
        if (typeof this.display === 'function') {
            return this.display(tag);
        }
        if (typeof this.display === 'string') {
            return tag[/** @type {?} */ (this.display)];
        }
        return tag;
    }
    /**
     * Returns true if the given index is selected (tag index or input field).
     * @param {?} index
     * @return {?}
     */
    isSelected(index) {
        return index === this.selectedIndex;
    }
    /**
     * Select the tag at the given index. Does nothing if disabled is true.
     * @param {?} tagIndex
     * @return {?}
     */
    selectTagAt(tagIndex) {
        if (this.disabled) {
            return;
        }
        if (this.isValidTagIndex(tagIndex)) {
            this.selectedIndex = tagIndex;
        }
    }
    /**
     * Select the input field, giving it focus. Does nothing if disabled is true.
     * @return {?}
     */
    selectInput() {
        if (this.disabled) {
            return;
        }
        this.selectedIndex = this.tags.length;
    }
    /**
     * Remove the tag at the given index. Does nothing if disabled is true or the minTags property prevents removal.
     * @param {?} tagIndex
     * @return {?}
     */
    removeTagAt(tagIndex) {
        if (this.disabled || !this.canRemoveTagAt(tagIndex)) {
            return;
        }
        // Check that the tagIndex is in range
        if (this.isValidTagIndex(tagIndex)) {
            const /** @type {?} */ tag = this.tags[tagIndex];
            const /** @type {?} */ tagRemovingEvent = new TagInputEvent(tag);
            this.tagRemoving.emit(tagRemovingEvent);
            if (!tagRemovingEvent.defaultPrevented()) {
                // Select input first to avoid issues with dropping focus
                this.selectInput();
                // Remove the tag
                this.tags.splice(tagIndex, 1);
                // Set focus again since indices have changed
                this.selectInput();
                this.tagRemoved.emit(new TagInputEvent(tag));
                this.validate();
            }
        }
    }
    /**
     * Returns true if the tag at the given index can be removed.
     * @param {?} tagIndex
     * @return {?}
     */
    canRemoveTagAt(tagIndex) {
        return this.tags.length > this.minTags || !this.enforceTagLimits;
    }
    /**
     * Returns true if the input field should be available.
     * @return {?}
     */
    isInputVisible() {
        return this.tags.length < this.maxTags || !this.enforceTagLimits;
    }
    /**
     * Returns true if any part of the control has focus.
     * @return {?}
     */
    hasFocus() {
        return this.isValidSelectIndex(this.selectedIndex);
    }
    /**
     * @param {?} typeahead
     * @return {?}
     */
    connectTypeahead(typeahead) {
        if (this._typeaheadSubscription) {
            this._typeaheadSubscription.unsubscribe();
            this._typeaheadSubscription = null;
        }
        this.typeahead = typeahead;
        if (this.typeahead) {
            // Set up event handler for selected options
            this._typeaheadSubscription = this.typeahead.optionSelected.subscribe(this.typeaheadOptionSelectedHandler.bind(this));
            // Set up event handler for the highlighted element
            // Added a delay to move it out of the current change detection cycle
            this._typeaheadSubscription.add(this.typeahead.highlightedElementChange.subscribe((element) => {
                this.highlightedElement = element;
            }));
        }
    }
    /**
     * Validate the given tagValue with the tagPattern, if set. Update validationErrors on validation failure.
     * @param {?} tagValue
     * @return {?}
     */
    validateTag(tagValue) {
        let /** @type {?} */ inputPattern = null;
        this.inputValid = true;
        if (this.tagPattern && !this.tagPattern.test(tagValue)) {
            inputPattern = {
                given: tagValue,
                pattern: this.tagPattern
            };
            this.inputValid = false;
        }
        this.validationErrors['inputPattern'] = inputPattern;
        return this.inputValid;
    }
    /**
     * Create a tag object for the given tagValue. If createTagHandler is specified, use it; otherwise if displayProperty is specified, create an object with the tagValue as the single named property; otherwise return the tagValue itself.
     * @param {?} tagValue
     * @return {?}
     */
    createTag(tagValue) {
        let /** @type {?} */ tag = null;
        if (this.createTagHandler && typeof this.createTagHandler === 'function') {
            tag = this.createTagHandler(tagValue);
        }
        else if (typeof this.display === 'string') {
            tag = {};
            tag[/** @type {?} */ (this.display)] = tagValue;
        }
        else {
            tag = tagValue;
        }
        return tag;
    }
    /**
     * Add a tag object, calling the tagAdding and tagAdded events. Returns true if the tag was added to the tags array.
     * @param {?} tag
     * @return {?}
     */
    addTag(tag) {
        if (tag) {
            // Verify that the new tag can be displayed
            const /** @type {?} */ displayValue = this.getTagDisplay(tag);
            if (displayValue && typeof displayValue === 'string' && displayValue.length > 0) {
                const /** @type {?} */ tagAddingEvent = new TagInputEvent(tag);
                this.tagAdding.emit(tagAddingEvent);
                if (!tagAddingEvent.defaultPrevented()) {
                    this.tags = this.tags || [];
                    this.tags.push(tag);
                    this.tagAdded.emit(new TagInputEvent(tag));
                    this.validate();
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Returns true if the given tagIndex is a valid tag index.
     * @param {?} tagIndex
     * @return {?}
     */
    isValidTagIndex(tagIndex) {
        return tagIndex >= 0 && tagIndex < this.tags.length;
    }
    /**
     * Returns true if the given index is a valid selection index (tags or input field).
     * @param {?} index
     * @return {?}
     */
    isValidSelectIndex(index) {
        return index >= 0 && index <= this.tags.length;
    }
    /**
     * Returns the character corresponding to the given key event, mainly for IE compatibility.
     * @param {?} event
     * @return {?}
     */
    getKeyChar(event) {
        switch (event.key) {
            case 'Spacebar':
                return ' ';
        }
        return event.key;
    }
    /**
     * Returns an array of strings corresponding to the input string split by the tagDelimiters characters.
     * @param {?} input
     * @return {?}
     */
    splitTagInput(input) {
        let /** @type {?} */ tagValues = [input];
        if (this.tagDelimiters && typeof this.tagDelimiters === 'string') {
            const /** @type {?} */ escapedDelimiters = this.tagDelimiters.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const /** @type {?} */ delimiterRegex = new RegExp(`[${escapedDelimiters}]`, 'g');
            tagValues = input.split(delimiterRegex).filter((s) => s.length > 0);
        }
        return tagValues;
    }
}
TagInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-tag-input',
                template: "<ol [attr.role]=\"typeahead ? 'combobox' : 'none'\" [attr.aria-haspopup]=\"typeahead ? 'listbox' : null\">\n    <li *ngFor=\"let tag of tags; let i = index\" class=\"ux-tag\"\n        [class.disabled]=\"disabled\"\n        [ngClass]=\"tagClass(tag, i, isSelected(i))\"\n        [attr.tabindex]=\"disabled ? null : 0\"\n        [focusIf]=\"isSelected(i)\"\n        (click)=\"tagClickHandler($event, tag, i)\"\n        (focus)=\"selectTagAt(i)\">\n\n        <ng-container [ngTemplateOutlet]=\"tagTemplate\"\n            [ngTemplateOutletContext]=\"{tag: tag, index: i, disabled: disabled, api: tagApi}\">\n        </ng-container>\n\n    </li>\n    <li *ngIf=\"isInputVisible()\" class=\"ux-tag-input\" role=\"none\">\n        <input #tagInput type=\"text\" [attr.id]=\"id\" class=\"ux-tag-input\"\n            [(ngModel)]=\"input\"\n            [class.invalid]=\"!inputValid\"\n            [attr.aria-activedescendant]=\"highlightedElement?.id\"\n            [attr.aria-autocomplete]=\"typeahead ? 'list' : 'none'\"\n            [attr.aria-controls]=\"typeahead?.id\"\n            aria-multiline=\"false\"\n            [placeholder]=\"disabled ? '' : (placeholder || '')\"\n            [disabled]=\"disabled\"\n            [focusIf]=\"isSelected(tags.length)\"\n            (click)=\"inputClickHandler()\"\n            (focus)=\"inputFocusHandler()\"\n            (paste)=\"inputPasteHandler($event)\">\n    </li>\n</ol>\n\n<ng-content #typeahead></ng-content>\n\n<ng-template #defaultTagTemplate let-tag=\"tag\" let-index=\"index\" let-disabled=\"disabled\" let-api=\"api\">\n    <span class=\"ux-tag-text\">{{api.getTagDisplay(tag)}}</span>\n    <button *ngIf=\"api.canRemoveTagAt(index)\"\n        type=\"button\"\n        class=\"ux-tag-remove\"\n        aria-label=\"Remove Item\"\n        [disabled]=\"disabled\"\n        (click)=\"api.removeTagAt(index); $event.stopPropagation();\">\n        <span class=\"hpe-icon hpe-close\"></span>\n    </button>\n</ng-template>",
                providers: [TAGINPUT_VALUE_ACCESSOR, TAGINPUT_VALIDATOR],
                host: {
                    '[class.disabled]': 'disabled',
                    '[class.focus]': 'hasFocus()',
                    '[class.invalid]': '!valid || !inputValid'
                }
            }] }
];
/** @nocollapse */
TagInputComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: TypeaheadKeyService }
];
TagInputComponent.propDecorators = {
    id: [{ type: Input }, { type: HostBinding, args: ['attr.id',] }],
    tags: [{ type: Input, args: ['tags',] }],
    tagsChange: [{ type: Output }],
    input: [{ type: Input, args: ['input',] }],
    inputChange: [{ type: Output }],
    display: [{ type: Input }],
    addOnPaste: [{ type: Input }],
    disabled: [{ type: Input }],
    enforceTagLimits: [{ type: Input }],
    freeInput: [{ type: Input }],
    maxTags: [{ type: Input }],
    minTags: [{ type: Input }],
    placeholder: [{ type: Input }],
    showTypeaheadOnClick: [{ type: Input }],
    tagDelimiters: [{ type: Input }],
    tagPattern: [{ type: Input }],
    tagTemplate: [{ type: Input }],
    tagClass: [{ type: Input }],
    validationErrors: [{ type: Input }],
    createTagHandler: [{ type: Input, args: ['createTag',] }],
    tagAdding: [{ type: Output }],
    tagAdded: [{ type: Output }],
    tagInvalidated: [{ type: Output }],
    tagRemoving: [{ type: Output }],
    tagRemoved: [{ type: Output }],
    tagClick: [{ type: Output }],
    typeaheadQuery: [{ type: ContentChildren, args: [TypeaheadComponent,] }],
    tagInput: [{ type: ViewChild, args: ['tagInput',] }],
    _defaultTagTemplate: [{ type: ViewChild, args: ['defaultTagTemplate',] }],
    keyHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    focusOutHandler: [{ type: HostListener, args: ['focusout', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TagInputModule {
}
TagInputModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    FocusIfModule,
                    TypeaheadModule
                ],
                exports: [TagInputComponent],
                declarations: [TagInputComponent],
                providers: [],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectModule {
}
SelectModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    InfiniteScrollModule,
                    TagInputModule,
                    TypeaheadModule
                ],
                exports: [SelectComponent],
                declarations: [SelectComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SearchBuilderModule {
}
SearchBuilderModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    DateTimePickerModule,
                    PopoverModule,
                    SelectModule
                ],
                exports: [
                    SearchBuilderComponent,
                    SearchBuilderGroupComponent,
                    BaseSearchComponent
                ],
                declarations: [
                    SearchBuilderComponent,
                    SearchBuilderGroupComponent,
                    SearchTextComponent,
                    SearchDateComponent,
                    SearchDateRangeComponent,
                    SearchBuilderOutletDirective,
                    SearchSelectComponent,
                    BaseSearchComponent
                ],
                entryComponents: [
                    SearchTextComponent,
                    SearchDateComponent,
                    SearchDateRangeComponent,
                    SearchSelectComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SidePanelCloseDirective {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
    }
    /**
     * @return {?}
     */
    clickHandler() {
        this._service.close();
    }
}
SidePanelCloseDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxSidePanelClose]'
            },] }
];
/** @nocollapse */
SidePanelCloseDirective.ctorParameters = () => [
    { type: SidePanelService }
];
SidePanelCloseDirective.propDecorators = {
    clickHandler: [{ type: HostListener, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ EXPORTS$1 = [
    SidePanelComponent,
    SidePanelCloseDirective
];
class SidePanelModule {
}
SidePanelModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: EXPORTS$1,
                declarations: EXPORTS$1
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SparkComponent {
    /**
     * @param {?} _colorService
     */
    constructor(_colorService) {
        this._colorService = _colorService;
        this.values = [];
        this.barHeight = 10;
        this._theme = 'primary';
        this._barColor = [];
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set theme(value) {
        this._theme = this._colorService.resolveColorName(value);
    }
    /**
     * @return {?}
     */
    get theme() {
        return this._theme;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set trackColor(value) {
        this._trackColor = this._colorService.resolve(value);
    }
    /**
     * @return {?}
     */
    get trackColor() {
        return this._trackColor;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set barColor(value) {
        if (Array.isArray(value)) {
            this._barColor = value.map(color => this._colorService.resolve(color));
        }
        else {
            this._barColor = [this._colorService.resolve(value)];
        }
    }
    /**
     * @return {?}
     */
    get barColor() {
        return this._barColor;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        // ensure 'value' is an array at this point
        const /** @type {?} */ values = Array.isArray(value) ? value : [value];
        // get the total value of all lines
        const /** @type {?} */ total = Math.max(values.reduce((previous, current) => previous + current, 0), 100);
        // figure out the percentages for each spark line
        this.values = values.map(val => (val / total) * 100);
    }
    /**
     * @return {?}
     */
    get value() {
        return this.values;
    }
}
SparkComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-spark',
                template: "<!-- Inline Spark Chart -->\n<div *ngIf=\"inlineLabel\" class=\"ux-spark-inline-label-container\">\n\n    <div class=\"ux-spark-inline-label-left\" [innerHtml]=\"inlineLabel\"></div>\n\n    <div class=\"ux-spark-line\">\n\n        <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n            <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n            <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n        </div>\n\n        <div class=\"ux-spark ux-inline ux-spark-theme-{{theme}}\" [style.height.px]=\"barHeight\" [style.backgroundColor]=\"trackColor\" [uxTooltip]=\"tooltip\">\n            <div class=\"ux-spark-bar\" *ngFor=\"let line of values; let idx = index;\" [style.width.%]=\"line\" [style.backgroundColor]=\"barColor[idx]\"></div>\n        </div>\n\n        <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n            <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n            <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n        </div>\n\n    </div>\n</div>\n\n<!-- End Inline Spark Chart -->\n\n\n<!-- Non Inline Spark Chart -->\n<div *ngIf=\"!inlineLabel\">\n\n    <div class=\"ux-spark-top-container\" *ngIf=\"topLeftLabel || topRightLabel\">\n        <div class=\"ux-spark-label-top-left\" *ngIf=\"topLeftLabel\" [innerHtml]=\"topLeftLabel\"></div>\n        <div class=\"ux-spark-label-top-right\" *ngIf=\"topRightLabel\" [innerHtml]=\"topRightLabel\"></div>\n    </div>\n\n    <div class=\"ux-spark ux-spark-theme-{{theme}}\" [class.ux-spark-multi-value]=\"values.length > 1\" [style.height.px]=\"barHeight\" [style.backgroundColor]=\"trackColor\"\n        [uxTooltip]=\"tooltip\">\n        <div class=\"ux-spark-bar\" *ngFor=\"let line of value; let idx = index;\" [style.width.%]=\"line\" [style.backgroundColor]=\"barColor[idx]\"></div>\n    </div>\n\n    <div class=\"ux-spark-bottom-container\" *ngIf=\"bottomLeftLabel || bottomRightLabel\">\n        <div class=\"ux-spark-label-bottom-left\" *ngIf=\"bottomLeftLabel\" [innerHtml]=\"bottomLeftLabel\"></div>\n        <div class=\"ux-spark-label-bottom-right\" *ngIf=\"bottomRightLabel\" [innerHtml]=\"bottomRightLabel\"></div>\n    </div>\n</div>\n\n<!-- End Non Inline Spark Chart -->",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
SparkComponent.ctorParameters = () => [
    { type: ColorService }
];
SparkComponent.propDecorators = {
    barHeight: [{ type: Input }],
    inlineLabel: [{ type: Input }],
    topLeftLabel: [{ type: Input }],
    topRightLabel: [{ type: Input }],
    bottomLeftLabel: [{ type: Input }],
    bottomRightLabel: [{ type: Input }],
    tooltip: [{ type: Input }],
    theme: [{ type: Input }],
    trackColor: [{ type: Input }],
    barColor: [{ type: Input }],
    value: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SparkModule {
}
SparkModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ColorServiceModule,
                    TooltipModule
                ],
                exports: [SparkComponent],
                declarations: [SparkComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabsetService {
    constructor() {
        this.tabs$ = new BehaviorSubject([]);
        this.active$ = new BehaviorSubject(null);
        this.focused$ = new BehaviorSubject(false);
        this.highlighted$ = new BehaviorSubject(null);
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    add(tab) {
        this.tabs$.next([...this.tabs$.value, tab]);
        // check if this is the only tab. If so select this by default
        if (!this.active$.value) {
            this.select(tab);
        }
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    remove(tab) {
        // remove the tab
        this.tabs$.next(this.tabs$.value.filter(_tab => _tab !== tab));
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    select(tab) {
        if (!tab.disabled) {
            this.active$.next(tab);
            this.highlighted$.next(tab);
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    selectAtIndex(index) {
        // if there are no tabs then do nothing
        if (this.tabs$.value.length === 0) {
            return;
        }
        // check if the index is within the bounds
        if (index < 0) {
            return this.selectAtIndex(this.tabs$.value.length - 1);
        }
        else if (index >= this.tabs$.value.length) {
            return this.selectAtIndex(0);
        }
        const /** @type {?} */ target = this.tabs$.value[index];
        if (target) {
            this.select(target);
        }
    }
    /**
     * @return {?}
     */
    selectNextTab() {
        // find the currently selected index
        const /** @type {?} */ index = this.tabs$.value.indexOf(this.active$.value);
        // check the tabs after the active one to see if there are any selectable tabs
        const /** @type {?} */ tabs = this.tabs$.value.slice(index + 1);
        // check if any of the tabs are not disabled
        for (let /** @type {?} */ tab of tabs) {
            if (!tab.disabled) {
                return this.select(tab);
            }
        }
        // if we reach here then no tab could be selected - select the first tab
        this.selectFirstTab();
    }
    /**
     * @return {?}
     */
    selectPreviousTab() {
        // find the currently selected index
        const /** @type {?} */ index = this.tabs$.value.indexOf(this.active$.value);
        // check the tabs before the active one to see if there are any selectable tabs
        const /** @type {?} */ tabs = this.tabs$.value.slice(0, index);
        // check if any of the tabs are not disabled
        for (let /** @type {?} */ tab of tabs.reverse()) {
            if (!tab.disabled) {
                return this.select(tab);
            }
        }
        // if we reach here then no previous tab could be selected - select the last tab
        this.selectLastTab();
    }
    /**
     * @return {?}
     */
    selectFirstTab() {
        // find the index of the first non-disabled tab
        const /** @type {?} */ tabIndex = this.tabs$.value.findIndex(tab => !tab.disabled);
        if (tabIndex !== -1) {
            this.selectAtIndex(tabIndex);
        }
    }
    /**
     * @return {?}
     */
    selectLastTab() {
        // find the index of the first non-disabled tab
        const /** @type {?} */ tabIndex = this.tabs$.value.slice().reverse().findIndex(tab => !tab.disabled);
        if (tabIndex !== -1) {
            this.selectAtIndex((this.tabs$.value.length - 1) - tabIndex);
        }
    }
}
TabsetService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let /** @type {?} */ uniqueTabId = 0;
class TabComponent {
    /**
     * @param {?} _tabset
     */
    constructor(_tabset) {
        this._tabset = _tabset;
        this.id = `ux-tab-${++uniqueTabId}`;
        this.disabled = false;
        this.select = new EventEmitter();
        this.deselect = new EventEmitter();
        this.active$ = this._tabset.active$.pipe(map(active => active === this));
        _tabset.add(this);
        this._subscription = this.active$.subscribe(active => active ? this.select.emit() : this.deselect.emit());
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set active(value) {
        if (value) {
            this._tabset.select(this);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._tabset.remove(this);
        this._subscription.unsubscribe();
    }
}
TabComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-tab',
                template: "<div role=\"tabpanel\"\n     class=\"tab-pane\"\n     [class.active]=\"active$ | async\"\n     [id]=\"id + '-panel'\"\n     [attr.aria-labelledby]=\"id\"\n     [attr.aria-hidden]=\"!(active$ | async)\">\n  <ng-content></ng-content>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
TabComponent.ctorParameters = () => [
    { type: TabsetService }
];
TabComponent.propDecorators = {
    id: [{ type: Input }],
    disabled: [{ type: Input }],
    heading: [{ type: Input }],
    customClass: [{ type: Input }],
    select: [{ type: Output }],
    deselect: [{ type: Output }],
    active: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabFocusDirective {
    /**
     * @param {?} _tabset
     * @param {?} _elementRef
     */
    constructor(_tabset, _elementRef) {
        this._tabset = _tabset;
        this._elementRef = _elementRef;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._subscription = this._tabset.highlighted$.pipe(filter(() => this._tabset.focused$.value === true), filter(() => this._tabset.highlighted$.value === this.uxTabFocus)).subscribe(() => this._elementRef.nativeElement.focus());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
TabFocusDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxTabFocus]'
            },] }
];
/** @nocollapse */
TabFocusDirective.ctorParameters = () => [
    { type: TabsetService },
    { type: ElementRef }
];
TabFocusDirective.propDecorators = {
    uxTabFocus: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabHeadingDirective {
    /**
     * @param {?} templateRef
     * @param {?} tab
     */
    constructor(templateRef, tab) {
        tab.headingRef = templateRef;
    }
}
TabHeadingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxTabHeading]'
            },] }
];
/** @nocollapse */
TabHeadingDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: TabComponent }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabsetComponent {
    /**
     * @param {?} tabset
     */
    constructor(tabset) {
        this.tabset = tabset;
        this.minimal = true;
        this.stacked = 'none';
    }
    /**
     * Allow manual tab selected
     * @param {?} tab
     * @return {?}
     */
    select(tab) {
        this.tabset.select(tab);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    selectPreviousTab(event) {
        // determine which arrow key is pressed
        const /** @type {?} */ arrowLeft = event.key === 'ArrowLeft' || event.keyCode === 37;
        const /** @type {?} */ arrowUp = event.key === 'ArrowUp' || event.keyCode === 38;
        // only perform action if the arrow key matches the orientation
        if (arrowLeft && this.stacked !== 'none' || arrowUp && this.stacked === 'none') {
            return;
        }
        // perform selection
        this.tabset.selectPreviousTab();
        // prevent the browser from scrolling when arrow keys are pressed
        event.preventDefault();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    selectNextTab(event) {
        // determine which arrow key is pressed
        const /** @type {?} */ arrowRight = event.key === 'ArrowRight' || event.keyCode === 39;
        const /** @type {?} */ arrowDown = event.key === 'ArrowDown' || event.keyCode === 40;
        // only perform action if the arrow key matches the orientation
        if (arrowRight && this.stacked !== 'none' || arrowDown && this.stacked === 'none') {
            return;
        }
        // perform selection
        this.tabset.selectNextTab();
        // prevent the browser from scrolling when arrow keys are pressed
        event.preventDefault();
    }
}
TabsetComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-tabset',
                template: "<!-- Nav tabs -->\n<ul role=\"tablist\"\n    class=\"nav nav-tabs\"\n    [class.minimal-tab]=\"minimal\"\n    [attr.aria-label]=\"ariaLabel\"\n    [attr.aria-orientation]=\"stacked === 'none' ? 'horizontal' : 'vertical'\">\n\n\t<li role=\"presentation\" \n        class=\"nav-item\"\n        *ngFor=\"let tab of tabset.tabs$ | async; let index = index\"\n        [class.active]=\"tab.active$ | async\"\n        [class.disabled]=\"tab.disabled\"\n        [ngClass]=\"tab.customClass\">\n\n        <a class=\"nav-link\"\n            [id]=\"tab.id\"\n            role=\"tab\"\n            [uxTabFocus]=\"tab\"\n            [tabindex]=\"(tab.active$ | async) ? 0 : -1\"\n            [class.highlighted]=\"(tabset.focused$ | async) && (tabset.highlighted$ | async) === tab\"            \n            (mousedown)=\"tabset.select(tab)\"\n            (focus)=\"tabset.focused$.next(true)\"\n            (blur)=\"tabset.focused$.next(false)\"\n            (mousedown)=\"tabset.focused$.next(true)\"\n            (keydown.ArrowUp)=\"selectPreviousTab($event)\"\n            (keydown.ArrowLeft)=\"selectPreviousTab($event)\"\n            (keydown.ArrowRight)=\"selectNextTab($event)\"\n            (keydown.ArrowDown)=\"selectNextTab($event)\"\n            (keydown.Home)=\"tabset.selectFirstTab(); $event.preventDefault()\"\n            (keydown.End)=\"tabset.selectLastTab(); $event.preventDefault()\"\n            [attr.aria-controls]=\"tab.id\"\n            [attr.aria-selected]=\"tab.active$ | async\"\n            [attr.aria-disabled]=\"tab.disabled\">\n\n            <span *ngIf=\"!tab.headingRef\">{{ tab.heading }}</span>\n\n            <ng-container *ngIf=\"tab.headingRef\" [ngTemplateOutlet]=\"tab.headingRef\"></ng-container>\n        </a>\n\n\t</li>\n\n</ul>\n\n<!-- Tab panes -->\n<div class=\"tab-content\">\n\t<ng-content></ng-content>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [TabsetService],
                host: {
                    '[class.tabs-left]': 'stacked === "left"',
                    '[class.tabs-right]': 'stacked === "right"',
                }
            }] }
];
/** @nocollapse */
TabsetComponent.ctorParameters = () => [
    { type: TabsetService }
];
TabsetComponent.propDecorators = {
    minimal: [{ type: Input }],
    stacked: [{ type: Input }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabsetModule {
}
TabsetModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [TabsetComponent, TabComponent, TabHeadingDirective],
                declarations: [TabsetComponent, TabComponent, TabHeadingDirective, TabFocusDirective],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TimelineComponent {
}
TimelineComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-timeline',
                template: "<div class=\"timeline\">\r\n    <ng-content></ng-content>\r\n</div>\r\n"
            }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TimelineEventComponent {
}
TimelineEventComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-timeline-event',
                template: "<div class=\"timeline-badge\" [ngClass]=\"badgeColor\">\r\n    <span>{{badgeTitle}}</span>\r\n</div>\r\n<div class=\"timeline-panel\">\r\n    <ng-content></ng-content>\r\n</div>\r\n"
            }] }
];
TimelineEventComponent.propDecorators = {
    badgeColor: [{ type: Input }],
    badgeTitle: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TimelineModule {
}
TimelineModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    TimelineComponent,
                    TimelineEventComponent
                ],
                declarations: [
                    TimelineComponent,
                    TimelineEventComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ TOGGLESWITCH_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ToggleSwitchComponent),
    multi: true
};
let /** @type {?} */ uniqueToggleSwitchId = 0;
class ToggleSwitchComponent {
    constructor() {
        this._toggleSwitchId = `ux-toggleswitch-${++uniqueToggleSwitchId}`;
        this.id = this._toggleSwitchId;
        this.tabindex = 0;
        this.clickable = true;
        this.disabled = false;
        this.ariaLabel = '';
        this.ariaLabelledby = null;
        this.valueChange = new EventEmitter();
        this._value = false;
        this.focused = false;
        this.onTouchedCallback = () => { };
        this.onChangeCallback = () => { };
    }
    /**
     * @return {?}
     */
    get value() {
        return this._value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this._value = value;
        // Update value output
        this.valueChange.emit(value);
        // Notify ngModel
        this.onChangeCallback(value);
        this.onTouchedCallback();
    }
    /**
     * @return {?}
     */
    get inputId() {
        return `${this.id || this._toggleSwitchId}-input`;
    }
    /**
     * @return {?}
     */
    toggle() {
        if (!this.disabled && this.clickable) {
            this.value = !this.value;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.value = !!value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
ToggleSwitchComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-toggleswitch',
                template: "<label [attr.for]=\"inputId\"\n       class=\"ux-toggleswitch\"\n       [class.ux-toggleswitch-checked]=\"value\"\n       [class.ux-toggleswitch-disabled]=\"disabled\"\n       [class.ux-toggleswitch-focused]=\"focused\">\n\n    <input class=\"ux-toggleswitch-input\"\n           type=\"checkbox\"\n           role=\"switch\"\n           [id]=\"inputId\"\n           [checked]=\"value\"\n           [disabled]=\"disabled\"\n           [attr.name]=\"name\"\n           [tabindex]=\"tabindex\"\n           [attr.aria-label]=\"ariaLabel\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-checked]=\"value\"\n           (focus)=\"focused = true\"\n           (blur)=\"focused = false\"\n           (change)=\"toggle()\"\n           (click)=\"$event.stopPropagation()\">\n\n    <div class=\"ux-toggleswitch-container\">\n        <div class=\"ux-toggleswitch-bg\"></div>\n        <div class=\"ux-toggleswitch-nub\"></div>\n    </div>\n\n    <span class=\"ux-toggleswitch-label\">\n        <ng-content></ng-content>\n    </span>\n</label>",
                providers: [TOGGLESWITCH_VALUE_ACCESSOR]
            }] }
];
ToggleSwitchComponent.propDecorators = {
    id: [{ type: Input }],
    name: [{ type: Input }],
    tabindex: [{ type: Input }],
    clickable: [{ type: Input }],
    disabled: [{ type: Input }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }],
    ariaLabelledby: [{ type: Input, args: ['aria-labelledby',] }],
    valueChange: [{ type: Output }],
    value: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ToggleSwitchModule {
}
ToggleSwitchModule.decorators = [
    { type: NgModule, args: [{
                imports: [FormsModule],
                exports: [ToggleSwitchComponent],
                declarations: [ToggleSwitchComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ToolbarSearchButtonDirective {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.clicked = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get width() {
        return this._elementRef.nativeElement.offsetWidth;
    }
    /**
     * @return {?}
     */
    clickHandler() {
        this.clicked.emit();
    }
}
ToolbarSearchButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxToolbarSearchButton]'
            },] }
];
/** @nocollapse */
ToolbarSearchButtonDirective.ctorParameters = () => [
    { type: ElementRef }
];
ToolbarSearchButtonDirective.propDecorators = {
    clicked: [{ type: Output }],
    clickHandler: [{ type: HostListener, args: ['click',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ KEYS = {
    ENTER: 13,
    ESCAPE: 27
};
class ToolbarSearchFieldDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _ngModel
     */
    constructor(_elementRef, _ngModel) {
        this._elementRef = _elementRef;
        this._ngModel = _ngModel;
        this.cancel = new EventEmitter();
        this.submit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get text() {
        // Use ngModel if specified on the host; otherwise read the DOM
        if (this._ngModel) {
            return this._ngModel.value;
        }
        return this._elementRef.nativeElement.value;
    }
    /**
     * @return {?}
     */
    focus() {
        setTimeout(() => {
            this._elementRef.nativeElement.focus();
        });
    }
    /**
     * @return {?}
     */
    blur() {
        setTimeout(() => {
            this._elementRef.nativeElement.blur();
        });
    }
    /**
     * @return {?}
     */
    clear() {
        // Use ngModel if specified on the host; otherwise use the DOM
        if (this._ngModel) {
            this._ngModel.reset();
        }
        else {
            this._elementRef.nativeElement.value = '';
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keydownHandler(event) {
        setTimeout(() => {
            if (event.keyCode === KEYS.ENTER) {
                this.submit.emit(this.text);
            }
            else if (event.keyCode === KEYS.ESCAPE) {
                this._elementRef.nativeElement.blur();
                this.cancel.emit();
            }
        });
    }
}
ToolbarSearchFieldDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxToolbarSearchField]'
            },] }
];
/** @nocollapse */
ToolbarSearchFieldDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: NgModel, decorators: [{ type: Optional }] }
];
ToolbarSearchFieldDirective.propDecorators = {
    cancel: [{ type: Output }],
    submit: [{ type: Output }],
    keydownHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ToolbarSearchComponent {
    /**
     * @param {?} _elementRef
     * @param {?} _colorService
     * @param {?} _document
     */
    constructor(_elementRef, _colorService, _document) {
        this._elementRef = _elementRef;
        this._colorService = _colorService;
        this._document = _document;
        this.direction = 'right';
        this.inverse = false;
        this.expandedChange = new EventEmitter();
        this.search = new EventEmitter();
        this._expanded = false;
        this.position = 'relative';
        this.backgroundColor = 'transparent';
    }
    /**
     * @return {?}
     */
    get expanded() {
        return this._expanded;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set expanded(value) {
        this._expanded = value;
        this.expandedChange.emit(value);
        if (value) {
            // Set focus on the input when expanded
            this.field.focus();
        }
        else {
            // Clear text when contracted
            this.field.clear();
            // Remove focus (works around an IE issue where the caret remains visible)
            this.field.blur();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set background(value) {
        this.backgroundColor = this._colorService.resolve(value) || 'transparent';
    }
    /**
     * @return {?}
     */
    get expandedAnimation() {
        return {
            value: this.expanded ? 'expanded' : 'collapsed',
            params: {
                initialWidth: this.button.width + 'px'
            }
        };
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // Subscribe to the submit event on the input field, triggering the search event
        this.field.submit.subscribe((text) => this.search.emit(text));
        // Subscribe to cancel events coming from the input field
        this.field.cancel.subscribe(() => this.expanded = false);
        // Subscribe to the button click event
        this.button.clicked.subscribe(() => {
            if (this.expanded && this.field.text) {
                this.search.emit(this.field.text);
            }
            else {
                this.expanded = !this.expanded;
            }
        });
        // Create placeholder element to avoid changing layout when switching to position: absolute
        this.createPlaceholder();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    animationStart(event) {
        if (event.toState === 'expanded') {
            this.position = 'absolute';
            this.enablePlaceholder(true);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    animationDone(event) {
        if (event.toState === 'collapsed') {
            this.position = 'relative';
            this.enablePlaceholder(false);
        }
    }
    /**
     * @return {?}
     */
    createPlaceholder() {
        // Get width and height of the component
        const /** @type {?} */ styles = getComputedStyle(this._elementRef.nativeElement);
        // Create invisible div with the same dimensions
        this._placeholder = this._document.createElement('div');
        this._placeholder.style.display = 'none';
        this._placeholder.style.width = this.button.width + 'px';
        this._placeholder.style.height = styles.height;
        this._placeholder.style.visibility = 'hidden';
        // Add as a sibling
        this._elementRef.nativeElement.parentNode.insertBefore(this._placeholder, this._elementRef.nativeElement);
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    enablePlaceholder(enabled) {
        this._placeholder.style.display = (enabled ? 'inline-block' : 'none');
    }
}
ToolbarSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-toolbar-search',
                template: `<ng-content></ng-content>`,
                animations: [
                    trigger('expanded', [
                        state('collapsed', style({
                            width: '{{initialWidth}}'
                        }), {
                            params: { initialWidth: '30px' }
                        }),
                        state('expanded', style({
                            width: '100%'
                        })),
                        transition('collapsed <=> expanded', [animate('0.3s ease-out')])
                    ])
                ]
            }] }
];
/** @nocollapse */
ToolbarSearchComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ColorService },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] }
];
ToolbarSearchComponent.propDecorators = {
    expanded: [{ type: HostBinding, args: ['class.expanded',] }, { type: Input }],
    direction: [{ type: Input }, { type: HostBinding, args: ['class',] }],
    inverse: [{ type: Input }, { type: HostBinding, args: ['class.inverse',] }],
    background: [{ type: Input }],
    expandedChange: [{ type: Output }],
    search: [{ type: Output }],
    expandedAnimation: [{ type: HostBinding, args: ['@expanded',] }],
    position: [{ type: HostBinding, args: ['style.position',] }],
    backgroundColor: [{ type: HostBinding, args: ['style.background-color',] }],
    field: [{ type: ContentChild, args: [ToolbarSearchFieldDirective,] }],
    button: [{ type: ContentChild, args: [ToolbarSearchButtonDirective,] }],
    animationStart: [{ type: HostListener, args: ['@expanded.start', ['$event'],] }],
    animationDone: [{ type: HostListener, args: ['@expanded.done', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DECLARATIONS$6 = [
    ToolbarSearchComponent,
    ToolbarSearchFieldDirective,
    ToolbarSearchButtonDirective
];
class ToolbarSearchModule {
}
ToolbarSearchModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: DECLARATIONS$6,
                declarations: DECLARATIONS$6,
                providers: [],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class VirtualScrollLoadingDirective {
}
VirtualScrollLoadingDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxVirtualScrollLoading]'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class VirtualScrollLoadButtonDirective {
}
VirtualScrollLoadButtonDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxVirtualScrollLoadButton]'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class VirtualScrollCellDirective {
}
VirtualScrollCellDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxVirtualScrollCell]'
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class VirtualScrollComponent {
    /**
     * @param {?} _elementRef
     * @param {?} resizeService
     */
    constructor(_elementRef, resizeService) {
        this._elementRef = _elementRef;
        this.collection = Observable.create();
        this.loadOnScroll = true;
        this.loading = new EventEmitter();
        this.cells = new BehaviorSubject([]);
        this.scrollTop = 0;
        this.isLoading = false;
        this.pageNumber = 0;
        this.data = [];
        this.loadingComplete = false;
        // watch for any future changes to size
        resizeService.addResizeListener(_elementRef.nativeElement).subscribe(event => this._height = event.height);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.cellHeight) {
            throw new Error('Virtual Scroll Component requires "cellHeight" property to be defined.');
        }
        // subscribe to the collection
        this.setupObservable();
        // load the first page of data
        this.loadNextPage();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // re-render cells now that we can display any loading indicator or loading button
        this.renderCells();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["collection"] && changes["collection"].currentValue !== changes["collection"].previousValue && !changes["collection"].isFirstChange()) {
            this.setupObservable();
            this.reset();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @return {?}
     */
    setupObservable() {
        // if there is a current subscription, unsubscribe
        if (this._subscription && this._subscription.unsubscribe) {
            this._subscription.unsubscribe();
        }
        this._subscription = this.collection.subscribe(collection => {
            this.data.push(...collection);
            this.renderCells();
            this.isLoading = false;
        }, null, () => {
            this.loadingComplete = true;
        });
    }
    /**
     * @return {?}
     */
    renderCells() {
        this.cells.next(this.getVisibleCells());
        if (this.loadOnScroll && !this.isLoading && !this.loadingComplete) {
            const /** @type {?} */ remainingScroll = this._elementRef.nativeElement.scrollHeight - (this._elementRef.nativeElement.scrollTop + this._elementRef.nativeElement.clientHeight);
            // if the current cells take up less than the height of the component then load the next page
            if (remainingScroll <= this._elementRef.nativeElement.clientHeight) {
                this.loadNextPage();
            }
        }
    }
    /**
     * @return {?}
     */
    getVisibleCells() {
        // store the initial element height
        if (!this._height) {
            this._height = this._elementRef.nativeElement.offsetHeight;
        }
        // perform some calculations
        const /** @type {?} */ scrollTop = this._elementRef.nativeElement.scrollTop;
        const /** @type {?} */ startCell = Math.floor(scrollTop / this.cellHeight);
        const /** @type {?} */ endCell = Math.ceil(this._height / this.cellHeight) + 1;
        // update the scroll position
        this.scrollTop = scrollTop - (scrollTop % this.cellHeight);
        // return a sublist of items visible on the screen
        return this.data.slice(startCell, startCell + endCell);
    }
    /**
     * @return {?}
     */
    getTotalHeight() {
        return this.cellHeight * this.data.length;
    }
    /**
     * @return {?}
     */
    loadNextPage() {
        this.isLoading = true;
        this.loading.next(this.pageNumber);
        this.pageNumber++;
    }
    /**
     * @return {?}
     */
    reset() {
        // reset all values
        this.scrollTop = 0;
        this.data = [];
        this._height = undefined;
        this.pageNumber = 0;
        this.loadingComplete = false;
        // set scroll position
        this._elementRef.nativeElement.scrollTop = 0;
        // clear the current cells
        this.renderCells();
        // reload first page
        this.loadNextPage();
    }
}
VirtualScrollComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-virtual-scroll',
                template: "<div class=\"virtual-scroll-content-height\" [style.height.px]=\"getTotalHeight()\"></div>\n<div class=\"virtual-scroll-content\" [style.transform]=\"'translateY(' + scrollTop + 'px)'\">\n\n    <!-- Virtually Render Cells -->\n    <ng-container *ngFor=\"let cell of cells | async\">\n        <ng-container *ngTemplateOutlet=\"cellTemplate; context: { cell: cell }\"></ng-container>\n    </ng-container>\n\n    <!-- Loading Indicator -->\n    <ng-container *ngIf=\"loadingIndicatorTemplate && isLoading\" [ngTemplateOutlet]=\"loadingIndicatorTemplate\"></ng-container>\n\n    <!-- Loading Button -->\n    <div class=\"virtual-scroll-load-button\" *ngIf=\"loadButtonTemplate && !loadOnScroll && !loadingComplete && !isLoading\" (click)=\"loadNextPage()\">\n        <ng-container *ngTemplateOutlet=\"loadButtonTemplate\"></ng-container>\n    </div>\n    \n</div>"
            }] }
];
/** @nocollapse */
VirtualScrollComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: ResizeService }
];
VirtualScrollComponent.propDecorators = {
    collection: [{ type: Input }],
    cellHeight: [{ type: Input }],
    loadOnScroll: [{ type: Input }],
    loading: [{ type: Output }],
    cellTemplate: [{ type: ContentChild, args: [VirtualScrollCellDirective, { read: TemplateRef },] }],
    loadingIndicatorTemplate: [{ type: ContentChild, args: [VirtualScrollLoadingDirective, { read: TemplateRef },] }],
    loadButtonTemplate: [{ type: ContentChild, args: [VirtualScrollLoadButtonDirective, { read: TemplateRef },] }],
    renderCells: [{ type: HostListener, args: ['scroll',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DECLARATIONS$7 = [
    VirtualScrollComponent,
    VirtualScrollLoadingDirective,
    VirtualScrollLoadButtonDirective,
    VirtualScrollCellDirective
];
class VirtualScrollModule {
}
VirtualScrollModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    ResizeModule
                ],
                exports: DECLARATIONS$7,
                declarations: DECLARATIONS$7
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AutoGrowDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        // ensure this is a textarea or else throw error
        if (_elementRef.nativeElement.tagName.toLowerCase() !== 'textarea') {
            throw new Error('uxAutoGrow directive can only be used on <textarea> elements.');
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.update();
    }
    /**
     * @return {?}
     */
    update() {
        // perform sizing
        this._renderer.setStyle(this._elementRef.nativeElement, 'overflowY', 'hidden');
        this._renderer.setStyle(this._elementRef.nativeElement, 'height', 'auto');
        // get the new total height and element height
        const { scrollHeight } = this._elementRef.nativeElement;
        const { maxHeight } = getComputedStyle(this._elementRef.nativeElement);
        // determine what the maximum allowed height is
        const /** @type {?} */ maximum = !isNaN(parseFloat(maxHeight)) ? parseFloat(maxHeight) : Infinity;
        // if there is a max height specifed we want to show the scrollbars
        if (maximum < scrollHeight) {
            this._renderer.setStyle(this._elementRef.nativeElement, 'overflowY', 'auto');
            this._renderer.setStyle(this._elementRef.nativeElement, 'height', maximum + 'px');
        }
        else {
            this._renderer.setStyle(this._elementRef.nativeElement, 'height', scrollHeight + 'px');
        }
    }
}
AutoGrowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxAutoGrow]'
            },] }
];
/** @nocollapse */
AutoGrowDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
AutoGrowDirective.propDecorators = {
    update: [{ type: HostListener, args: ['input',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AutoGrowModule {
}
AutoGrowModule.decorators = [
    { type: NgModule, args: [{
                exports: [AutoGrowDirective],
                declarations: [AutoGrowDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FixedHeaderTableDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.tablePaging = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // add class to the table
        this._renderer.addClass(this._elementRef.nativeElement, 'ux-fixed-header-table');
        // locate the important elements
        this._tableHead = this._elementRef.nativeElement.querySelector('thead');
        this._tableBody = this._elementRef.nativeElement.querySelector('tbody');
        // bind to scroll events on the table body
        this._renderer.listen(this._tableBody, 'scroll', this.onScroll.bind(this));
        // resize the table header to account for scrollbar
        this.setLayout();
        // trigger the loading of the first page
        this.tablePaging.emit();
    }
    /**
     * Get the table element
     * Primarily used by column width directive
     * @return {?}
     */
    getTable() {
        return this._elementRef.nativeElement;
    }
    /**
     * Handle scroll events
     * @return {?}
     */
    onScroll() {
        // determine if we are scrolled to the bottom and if so load the next page
        if (this._tableBody.scrollTop === (this._tableBody.scrollHeight - this._tableBody.offsetHeight)) {
            this.tablePaging.emit();
        }
    }
    /**
     * Update the size of the table header to account for the scrollbar.
     * This is important to keep the columns aligned
     * @return {?}
     */
    setLayout() {
        // calculate the size of the scrollbar
        const /** @type {?} */ scrollbar = this._tableBody.offsetWidth - this._tableBody.clientWidth;
        // add padding to the header to account for this
        this._renderer.setStyle(this._tableHead, 'padding-right', scrollbar + 'px');
        // set the desired height of the table body
        this._renderer.setStyle(this._tableBody, 'height', typeof this.tableHeight === 'number' ? `${this.tableHeight}px` : this.tableHeight);
    }
}
FixedHeaderTableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxFixedHeaderTable]'
            },] }
];
/** @nocollapse */
FixedHeaderTableDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
FixedHeaderTableDirective.propDecorators = {
    tableHeight: [{ type: Input }],
    tablePaging: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FixedHeaderTableModule {
}
FixedHeaderTableModule.decorators = [
    { type: NgModule, args: [{
                exports: [FixedHeaderTableDirective],
                declarations: [FixedHeaderTableDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FloatLabelDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.mode = 'focus';
        this.raised = false;
        this._focused = false;
        this._eventHandles = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._eventHandles.push(this._renderer.listen(this.input, 'focus', this.inputFocus.bind(this)), this._renderer.listen(this.input, 'blur', this.inputBlur.bind(this)), this._renderer.listen(this.input, 'input', this.inputChange.bind(this)));
        // Check initial input value
        this.raised = this.hasText();
        // Ensure that the `for` attribute is set
        if (!this._elementRef.nativeElement.getAttribute('for') && this.input.getAttribute('id')) {
            this._renderer.setAttribute(this._elementRef.nativeElement, 'for', this.input.getAttribute('id'));
        }
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (!(this.mode === 'focus' && this._focused)) {
            this.raised = this.hasText();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // Unsubscribe event handles
        this._eventHandles.forEach((eventHandle) => eventHandle());
    }
    /**
     * @return {?}
     */
    hasText() {
        if (this.value === undefined) {
            return !!this.input.value;
        }
        return !!this.value;
    }
    /**
     * @return {?}
     */
    inputFocus() {
        if (this.mode === 'focus') {
            this._focused = true;
            this.raised = true;
        }
    }
    /**
     * @return {?}
     */
    inputBlur() {
        if (this.mode === 'focus') {
            this._focused = false;
            this.raised = this.hasText();
        }
    }
    /**
     * @return {?}
     */
    inputChange() {
        if (this.mode === 'input') {
            this.raised = this.hasText();
        }
    }
}
FloatLabelDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxFloatLabel]',
                host: {
                    'class': 'ux-float-label'
                }
            },] }
];
/** @nocollapse */
FloatLabelDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
FloatLabelDirective.propDecorators = {
    input: [{ type: Input, args: ['uxFloatLabel',] }],
    value: [{ type: Input }],
    mode: [{ type: Input }],
    raised: [{ type: HostBinding, args: ['class.ux-float-label-raised',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FloatLabelModule {
}
FloatLabelModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [FloatLabelDirective],
                declarations: [FloatLabelDirective],
                providers: [],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HelpCenterService {
    constructor() {
        this.items = new BehaviorSubject([]);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    registerItem(item) {
        // get the current items
        let /** @type {?} */ items = this.items.getValue();
        // add the new item to the list
        items.push(item);
        // update the observable
        this.items.next(items);
    }
    /**
     * @param {?} item
     * @return {?}
     */
    unregisterItem(item) {
        // get the current items
        let /** @type {?} */ items = this.items.getValue();
        // remove the item being unregistered
        items = items.filter(itm => itm !== item);
        // update the observable
        this.items.next(items);
    }
}
HelpCenterService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HelpCenterItemDirective {
    /**
     * @param {?} _helpCenterService
     */
    constructor(_helpCenterService) {
        this._helpCenterService = _helpCenterService;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // register the item in the service
        this._helpCenterService.registerItem(this.uxHelpCenterItem);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // remove this item when it is destroyed
        this._helpCenterService.unregisterItem(this.uxHelpCenterItem);
    }
}
HelpCenterItemDirective.decorators = [
    { type: Directive, args: [{ selector: '[uxHelpCenterItem]' },] }
];
/** @nocollapse */
HelpCenterItemDirective.ctorParameters = () => [
    { type: HelpCenterService }
];
HelpCenterItemDirective.propDecorators = {
    uxHelpCenterItem: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HelpCenterModule {
}
HelpCenterModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: [HelpCenterItemDirective],
                declarations: [HelpCenterItemDirective],
                providers: [HelpCenterService],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HoverActionService {
    constructor() {
        this.active = new BehaviorSubject(false);
        this._focused = false;
        this._hovered = false;
        this._actions = [];
    }
    /**
     * @param {?} action
     * @return {?}
     */
    register(action) {
        this._actions.push(action);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    unregister(action) {
        this._actions = this._actions.filter(actn => actn !== action);
    }
    /**
     * @param {?} container
     * @return {?}
     */
    setContainer(container) {
        this._container = container;
    }
    /**
     * @param {?} focus
     * @return {?}
     */
    setFocusState(focus) {
        this._focused = focus;
        this.updateVisibility();
    }
    /**
     * @param {?} hover
     * @return {?}
     */
    setHoverState(hover) {
        this._hovered = hover;
        this.updateVisibility();
    }
    /**
     * @return {?}
     */
    next() {
        // if container has focus then focus the first hover action
        if (this.containerHasFocus()) {
            this.focusActionAtIndex(0);
            return this.updateVisibility();
        }
        // if a hover action has focus then focus the next action
        if (this.actionHasFocus()) {
            let /** @type {?} */ index = this.getFocusedActionIndex() + 1;
            this.focusActionAtIndex(index);
            this.updateVisibility();
        }
    }
    /**
     * @return {?}
     */
    previous() {
        // if a hover action has focus then focus the previous action
        if (this.actionHasFocus()) {
            let /** @type {?} */ index = this.getFocusedActionIndex() - 1;
            if (index >= 0) {
                this.focusActionAtIndex(index);
            }
            else {
                this._container.focus();
            }
        }
        this.updateVisibility();
    }
    /**
     * @return {?}
     */
    updateVisibility() {
        this.active.next(this._focused || this._hovered || this.actionHasFocus());
    }
    /**
     * @param {?} index
     * @return {?}
     */
    focusActionAtIndex(index) {
        if (index >= 0 && index < this._actions.length) {
            this._actions[index].focus();
        }
    }
    /**
     * @return {?}
     */
    getFocusedActionIndex() {
        return this._actions.findIndex(action => action === this.getFocusedAction());
    }
    /**
     * @return {?}
     */
    containerHasFocus() {
        return this._focused;
    }
    /**
     * @return {?}
     */
    actionHasFocus() {
        return !!this.getFocusedAction();
    }
    /**
     * @return {?}
     */
    getFocusedAction() {
        return this._actions.find(action => action.focused);
    }
}
HoverActionService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HoverActionContainerDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _hoverActionService
     */
    constructor(_elementRef, _hoverActionService) {
        this._elementRef = _elementRef;
        this._hoverActionService = _hoverActionService;
        this.tabindex = 0;
        this.active = false;
        // register the container element with the service
        this._hoverActionService.setContainer(this);
        // apply a class based on the active state of the container and it's actions
        this.active$ = this._hoverActionService.active.subscribe(active => this.active = active);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.active$.unsubscribe();
    }
    /**
     * @return {?}
     */
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    onFocus() {
        this._hoverActionService.setFocusState(true);
    }
    /**
     * @return {?}
     */
    onBlur() {
        this._hoverActionService.setFocusState(false);
    }
    /**
     * @return {?}
     */
    onHover() {
        this._hoverActionService.setHoverState(true);
    }
    /**
     * @return {?}
     */
    onLeave() {
        this._hoverActionService.setHoverState(false);
    }
    /**
     * @return {?}
     */
    next() {
        this._hoverActionService.next();
    }
}
HoverActionContainerDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxHoverActionContainer]',
                providers: [HoverActionService],
                host: {
                    '[class.hover-action-container-active]': 'active',
                    '[tabindex]': 'tabindex'
                }
            },] }
];
/** @nocollapse */
HoverActionContainerDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: HoverActionService }
];
HoverActionContainerDirective.propDecorators = {
    tabindex: [{ type: Input }],
    focus: [{ type: HostListener, args: ['click',] }],
    onFocus: [{ type: HostListener, args: ['focus',] }],
    onBlur: [{ type: HostListener, args: ['blur',] }],
    onHover: [{ type: HostListener, args: ['mouseenter',] }],
    onLeave: [{ type: HostListener, args: ['mouseleave',] }],
    next: [{ type: HostListener, args: ['keydown.arrowright',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HoverActionDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _hoverActionService
     */
    constructor(_elementRef, _hoverActionService) {
        this._elementRef = _elementRef;
        this._hoverActionService = _hoverActionService;
        this.tabindex = 1;
        this.active = false;
        this.focused = false;
        // register the action
        this._hoverActionService.register(this);
        // watch for changes to the activeness of the container
        this.active$ = this._hoverActionService.active.subscribe(active => this.active = active);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._hoverActionService.unregister(this);
        this.active$.unsubscribe();
    }
    /**
     * @return {?}
     */
    focus() {
        this._elementRef.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.focused = true;
        this._hoverActionService.updateVisibility();
    }
    /**
     * @return {?}
     */
    onBlur() {
        this.focused = false;
        this._hoverActionService.updateVisibility();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    previous(event) {
        event.stopPropagation();
        this._hoverActionService.previous();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    next(event) {
        event.stopPropagation();
        this._hoverActionService.next();
    }
}
HoverActionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxHoverAction]',
                host: {
                    '[class.hover-action-active]': 'active',
                    '[class.hover-action-focused]': 'focused',
                    '[tabindex]': 'tabindex'
                }
            },] }
];
/** @nocollapse */
HoverActionDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: HoverActionService }
];
HoverActionDirective.propDecorators = {
    tabindex: [{ type: Input }],
    onFocus: [{ type: HostListener, args: ['focus',] }],
    onBlur: [{ type: HostListener, args: ['blur',] }],
    previous: [{ type: HostListener, args: ['keydown.arrowleft', ['$event'],] }],
    next: [{ type: HostListener, args: ['keydown.arrowright', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DECLARATIONS$8 = [
    HoverActionDirective,
    HoverActionContainerDirective
];
class HoverActionModule {
}
HoverActionModule.decorators = [
    { type: NgModule, args: [{
                exports: DECLARATIONS$8,
                declarations: DECLARATIONS$8
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LayoutSwitcherItemDirective {
    /**
     * @param {?} _templateRef
     * @param {?} _viewContainerRef
     */
    constructor(_templateRef, _viewContainerRef) {
        this._templateRef = _templateRef;
        this._viewContainerRef = _viewContainerRef;
    }
    /**
     * @return {?}
     */
    getLayout() {
        return this._templateRef;
    }
    /**
     * @return {?}
     */
    getConfig() {
        return this._config;
    }
    /**
     * @return {?}
     */
    activate() {
        this._embeddedView = this._viewContainerRef.createEmbeddedView(this._templateRef);
    }
    /**
     * @return {?}
     */
    deactivate() {
        let /** @type {?} */ index = this._viewContainerRef.indexOf(this._embeddedView);
        this._viewContainerRef.remove(index);
        this._embeddedView = null;
    }
}
LayoutSwitcherItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxLayoutSwitcherItem]'
            },] }
];
/** @nocollapse */
LayoutSwitcherItemDirective.ctorParameters = () => [
    { type: TemplateRef },
    { type: ViewContainerRef }
];
LayoutSwitcherItemDirective.propDecorators = {
    _config: [{ type: Input, args: ['uxLayoutSwitcherItem',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LayoutSwitcherDirective {
    /**
     * @param {?} _elementRef
     * @param {?} resizeService
     * @param {?} _viewContainerRef
     */
    constructor(_elementRef, resizeService, _viewContainerRef) {
        this._elementRef = _elementRef;
        this._viewContainerRef = _viewContainerRef;
        // watch for changes to the container size
        resizeService.addResizeListener(_elementRef.nativeElement).subscribe(event => {
            this._width = event.width;
            // render the appropriate layout
            this.updateActiveLayout();
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        // if the active group has changed then render the appropriate layout
        if (changes["group"].currentValue !== changes["group"].previousValue) {
            this.updateActiveLayout();
        }
    }
    /**
     * @return {?}
     */
    getActiveLayout() {
        // if there are currently no layouts then do nothing
        if (!this._layouts) {
            return null;
        }
        // otherwise find layouts that match the active group and that meet the constraints
        return this._layouts.filter(layout => this.group === layout.getConfig().group).find(layout => {
            let /** @type {?} */ minWidth = layout.getConfig().minWidth || 0;
            let /** @type {?} */ maxWidth = layout.getConfig().maxWidth || Infinity;
            return this._width >= minWidth && this._width < maxWidth;
        });
    }
    /**
     * @return {?}
     */
    updateActiveLayout() {
        // get the layout that should be shown
        let /** @type {?} */ layout = this.getActiveLayout();
        // check if we are currently showing the layout
        if (this._activeLayout === layout) {
            return;
        }
        // remove the current layout
        if (this._activeLayout) {
            this._activeLayout.deactivate();
        }
        // store the new active layout
        this._activeLayout = layout;
        // if there is an active layout then activate
        if (this._activeLayout) {
            this._activeLayout.activate();
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // store the initial current element width
        this._width = this._elementRef.nativeElement.offsetWidth;
        // render the appropriate layout - need a delay as Angular doesn't like changes like this in these lifecycle hooks
        requestAnimationFrame(this.updateActiveLayout.bind(this));
    }
}
LayoutSwitcherDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxLayoutSwitcher]'
            },] }
];
/** @nocollapse */
LayoutSwitcherDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ResizeService },
    { type: ViewContainerRef }
];
LayoutSwitcherDirective.propDecorators = {
    group: [{ type: Input }],
    _layouts: [{ type: ContentChildren, args: [LayoutSwitcherItemDirective,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ DECLARATIONS$9 = [
    LayoutSwitcherDirective,
    LayoutSwitcherItemDirective
];
class LayoutSwitcherModule {
}
LayoutSwitcherModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    ResizeModule
                ],
                exports: DECLARATIONS$9,
                declarations: DECLARATIONS$9,
                providers: [],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class OverflowDirective {
    /**
     * @param {?} _elementRef
     */
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        /**
         * Allow overflow to be within a range before emitting
         */
        this.tolerance = 0;
        /**
         * Emit when there is a change to the overflow state - horizontal or vertical
         */
        this.uxOverflowObserver = new EventEmitter();
        /**
         * Emit when there is a change to overflow on the horizontal axis
         */
        this.uxOverflowHorizontalObserver = new EventEmitter();
        /**
         * Emit when there is a change to overflow on the vertical axis
         */
        this.uxOverflowVerticalObserver = new EventEmitter();
        /**
         * Store the overflow state on both axis
         */
        this._state = { horizontalOverflow: false, verticalOverflow: false };
        /**
         * Unsubscribe from all the observables
         */
        this._onDestroy = new Subject();
    }
    /**
     * Set up the trigger if specified
     * @return {?}
     */
    ngOnInit() {
        if (this.trigger) {
            this.trigger.pipe(takeUntil(this._onDestroy)).subscribe(() => this.checkForOverflow());
        }
    }
    /**
     * Perform an intial check for overflow
     * @return {?}
     */
    ngAfterViewInit() {
        requestAnimationFrame(() => this.checkForOverflow());
    }
    /**
     * Unsubscribe from the trigger
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Programmatically trigger check for overflow
     * @return {?}
     */
    checkForOverflow() {
        const { offsetWidth, offsetHeight, scrollWidth, scrollHeight } = this._elementRef.nativeElement;
        const /** @type {?} */ horizontalOverflow = (scrollWidth - offsetWidth) > this.tolerance;
        const /** @type {?} */ verticalOverflow = (scrollHeight - offsetHeight) > this.tolerance;
        if (horizontalOverflow !== this._state.horizontalOverflow) {
            this.uxOverflowHorizontalObserver.emit(horizontalOverflow);
        }
        if (verticalOverflow !== this._state.verticalOverflow) {
            this.uxOverflowVerticalObserver.emit(verticalOverflow);
        }
        if (horizontalOverflow !== this._state.horizontalOverflow || verticalOverflow !== this._state.verticalOverflow) {
            this.uxOverflowObserver.emit((horizontalOverflow || verticalOverflow));
        }
        // store the state
        this._state = { horizontalOverflow, verticalOverflow };
    }
}
OverflowDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxOverflowObserver], [uxOverflowHorizontalObserver], [uxOverflowVerticalObserver]',
                exportAs: 'ux-overflow-observer'
            },] }
];
/** @nocollapse */
OverflowDirective.ctorParameters = () => [
    { type: ElementRef }
];
OverflowDirective.propDecorators = {
    trigger: [{ type: Input }],
    tolerance: [{ type: Input }],
    uxOverflowObserver: [{ type: Output }],
    uxOverflowHorizontalObserver: [{ type: Output }],
    uxOverflowVerticalObserver: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ObserversModule$1 {
}
ObserversModule$1.decorators = [
    { type: NgModule, args: [{
                exports: [OverflowDirective],
                declarations: [OverflowDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const KeyCode = {
    UpArrow: 38,
    DownArrow: 40,
    Spacebar: 32,
};
KeyCode[KeyCode.UpArrow] = "UpArrow";
KeyCode[KeyCode.DownArrow] = "DownArrow";
KeyCode[KeyCode.Spacebar] = "Spacebar";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectionStrategy {
    /**
     * @param {?=} selectionService
     */
    constructor(selectionService) {
        this.selectionService = selectionService;
    }
    /**
     * @param {?} selectionService
     * @return {?}
     */
    setSelectionService(selectionService) {
        this.selectionService = selectionService;
    }
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    mousedown(event, data) { }
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    click(event, data) { }
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    keydown(event, data) { }
    /**
     * Select the item - default behavior
     * @param {...?} data
     * @return {?}
     */
    select(...data) {
        this.selectionService.select(...data);
    }
    /**
     * Toggle the item's selected state - default behavior
     * @param {...?} data
     * @return {?}
     */
    toggle(...data) {
        this.selectionService.toggle(...data);
    }
    /**
     * Deselect the item - default behavior
     * @param {...?} data
     * @return {?}
     */
    deselect(...data) {
        this.selectionService.deselect(...data);
    }
    /**
     * Select all items - default behavior
     * @return {?}
     */
    selectAll() {
        this.select(...this.selectionService.dataset);
    }
    /**
     * Deselect all items - default behavior
     * @return {?}
     */
    deselectAll() {
        this.deselect(...this.selectionService.dataset);
    }
    /**
     * @return {?}
     */
    destroy() { }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RowSelectionStrategy extends SelectionStrategy {
    constructor() {
        super(...arguments);
        this._selection = { start: null, end: null };
    }
    /**
     * By default on shift click the browser will highlight
     * text. This looks bad and we don't want this to occur
     * @param {?} event
     * @return {?}
     */
    mousedown(event) {
        event.preventDefault();
    }
    /**
     * When a row is clicked we want to handle selection
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    click(event, data) {
        // determine which modifier keys are pressed
        const { ctrlKey, shiftKey } = event;
        // if the shift key is pressed we want to perform a multiple selection
        if (shiftKey) {
            return this.multipleSelect(data);
        }
        // if the control key is pressed we want to perform an additive toggle selection
        if (ctrlKey) {
            return this.toggle(data);
        }
        // perform a single selection where all other rows are deselected
        this.singleSelect(data);
    }
    /**
     * To support full keyboard control we need to support the following:
     * 1. Arrow keys to navigate up and down
     * 2. Spacebar to toggle selection
     * 3. Shift + Arrow keys to multiple select
     * 4. Ctrl + Arrow keys to allow retained selection and navigation
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    keydown(event, data) {
        switch (event.keyCode) {
            case KeyCode.UpArrow:
            case KeyCode.DownArrow:
                event.preventDefault();
                this.navigate(event, data);
                break;
            case KeyCode.Spacebar:
                event.preventDefault();
                this.selectionService.strategy.toggle(data, true);
                break;
        }
    }
    /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     * @param {?} data
     * @param {?=} activate
     * @return {?}
     */
    toggle(data, activate = false) {
        super.toggle(data);
        // store or clear the selection
        this.selectionService.isSelected(data) ? this.setSelectionStart(data) : this.clearSelection();
        // if we want to keep the item activated then activate
        if (activate) {
            this.selectionService.activate(data);
        }
    }
    /**
     * Clear all other selected items and select only
     * the most recently selected item
     * @param {?} data
     * @return {?}
     */
    singleSelect(data) {
        // deselect all other rows if neither modifier key is pressed
        this.deselectAll();
        // select the current row
        this.select(data);
        // store the current item as the selection start
        this.setSelectionStart(data);
    }
    /**
     * Handle multiple selection:
     * 1. If no start item selected - select it
     * 2. If a start item has been selected - select all in between
     * 3. If a start and end item have been selected clear the range and then select the new range
     * @param {?} data
     * @return {?}
     */
    multipleSelect(data) {
        // if no selection currently exists then perform initial selection
        if (!this._selection.start) {
            // select the row
            this.select(data);
            // store the starting point
            return this.setSelectionStart(data);
        }
        // if a multiple selection already took place - clear the previous selection
        if (this._selection.start && this._selection.end) {
            this.deselect(...this.getSelectedItems());
        }
        // set the new selection end point
        this.setSelectionEnd(data);
        // select all the items in the range
        this.select(...this.getSelectedItems());
    }
    /**
     * Set the selection start point. If there was previously a
     * selection end point then clear it as this is a new selection
     * @param {?} data
     * @return {?}
     */
    setSelectionStart(data) {
        this._selection.start = data;
        this._selection.end = null;
        // activate the item
        this.selectionService.activate(data);
    }
    /**
     * Set the selection end point
     * @param {?} data
     * @return {?}
     */
    setSelectionEnd(data) {
        this._selection.end = data;
        // activate the item
        this.selectionService.activate(data);
    }
    /**
     * Clear both start and end selection points
     * @param {?=} deactivate
     * @return {?}
     */
    clearSelection(deactivate = true) {
        // reset the selected item
        this._selection = { start: null, end: null };
        // remove the current active item
        if (deactivate) {
            this.selectionService.deactivate();
        }
    }
    /**
     * Determine all the items affected by the current selection.
     * Note that the end point may be above the start point so
     * we need to account for this.
     * @return {?}
     */
    getSelectedItems() {
        // get the latest dataset
        const { dataset } = this.selectionService;
        // get the indexes of the start and end point
        const /** @type {?} */ startIdx = dataset.indexOf(this._selection.start);
        const /** @type {?} */ endIdx = dataset.indexOf(this._selection.end);
        // get the region of the array that is selected - note the endIdx may be before the startIdx so account for this
        return dataset.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
    }
    /**
     * Activate the sibling item when arrow keys are pressed
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    navigate(event, data) {
        // determine which modifier keys are pressed
        const { ctrlKey, shiftKey } = event;
        // if no modifier keys are pressed then deselect all and clear the selection
        if (!ctrlKey && !shiftKey) {
            this.deselectAll();
            this.clearSelection(false);
        }
        // activate the sibling - if the up arrow is pressed then navigate to the previous sibling
        const /** @type {?} */ sibling = this.selectionService.activateSibling(event.keyCode === KeyCode.UpArrow);
        // if the shift key is pressed then we also want to toggle the state if the item
        if (shiftKey && sibling) {
            // if there is no current selection start then select the current row
            if (!this._selection.start) {
                this.multipleSelect(data);
            }
            this.multipleSelect(sibling);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class RowAltSelectionStrategy extends RowSelectionStrategy {
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    keydown(event, data) {
        switch (event.keyCode) {
            case KeyCode.UpArrow:
            case KeyCode.DownArrow:
                event.preventDefault();
                this.handleCursorKey(event, data);
                break;
            case KeyCode.Spacebar:
                event.preventDefault();
                this.selectionService.strategy.toggle(data);
                break;
        }
    }
    /**
     * Select the sibling item when arrow keys are pressed
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    handleCursorKey(event, data) {
        // determine which modifier keys are pressed
        const { ctrlKey, shiftKey } = event;
        // if no modifier keys are pressed then deselect all and clear the selection
        if (!ctrlKey && !shiftKey) {
            this.deselectAll();
            this.clearSelection(false);
        }
        if (ctrlKey) {
            this.selectionService.activateSibling(event.keyCode === KeyCode.UpArrow);
        }
        else {
            const /** @type {?} */ sibling = this.selectionService.getSibling(event.keyCode === KeyCode.UpArrow);
            this.multipleSelect(sibling ? sibling : data);
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SimpleSelectionStrategy extends SelectionStrategy {
    /**
     * When the item is clicked simply toggle the current selected state
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    click(event, data) {
        this.toggle(data);
    }
    /**
     * Add basic keyboard support for navigating
     * and selecting/deselecting items
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    keydown(event, data) {
        switch (event.keyCode) {
            case KeyCode.UpArrow:
                event.preventDefault();
                return this.selectionService.activateSibling(true);
            case KeyCode.DownArrow:
                event.preventDefault();
                return this.selectionService.activateSibling(false);
            case KeyCode.Spacebar:
                event.preventDefault();
                return this.toggle(data);
        }
    }
    /**
     * Override the standard toggle function to always activate the item
     * @param {?} data
     * @return {?}
     */
    toggle(data) {
        super.toggle(data);
        this.selectionService.activate(data);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectionService {
    constructor() {
        this._selection = new Set();
        this.dataset = [];
        this.enabled = true;
        this.clickEnabled = true;
        this.keyboardEnabled = true;
        this.strategy = new SimpleSelectionStrategy(this);
        this.active$ = new BehaviorSubject(null);
        this.focusTarget$ = new BehaviorSubject(null);
        this.selection$ = new BehaviorSubject([]);
        this._strategyToDestroy = this.strategy;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._strategyToDestroy) {
            this._strategyToDestroy.destroy();
        }
    }
    /**
     * If the item is not currently selected then add it
     * to the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    select(...selections) {
        // add each selection to the set
        selections.forEach(selection => this._selection.add(selection));
        // propagate the changes
        this.selectionHasMutated();
    }
    /**
     * Remove an item from the list of selected items
     * @param {...?} selections
     * @return {?}
     */
    deselect(...selections) {
        // remove each item from the set
        selections.forEach(selection => this._selection.delete(selection));
        // propagate the changes
        this.selectionHasMutated();
    }
    /**
     * Toggle the selected state of any specified items
     * @param {...?} selections
     * @return {?}
     */
    toggle(...selections) {
        selections.forEach(selection => this.isSelected(selection) ? this.deselect(selection) : this.select(selection));
    }
    /**
     * Determine whether or not a specific item is currently selected
     * @param {?} data
     * @return {?}
     */
    isSelected(data) {
        return this._selection.has(data);
    }
    /**
     * Return an observable specifically for notifying the subscriber
     * only when the selection state of a specific object has changed
     * @param {?} data
     * @return {?}
     */
    selected$(data) {
        return this.selection$.pipe(map(() => this.isSelected(data)), distinctUntilChanged());
    }
    /**
     * Define how selections should be performed.
     * This allows us to use an strategy pattern to handle the various keyboard
     * and mouse interactions while keeping each mode separated and
     * easily extensible if we want to add more modes in future!
     * @param {?} mode
     * @return {?}
     */
    setMode(mode) {
        if (this._strategyToDestroy) {
            // Destroy previous strategy if it was created internally
            this._strategyToDestroy.destroy();
            this._strategyToDestroy = null;
        }
        if (mode instanceof SelectionStrategy) {
            // Custom strategy - pass in the service instance
            this.strategy = mode;
            this.strategy.setSelectionService(this);
        }
        else {
            switch (mode.toLowerCase().trim()) {
                case 'simple':
                    this.strategy = this._strategyToDestroy = new SimpleSelectionStrategy(this);
                    break;
                case 'row':
                    this.strategy = this._strategyToDestroy = new RowSelectionStrategy(this);
                    break;
                case 'row-alt':
                    this.strategy = this._strategyToDestroy = new RowAltSelectionStrategy(this);
                    break;
                default:
                    throw new Error(`The selection mode '${mode}' does not exist. Valid modes are 'simple', 'row', or 'row-alt'.`);
            }
        }
    }
    /**
     * Set the current active item
     * @param {?} data
     * @return {?}
     */
    activate(data) {
        this.active$.next(data);
    }
    /**
     * Deactive all items
     * @return {?}
     */
    deactivate() {
        this.active$.next(null);
    }
    /**
     * Return the next or previous sibling of the current active item.
     * @param {?=} previous If true, the previous sibling will be returned.
     * @return {?}
     */
    getSibling(previous = false) {
        // get the currently active item
        const /** @type {?} */ current = this.active$.getValue();
        // check if there is a current active item
        if (!current) {
            return;
        }
        // get the index of the current item
        const /** @type {?} */ idx = this.dataset.indexOf(current);
        const /** @type {?} */ target = this.dataset[previous ? idx - 1 : idx + 1];
        return target;
    }
    /**
     * Activate the sibling of the current active item.
     * If previous is set to true the previous sibling will be activated
     * rather than the next sibling. This function will also return the
     * data of the newly activated sibling
     * @param {?=} previous
     * @return {?}
     */
    activateSibling(previous = false) {
        const /** @type {?} */ target = this.getSibling(previous);
        // check if the target exists
        if (target) {
            this.activate(target);
        }
        return target;
    }
    /**
     * @param {?} disabled
     * @return {?}
     */
    setDisabled(disabled) {
        // store the current disabled state
        this.enabled = !disabled;
        // clear any stateful data
        this.active$.next(null);
        this._selection.clear();
        // emit the selection change information
        this.selectionHasMutated();
    }
    /**
     * @return {?}
     */
    selectionHasMutated() {
        this.selection$.next(Array.from(this._selection));
    }
}
SelectionService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SelectionService.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectionItemDirective {
    /**
     * @param {?} _selectionService
     * @param {?} _elementRef
     */
    constructor(_selectionService, _elementRef) {
        this._selectionService = _selectionService;
        this._elementRef = _elementRef;
        this.tabindex = null;
        this.selectedChange = new EventEmitter();
        this.active = false;
        this._selected = false;
        this._managedTabIndex = -1;
        this._subscriptions = new Subscription();
    }
    /**
     * @param {?} selected
     * @return {?}
     */
    set selected(selected) {
        selected ? this.select() : this.deselect();
    }
    /**
     * @return {?}
     */
    get selected() {
        return this._selected;
    }
    /**
     * @return {?}
     */
    get attrTabIndex() {
        return (this.tabindex !== null) ? this.tabindex : this._managedTabIndex;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // if there is no associated data then throw an error
        if (!this.uxSelectionItem) {
            throw new Error('The uxSelectionItem directive must have data associated with it.');
        }
        // subscribe to selection changes on this item
        this._subscriptions.add(this._selectionService.selected$(this.uxSelectionItem).subscribe(selected => {
            // store the selected state
            this._selected = selected;
            // emit the selected state
            this.selectedChange.emit(selected);
        }));
        // subscribe to changes to the active state
        this._subscriptions.add(this._selectionService.active$.pipe(map(active => active === this.uxSelectionItem)).subscribe(active => {
            // store the focus state
            this.active = active;
            // if it is active then focus the element
            if (active === true) {
                this._selectionService.focusTarget$.next(this.uxSelectionItem);
                this._elementRef.nativeElement.focus();
            }
        }));
        // Subscribe to changes to the focus target
        // This is mostly the same as active$, except that it has an initial value of the first item in the collection.
        this._subscriptions.add(this._selectionService.focusTarget$.subscribe(focusTarget => {
            this._managedTabIndex = (focusTarget === this.uxSelectionItem) ? 0 : -1;
        }));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    click(event) {
        if (this._selectionService.enabled && this._selectionService.clickEnabled) {
            this._selectionService.strategy.click(event, this.uxSelectionItem);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    mousedown(event) {
        if (this._selectionService.enabled && this._selectionService.clickEnabled) {
            this._selectionService.strategy.mousedown(event, this.uxSelectionItem);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keydown(event) {
        if (this._selectionService.enabled && this._selectionService.keyboardEnabled) {
            this._selectionService.strategy.keydown(event, this.uxSelectionItem);
        }
    }
    /**
     * @return {?}
     */
    focus() {
        // If tabbed to from outside the component, activate.
        if (this._selectionService.active$.getValue() !== this.uxSelectionItem) {
            this._selectionService.activate(this.uxSelectionItem);
        }
    }
    /**
     * Select this item using the current strategy
     * @return {?}
     */
    select() {
        if (this._selectionService.enabled) {
            this._selectionService.strategy.select(this.uxSelectionItem);
        }
    }
    /**
     * Deselect this item using the current strategy
     * @return {?}
     */
    deselect() {
        if (this._selectionService.enabled) {
            this._selectionService.strategy.deselect(this.uxSelectionItem);
        }
    }
}
SelectionItemDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxSelectionItem]',
                exportAs: 'ux-selection-item'
            },] }
];
/** @nocollapse */
SelectionItemDirective.ctorParameters = () => [
    { type: SelectionService },
    { type: ElementRef }
];
SelectionItemDirective.propDecorators = {
    uxSelectionItem: [{ type: Input }],
    selected: [{ type: Input }, { type: HostBinding, args: ['class.ux-selection-selected',] }],
    tabindex: [{ type: Input }],
    selectedChange: [{ type: Output }],
    active: [{ type: HostBinding, args: ['class.ux-selection-focused',] }],
    attrTabIndex: [{ type: HostBinding, args: ['attr.tabindex',] }],
    click: [{ type: HostListener, args: ['click', ['$event'],] }],
    mousedown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
    keydown: [{ type: HostListener, args: ['keydown', ['$event'],] }],
    focus: [{ type: HostListener, args: ['focus',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectionDirective {
    /**
     * @param {?} _selectionService
     * @param {?} _cdRef
     */
    constructor(_selectionService, _cdRef) {
        this._selectionService = _selectionService;
        this._cdRef = _cdRef;
        this.tabindex = null;
        this.uxSelectionChange = new EventEmitter();
        this._subscriptions = new Subscription();
        this._subscriptions.add(_selectionService.selection$.subscribe(items => this.uxSelectionChange.emit(items)));
    }
    /**
     * @param {?} items
     * @return {?}
     */
    set uxSelection(items) {
        this._selectionService.select(...items);
    }
    /**
     * @param {?} disabled
     * @return {?}
     */
    set disabled(disabled) {
        this._selectionService.setDisabled(disabled);
    }
    /**
     * @param {?} mode
     * @return {?}
     */
    set mode(mode) {
        this._selectionService.setMode(mode);
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    set clickSelection(enabled) {
        this._selectionService.clickEnabled = enabled;
    }
    /**
     * @param {?} enabled
     * @return {?}
     */
    set keyboardSelection(enabled) {
        this._selectionService.keyboardEnabled = enabled;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // provide the initial list of selection items
        this.update();
        // if the list changes then inform the service
        this._subscriptions.add(this.items.changes.subscribe(() => this.update()));
        // The above could trigger a change in the computed tabindex for selection items
        this._cdRef.detectChanges();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscriptions.unsubscribe();
    }
    /**
     * Update the dataset to reflect the latest selection items
     * @return {?}
     */
    update() {
        this._selectionService.dataset = this.items.map(item => item.uxSelectionItem);
        // Make sure that a tab target has been defined so that the component can be tabbed to.
        if (this._selectionService.focusTarget$.getValue() === null && this._selectionService.dataset.length > 0) {
            this._selectionService.focusTarget$.next(this._selectionService.dataset[0]);
        }
    }
    /**
     * Select all the items in the list
     * @return {?}
     */
    selectAll() {
        if (this._selectionService.enabled) {
            this._selectionService.strategy.selectAll();
        }
    }
    /**
     * Deselect all currently selected items
     * @return {?}
     */
    deselectAll() {
        if (this._selectionService.enabled) {
            this._selectionService.strategy.deselectAll();
        }
    }
}
SelectionDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxSelection]',
                exportAs: 'ux-selection',
                providers: [SelectionService]
            },] }
];
/** @nocollapse */
SelectionDirective.ctorParameters = () => [
    { type: SelectionService },
    { type: ChangeDetectorRef }
];
SelectionDirective.propDecorators = {
    uxSelection: [{ type: Input }],
    disabled: [{ type: Input }],
    mode: [{ type: Input }],
    clickSelection: [{ type: Input }],
    keyboardSelection: [{ type: Input }],
    tabindex: [{ type: Input }, { type: HostBinding, args: ['attr.tabindex',] }],
    uxSelectionChange: [{ type: Output }],
    items: [{ type: ContentChildren, args: [SelectionItemDirective,] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectionModule {
}
SelectionModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [SelectionDirective, SelectionItemDirective],
                exports: [SelectionDirective, SelectionItemDirective]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ContactsNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('contactGroup', elementRef, injector);
        this.overflowClick = new EventEmitter();
    }
}
ContactsNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'contact-group'
            },] }
];
/** @nocollapse */
ContactsNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
ContactsNg1Component.propDecorators = {
    contacts: [{ type: Input }],
    organization: [{ type: Input }],
    size: [{ type: Input }],
    colors: [{ type: Input }],
    maxContacts: [{ type: Input }],
    overflowClick: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ExpandInputNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('expandInput', elementRef, injector);
        this.focus = new EventEmitter();
    }
}
ExpandInputNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'expand-input'
            },] }
];
/** @nocollapse */
ExpandInputNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
ExpandInputNg1Component.propDecorators = {
    elname: [{ type: Input }],
    placeHolder: [{ type: Input }],
    className: [{ type: Input }],
    clearTextIcon: [{ type: Input }],
    closeSearch: [{ type: Input }],
    expandAlways: [{ type: Input }],
    onEnter: [{ type: Input }],
    focus: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FloatingActionButtonNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('floatingActionButton', elementRef, injector);
        this.items = [];
    }
}
FloatingActionButtonNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'floating-action-button'
            },] }
];
/** @nocollapse */
FloatingActionButtonNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
FloatingActionButtonNg1Component.propDecorators = {
    items: [{ type: Input }],
    primary: [{ type: Input }],
    direction: [{ type: Input }],
    fabTooltip: [{ type: Input }],
    fabTooltipPlacement: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FlotNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('uxFlotNg1', elementRef, injector);
        this.onPlotClick = new EventEmitter();
        this.onPlotHover = new EventEmitter();
    }
}
FlotNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'flot'
            },] }
];
/** @nocollapse */
FlotNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
FlotNg1Component.propDecorators = {
    dataset: [{ type: Input }],
    options: [{ type: Input }],
    callback: [{ type: Input }],
    donutLabels: [{ type: Input }],
    onPlotClick: [{ type: Output }],
    onPlotHover: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GridNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('grid', elementRef, injector);
        this.source = [];
        this.columns = [];
    }
}
GridNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'grid'
            },] }
];
/** @nocollapse */
GridNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
GridNg1Component.propDecorators = {
    source: [{ type: Input }],
    columns: [{ type: Input }],
    options: [{ type: Input }],
    events: [{ type: Input }],
    plugins: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HierarchyBarNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('hierarchyBar', elementRef, injector);
    }
}
HierarchyBarNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'hierarchy-bar'
            },] }
];
/** @nocollapse */
HierarchyBarNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
HierarchyBarNg1Component.propDecorators = {
    data: [{ type: Input }],
    options: [{ type: Input }],
    selectNode: [{ type: Input }],
    containerClass: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class MarqueeWizardNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('marqueeWizard', elementRef, injector);
        this.wizardStepsChange = new EventEmitter();
    }
}
MarqueeWizardNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'marquee-wizard'
            },] }
];
/** @nocollapse */
MarqueeWizardNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
MarqueeWizardNg1Component.propDecorators = {
    wizardIcon: [{ type: Input }],
    wizardSteps: [{ type: Input }],
    buttonOptions: [{ type: Input }],
    onChanging: [{ type: Input }],
    onFinished: [{ type: Input }],
    onFinishing: [{ type: Input }],
    onCanceled: [{ type: Input }],
    isVisited: [{ type: Input }],
    sideInfo: [{ type: Input }],
    wizardStepsChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NestedDonutNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('uxNestedDonutNg1', elementRef, injector);
    }
}
NestedDonutNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'nested-donut'
            },] }
];
/** @nocollapse */
NestedDonutNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
NestedDonutNg1Component.propDecorators = {
    dataset: [{ type: Input }],
    options: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class OrganizationChartNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('uxOrganizationChartNg1', elementRef, injector);
        this.dataChange = new EventEmitter();
        this.optionsChange = new EventEmitter();
    }
}
OrganizationChartNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'organization-chart'
            },] }
];
/** @nocollapse */
OrganizationChartNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
OrganizationChartNg1Component.propDecorators = {
    data: [{ type: Input }],
    options: [{ type: Input }],
    dataChange: [{ type: Output }],
    optionsChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PartitionMapNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('uxPartitionMapNg1', elementRef, injector);
    }
}
PartitionMapNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'partition-map'
            },] }
];
/** @nocollapse */
PartitionMapNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
PartitionMapNg1Component.propDecorators = {
    chartData: [{ type: Input }],
    chartOptions: [{ type: Input }],
    chartLoading: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PeityBarChartNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('uxPeityBarChartNg1', elementRef, injector);
    }
}
PeityBarChartNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'bar-chart'
            },] }
];
/** @nocollapse */
PeityBarChartNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
PeityBarChartNg1Component.propDecorators = {
    data: [{ type: Input }],
    options: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PeityLineChartNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('uxPeityLineChartNg1', elementRef, injector);
    }
}
PeityLineChartNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'line-chart'
            },] }
];
/** @nocollapse */
PeityLineChartNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
PeityLineChartNg1Component.propDecorators = {
    data: [{ type: Input }],
    options: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PeityPieChartNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('uxPeityPieChartNg1', elementRef, injector);
    }
}
PeityPieChartNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'pie-chart'
            },] }
];
/** @nocollapse */
PeityPieChartNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
PeityPieChartNg1Component.propDecorators = {
    data: [{ type: Input }],
    options: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PeityUpdatingLineChartNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('uxPeityUpdatingLineChartNg1', elementRef, injector);
    }
}
PeityUpdatingLineChartNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'updating-line-chart'
            },] }
];
/** @nocollapse */
PeityUpdatingLineChartNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
PeityUpdatingLineChartNg1Component.propDecorators = {
    data: [{ type: Input }],
    options: [{ type: Input }],
    method: [{ type: Input }],
    updateinterval: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SankeyNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('uxSankeyNg1', elementRef, injector);
    }
}
SankeyNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'sankey'
            },] }
];
/** @nocollapse */
SankeyNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
SankeyNg1Component.propDecorators = {
    chartSize: [{ type: Input }],
    chartData: [{ type: Input }],
    options: [{ type: Input }],
    click: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SearchToolbarNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('searchToolbar', elementRef, injector);
    }
}
SearchToolbarNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'search-toolbar'
            },] }
];
/** @nocollapse */
SearchToolbarNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
SearchToolbarNg1Component.propDecorators = {
    searchTypeahead: [{ type: Input }],
    placeHolder: [{ type: Input }],
    closeSearch: [{ type: Input }],
    onSearch: [{ type: Input }],
    onFocus: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectTableNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('selectTable', elementRef, injector);
        this.selectedChange = new EventEmitter();
    }
}
SelectTableNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'select-table'
            },] }
];
/** @nocollapse */
SelectTableNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
SelectTableNg1Component.propDecorators = {
    values: [{ type: Input }],
    multipleSelect: [{ type: Input }],
    selectKey: [{ type: Input }],
    selected: [{ type: Input }],
    searchText: [{ type: Input }],
    tableHeight: [{ type: Input }],
    selectHiddenItems: [{ type: Input }],
    selectedChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ SLIDER_CHART_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SliderChartNg1Component),
    multi: true
};
class SliderChartNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('sliderChart', elementRef, injector);
        this.ngModelChange = new EventEmitter();
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) { }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) { }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) { }
}
SliderChartNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'slider-chart',
                providers: [SLIDER_CHART_VALUE_ACCESSOR]
            },] }
];
/** @nocollapse */
SliderChartNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
SliderChartNg1Component.propDecorators = {
    sliderOptions: [{ type: Input }],
    ngModel: [{ type: Input }],
    chartOptions: [{ type: Input }],
    chartData: [{ type: Input }],
    ngModelChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SocialChartNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('uxSocialChartNg1', elementRef, injector);
    }
}
SocialChartNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'social-chart'
            },] }
];
/** @nocollapse */
SocialChartNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
SocialChartNg1Component.propDecorators = {
    data: [{ type: Input }],
    options: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }],
    api: [{ type: Input }],
    communities: [{ type: Input }],
    detailStyle: [{ type: Input }],
    popoverStyle: [{ type: Input }],
    nodeDetail: [{ type: Input }],
    edgeDetail: [{ type: Input }],
    nodePopover: [{ type: Input }],
    edgePopover: [{ type: Input }],
    forceAtlasDuration: [{ type: Input }],
    nodeSizeAttribute: [{ type: Input }],
    startMaximized: [{ type: Input }],
    startMaximised: [{ type: Input }],
    showMaximizeControl: [{ type: Input }],
    showMaximiseControl: [{ type: Input }],
    socialChartContainer: [{ type: Input }],
    fullscreenButtonPosition: [{ type: Input }],
    localStrings: [{ type: Input }],
    chartTitle: [{ type: Input }],
    titleDisplayTime: [{ type: Input }],
    edgeWeightInfluence: [{ type: Input }],
    minLabels: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SortDirectionToggleNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('sortDirectionToggle', elementRef, injector);
    }
}
SortDirectionToggleNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'sort-direction-toggle'
            },] }
];
/** @nocollapse */
SortDirectionToggleNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
SortDirectionToggleNg1Component.propDecorators = {
    label: [{ type: Input }],
    sorters: [{ type: Input }],
    descend: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TreeGridNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('treegrid', elementRef, injector);
        this.optionsChange = new EventEmitter();
        this.selectedChange = new EventEmitter();
        this.currentRowChange = new EventEmitter();
        this.treeDataChange = new EventEmitter();
    }
}
TreeGridNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'treegrid'
            },] }
];
/** @nocollapse */
TreeGridNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
TreeGridNg1Component.propDecorators = {
    data: [{ type: Input }],
    columns: [{ type: Input }],
    treeData: [{ type: Input }],
    selected: [{ type: Input }],
    currentRow: [{ type: Input }],
    options: [{ type: Input }],
    optionsChange: [{ type: Output }],
    selectedChange: [{ type: Output }],
    currentRowChange: [{ type: Output }],
    treeDataChange: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ThumbnailNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('thumbnail', elementRef, injector);
    }
}
ThumbnailNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'thumbnail'
            },] }
];
/** @nocollapse */
ThumbnailNg1Component.ctorParameters = () => [
    { type: ElementRef },
    { type: Injector }
];
ThumbnailNg1Component.propDecorators = {
    url: [{ type: Input }],
    show: [{ type: Input }],
    width: [{ type: Input }],
    height: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NavigationMenuService {
    /**
     * @param {?} _navigationMenuService
     */
    constructor(_navigationMenuService) {
        this._navigationMenuService = _navigationMenuService;
    }
    /**
     * @return {?}
     */
    show() {
        this._navigationMenuService.show();
    }
    /**
     * @return {?}
     */
    hide() {
        this._navigationMenuService.hide();
    }
    /**
     * @return {?}
     */
    visible() {
        return this._navigationMenuService.visible();
    }
    /**
     * @return {?}
     */
    collapseAtWidth() {
        return this._navigationMenuService.collapseAtWidth();
    }
    /**
     * @param {?} width
     * @return {?}
     */
    setCollapseAtWidth(width) {
        this._navigationMenuService.setCollapseAtWidth(width);
    }
    /**
     * @return {?}
     */
    setDefaultCollapseAtWidth() {
        this._navigationMenuService.setDefaultCollapseAtWidth();
    }
}
NavigationMenuService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NavigationMenuService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['$navigationMenu',] }] }
];
/**
 * @param {?} injector
 * @return {?}
 */
function navigationMenuServiceFactory(injector) {
    return injector.get('$navigationMenu');
}
const /** @type {?} */ navigationMenuServiceProvider = {
    provide: '$navigationMenu',
    useFactory: navigationMenuServiceFactory,
    deps: ['$injector']
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PdfService {
    /**
     * @param {?} _pdfService
     */
    constructor(_pdfService) {
        this._pdfService = _pdfService;
    }
    /**
     * @param {?} columns
     * @param {?} rows
     * @param {?=} options
     * @return {?}
     */
    createTable(columns, rows, options = {}) {
        return this._pdfService.createTable(columns, rows, options);
    }
}
PdfService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PdfService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['$pdf',] }] }
];
/**
 * @param {?} injector
 * @return {?}
 */
function pdfServiceFactory(injector) {
    return injector.get('$pdf');
}
const /** @type {?} */ pdfServiceProvider = {
    provide: '$pdf',
    useFactory: pdfServiceFactory,
    deps: ['$injector']
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TimeAgoService {
    /**
     * @param {?} _timeAgoService
     */
    constructor(_timeAgoService) {
        this._timeAgoService = _timeAgoService;
    }
    /**
     * @param {?} strings
     * @return {?}
     */
    setStrings(strings) {
        this._timeAgoService.setStrings(strings);
    }
    /**
     * @param {?} past
     * @param {?} present
     * @return {?}
     */
    timeSince(past, present) {
        return this._timeAgoService.timeSince(past, present);
    }
    /**
     * @param {?} moment
     * @return {?}
     */
    timeSinceNow(moment) {
        return this._timeAgoService.timeSinceNow(moment);
    }
}
TimeAgoService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
TimeAgoService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: ['timeAgoService',] }] }
];
/**
 * @param {?} injector
 * @return {?}
 */
function timeAgoServiceFactory(injector) {
    return injector.get('timeAgoService');
}
const /** @type {?} */ timeAgoServiceProvider = {
    provide: 'timeAgoService',
    useFactory: timeAgoServiceFactory,
    deps: ['$injector']
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const /** @type {?} */ declarations = [
    ContactsNg1Component,
    ExpandInputNg1Component,
    FloatingActionButtonNg1Component,
    FlotNg1Component,
    GridNg1Component,
    HierarchyBarNg1Component,
    MarqueeWizardNg1Component,
    NestedDonutNg1Component,
    OrganizationChartNg1Component,
    PartitionMapNg1Component,
    PeityBarChartNg1Component,
    PeityLineChartNg1Component,
    PeityPieChartNg1Component,
    PeityUpdatingLineChartNg1Component,
    SankeyNg1Component,
    SearchToolbarNg1Component,
    SelectTableNg1Component,
    SliderChartNg1Component,
    SocialChartNg1Component,
    SortDirectionToggleNg1Component,
    TreeGridNg1Component,
    ThumbnailNg1Component,
];
class HybridModule {
}
HybridModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                exports: declarations,
                declarations: declarations,
                providers: [
                    navigationMenuServiceProvider,
                    pdfServiceProvider,
                    timeAgoServiceProvider,
                    TimeAgoService,
                    PdfService,
                    NavigationMenuService,
                ],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class StringFilterPipe {
    /**
     * @param {?} items
     * @param {?} value
     * @return {?}
     */
    transform(items, value) {
        if (!items) {
            return [];
        }
        return items.filter(it => it.toLowerCase().indexOf(value.toLowerCase()) >= 0);
    }
}
StringFilterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'stringFilter'
            },] },
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class StringFilterModule {
}
StringFilterModule.decorators = [
    { type: NgModule, args: [{
                exports: [StringFilterPipe],
                declarations: [StringFilterPipe]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class CookieAdapter {
    /**
     * @param {?} key
     * @return {?}
     */
    getItem(key) {
        if (document.cookie) {
            // get all the cookies for this site
            const /** @type {?} */ cookies = document.cookie.split(';');
            // process the cookies into a from we can easily manage
            const /** @type {?} */ match = cookies
                .map(cookie => ({ key: cookie.split('=')[0].trim(), value: cookie.split('=')[1].trim() }))
                .find(cookie => cookie.key === key);
            return match ? match.value : null;
        }
        return null;
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    setItem(key, value) {
        document.cookie = `${key}=${value}; path=/`;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    removeItem(key) {
        document.cookie.split(';').forEach(cookie => {
            const /** @type {?} */ eqPos = cookie.indexOf('=');
            const /** @type {?} */ name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie;
            if (name === key) {
                document.cookie = cookie.trim().replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            }
        });
    }
    /**
     * @return {?}
     */
    clear() {
        // call remove item on each cookie
        document.cookie.split(';').map(cookie => cookie.split('=')[0].trim())
            .forEach(cookie => this.removeItem(cookie));
    }
    /**
     * @return {?}
     */
    getSupported() {
        // cookies are supported in all browsers
        return this;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class LocalStorageAdapter {
    /**
     * @param {?} key
     * @return {?}
     */
    getItem(key) {
        return localStorage.getItem(key);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    setItem(key, value) {
        localStorage.setItem(key, value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    removeItem(key) {
        localStorage.removeItem(key);
    }
    /**
     * @return {?}
     */
    clear() {
        localStorage.clear();
    }
    /**
     * @return {?}
     */
    getSupported() {
        // if local storage variable does not exist fall back to cookies
        if (!localStorage) {
            return new CookieAdapter();
        }
        // try to make a test save to local storage to see if there are any exceptions
        try {
            localStorage.setItem('ux-persistent-data-service', 'ux-persistent-data-service');
            localStorage.removeItem('ux-persistent-data-service');
            return this;
        }
        catch (/** @type {?} */ err) {
            return new CookieAdapter();
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SessionStorageAdapter {
    /**
     * @param {?} key
     * @return {?}
     */
    getItem(key) {
        return sessionStorage.getItem(key);
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    setItem(key, value) {
        sessionStorage.setItem(key, value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    removeItem(key) {
        sessionStorage.removeItem(key);
    }
    /**
     * @return {?}
     */
    clear() {
        sessionStorage.clear();
    }
    /**
     * @return {?}
     */
    getSupported() {
        // if local storage variable does not exist fall back to cookies
        if (!sessionStorage) {
            return new CookieAdapter();
        }
        // try to make a test save to local storage to see if there are any exceptions
        try {
            sessionStorage.setItem('ux-persistent-data-service', 'ux-persistent-data-service');
            sessionStorage.removeItem('ux-persistent-data-service');
            return this;
        }
        catch (/** @type {?} */ err) {
            return new CookieAdapter();
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PersistentDataService {
    /**
     * Save the item in some form of persistent storage
     * @param {?} key
     * @param {?} value
     * @param {?=} type
     * @return {?}
     */
    setItem(key, value, type = PersistentDataStorageType.LocalStorage) {
        this.getAdapter(type).setItem(key, value);
    }
    /**
     * Get a stored value from persistent storage
     * @param {?} key
     * @param {?=} type
     * @return {?}
     */
    getItem(key, type = PersistentDataStorageType.LocalStorage) {
        return this.getAdapter(type).getItem(key);
    }
    /**
     * Remove a stored value from persistent storage
     * @param {?} key
     * @param {?=} type
     * @return {?}
     */
    removeItem(key, type = PersistentDataStorageType.LocalStorage) {
        this.getAdapter(type).removeItem(key);
    }
    /**
     * Remove a stored value from persistent storage
     * @param {?=} type
     * @return {?}
     */
    clear(type = PersistentDataStorageType.LocalStorage) {
        this.getAdapter(type).clear();
    }
    /**
     * Return the appropriate adapter based on the type requested
     * @param {?} type
     * @return {?}
     */
    getAdapter(type) {
        switch (type) {
            case PersistentDataStorageType.Cookie:
                return new CookieAdapter();
            case PersistentDataStorageType.LocalStorage:
                const /** @type {?} */ localStorageAdapter = new LocalStorageAdapter();
                return localStorageAdapter.getSupported();
            case PersistentDataStorageType.SessionStorage:
                const /** @type {?} */ sessionStorageAdapter = new SessionStorageAdapter();
                return sessionStorageAdapter.getSupported();
        }
    }
}
PersistentDataService.decorators = [
    { type: Injectable }
];
/** @enum {number} */
const PersistentDataStorageType = {
    LocalStorage: 0,
    Cookie: 1,
    SessionStorage: 2,
};
PersistentDataStorageType[PersistentDataStorageType.LocalStorage] = "LocalStorage";
PersistentDataStorageType[PersistentDataStorageType.Cookie] = "Cookie";
PersistentDataStorageType[PersistentDataStorageType.SessionStorage] = "SessionStorage";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PersistentDataModule {
}
PersistentDataModule.decorators = [
    { type: NgModule, args: [{
                providers: [PersistentDataService],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
class StorageAdapter {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { BreadcrumbsComponent, BreadcrumbsModule, CardTabsModule, CardTabsService, CardTabsetComponent, CardTabComponent, CardTabContentDirective, CheckboxModule, CHECKBOX_VALUE_ACCESSOR, CheckboxComponent, ColumnSortingModule, ColumnSortingComponent, ColumnSortingDirective, ColumnSortingState, ConduitSubject, ConduitZoneComponent, ConduitZone, ConduitComponent, CONDUITS, Conduit, defaultConduitProps, DashboardModule, DashboardComponent, DashboardService, defaultOptions, ActionDirection, Rounding, DashboardDragHandleDirective, DashboardWidgetComponent, DateTimePickerModule, DateTimePickerComponent, DateTimePickerService, DatePickerMode, ModeDirection, DatePickerHeaderEvent, DateTimePickerConfig, EboxModule, EboxComponent, EboxHeaderDirective, EboxContentDirective, FacetsModule, FacetContainerComponent, FacetSelect, FacetDeselect, FacetDeselectAll, FacetHeaderComponent, FacetBaseComponent, FacetCheckListComponent, FacetTypeaheadListComponent, FacetTypeaheadHighlight, Facet, FilterModule, FilterContainerComponent, FilterAddEvent, FilterRemoveEvent, FilterRemoveAllEvent, FilterBaseComponent, FilterDropdownComponent, FilterDynamicComponent, FilterTypeaheadHighlight, FlippableCardModule, FlippableCardComponent, FlippableCardFrontDirective, FlippableCardBackDirective, FloatingActionButtonsModule, FloatingActionButtonsComponent, FloatingActionButtonComponent, HierarchyBarModule, HierarchyBarService, HierarchyBarComponent, ItemDisplayPanelModule, ItemDisplayPanelContentDirective, ItemDisplayPanelFooterDirective, ItemDisplayPanelComponent, MarqueeWizardStepComponent, MarqueeWizardComponent, MarqueeWizardModule, MediaPlayerBaseExtensionDirective, MediaPlayerControlsExtensionComponent, MediaPlayerCustomControlDirective, MediaPlayerTimelineExtensionComponent, MediaPlayerComponent, MediaPlayerModule, NavigationModule, NavigationComponent, NavigationItemComponent, NotificationModule, NotificationService, NotificationListComponent, NumberPickerModule, NUMBER_PICKER_VALUE_ACCESSOR, NumberPickerComponent, PageHeaderModule, PageHeaderComponent, PageHeaderNavigationComponent, PageHeaderIconMenuComponent, PageHeaderCustomMenuDirective, PopoverModule, PopoverComponent, PopoverDirective, ProgressBarModule, ProgressBarComponent, RadioButtonModule, RADIOBUTTON_VALUE_ACCESSOR, RadioButtonComponent, SearchBuilderGroupComponent, SearchBuilderGroupService, SearchBuilderOutletDirective, BaseSearchComponent, SearchTextComponent, SearchDateComponent, SearchDateRangeComponent, SearchSelectComponent, SearchBuilderComponent, SearchBuilderService, SearchBuilderModule, SELECT_VALUE_ACCESSOR, SelectComponent, SelectModule, SidePanelComponent, SidePanelCloseDirective, SidePanelModule, SliderModule, SliderComponent, SliderType, SliderStyle, SliderSize, SliderCalloutTrigger, SliderSnap, SliderTickType, SliderThumbEvent, SliderThumb, SparkModule, SparkComponent, SpinButtonModule, SPIN_BUTTON_VALUE_ACCESSOR, SpinButtonComponent, TabsetModule, TabsetComponent, TabsetService, TabComponent, TabHeadingDirective, TabFocusDirective, TagInputEvent, TagInputComponent, TagInputModule, TimePickerModule, TIME_PICKER_VALUE_ACCESSOR, TimePickerComponent, TimeFormatPipe, TimelineModule, TimelineComponent, TimelineEventComponent, ToggleSwitchModule, ToggleSwitchComponent, ToolbarSearchModule, ToolbarSearchComponent, ToolbarSearchFieldDirective, ToolbarSearchButtonDirective, TooltipModule, TooltipComponent, TooltipDirective$1 as TooltipDirective, TooltipService, TypeaheadOptionEvent, TypeaheadKeyService, TypeaheadComponent, TypeaheadModule, VirtualScrollModule, VirtualScrollComponent, VirtualScrollLoadingDirective, VirtualScrollLoadButtonDirective, VirtualScrollCellDirective, WizardModule, WizardComponent, StepChangingEvent, WizardStepComponent, AccessibilityModule, FocusWithinDirective, TabbableListItemDirective, TabbableListDirective, TabbableListService, AutoGrowModule, AutoGrowDirective, ClickOutsideModule, ClickOutsideDirective, DragModule, DragDirective, FixedHeaderTableModule, FixedHeaderTableDirective, FloatLabelDirective, FloatLabelModule, FocusIfDirective, FocusIfModule, HelpCenterModule, HelpCenterService, HelpCenterItemDirective, HoverActionModule, HoverActionContainerDirective, HoverActionDirective, InfiniteScrollDirective, InfiniteScrollLoadingEvent, InfiniteScrollLoadedEvent, InfiniteScrollLoadErrorEvent, InfiniteScrollLoadButtonDirective, InfiniteScrollLoadingDirective, InfiniteScrollModule, LayoutSwitcherModule, LayoutSwitcherDirective, LayoutSwitcherItemDirective, MenuNavigationItemDirective, MenuNavigationDirective, MenuNavigationModule, ObserversModule$1 as ObserversModule, OverflowDirective, ReorderableModule, ReorderableDirective, ReorderableHandleDirective, ReorderableModelDirective, ReorderableService, ReorderableGroup, ResizeService, ResizeDirective, ResizeModule, ScrollModule as ScrollIntoViewIfModule, ScrollIntoViewIfDirective, ScrollIntoViewDirective, ScrollIntoViewService, ScrollModule, SelectionItemDirective, SelectionDirective, SelectionModule, SelectionService, SelectionStrategy, ContactsNg1Component, ExpandInputNg1Component, FloatingActionButtonNg1Component, FlotNg1Component, GridNg1Component, HierarchyBarNg1Component, MarqueeWizardNg1Component, NestedDonutNg1Component, OrganizationChartNg1Component, PartitionMapNg1Component, PeityBarChartNg1Component, PeityLineChartNg1Component, PeityPieChartNg1Component, PeityUpdatingLineChartNg1Component, SankeyNg1Component, SearchToolbarNg1Component, SelectTableNg1Component, SLIDER_CHART_VALUE_ACCESSOR, SliderChartNg1Component, SocialChartNg1Component, SortDirectionToggleNg1Component, TreeGridNg1Component, ThumbnailNg1Component, NavigationMenuService, navigationMenuServiceFactory, navigationMenuServiceProvider, PdfService, pdfServiceFactory, pdfServiceProvider, TimeAgoService, timeAgoServiceFactory, timeAgoServiceProvider, HybridModule, DurationPipeModule, DurationPipe, FileSizePipeModule, FileSizePipe, StringFilterPipe, StringFilterModule, AudioServiceModule, AudioService, ColorServiceModule, ColorService, ThemeColor, colorSets, FrameExtractionModule, FrameExtractionService, PersistentDataModule, PersistentDataService, PersistentDataStorageType, StorageAdapter, CookieAdapter, LocalStorageAdapter, SessionStorageAdapter, DayViewComponent as ɵd, DayViewService as ɵe, HeaderComponent as ɵc, MonthViewComponent as ɵf, MonthViewService as ɵg, TimeViewComponent as ɵj, YearViewComponent as ɵh, YearViewService as ɵi, FacetCheckListItemComponent as ɵm, FacetTypeaheadListItemComponent as ɵn, FloatingActionButtonsService as ɵq, MarqueeWizardService as ɵs, MediaPlayerService as ɵt, PageHeaderNavigationDropdownItemComponent as ɵw, PageHeaderNavigationItemComponent as ɵv, PageHeaderNavigationSecondaryItemDirective as ɵx, PageHeaderService as ɵu, SidePanelService as ɵr, TypeaheadHighlightDirective as ɵl, TypeaheadService as ɵk, HoverActionService as ɵy, MenuNavigationToggleDirective as ɵp, MenuNavigationService as ɵo };
