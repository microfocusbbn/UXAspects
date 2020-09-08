import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DashboardOptions } from '@ux-aspects/ux-aspects';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
import { DashboardConfiguredConfig } from '../../../../../../../src/components/dashboard-configured/dashboard-configured.interfaces';

@Component({
    selector: 'uxd-components-dashboard-preconfigured',
    templateUrl: './dashboard-configured.component.html',
    styleUrls: ['./dashboard-configured.component.less']
})
@DocumentationSectionComponent('ComponentsDashboardConfiguredComponent')
export class ComponentsDashboardConfiguredComponent extends BaseDocumentationSection implements IPlaygroundProvider, AfterViewInit {

    options: DashboardOptions = {
        columns: 4,
        padding: 10,
        rowHeight: 220,
        emptyRow: false,
        minWidth: 187
    };

    playground: IPlayground = {
        files: {
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [{
            imports: ['DashboardModule', 'ColorServiceModule', 'SparkModule'],
            library: '@ux-aspects/ux-aspects'
        }, {
            library: 'chance'
        },
            {
                library: 'chart.js'
            },
            {
                imports: ['ChartsModule'],
                library: 'ng2-charts'
            }]
    };

    configs: DashboardConfiguredConfig[] = [];

    @ViewChild('customWidget') customWidget: TemplateRef<any>;

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

    ngAfterViewInit() {
        this.configs.push(
            {
                type: 'actions',
                id: 'widget-actions',
                name: 'Actions Widget',
                heading: 'Actions Widget',
                colSpan: 1,
                rowSpan: 1,
                fixedMode: false,
                data: {
                    status: { label: 'Waiting...', icon: 'radial' },
                    actions: [
                        { label: 'Accept', action: () => alert('accept'), buttonClasses: 'btn' },
                        { label: 'Decline', icon: 'close', action: () => alert('decline'), buttonClasses: ['btn', 'custom-class'] }
                    ]
                }
            },
            {
                type: 'custom',
                id: 'widget-custom',
                name: 'Custom Widget',
                heading: 'Custom Widget',
                colSpan: 1,
                rowSpan: 1,
                fixedMode: false,
                template: this.customWidget
            }
        )
    }
}
