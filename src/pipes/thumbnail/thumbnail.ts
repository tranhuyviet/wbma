import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Media } from '../../interfaces/media';

@Pipe({
  name: 'thumbnail',
  // pure: false,
})
export class ThumbnailPipe implements PipeTransform {

  // private thumbnail = '';
  // private catchId;

  constructor(private mediaProvider: MediaProvider) {

  }

  async transform(id: number, ...args) {
    console.log(args);
    /* if (this.catchId !== id) {
      this.catchId = id;
      this.mediaProvider.getSingleMedia(id).subscribe((response: Media) => {
        switch (args[0]) {
          case 'large':
            this.thumbnail = response.thumbnails.w640;
            break;
          case 'medium':
            this.thumbnail = response.thumbnails.w320;
            break;
          case 'screenshot':
            this.thumbnail = response.screenshot;
            break;
          default:
            this.thumbnail = response.thumbnails.w160;
            break;
        }
      });
    }
    return this.thumbnail; */

    // pure version:
    return new Promise ((resolve, reject) => {
      this.mediaProvider.getSingleMedia(id).subscribe((response: Media) => {
        switch (args[0]) {
          case 'large':
            resolve(response.thumbnails.w640);
            break;
          case 'medium':
            resolve(response.thumbnails.w320);
            break;
          case 'screenshot':
            resolve(response.screenshot);
            break;
          default:
            resolve(response.thumbnails.w160);
            break;
        }
      });
    });
  }
}
