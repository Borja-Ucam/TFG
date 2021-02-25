import { Injectable } from '@angular/core'
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireList } from '@angular/fire/database';
import { map } from "rxjs/operators";

export interface image {
    image1: string
    id: string
}

export interface food {
    id: string
    url: string
    available: boolean

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



    constructor(private db: AngularFirestore) {


    }


    /*
        
        getImage() {
    
            let imagenes = new Array();
            
    
            return this.db.collection('Imagenes').snapshotChanges().pipe(map(quest => {
    
    
                return quest.map(a => {
    
                    const data = a.payload.doc.data() as image;
                    data.id = a.payload.doc.id;
                    
                    console.log("bbdd DATA ONLy"+JSON.stringify(data))
                    console.log("BBDD::"+JSON.stringify(data.id))
                    return data;
                })
    
            }));
        }
    */
    //i: number = 0;

    getImageHFSA() {

        //let imagenes: food[] = new Array();

        return this.db.collection('HFSA').snapshotChanges().pipe(map(quest => {

            return quest.map(a => {

                const data = a.payload.doc.data() as food;
                data.id = a.payload.doc.id;

                /*
                let objetoRespuesta = new Respuesta(data.id,data.url);
                console.log("ADaa: "+objetoRespuesta.id)
                console.log("ADddd: "+objetoRespuesta.url)
                */
                //imagenes.push(data);
                //console.log("asdfasdf"+JSON.stringify(imagenes));
                //console.log("NUEVO DATAAA:_" + JSON.stringify(data))

                //console.log("NUEVO DATA.IDDDDD:" + JSON.stringify(data.id))
                //this.i++;
                return data;
            })

        }));

    }

    getImageHFSW() {

        //let imagenes: food[] = new Array();

        return this.db.collection('HFSW').snapshotChanges().pipe(map(quest => {

            return quest.map(a => {

                const data = a.payload.doc.data() as food;
                data.id = a.payload.doc.id;

                /*
                let objetoRespuesta = new Respuesta(data.id,data.url);
                console.log("ADaa: "+objetoRespuesta.id)
                console.log("ADddd: "+objetoRespuesta.url)
                */
                //imagenes.push(data);
                //console.log("asdfasdf"+JSON.stringify(imagenes));
                //console.log("HFSW NUEVO DATAAA:_" + JSON.stringify(data))

                //console.log("HFSW NUEVO DATA.IDDDDD:" + JSON.stringify(data.id))
                //this.i++;
                return data;
            })

        }));

    }

    getImageLFSA() {

        //let imagenes: food[] = new Array();

        return this.db.collection('LFSA').snapshotChanges().pipe(map(quest => {

            return quest.map(a => {

                const data = a.payload.doc.data() as food;
                data.id = a.payload.doc.id;

                /*
                let objetoRespuesta = new Respuesta(data.id,data.url);
                console.log("ADaa: "+objetoRespuesta.id)
                console.log("ADddd: "+objetoRespuesta.url)
                */
                //imagenes.push(data);
                //console.log("asdfasdf"+JSON.stringify(imagenes));
                //console.log("LFSA NUEVO DATAAA:_" + JSON.stringify(data))

                //console.log("LFSA NUEVO DATA.IDDDDD:" + JSON.stringify(data.id))
                //this.i++;
                return data;
            })

        }));

    }

    getImageLFSW() {

        //let imagenes: food[] = new Array();

        return this.db.collection('LFSW').snapshotChanges().pipe(map(quest => {

            return quest.map(a => {

                const data = a.payload.doc.data() as food;
                data.id = a.payload.doc.id;

                /*
                let objetoRespuesta = new Respuesta(data.id,data.url);
                console.log("ADaa: "+objetoRespuesta.id)
                console.log("ADddd: "+objetoRespuesta.url)
                */
                //imagenes.push(data);
                //console.log("asdfasdf"+JSON.stringify(imagenes));
                //console.log("LFSW NUEVO DATAAA:_" + JSON.stringify(data))

                //console.log("LFSW NUEVO DATA.IDDDDD:" + JSON.stringify(data.id))
                //this.i++;
                return data;
            })

        }));

    }

}