"use strict";
exports.__esModule = true;
exports.Collection = void 0;
var iterator_1 = require("./iterator");
// Las colecciones concretas proveen de uno o mas metodos para llamar a iteradores compatibles
var Collection = /** @class */ (function () {
    function Collection() {
        this.items = [];
        this.filtro = "";
    }
    Collection.prototype.setitems = function (lista) {
        this.items = lista;
    };
    Collection.prototype.setfiltro = function (filtro) {
        this.filtro = filtro;
    };
    Collection.prototype.getItems = function () {
        return this.items;
    };
    Collection.prototype.getcount = function () {
        return this.items.length;
    };
    Collection.prototype.getIterator = function () {
        return new iterator_1.Iterator(this);
    };
    return Collection;
}());
exports.Collection = Collection;
//colecion------- colecion.setitems(data); coleccion.setfiltro("hola"); iterador= coleccion.getIterator(); 