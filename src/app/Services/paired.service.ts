import { Injectable } from "@angular/core";
import * as math from "mathjs";

@Injectable({
  providedIn: "root",
})
export class PairedService {
  tiempoMedio: string;

  public sumaTiempoDer: any[] = [];
  public sumaTiempoIzq: any[] = [];
  sumaTotal: number = 0;

  sumaHFSA: number = 0;
  sumaHFSW: number = 0;
  sumaLFSA: number = 0;
  sumaLFSW: number = 0;

  nonsumaHFSA: number = 0;
  nonsumaHFSW: number = 0;
  nonsumaLFSA: number = 0;
  nonsumaLFSW: number = 0;

  public sumatiempoHFSA: any[] = [];
  public sumatiempoHFSW: any[] = [];
  public sumatiempoLFSA: any[] = [];
  public sumatiempoLFSW: any[] = [];

  tiempoHFSA: string = "";
  tiempoHFSW: string = "";
  tiempoLFSA: string = "";
  tiempoLFSW: string = "";

  tiempoFreqHFSA: string = "";
  tiempoFreqHFSW: string = "";
  tiempoFreqLFSA: string = "";
  tiempoFreqLFSW: string = "";

  constructor() {}

  calculateNonTime(tipo, tiempo) {
    if (tipo == "HFSA") {
      if (tiempo == "") {
        return "0";
      } else {
        this.tiempoFreqHFSA = math.sum(tiempo);
        return this.tiempoFreqHFSA;
      }
    }
    if (tipo == "HFSW") {
      if (tiempo == "") {
        return "0";
      } else {
        this.tiempoFreqHFSW = math.sum(tiempo);

        return this.tiempoFreqHFSW;
      }
    }
    if (tipo == "LFSA") {
      if (tiempo == "") {
        return "0";
      } else {
        this.tiempoFreqLFSA = math.sum(tiempo);

        return this.tiempoFreqLFSA;
      }
    }
    if (tipo == "LFSW") {
      if (tiempo == "") {
        return "0";
      } else {
        this.tiempoFreqLFSW = math.sum(tiempo);

        return this.tiempoFreqLFSW;
      }
    }
  }

  //funciona
  calculateTiempoMedioCategoria(tipo, tiempo) {
    if (tipo == "HFSA") {
      if (tiempo == "") {
        return "0";
      } else {
        this.tiempoHFSA = math.mean(tiempo);
        return this.tiempoHFSA;
      }
    }
    if (tipo == "HFSW") {
      if (tiempo == "") {
        return "0";
      } else {
        this.tiempoHFSW = math.mean(tiempo);

        return this.tiempoHFSW;
      }
    }
    if (tipo == "LFSA") {
      if (tiempo == "") {
        return "0";
      } else {
        this.tiempoLFSA = math.mean(tiempo);

        return this.tiempoLFSA;
      }
    }
    if (tipo == "LFSW") {
      if (tiempo == "") {
        return "0";
      } else {
        this.tiempoLFSW = math.mean(tiempo);

        return this.tiempoLFSW;
      }
    }
  }

  //funciona
  cantidad(tipo) {
    if (tipo == "HFSA") {
      this.sumaHFSA++;
      return String(this.sumaHFSA);
    }
    if (tipo == "HFSW") {
      this.sumaHFSW++;
      return String(this.sumaHFSW);
    }
    if (tipo == "LFSA") {
      this.sumaLFSA++;
      return String(this.sumaLFSA);
    }
    if (tipo == "LFSW") {
      this.sumaLFSW++;
      return String(this.sumaLFSW);
    }
  }

  //nonchoice suma
  nonChoiceCantidad(tipo) {
    if (tipo == "HFSA") {
      this.nonsumaHFSA++;
      return String(this.nonsumaHFSA);
    }
    if (tipo == "HFSW") {
      this.nonsumaHFSW++;
      return String(this.nonsumaHFSW);
    }
    if (tipo == "LFSA") {
      this.nonsumaLFSA++;
      return String(this.nonsumaLFSA);
    }
    if (tipo == "LFSW") {
      this.nonsumaLFSW++;
      return String(this.nonsumaLFSW);
    }
  }
  //esta funciona
  calculateTiempoMedio(tiempoIzq, tiempoDer) {
    this.sumaTotal = math.sum(tiempoIzq) + math.sum(tiempoDer);
    this.tiempoMedio = String(this.sumaTotal / 96);
    return this.tiempoMedio;
  }
}
