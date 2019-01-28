import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Pic } from '../../interfaces/pic';
// import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {

  user: Pic = { user_id: null };
  url = 'http://media.mw.metropolia.fi/wbma/uploads/';
  username = localStorage.getItem('username');
  email = localStorage.getItem('email');

  constructor(public navCtrl: NavController, public navParams: NavParams, private mediaProvider: MediaProvider) {
  }

  ngOnInit() {
    /*
    this.mediaProvider.loggedIn = false;
    localStorage.clear();
    this.navCtrl.setRoot(LoginRegisterPage).catch(err => {
      console.log(err);
    });
    */
    // tslint:disable-next-line:radix
    /* this.mediaProvider.getSingleMedia(parseInt(localStorage.getItem('user_id'))).subscribe((result: Pic) => {
      this.user = result;
      console.log(this.user);
    }); */

    const user_id = +localStorage.getItem('user_id');
    console.log(user_id);

    this.mediaProvider.getAllMedia().subscribe((result: Pic[]) => {
      // console.log('result', result);
      const findResult = result.filter(user => {
        return user.user_id === user_id;
      });
      this.user = findResult[0];
      console.log(this.user);
    });
  }

}
