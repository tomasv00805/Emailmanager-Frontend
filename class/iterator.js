"use strict";
exports.__esModule = true;
exports.Iterator = void 0;
// Iterador concreto que implementa varios algoritmos de iteracion
var Iterator = /** @class */ (function () {
    function Iterator(coleccion) {
        // Guarda la posicion actual
        this.position = 0;
        this.coleccion = coleccion;
        if (this.coleccion.filtro != "") {
            this.filtrar(this.coleccion.getItems(), this.coleccion.filtro);
        }
    }
    Iterator.prototype.rewind = function () {
        this.position = 0;
    };
    Iterator.prototype.current = function () {
        return this.coleccion.getItems()[this.position];
    };
    Iterator.prototype.key = function () {
        return this.position;
    };
    Iterator.prototype.next = function () {
        var item = this.current();
        this.position += 1;
        return item;
    };
    Iterator.prototype.valid = function () {
        return this.position < this.coleccion.getcount();
    };
    Iterator.prototype.filtrar = function (lista, filtro) {
        var nuevalista = [];
        var i = 0;
        while (i <= lista.length) {
            if (lista[i].body.includes(filtro)) {
                nuevalista.push(lista[i]);
            }
            console.log(i);
            i += 1;
        }
        this.coleccion.setitems(nuevalista);
    };
    return Iterator;
}());
exports.Iterator = Iterator;