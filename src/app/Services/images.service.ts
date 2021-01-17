import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList } from '@angular/fire/database';
import { map } from "rxjs/operators";

export interface image {
    image1: string
    id: string
}

@Injectable()
export class ImagesService {



    constructor(private db: AngularFirestore) {


    }

    
    getImage() {

        let imagenes = new Array();
        

        return this.db.collection('Imagenes').snapshotChanges().pipe(map(quest => {


            return quest.map(a => {

                const data = a.payload.doc.data() as image;
                data.id = a.payload.doc.id;
                //console.log('dataid:'+data.id)
                //console.log("holaaa service:"+ JSON.stringify(a.payload.doc.data()));

                return data;
            })

        }));
    }

}