import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";

import { Observable, Subject, ReplaySubject } from "rxjs";
import { map, filter, switchMap } from "rxjs/operators";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IPicture2, UploadForm } from "../../interfaces/pic";
import { MediaProvider } from "../../providers/media/media";

@IonicPage()
@Component({
  selector: "page-upload",
  templateUrl: "upload.html"
})
export class UploadPage {
  picture: any;
  uploadForm: UploadForm = {};
  fileData: string;
  file: File;
  title = "";
  description = "";
  formData = new FormData();
  src = "https://media.mw.metropolia.fi/wbma";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private mediaProvider: MediaProvider,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad UploadPage");
  }

  handleChange($event) {
    console.log($event.target.files[0]);
    this.file = $event.target.files[0];

    this.showPreview();
  }

  showPreview() {
    var reader = new FileReader();
    reader.onloadend = evt => {
      //using arrow fuction to change the reference, if not ==> error of this.
      //console.log(reader.result)
      this.fileData = reader.result;
    };
    if (this.file.type.includes("video")) {
      this.fileData = "http://via.placeholder.com/500x200/000?text=Video";
    } else if (this.file.type.includes("audio")) {
      this.fileData = "http://via.placeholder.com/500x200/000?text=Audio";
    } else {
      reader.readAsDataURL(this.file);
    }
  }

  uploadImage() {
    //show spinner
    const fd = new FormData();
    fd.append("file", this.file);
    fd.append("title", this.title);
    fd.append("description", this.description);
    console.log(fd);
    this.mediaProvider.upload(fd).subscribe(res => {
      //set time out in 2s
      console.log(res);
      // hide spinner
      this.loading();
    });
  }

  loading() {
    let loading = this.loadingCtrl.create({});
    loading.present();

    setTimeout(() => {
      loading.dismiss();
      this.navCtrl.pop().catch();
    }, 2000);
  }
}