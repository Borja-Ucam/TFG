import * as math from "mathjs";

export class RespuestaPaired {
  Paciente: string;
  Fecha: string;
  TiempoMedioRespuesta: string;
  CantidadTipoHFSA: string;
  CantidadTipoHFSW: string;
  CantidadTipoLFSA: string;
  CantidadTipoLFSW: string;

  TiempoMedioHFSA: string;
  TiempoMedioHFSW: string;
  TiempoMedioLFSA: string;
  TiempoMedioLFSW: string;

  FrecuenciaHFSA: string;
  FrecuenciaHFSW: string;
  FrecuenciaLFSA: string;
  FrecuenciaLFSW: string;


  //el orden ns si hace falta

  orden: Number;
  //tengo apuntado que hacen falta 4 sumas de veces/ 4 tiempos por respuesta / 4 frecuencias
  constructor(
    $Paciente: string,
    $Fecha: string,
    $TiempoMedioRespuesta: string,
    $CantidadTipoHFSA: string,
    $TiempoMedioHFSA: string,
    $FrecuenciaHFSA: string,

    $CantidadTipoHFSW: string,
    $TiempoMedioHFSW: string,
    $FrecuenciaHFSW: string,

    $CantidadTipoLFSA: string,
    $TiempoMedioLFSA: string,
    $FrecuenciaLFSA: string,

    $CantidadTipoLFSW: string,
    $TiempoMedioLFSW: string,
    $FrecuenciaLFSW: string,


   


    //$orden: Number
  ) {
    this.Paciente = $Paciente;
    this.Fecha = $Fecha;
    this.TiempoMedioRespuesta = $TiempoMedioRespuesta;
    this.CantidadTipoHFSA = $CantidadTipoHFSA;
    this.TiempoMedioHFSA = $TiempoMedioHFSA;
    this.FrecuenciaHFSA = $FrecuenciaHFSA;


    this.CantidadTipoHFSW = $CantidadTipoHFSW;
    this.TiempoMedioHFSW = $TiempoMedioHFSW;
    this.FrecuenciaHFSW = $FrecuenciaHFSW;

    this.CantidadTipoLFSA = $CantidadTipoLFSA;
    this.TiempoMedioLFSA = $TiempoMedioLFSA;
    this.FrecuenciaLFSA = $FrecuenciaLFSA;

    this.CantidadTipoLFSW = $CantidadTipoLFSW;
    this.TiempoMedioLFSW = $TiempoMedioLFSW;
    this.FrecuenciaLFSW = $FrecuenciaLFSW;

    //this.orden = $orden;
  }

  
}
