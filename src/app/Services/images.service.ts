import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore';




@Injectable()
export class ImagesService {



    constructor(private db: AngularFirestore) {


    }

    getText() {

        return this.db.collection('Imagenes').snapshotChanges();
    }
}