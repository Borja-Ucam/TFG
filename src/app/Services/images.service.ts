import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireList } from "@angular/fire/database";
import { map } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

export interface image {
  image1: string;
  id: string;
}

export interface food {
  id: string;
  url: string;
  available: boolean;
}
class Respuesta {
  id: string;
  url: string;
  constructor(id1: string, url1: string) {
    this.id = id1;
    this.url = url1;
  }
}

@Injectable()
export class ImagesService {
  constructor(private db: AngularFirestore,
    public translate: TranslateService,
    ) {}

  getImageHFSA() {
    if(this.translate.currentLang == 'es'){
      return this.db
      .collection("HFSA")
      .snapshotChanges()
      .pipe(
        map((quest) => {
          return quest.map((a) => {
            const data = a.payload.doc.data() as food;
            data.id = a.payload.doc.id;

            return data;
          });
        })
      );
    }else{
      return this.db
      .collection("HFSA-en")
      .snapshotChanges()
      .pipe(
        map((quest) => {
          return quest.map((a) => {
            const data = a.payload.doc.data() as food;
            data.id = a.payload.doc.id;

            return data;
          });
        })
      );
    }
   
  }

  getImageHFSW() {
    if(this.translate.currentLang == 'es'){
      return this.db
      .collection("HFSW")
      .snapshotChanges()
      .pipe(
        map((quest) => {
          return quest.map((a) => {
            const data = a.payload.doc.data() as food;
            data.id = a.payload.doc.id;

            return data;
          });
        })
      );
    }else{
      return this.db
      .collection("HFSW-en")
      .snapshotChanges()
      .pipe(
        map((quest) => {
          return quest.map((a) => {
            const data = a.payload.doc.data() as food;
            data.id = a.payload.doc.id;

            return data;
          });
        })
      );
    }
   
  }

  getImageLFSA() {
    if(this.translate.currentLang == 'es'){
      return this.db
      .collection("LFSA")
      .snapshotChanges()
      .pipe(
        map((quest) => {
          return quest.map((a) => {
            const data = a.payload.doc.data() as food;
            data.id = a.payload.doc.id;

            return data;
          });
        })
      );
    }else{
      return this.db
      .collection("LFSA-en")
      .snapshotChanges()
      .pipe(
        map((quest) => {
          return quest.map((a) => {
            const data = a.payload.doc.data() as food;
            data.id = a.payload.doc.id;

            return data;
          });
        })
      );
    }
    
  }

  getImageLFSW() {
    if(this.translate.currentLang == 'es'){
      return this.db
      .collection("LFSW")
      .snapshotChanges()
      .pipe(
        map((quest) => {
          return quest.map((a) => {
            const data = a.payload.doc.data() as food;
            data.id = a.payload.doc.id;

            return data;
          });
        })
      );
    }else{
      return this.db
      .collection("LFSW-en")
      .snapshotChanges()
      .pipe(
        map((quest) => {
          return quest.map((a) => {
            const data = a.payload.doc.data() as food;
            data.id = a.payload.doc.id;

            return data;
          });
        })
      );
    }
    
  }
}
