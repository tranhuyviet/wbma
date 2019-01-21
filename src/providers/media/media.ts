import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Pic } from '../../interfaces/pic';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {



  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getAllMedia() {
    return this.http.get<Pic[]>('http://media.mw.metropolia.fi/wbma/media');
  }

  getSingleMedia(id: number) {
    return this.http.get<Pic>('http://media.mw.metropolia.fi/wbma/media/' + id);
  }

}
