import { FocusOrigin } from '@angular/cdk/a11y';
import { Injectable } from '@angular/core';

/**
 * This cannot be providedIn: 'root' due to a backward compatibility issue.
 * We can eventually remove it from the module and make the `_origin` field a class member rather than a
 * static member.
 */

@Injectable()
export class FocusIndicatorOriginService {

    /** Store the most recent origin event */
    private _origin: FocusOrigin;

    /** Store the event source origin */
    setOrigin(origin: FocusOrigin): void {
        this._origin = origin;
    }

    /** Get the most recent event origin */
    getOrigin(): FocusOrigin | null {

        // get the most recent origin if there is one
        const origin = this._origin;

        // we should clear the origin so this value doesn't cause issues with future focus events
        this._origin = null;

        return origin;
    }

}
