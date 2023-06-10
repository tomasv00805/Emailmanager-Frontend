import { Iterator } from './iterator.js';

export class Collection {
    constructor() {
        this.items = [];
        this.filtro = "";
    }

    setitems(lista) {
        this.items = lista;
    }

    setfiltro(filtro) {
        this.filtro = filtro;
    }

    getItems() {
        return this.items;
    }

    getcount() {
        return this.items.length;
    }

    getIterator() {
        return new Iterator(this);
    }
} 