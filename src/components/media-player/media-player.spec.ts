import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudioService } from '../../services/audio/audio.service';
import { MediaPlayerModule } from './media-player.module';
import { MediaPlayerService } from './media-player.service';


// @Component({
//     selector: 'app-media-player-video',
//     template: `<ux-media-player *ngIf="type === 'video'" class="media-player" type="video"
//                 [source]="videoSource" [quietMode]="mode === 'quiet'" crossorigin="anonymous">
//                 <track label="English" lang="en" default [src]="subtitles">
//             </ux-media-player>
//     `
// })

// export class MediaPlayerTestComponentVideo {

//     type: string = 'video';
//     mode: string = 'standard';
//     displayName: string = '';

//     videoSource: string = require('../../../docs/app/assets/media/catchingwave.mp4');
//     audioSource: string = require('../../../docs/app/assets/media/Ocean-Waves.mp3');
//     subtitles: string = require('!!file-loader!../../../docs/app/assets/media/subtitles.vtt');

//     constructor() { }

//     selectFile(event: any) {
//         const target = event.currentTarget;
//         const file = target.files[0];

//         if (target.files && file) {
//             const reader = new FileReader();
//             reader.onload = (event: any) => {

//                 console.log('event:', event.target.result);

//                 this.audioSource = event.target.result;
//             }
//             reader.readAsDataURL(file);
//         }
//     }
// }

// fdescribe('Media Player Component - Video', () => {

//     let component: MediaPlayerTestComponentVideo;
//     let fixture: ComponentFixture<MediaPlayerTestComponentVideo>;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [MediaPlayerModule],
//             declarations: [MediaPlayerTestComponentVideo]
//         }).compileComponents();

//         fixture = TestBed.createComponent(MediaPlayerTestComponentVideo);
//         component = fixture.componentInstance;
//     });

//     afterEach(() => fixture.nativeElement.remove());

//     it('should create the component', () => {
//         expect(component).toBeTruthy();
//     });

// });


@Component({
    selector: 'app-media-player-audio',
    template: `<ux-media-player class="media-player"
                                type="audio"
                                [displayName]="displayName"
                                [source]="audioSource">
                </ux-media-player>
    `
})

export class MediaPlayerTestComponentAudio {

    getDisplayname(): void { }

    type: string = 'audio';
    mode: string = 'standard';
    displayName: string = 'Example display name';
    disabled: boolean = false;

    audioSource: string = require('../../../docs/app/assets/media/Ocean-Waves.mp3');

    constructor() { }
}

fdescribe('Media Player Component - Audio', () => {

    let component: MediaPlayerTestComponentAudio;
    let fixture: ComponentFixture<MediaPlayerTestComponentAudio>;
    let nativeElement: HTMLElement;
    let de: DebugElement;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [MediaPlayerModule],
            declarations: [MediaPlayerTestComponentAudio],
            providers: [MediaPlayerService, AudioService],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MediaPlayerTestComponentAudio);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
    });

    it('should create the component', async () => {
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component).toBeTruthy();
    });

    it('should show display name if when input is present', () => {
        expect(component).toBeTruthy();
        // fixture.detectChanges();
        expect(getDisplayname().innerHTML).toMatch('Example display name');
        // fixture.detectChanges();
        // component.value = [component.options[0]];
    });

    function getDisplayname(): HTMLElement | null {
        return nativeElement.querySelector('.audio-display-name');
    }

});


// @Component({
//     selector: 'app-media-player-audio',
//     template: `<ux-media-player *ngIf="type === 'audio'" class="media-player" type="audio"
//     [source]="audioSource"></ux-media-player>
//     `
// })

// export class MediaPlayerTestComponentWithFileUpload {

//     type: string = 'audio';
//     mode: string = 'standard';
//     displayName: string = '';

//     audioSource: string = require('../../../docs/app/assets/media/Ocean-Waves.mp3');

//     constructor() { }

//     selectFile(event: any) {
//         const target = event.currentTarget;
//         const file = target.files[0];

//         if (target.files && file) {
//             const reader = new FileReader();
//             reader.onload = (event: any) => {

//                 console.log('event:', event.target.result);

//                 this.audioSource = event.target.result;
//             }
//             reader.readAsDataURL(file);
//         }
//     }
// }

// fdescribe('Media Player Component - With file upload', () => {

//     let component: MediaPlayerTestComponentWithFileUpload;
//     let fixture: ComponentFixture<MediaPlayerTestComponentWithFileUpload>;

//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [MediaPlayerModule],
//             declarations: [MediaPlayerTestComponentWithFileUpload]
//         }).compileComponents();

//         fixture = TestBed.createComponent(MediaPlayerTestComponentWithFileUpload);
//         component = fixture.componentInstance;
//     });

//     afterEach(() => fixture.nativeElement.remove());

//     it('should create the component', () => {
//         // expect(component).toBeTruthy();
//     });

//     it('should expect no filename when Base64 audio is uploaded', async () => {
//         // expect(component).toBeTruthy();
//     });

//     it('should expect a filename when normal audio is uploaded', async () => {

//     });

//     it('should expect filename to be replaced with DisplayName when input is present', async () => {

//     })

// });