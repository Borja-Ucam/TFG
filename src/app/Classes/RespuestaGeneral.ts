export class RespuestaGeneral {
  mediaGusto: string;
  mediaDeseo: string;

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

  imagen: string;
  idPregunta: string;
  pregunta: string;
  constructor(
    $Paciente: string,
    $Fecha: string,

    $mediaGustoHFSA: string,
    $stdGustoHFSA: string,

    $mediaGustoHFSW: string,
    $stdGustoHFSW: string,

    $mediaGustoLFSA: string,
    $stdGustoLFSA: string,

    $mediaGustoLFSW: string,
    $stdGustoLFSW: string,

    $mediaDeseoHFSA: string,
    $stdDeseoHFSA: string,

    $mediaDeseoHFSW: string,
    $stdDeseoHFSW: string,

    $mediaDeseoLFSA: string,
    $stdDeseoLFSA: string,

    $mediaDeseoLFSW: string,
    $stdDeseoLFSW: string
  ) {
    //info base
    this.Paciente = $Paciente;
    this.Fecha = $Fecha;
    //media std gusto
    this.mediaGustoHFSA = $mediaGustoHFSA;
    this.stdGustoHFSA = $stdGustoHFSA;

    this.mediaGustoHFSW = $mediaGustoHFSW;
    this.stdGustoHFSW = $stdGustoHFSW;

    this.mediaGustoLFSA = $mediaGustoLFSA;
    this.stdGustoLFSA = $stdGustoLFSA;

    this.mediaGustoLFSW = $mediaGustoLFSW;
    this.stdGustoLFSW = $stdGustoLFSW;

    //media std deseo
    this.mediaDeseoHFSA = $mediaDeseoHFSA;
    this.stdDeseoHFSA = $stdDeseoHFSA;

    this.mediaDeseoHFSW = $mediaDeseoHFSW;
    this.stdDeseoHFSW = $stdDeseoHFSW;

    this.mediaDeseoLFSA = $mediaDeseoLFSA;
    this.stdDeseoLFSA = $stdDeseoLFSA;

    this.mediaDeseoLFSW = $mediaDeseoLFSW;
    this.stdDeseoLFSW = $stdDeseoLFSW;

  }
}
