import { AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";

export interface preg {
    text: string
    id: string
}

@Injectable()
export class PreguntasService {



    constructor(private db: AngularFirestore) {


    }
    
    getText() {

        return this.db.collection('Preguntas').snapshotChanges().pipe(map(quest => {
            return quest.map(a => {
                const data = a.payload.doc.data() as preg;
                data.id = a.payload.doc.id;
                

                return data;
            })

        }));
    }


}