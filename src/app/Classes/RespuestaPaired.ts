export class RespuestaPaired {

   idImagenIzq: string;
   idImagenDer: string;
   grupoImagenIzq: string;
   grupoImagenDer: string;
   tiempo: string;
   seleccion: string;
   orden: Number;

	constructor( $idImagenIzq: string, $idImagenDer: string, 
        $grupoImagenIzq: string, $grupoImagenDer: string, $tiempo: string, $seleccion: string, $orden: Number) {

		
		this.idImagenIzq = $idImagenIzq;
		this.idImagenDer = $idImagenDer;
		this.grupoImagenIzq = $grupoImagenIzq;
		this.grupoImagenDer = $grupoImagenDer;
		this.tiempo = $tiempo;
        this.seleccion = $seleccion;
        this.orden = $orden;

	}


}
