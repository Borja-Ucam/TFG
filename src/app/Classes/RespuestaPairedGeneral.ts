import { RespuestaPaired } from "./RespuestaPaired";

export class RespuestaPairedGeneral {

    public repuestas: Array<RespuestaPaired>;
    public Paciente: string;
    public Fecha: string;
    


    constructor(Paciente: string, Fecha: string,respuestas: Array<RespuestaPaired>){


        this.Paciente = Paciente;
        this.Fecha = Fecha;
        this.repuestas = respuestas;


    }

}
