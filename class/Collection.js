const { Iterator } = require('./iterator.js');

class Collection {
    constructor() {
        this.items = [];
    }

    setitems(lista) {
        this.items = lista;
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

module.exports = {
    Collection
};
