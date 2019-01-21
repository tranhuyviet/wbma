import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PhotoViewer } from '@ionic-native/photo-viewer';

import { Pic } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';
import { MediaProvider } from '../../providers/media/media';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  picArray: Pic[] = [];
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
    this.mediaProvider.getAllMedia().subscribe((data: Pic[]) => {
      console.log('data', data);
      this.picArray = data.map((pic: Pic) => {
        pic.thumbnails = this.url + pic.filename.substring(0, pic.filename.lastIndexOf('.')) + '-tn160.png';
        console.log('pic after', pic);
        return pic;
      });
    });
  }

  viewOriginalImage(linkImage: string) {
    this.photoViewer.show(linkImage);
  }
}
