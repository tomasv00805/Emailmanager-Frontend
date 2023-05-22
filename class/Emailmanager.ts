import { Usuario } from "./Usuario";
import { Email } from "./Correos";
import {Getjson} from "../class/Eljson";
import {Crearjson} from "../class/Eljson";


export class EmailManager {
    usuarios: Usuario[];
  
    constructor(usuarios: Usuario[]) {
      this.usuarios = usuarios;
    }

    getUsuarios(){
        return this.usuarios;
    }
    setUsuarios(usuarios: Usuario[]){
        this.usuarios = usuarios;
    }
    crearUsuario(nombre: string, correo: string, contraseña: string, bandejaEntrada: Email[], bandejaEnviados: Email[]){

        let usuario = new Usuario(nombre, correo, contraseña, bandejaEntrada, bandejaEnviados);
        this.usuarios.push(usuario);
        
    }
    eliminarUsuario(correo: string){
        
        let index = this.usuarios.findIndex((usuario) => usuario.correo == correo);
        this.usuarios.splice(index, 1);
        Crearjson(this);
    }

    //enviar correo
    enviarCorreo(remitente: string, destinatarios: string[], asunto: string, cuerpo: string){
        //buscar el usuario remitente
        
        let indexremitente = this.usuarios.findIndex((usuario) => usuario.correo == remitente);
        let email = new Email(this.usuarios[indexremitente].getCorreo(), destinatarios, asunto, cuerpo);
        this.usuarios[indexremitente].bandejaEnviados.push(email);
        for(let i = 0; i < destinatarios.length; i++){
            let index2 = this.usuarios.findIndex((usuario) => usuario.correo == destinatarios[i]);
            this.usuarios[index2].bandejaEntrada.push(email);
        }
        
    }
  }