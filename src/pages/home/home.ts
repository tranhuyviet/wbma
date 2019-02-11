import { Component, OnInit } from "@angular/core";
import { NavController, Thumbnail } from "ionic-angular";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { IPicture } from "../../interfaces/pic";
import { MediaProvider } from "../../providers/media/media";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ThumbnailPipe } from "../../pipes/thumbnail/thumbnail";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  picArray: IPicture[];
  picArray2: IPicture2[];
  picArray3: Observable<IPicture2[]>;
  src = "http://media.mw.metropolia.fi/wbma/uploads/";

  constructor(
    public navCtrl: NavController,
    private photoViewer: PhotoViewer,
    public http: HttpClient,
    private mediaProvider: MediaProvider
  ) {}

  ngOnInit() {
    // this.loadItemsFromServer();
    //this.getAllFile();
    this.mediaProvider.getUsersInfo();
    this.getAllFiles3();
    //console.log(this.mediaProvider.user_id);
  }

  loadItems() {
    return this.http
      .get<IPicture[]>("../../assets/test.json")
      .subscribe(data => {
        console.log(data);
        this.picArray = data;
      });
  }

  loadItemsFromServer() {
    return this.http
      .get<IPicture2[]>("http://media.mw.metropolia.fi/wbma/media")
      .subscribe(data => {
        console.log(data);
        this.picArray2 = data;
      });
  }

  viewImage(url: string) {
    this.photoViewer.show(this.src + url);
  }

  takeFileById(id) {
    return this.http
      .get<IPicture2[]>("http://media.mw.metropolia.fi/wbma/media/" + id)
      .subscribe(data => {
        console.log("alo", data);
        this.picArray2 = data;
      });
  }

  getAllFiles() {
    this.mediaProvider.getAllMedia().subscribe((data: IPicture2[]) => {
      console.log("data::", data);
      // A
      this.picArray2 = data.map((pic: IPicture2) => {
        const nameArray = pic.filename.split(".");
        console.log("nameArray", nameArray);
        pic.thumbnails = {
          w160: nameArray[0] + "-tn160.png"
        };
        console.log("pic after ", pic);
        return pic;
      });

      //B
      //   data.forEach((pic: IPicture2) => {
      //     this.mediaProvider
      //       .getSingleMedia(pic.file_id)
      //       .subscribe((file: IPicture2) => {
      //         this.picArray2.push(file);
      //       });
      //   });
    });
  }

  getAllFiles3() {
    this.picArray3 = this.mediaProvider.getAllMedia();
    //console.log(this.picArray3);
  }
}