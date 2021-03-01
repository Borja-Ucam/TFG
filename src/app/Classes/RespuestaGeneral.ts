export class RespuestaGeneral {
  
    mediaGusto:string;
    mediaDeseo:string;


    mediaGustoHFSA:string;
    mediaGustoHFSW:string;
    mediaGustoLFSA:string;
    mediaGustoLFSW:string;
    
    mediaDeseoHFSA:string;
    mediaDeseoHFSW:string;
    mediaDeseoLFSA:string;
    mediaDeseoLFSW:string;

    imagen:string;
    idPregunta:string;
    pregunta:string;
    constructor($mediaGustoHFSA: string,$mediaGustoHFSW: string,$mediaGustoLFSA: string,$mediaGustoLFSW: string,
        $mediaDeseoHFSA: string,$mediaDeseoHFSW: string,$mediaDeseoLFSA: string,$mediaDeseoLFSW: string) {
        //gusto
		this.mediaGustoHFSA = $mediaGustoHFSA;
        this.mediaGustoHFSW = $mediaGustoHFSW;
        this.mediaGustoLFSA = $mediaGustoLFSA;
        this.mediaGustoLFSW = $mediaGustoLFSW;
        //deseo
        this.mediaDeseoHFSA = $mediaDeseoHFSA;
        this.mediaDeseoHFSW = $mediaDeseoHFSW;
        this.mediaDeseoLFSA = $mediaDeseoLFSA;
        this.mediaDeseoLFSW = $mediaDeseoLFSW;
    }

}
