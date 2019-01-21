import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PhotoViewer } from '@ionic-native/photo-viewer';

import { Pic } from '../../interfaces/pic';
import { HttpClient } from '@angular/common/http';

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
    public http: HttpClient
  ) {}

  ngOnInit() {
    this.getPic();
  }

  getPic() {
    this.http.get<Pic[]>('http://media.mw.metropolia.fi/wbma/media').subscribe((result: Pic[]) => {
      this.picArray = result.map(dt => {
        // console.log(dt);
        return{
          title: dt.title,
          description: dt.description,
          filename: this.url + dt.filename,
          thumbnails: this.url + dt.filename.substring(0, dt.filename.lastIndexOf('.')) + '-tn160.png'
        };
      });
      console.log(this.picArray);
    });
  }

  viewOriginalImage(linkImage: string) {
    this.photoViewer.show(linkImage);
  }
}
