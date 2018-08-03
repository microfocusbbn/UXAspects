/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operators';
import { PageHeaderService } from '../../page-header.service';
export class PageHeaderNavigationDropdownItemComponent {
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
function PageHeaderNavigationDropdownItemComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    PageHeaderNavigationDropdownItemComponent.prototype.item;
    /** @type {?} */
    PageHeaderNavigationDropdownItemComponent.prototype.button;
    /** @type {?} */
    PageHeaderNavigationDropdownItemComponent.prototype.dropdownOpen;
    /** @type {?} */
    PageHeaderNavigationDropdownItemComponent.prototype._subscription;
    /** @type {?} */
    PageHeaderNavigationDropdownItemComponent.prototype._hover$;
    /** @type {?} */
    PageHeaderNavigationDropdownItemComponent.prototype._pageHeaderService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3BhZ2UtaGVhZGVyL25hdmlnYXRpb24vbmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtL25hdmlnYXRpb24tZHJvcGRvd24taXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV2QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFROUQsTUFBTTs7OztJQVlGLFlBQW9CLGtCQUFxQztRQUFyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1COzRCQUxqQyxLQUFLO3VCQUdPLElBQUksT0FBTyxFQUFXOztRQUt0RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLENBQUM7O1FBRzFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUNsQixrQkFBa0IsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtZQUN4QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztTQUM3QixDQUFDLENBQ0wsQ0FBQztLQUNMOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7O0lBRUQsTUFBTSxDQUFDLElBQXNDOztRQUd6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUM7U0FDVjs7UUFHRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3hDOzs7O0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ3JDOzs7O0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzNCOzs7O0lBRUQsVUFBVTtRQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzVCOzs7O0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0tBQzdCOzs7Ozs7SUFFRCxjQUFjLENBQUMsS0FBb0IsRUFBRSxJQUFzQztRQUV2RSxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQixLQUFLLE9BQU8sQ0FBQztZQUNiLEtBQUssR0FBRztnQkFDSixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDeEIsS0FBSyxDQUFDO1NBQ2I7S0FDSjs7O1lBdkVKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsb0RBQW9EO2dCQUM5RCxRQUFRLEVBQUUsb0RBQW9EO2dCQUM5RCxxeEVBQXdEO2FBQzNEOzs7O1lBUFEsaUJBQWlCOzs7bUJBVXJCLEtBQUs7cUJBRUwsU0FBUyxTQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3BhZ2UtaGVhZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW0gfSBmcm9tICcuLi9uYXZpZ2F0aW9uLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uLWRyb3Bkb3duLWl0ZW0nLFxuICAgIGV4cG9ydEFzOiAndXgtcGFnZS1oZWFkZXItaG9yaXpvbnRhbC1uYXZpZ2F0aW9uLWRyb3Bkb3duLWl0ZW0nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9uYXZpZ2F0aW9uLWRyb3Bkb3duLWl0ZW0uY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtO1xuXG4gICAgQFZpZXdDaGlsZCgnYnV0dG9uJylcbiAgICBidXR0b246IEVsZW1lbnRSZWY7XG5cbiAgICBkcm9wZG93bk9wZW46IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgX2hvdmVyJDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlSGVhZGVyU2VydmljZTogUGFnZUhlYWRlclNlcnZpY2UpIHtcblxuICAgICAgICAvLyBzdWJzY3JpYmUgdG8gc3RyZWFtIHdpdGggYSBkZWJvdW5jZSAoYSBzbWFsbCBkZWJvdW5jZSBpcyBhbGwgdGhhdCBpcyByZXF1aXJlZClcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5faG92ZXIkLnBpcGUoZGVib3VuY2VUaW1lKDEpKS5zdWJzY3JpYmUodmlzaWJsZSA9PiB0aGlzLmRyb3Bkb3duT3BlbiA9IHZpc2libGUpO1xuXG4gICAgICAgIC8vIENsb3NlIHN1Ym1lbnVzIHdoZW4gc2VsZWN0ZWQgaXRlbSBjaGFuZ2VzXG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoXG4gICAgICAgICAgICBfcGFnZUhlYWRlclNlcnZpY2Uuc2VsZWN0ZWQkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wZG93bk9wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIHNlbGVjdChpdGVtOiBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbSkge1xuXG4gICAgICAgIC8vIGNsaWNraW5nIG9uIGFuIGl0ZW0gd2l0aCBjaGlsZHJlbiB0aGVuIHJldHVyblxuICAgICAgICBpZiAoaXRlbS5jaGlsZHJlbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZW1pdCB0aGUgc2VsZWN0ZWQgaXRlbSBpbiBhbiBldmVudFxuICAgICAgICB0aGlzLl9wYWdlSGVhZGVyU2VydmljZS5zZWxlY3QoaXRlbSk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYnV0dG9uLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICBob3ZlclN0YXJ0KCkge1xuICAgICAgICB0aGlzLl9ob3ZlciQubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICBob3ZlckxlYXZlKCkge1xuICAgICAgICB0aGlzLl9ob3ZlciQubmV4dChmYWxzZSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHRoaXMuZHJvcGRvd25PcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAga2V5ZG93bkhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGl0ZW06IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtKTogdm9pZCB7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcbiAgICAgICAgICAgIGNhc2UgJyAnOlxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0KGl0ZW0pO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59Il19