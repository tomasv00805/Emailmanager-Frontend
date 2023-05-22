"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
var Email = /** @class */ (function () {
    function Email(remitente, destinatarios, asunto, cuerpo) {
        this.remitente = remitente;
        this.destinatarios = destinatarios;
        this.asunto = asunto;
        this.cuerpo = cuerpo;
    }
    Email.prototype.getRemitente = function () {
        return this.remitente;
    };
    Email.prototype.getDestinatarios = function () {
        return this.destinatarios;
    };
    Email.prototype.getAsunto = function () {
        return this.asunto;
    };
    Email.prototype.getCuerpo = function () {
        return this.cuerpo;
    };
    Email.prototype.setRemitente = function (remitente) {
        this.remitente = remitente;
    };
    Email.prototype.setDestinatarios = function (destinatarios) {
        this.destinatarios = destinatarios;
    };
    Email.prototype.setAsunto = function (asunto) {
        this.asunto = asunto;
    };
    Email.prototype.setCuerpo = function (cuerpo) {
        this.cuerpo = cuerpo;
    };
    return Email;
}());
exports.Email = Email;
