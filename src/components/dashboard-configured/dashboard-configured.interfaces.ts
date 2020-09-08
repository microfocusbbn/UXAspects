import { TemplateRef } from '@angular/core';
import { PredefinedWidgetConfig } from '../dashboard-widgets/interfaces/predefined-widget.interface';
import { ActionsWidgetConfig } from '../dashboard-widgets/interfaces/actions-widget.interface';
import { EnumWidgetConfig } from '../dashboard-widgets/interfaces/enum-widget.interface';
import { TableWidgetConfig } from '../dashboard-widgets/interfaces/table-widget.interface';
import { TextWidgetConfig } from '../dashboard-widgets/interfaces/text-widget.interface';

export interface DashboardConfiguredConfig extends PredefinedWidgetConfig {
    type: string;
    data?: ActionsWidgetConfig | EnumWidgetConfig | TableWidgetConfig | TextWidgetConfig;
    template?: TemplateRef<any>;
}
