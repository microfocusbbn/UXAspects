import { Component } from '@angular/core';
import { BaseDocumentationSection } from '../../../../../components/base-documentation-section/base-documentation-section';
import { DocumentationSectionComponent } from '../../../../../decorators/documentation-section-component';
import { IPlayground } from '../../../../../interfaces/IPlayground';
import { IPlaygroundProvider } from '../../../../../interfaces/IPlaygroundProvider';
0

@Component({
    selector: 'uxd-components-media-player',
    templateUrl: './media-player.component.html',
    styleUrls: ['./media-player.component.less']
})
@DocumentationSectionComponent('ComponentsMediaPlayerComponent')
export class ComponentsMediaPlayerComponent extends BaseDocumentationSection implements IPlaygroundProvider {

    type: string = 'video';
    mode: string = 'standard';
    displayName: string = '';

    videoSource: string = require('../../../../../assets/media/catchingwave.mp4');
    audioSource: string = require('../../../../../assets/media/tune.mp3');
    subtitles: string = require('!!file-loader!../../../../../assets/media/subtitles.vtt');

    selectFile(event: any) {
        const target = event.currentTarget;
        const file = target.files[0];

        if (target.files && file) {
            const reader = new FileReader();
            reader.onload = (event: any) => {

                console.log('event:', event.target.result)

                this.audioSource = event.target.result;
            }
            reader.readAsDataURL(file);
        }
    }

    playground: IPlayground = {
        files: {
            'app.component.ts': this.snippets.raw.appTs,
            'app.component.html': this.snippets.raw.appHtml,
            'app.component.css': this.snippets.raw.appCss
        },
        modules: [{
            imports: ['RadioButtonModule', 'MediaPlayerModule', 'AccordionModule', 'SelectModule', 'FormsModule', 'ReactiveFormsModule'],
            library: '@ux-aspects/ux-aspects'
        }]
    };

    constructor() {
        super(require.context('./snippets/', false, /\.(html|css|js|ts)$/));
    }

}
