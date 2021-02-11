import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList } from '@angular/fire/database';
import { map } from "rxjs/operators";

@Injectable()
export class RespuestasService {



    constructor(private db: AngularFirestore) {


    }

    /*
    setRespuestaSingle() {

        let respuestas = new Array();
        

        return this.db.collection('Respuestas').snapshotChanges().pipe(map(quest => {


            return quest.map(a => {

                
               
                return data;
            })

        }));
    }*/

}