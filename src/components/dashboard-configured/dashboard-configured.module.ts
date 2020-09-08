import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardModule } from '../dashboard';
import { DashboardConfiguredComponent } from './dashboard-configured.component';
import { DashboardPredefinedWidgetsModule } from '../dashboard-widgets/index';

const DECLARATIONS = [
    DashboardConfiguredComponent
];

@NgModule({
    imports: [
        A11yModule,
        CommonModule,
        DashboardModule,
        DashboardPredefinedWidgetsModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS,
})
export class DashboardConfiguredModule { }
