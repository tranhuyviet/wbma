import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PhotoViewer } from '@ionic-native/photo-viewer';

import { Pic } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';
import { MediaProvider } from '../../providers/media/media';
import { Observable } from 'rxjs/Observable';
import { Media } from '../../interfaces/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  picArray: Observable<Pic[]>;
  // media: Observable<Media>;
  url = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(
    public navCtrl: NavController,
    private photoViewer: PhotoViewer,
    public http: HttpClient,
    public mediaProvider: MediaProvider
  ) {}

  ngOnInit() {
    this.getPic();
  }

  getPic() {
    this.picArray = this.mediaProvider.getAllMedia();
    /* this.mediaProvider.getAllMedia().subscribe((data: Pic[]) => {

      data.forEach((pic: Pic) => {
        // add files to picArray
        this.mediaProvider.getSingleMedia(pic.file_id).subscribe((file: Pic) => {
          // console.log(file);
          this.picArray.push(file);
        });
      });
      console.log(this.picArray);
    }); */
  }

  viewOriginalImage(linkImage: string) {
    this.photoViewer.show(this.url + linkImage);
  }
}
