"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailManager = void 0;
var Usuario_1 = require("./Usuario");
var Correos_1 = require("./Correos");
var Eljson_1 = require("../class/Eljson");
var EmailManager = /** @class */ (function () {
    function EmailManager(usuarios) {
        this.usuarios = usuarios;
    }
    EmailManager.prototype.getUsuarios = function () {
        return this.usuarios;
    };
    EmailManager.prototype.setUsuarios = function (usuarios) {
        this.usuarios = usuarios;
    };
    EmailManager.prototype.crearUsuario = function (nombre, correo, contraseña, bandejaEntrada, bandejaEnviados) {
        var usuario = new Usuario_1.Usuario(nombre, correo, contraseña, bandejaEntrada, bandejaEnviados);
        this.usuarios.push(usuario);
    };
    EmailManager.prototype.eliminarUsuario = function (correo) {
        var index = this.usuarios.findIndex(function (usuario) { return usuario.correo == correo; });
        this.usuarios.splice(index, 1);
        (0, Eljson_1.Crearjson)(this);
    };
    //enviar correo
    EmailManager.prototype.enviarCorreo = function (remitente, destinatarios, asunto, cuerpo) {
        //buscar el usuario remitente
        var indexremitente = this.usuarios.findIndex(function (usuario) { return usuario.correo == remitente; });
        var email = new Correos_1.Email(this.usuarios[indexremitente].getCorreo(), destinatarios, asunto, cuerpo);
        this.usuarios[indexremitente].bandejaEnviados.push(email);
        var _loop_1 = function (i) {
            var index2 = this_1.usuarios.findIndex(function (usuario) { return usuario.correo == destinatarios[i]; });
            this_1.usuarios[index2].bandejaEntrada.push(email);
        };
        var this_1 = this;
        for (var i = 0; i < destinatarios.length; i++) {
            _loop_1(i);
        }
    };
    return EmailManager;
}());
exports.EmailManager = EmailManager;
