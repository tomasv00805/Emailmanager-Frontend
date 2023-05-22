"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(nombre, correo, contrasena, bandejaEntrada, bandejaEnviados) {
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
        this.bandejaEntrada = bandejaEntrada;
        this.bandejaEnviados = bandejaEnviados;
    }
    Usuario.prototype.getNombre = function () {
        return this.nombre;
    };
    Usuario.prototype.getCorreo = function () {
        return this.correo;
    };
    Usuario.prototype.getContraseña = function () {
        return this.contrasena;
    };
    Usuario.prototype.getBandejaEntrada = function () {
        return this.bandejaEntrada;
    };
    Usuario.prototype.getBandejaEnviados = function () {
        return this.bandejaEnviados;
    };
    Usuario.prototype.setNombre = function (nombre) {
        this.nombre = nombre;
    };
    Usuario.prototype.setCorreo = function (correo) {
        this.correo = correo;
    };
    Usuario.prototype.setContraseña = function (contrasena) {
        this.contrasena = contrasena;
    };
    Usuario.prototype.setBandejaEntrada = function (bandejaEntrada) {
        this.bandejaEntrada = bandejaEntrada;
    };
    Usuario.prototype.setBandejaEnviados = function (bandejaEnviados) {
        this.bandejaEnviados = bandejaEnviados;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
