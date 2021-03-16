import { RespuestaPaired } from "src/app/Classes/RespuestaPaired";
import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  DocumentData,
  QuerySnapshot,
} from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { RespuestaGeneral } from "src/app/Classes/RespuestaGeneral";
import { Respuesta } from "../Classes/Respuesta";

export interface reports {
  Paciente: string;
  Fecha: string;
  respuestas: Array<Respuesta>;
}
export interface reportsArr {
  Imagen: string;
  Pregunta: string;
  Valor: string;
}
export interface reportsPaciente {
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

  constructor(private db: AngularFirestore) {}

  setRespuestas(data) {
    this.idUser = sessionStorage.getItem("idUser");

    return this.db
      .collection("Ucam-Reports")
      .doc(this.idUser)
      .set(JSON.parse(JSON.stringify(data)));
  }

  setRespuestasPaciente(data) {
    this.idUser = sessionStorage.getItem("idUser");

    return this.db
      .collection("Ucam-Reports-Pacientes")
      .doc(this.idUser)
      .set(JSON.parse(JSON.stringify(data)));
  }

  updateRespuestasPaciente(data) {
    this.idUser = sessionStorage.getItem("idUser");

    return this.db
      .collection("Ucam-Reports-Pacientes")
      .doc(this.idUser)
      .update(JSON.parse(JSON.stringify(data)));
  }
  setRespuestasPaired(data) {
    this.idUser = sessionStorage.getItem("idUser");

    return this.db
      .collection("Ucam-Reports-Paired")
      .doc(this.idUser)
      .set(JSON.parse(JSON.stringify(data)));
  }

  async getPruebaPaciente() {
    return this.db
      .collection("Ucam-Reports-Pacientes")
      .snapshotChanges()
      .pipe(
        map((quest) => {
          return quest.map((a) => {
            const data = a.payload.doc.data() as reports;
            data.Paciente == a.payload.doc.id;

            return data.Paciente;
          });
        })
      );
  }

  getAllPaired() {
    return this.db
      .collection("Ucam-Reports-Paired")
      .snapshotChanges()
      .pipe(
        map((quest) => {
          return quest.map((a) => {
            const data = a.payload.doc.data() as reports;
            data.Paciente == a.payload.doc.id;

            const objeto = this.renderDataPaired(data);

            return objeto;
          });
        })
      );
  }
  renderDataPaired(data) {
    const objetoRespuesta = new RespuestaPaired(
      data.Paciente,
      data.Fecha,
      data.TiempoMedioRespuesta,

      data.CantidadTipoHFSA,
      data.TiempoMedioHFSA,
      data.FrecuenciaHFSA,

      data.CantidadTipoHFSW,
      data.TiempoMedioHFSW,
      data.FrecuenciaHFSW,

      data.CantidadTipoLFSA,
      data.TiempoMedioLFSA,
      data.FrecuenciaLFSA,

      data.CantidadTipoLFSW,
      data.TiempoMedioLFSW,
      data.FrecuenciaLFSW
    );

    return objetoRespuesta;
  }

  getAll() {
    return this.db
      .collection("Ucam-Reports")
      .snapshotChanges()
      .pipe(
        map((quest) => {
          return quest.map((a) => {
            const data = a.payload.doc.data() as reports;
            data.Paciente == a.payload.doc.id;

            const objeto = this.renderData(data);

            return objeto;
          });
        })
      );
  }
  getPrueba() {}

  async getPaciente(id): Promise<any> {
    let promise: Promise<any> = new Promise((resolve, reject) => {
      var docRef = this.db.collection("Ucam-Reports-Pacientes").doc(id);

      docRef
        .get()
        .toPromise()
        .then((doc) => {
          if (doc.exists) {
            resolve(doc.data());
          } else {
            reject();
          }
        })
        .catch((error) => {});
    });
    return promise;
  }

  renderDataPaciente(data) {
    const objetoRespuesta = new Respuesta(
      data.imagen,
      data.idPregunta,
      data.respuesta
    );

    return objetoRespuesta;
    //data
  }
  getRespuestas() {
    return this.db
      .collection("Ucam-Reports")
      .get()
      .toPromise()
      .then((querySnapshot: QuerySnapshot<DocumentData>) => {
        querySnapshot.forEach((doc: any) => {
          return doc.data;
        });
      });
  }

  renderData(data) {
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

    return objetoRespuesta;
    //data
  }
}
