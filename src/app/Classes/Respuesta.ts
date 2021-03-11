export class Respuesta {
    imagen:string;
    idPregunta:string;
    respuesta:string;

    constructor($imagen: string, $idPregunta: string,$respuesta: string) {
		this.imagen = $imagen;
    this.idPregunta = $idPregunta;
		this.respuesta = $respuesta;
	}
}
	