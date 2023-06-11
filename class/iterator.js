class Iterator {
    constructor(coleccion) {
        this.coleccion = coleccion;
        this.position = 0;
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
        let res = this.position < this.coleccion.getcount();
        if (res == false) {
            this.rewind()
        }
        return res
    }
}

module.exports = {
    Iterator
};
