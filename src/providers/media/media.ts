import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { LoginResponse, Pic, User } from '../../interfaces/pic';

@Injectable()
export class MediaProvider {

  loggedIn = false;

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getAllMedia() {
    return this.http.get<Pic[]>('http://media.mw.metropolia.fi/wbma/media');
  }

  getSingleMedia(id: number) {
    return this.http.get<Pic>('http://media.mw.metropolia.fi/wbma/media/' + id);
  }


  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.post<LoginResponse>('http://media.mw.metropolia.fi/wbma/login', user, httpOptions);
  }

  register(user: User) {
    return this.http.post<User>('http://media.mw.metropolia.fi/wbma/users', user);
  }

  // check user is exist?
  checkUserExist(username: string) {
    return this.http.get('http://media.mw.metropolia.fi/wbma/users/username/' + username);
  }

}
