import { Usuario } from "./Usuario";

export class Email {
    remitente: string;
    destinatarios: string[];
    asunto: string;
    cuerpo: string;
  
    constructor(remitente: string, destinatarios: string[], asunto: string, cuerpo: string) {
      this.remitente = remitente;
      this.destinatarios = destinatarios;
      this.asunto = asunto;
      this.cuerpo = cuerpo;
    }
    getRemitente(){
        return this.remitente;
    }
    getDestinatarios(){
        return this.destinatarios;
    }
    getAsunto(){
        return this.asunto;
    }
    getCuerpo(){
        return this.cuerpo;
    }
    setRemitente(remitente: string){
        this.remitente = remitente;
    }
    setDestinatarios(destinatarios: string[]){
        this.destinatarios = destinatarios;
    }
    setAsunto(asunto: string){
        this.asunto = asunto;
    }
    setCuerpo(cuerpo: string){
        this.cuerpo = cuerpo;
    }
  }