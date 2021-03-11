import { Respuesta } from "./Respuesta";

export class RespuestaRender {

    
    public respuestas: Array<Respuesta>;
    public Paciente: string;
    public Fecha: string;
    


    constructor(Paciente: string, Fecha: string,respuestas: Array<Respuesta>){


        this.Paciente = Paciente;
        this.Fecha = Fecha;
        this.respuestas = respuestas;

    }
}
