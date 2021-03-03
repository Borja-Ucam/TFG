import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  DocumentData,
  QuerySnapshot,
} from "@angular/fire/firestore";
import { Interface } from "readline";
import { map } from "rxjs/operators";
import { RespuestaGeneral } from "src/app/Classes/RespuestaGeneral";

export interface reports {
  Paciente: string;
  Fecha: string;
  mediaGustoHFSA: string;
  mediaGustoHFSW: string;
  mediaGustoLFSA: string;
  mediaGustoLFSW: string;

  mediaDeseoHFSA: string;
  mediaDeseoHFSW: string;
  mediaDeseoLFSA: string;
  mediaDeseoLFSW: string;

  stdGustoHFSA: string;
  stdGustoHFSW: string;
  stdGustoLFSA: string;
  stdGustoLFSW: string;

  stdDeseoHFSA: string;
  stdDeseoHFSW: string;
  stdDeseoLFSA: string;
  stdDeseoLFSW: string;
}


@Injectable({
  providedIn: "root",
})
export class FirebaseUploadService {

  idUser: string = null;
  //objeto: Object;
  //respuestasGen: Object;

  constructor(private db: AngularFirestore) {}

  setRespuestas(data) {
    this.idUser = sessionStorage.getItem("idUser");

    return this.db
      .collection("Ucam-Reports")
      .doc(this.idUser)
      .set(JSON.parse(JSON.stringify(data)));
  }

  getAll() {
    //let imagenes: food[] = new Array();
    //this.objeto = new Object();
    return this.db
      .collection("Ucam-Reports")
      .snapshotChanges()
      .pipe(
        map((quest) => {
          return quest.map((a) => {
            const data = a.payload.doc.data() as reports;
            data.Paciente == a.payload.doc.id;

            /*
            let objetoRespuesta = new Respuesta(data.id,data.url);
            console.log("ADaa: "+objetoRespuesta.id)
            console.log("ADddd: "+objetoRespuesta.url)
            */
            //imagenes.push(data);
            //console.log("asdfasdf"+JSON.stringify(imagenes));
            console.log("RESPONSES ID:" + JSON.stringify(data.Paciente));
            //console.log("MEDIA GUSTO HFSA:" + JSON.stringify(data.mediaGustoHFSA));
            const objeto = this.renderData(data);
            //objeto = this.renderData(data);
            console.log("NUEVO DATA.IDDDDD:" + JSON.stringify(objeto));
            //this.i++;
            //return data;

            return objeto;
          });
        })
      );
  }

  getRespuestas() {
    return this.db
      .collection("Ucam-Reports")
      .get()
      .toPromise()
      .then((querySnapshot: QuerySnapshot<DocumentData>) => {
        querySnapshot.forEach((doc: any) => {
          // doc.data() is never undefined for query doc snapshots
          console.log("WEWEWE: " + doc.id, " => ", doc.data());
          return doc.data;
        });
      });
  }

  renderData(data){

    const objetoRespuesta = new RespuestaGeneral(
      data.Paciente,
      data.Fecha,
      data.mediaGustoHFSA,
      data.stdGustoHFSA,

      data.mediaGustoHFSW,
      data.stdGustoHFSW,

      data.mediaGustoLFSA,
      data.stdGustoLFSA,

      data.mediaGustoLFSW,
      data.stdGustoLFSW,


      data.mediaDeseoHFSA,
      data.stdDeseoHFSA,

      data.mediaDeseoHFSW,
      data.stdDeseoHFSW,

      data.mediaDeseoLFSA,
      data.stdDeseoLFSA,

      data.mediaDeseoLFSW,
      data.stdDeseoLFSW
      );
      //console.log("DATA objeto : "+ JSON.stringify(objetoRespuesta));

      //console.log("DATA.fecha : "+ JSON.stringify(data.Fecha));
      return objetoRespuesta;
    //data
  }
}
