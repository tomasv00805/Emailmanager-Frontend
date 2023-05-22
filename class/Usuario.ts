export class Usuario {
    nombre: string;
    correo: string;
    contrasena: string;
    bandejaEntrada: object[];
    bandejaEnviados: object[];
  
    constructor(nombre: string, correo: string, contrasena: string, bandejaEntrada: object[], bandejaEnviados: object[]) {
      this.nombre = nombre;
      this.correo = correo;
      this.contrasena = contrasena;
      this.bandejaEntrada = bandejaEntrada;
      this.bandejaEnviados = bandejaEnviados;
    }
    getNombre(){
        return this.nombre;
    }
    getCorreo(){
        return this.correo;
    }
    getContraseña(){
        return this.contrasena;
    }
    getBandejaEntrada(){
        return this.bandejaEntrada;
    }
    getBandejaEnviados(){
        return this.bandejaEnviados;
    }
    setNombre(nombre: string){
        this.nombre = nombre;
    }
    setCorreo(correo: string){
        this.correo = correo;
    }
    setContraseña(contrasena: string){
        this.contrasena = contrasena;
    }
    setBandejaEntrada(bandejaEntrada: object[]){
        this.bandejaEntrada = bandejaEntrada;
    }
    setBandejaEnviados(bandejaEnviados: object[]){
        this.bandejaEnviados = bandejaEnviados;
    }
  }