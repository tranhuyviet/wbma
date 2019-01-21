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

      data.forEach((pic: Pic) => {
        // add files to picArray
        this.mediaProvider.getSingleMedia(pic.file_id).subscribe((file: Pic) => {
          // console.log(file);
          this.picArray.push(file);
        });
      });
    });
  }

  viewOriginalImage(linkImage: string) {
    this.photoViewer.show(this.url + linkImage);
  }
}
