import { Collection } from './Collection.js';

export class Iterator {
    constructor(coleccion) {
        this.coleccion = coleccion;
        this.position = 0;
        if (this.coleccion.filtro !== "") {
            this.filtrar(this.coleccion.getItems(), this.coleccion.filtro);
        }
    }

    rewind() {
        this.position = 0;
    }

    current() {
        return this.coleccion.getItems()[this.position];
    }

    key() {
        return this.position;
    }

    next() {
        const item = this.current();
        this.position += 1;
        return item;
    }

    valid() {
        return this.position < this.coleccion.getcount();
    }

    filtrar(lista, filtro) {
        let nuevalista = [];
        let i = 0;
        while (i < lista.length) {
            if (lista[i].body.includes(filtro)) {
                nuevalista.push(lista[i]);
            }
            console.log(i);
            i += 1;
        }
        this.coleccion.setitems(nuevalista);
    }
}