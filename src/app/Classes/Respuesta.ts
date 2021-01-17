export class Respuesta {
    imagen:string;
    pregunta:string;
    respuesta:string;

    constructor($imagen: string, $pregunta: string,$respuesta: string) {
		this.imagen = $imagen;
		this.pregunta = $pregunta;
		this.respuesta = $respuesta;
	}
}
	