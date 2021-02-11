export class Respuesta {
    imagen:string;
    idPregunta:string;
    pregunta:string;
    respuesta:string;

    constructor($imagen: string, $idPregunta: string, $pregunta: string,$respuesta: string) {
		this.imagen = $imagen;
    this.idPregunta = $idPregunta;
		this.pregunta = $pregunta;
		this.respuesta = $respuesta;
	}
}
	