export class RespuestaPaired {
  Paciente: string;
  Fecha: string;
  TiempoMedio: string;
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
    $TiempoMedio: string,
    $CantidadTipoHFSA: string,
    $CantidadTipoHFSW: string,
    $CantidadTipoLFSA: string,
    $CantidadTipoLFSW: string,

    $TiempoMedioHFSA: string,
    $TiempoMedioHFSW: string,
    $TiempoMedioLFSA: string,
    $TiempoMedioLFSW: string,

    $FrecuenciaHFSA: string,
    $FrecuenciaHFSW: string,
    $FrecuenciaLFSA: string,
    $FrecuenciaLFSW: string,

    $orden: Number
  ) {
    this.Paciente = $Paciente;
    this.Fecha = $Fecha;
    this.TiempoMedio = $TiempoMedio;
    this.CantidadTipoHFSA = $CantidadTipoHFSA;
    this.CantidadTipoHFSW = $CantidadTipoHFSW;
    this.CantidadTipoLFSA = $CantidadTipoLFSA;
    this.CantidadTipoLFSW = $CantidadTipoLFSW;

    this.TiempoMedioHFSA = $TiempoMedioHFSA;
    this.TiempoMedioHFSW = $TiempoMedioHFSW;
    this.TiempoMedioLFSA = $TiempoMedioLFSA;
    this.TiempoMedioLFSW = $TiempoMedioLFSW;

    this.FrecuenciaHFSA = $FrecuenciaHFSA;
    this.FrecuenciaHFSW = $FrecuenciaHFSW;
    this.FrecuenciaLFSA = $FrecuenciaLFSA;
    this.FrecuenciaLFSW = $FrecuenciaLFSW;

    this.orden = $orden;
  }
}
