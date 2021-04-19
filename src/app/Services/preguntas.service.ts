import { AngularFireList } from "@angular/fire/database";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";

export interface preg {
  text: string;
  id: string;
}

@Injectable()
export class PreguntasService {
  constructor(private db: AngularFirestore,
        public translate: TranslateService,
    ) {}

  getText() {
    if(this.translate.currentLang == 'es'){
      return this.db
      .collection("Preguntas")
      .snapshotChanges()
      .pipe(
        map((quest) => {
          return quest.map((a) => {
            const data = a.payload.doc.data() as preg;
            data.id = a.payload.doc.id;

            return data;
          });
        })
      );

    }else{
      //console.log("INGLESSS: "+this.translate.currentLang);
      return this.db
      .collection("Preguntas-en")
      .snapshotChanges()
      .pipe(
        map((quest) => {
          return quest.map((a) => {
            const data = a.payload.doc.data() as preg;
            data.id = a.payload.doc.id;

            return data;
          });
        })
      );

    }
  
  }
}
