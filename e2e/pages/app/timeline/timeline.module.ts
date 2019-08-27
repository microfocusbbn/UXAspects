import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconModule, TimelineModule } from '@ux-aspects/ux-aspects';
import { TimelineTestPageComponent } from './timeline.testpage.component';


@NgModule({
    imports: [
        TimelineModule,
        CommonModule,
        FormsModule,
        IconModule,
        RouterModule.forChild([
            {
                path: '',
                component: TimelineTestPageComponent
            }
        ])
    ],
    declarations: [TimelineTestPageComponent]
})
export class TimelineTestPageModule { }
