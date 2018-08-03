/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export class MarqueeWizardNg1Component extends UpgradeComponent {
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
function MarqueeWizardNg1Component_tsickle_Closure_declarations() {
    /** @type {?} */
    MarqueeWizardNg1Component.prototype.wizardIcon;
    /** @type {?} */
    MarqueeWizardNg1Component.prototype.wizardSteps;
    /** @type {?} */
    MarqueeWizardNg1Component.prototype.buttonOptions;
    /** @type {?} */
    MarqueeWizardNg1Component.prototype.onChanging;
    /** @type {?} */
    MarqueeWizardNg1Component.prototype.onFinished;
    /** @type {?} */
    MarqueeWizardNg1Component.prototype.onFinishing;
    /** @type {?} */
    MarqueeWizardNg1Component.prototype.onCanceled;
    /** @type {?} */
    MarqueeWizardNg1Component.prototype.isVisited;
    /** @type {?} */
    MarqueeWizardNg1Component.prototype.sideInfo;
    /** @type {?} */
    MarqueeWizardNg1Component.prototype.wizardStepsChange;
}
/**
 * @record
 */
export function MarqueeWizardStep() { }
function MarqueeWizardStep_tsickle_Closure_declarations() {
    /** @type {?} */
    MarqueeWizardStep.prototype.title;
    /** @type {?|undefined} */
    MarqueeWizardStep.prototype.html;
    /** @type {?|undefined} */
    MarqueeWizardStep.prototype.header;
    /** @type {?|undefined} */
    MarqueeWizardStep.prototype.templateUrl;
    /** @type {?|undefined} */
    MarqueeWizardStep.prototype.hidden;
    /** @type {?|undefined} */
    MarqueeWizardStep.prototype.error;
    /** @type {?|undefined} */
    MarqueeWizardStep.prototype.completed;
    /** @type {?|undefined} */
    MarqueeWizardStep.prototype.visited;
}
/**
 * @record
 */
export function MarqueeWizardOptions() { }
function MarqueeWizardOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    MarqueeWizardOptions.prototype.nextText;
    /** @type {?|undefined} */
    MarqueeWizardOptions.prototype.previousText;
    /** @type {?|undefined} */
    MarqueeWizardOptions.prototype.finishText;
    /** @type {?|undefined} */
    MarqueeWizardOptions.prototype.showNext;
    /** @type {?|undefined} */
    MarqueeWizardOptions.prototype.showPrevious;
    /** @type {?|undefined} */
    MarqueeWizardOptions.prototype.showFinish;
    /** @type {?|undefined} */
    MarqueeWizardOptions.prototype.nextTooltip;
    /** @type {?|undefined} */
    MarqueeWizardOptions.prototype.previousTooltip;
    /** @type {?|undefined} */
    MarqueeWizardOptions.prototype.finishTooltip;
    /** @type {?|undefined} */
    MarqueeWizardOptions.prototype.previousEnabled;
    /** @type {?|undefined} */
    MarqueeWizardOptions.prototype.nextEnabled;
    /** @type {?|undefined} */
    MarqueeWizardOptions.prototype.finishEnabled;
}
/**
 * @record
 */
export function MarqueeWizardSideInfo() { }
function MarqueeWizardSideInfo_tsickle_Closure_declarations() {
    /** @type {?} */
    MarqueeWizardSideInfo.prototype.title;
    /** @type {?} */
    MarqueeWizardSideInfo.prototype.description;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFycXVlZS13aXphcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImh5YnJpZC9jb21wb25lbnRzL21hcnF1ZWUtd2l6YXJkL21hcnF1ZWUtd2l6YXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBSzNELE1BQU0sZ0NBQWlDLFNBQVEsZ0JBQWdCOzs7OztJQWMzRCxZQUFZLFVBQXNCLEVBQUUsUUFBa0I7UUFDbEQsS0FBSyxDQUFDLGVBQWUsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7aUNBSGdCLElBQUksWUFBWSxFQUF1QjtLQUl2Rzs7O1lBbkJKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZ0JBQWdCO2FBQzdCOzs7O1lBTG1CLFVBQVU7WUFBRSxRQUFROzs7eUJBUW5DLEtBQUs7MEJBQ0wsS0FBSzs0QkFDTCxLQUFLO3lCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLO3lCQUNMLEtBQUs7d0JBQ0wsS0FBSzt1QkFDTCxLQUFLO2dDQUVMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdG9yLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVwZ3JhZGVDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci91cGdyYWRlL3N0YXRpYyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnbWFycXVlZS13aXphcmQnXG59KVxuZXhwb3J0IGNsYXNzIE1hcnF1ZWVXaXphcmROZzFDb21wb25lbnQgZXh0ZW5kcyBVcGdyYWRlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIHdpemFyZEljb246IHN0cmluZztcbiAgICBASW5wdXQoKSB3aXphcmRTdGVwczogTWFycXVlZVdpemFyZFN0ZXBbXTtcbiAgICBASW5wdXQoKSBidXR0b25PcHRpb25zOiBNYXJxdWVlV2l6YXJkT3B0aW9ucztcbiAgICBASW5wdXQoKSBvbkNoYW5naW5nOiBGdW5jdGlvbjtcbiAgICBASW5wdXQoKSBvbkZpbmlzaGVkOiBGdW5jdGlvbjtcbiAgICBASW5wdXQoKSBvbkZpbmlzaGluZzogRnVuY3Rpb247XG4gICAgQElucHV0KCkgb25DYW5jZWxlZDogRnVuY3Rpb247XG4gICAgQElucHV0KCkgaXNWaXNpdGVkOiBib29sZWFuO1xuICAgIEBJbnB1dCgpIHNpZGVJbmZvOiBNYXJxdWVlV2l6YXJkU2lkZUluZm87XG5cbiAgICBAT3V0cHV0KCkgd2l6YXJkU3RlcHNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxNYXJxdWVlV2l6YXJkU3RlcFtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWFycXVlZVdpemFyZFN0ZXBbXT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIGluamVjdG9yOiBJbmplY3Rvcikge1xuICAgICAgICBzdXBlcignbWFycXVlZVdpemFyZCcsIGVsZW1lbnRSZWYsIGluamVjdG9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFycXVlZVdpemFyZFN0ZXAge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgaHRtbD86IHN0cmluZztcbiAgICBoZWFkZXI/OiBzdHJpbmc7XG4gICAgdGVtcGxhdGVVcmw/OiBzdHJpbmc7XG4gICAgaGlkZGVuPzogYm9vbGVhbjtcbiAgICBlcnJvcj86IGJvb2xlYW47XG4gICAgY29tcGxldGVkPzogYm9vbGVhbjtcbiAgICB2aXNpdGVkPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXJxdWVlV2l6YXJkT3B0aW9ucyB7XG4gICAgbmV4dFRleHQ/OiBzdHJpbmc7XG4gICAgcHJldmlvdXNUZXh0Pzogc3RyaW5nO1xuICAgIGZpbmlzaFRleHQ/OiBzdHJpbmc7XG4gICAgc2hvd05leHQ/OiBib29sZWFuO1xuICAgIHNob3dQcmV2aW91cz86IGJvb2xlYW47XG4gICAgc2hvd0ZpbmlzaD86IGJvb2xlYW47XG4gICAgbmV4dFRvb2x0aXA/OiBzdHJpbmc7XG4gICAgcHJldmlvdXNUb29sdGlwPzogc3RyaW5nO1xuICAgIGZpbmlzaFRvb2x0aXA/OiBzdHJpbmc7XG4gICAgcHJldmlvdXNFbmFibGVkPzogYm9vbGVhbjtcbiAgICBuZXh0RW5hYmxlZD86IGJvb2xlYW47XG4gICAgZmluaXNoRW5hYmxlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFycXVlZVdpemFyZFNpZGVJbmZvIHtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG59Il19