import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DashboardConfiguredConfig } from './dashboard-configured.interfaces';
import { DashboardOptions, defaultOptions } from '../dashboard';

@Component({
    selector: 'ux-dashboard-configured',
    templateUrl: './dashboard-configured.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardConfiguredComponent {
    @Input() configs: DashboardConfiguredConfig[] = [];
    @Input() options: DashboardOptions = defaultOptions;
}
