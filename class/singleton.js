const { FilterByToStrategy, FilterByFromStrategy, FilterBySubjectStrategy, FilterByBodyStrategy } = require('./strategy.js');
const { Collection } = require('./Collection.js');

// Singleton para las estrategias
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }

    this.filterByTo = new FilterByToStrategy();
    this.filterByFrom = new FilterByFromStrategy();
    this.filterByBody = new FilterByBodyStrategy();
    this.filterBySubject = new FilterBySubjectStrategy();
    this.collection = new Collection();

    Singleton.instance = this;
  }

  getFilterByToStrategy() {
    return this.filterByTo;
  }

  getFilterByFromStrategy() {
    return this.filterByFrom;
  }

  getFilterByBodyStrategy() {
    return this.filterByBody;
  }

  getFilterBySubjectStrategy() {
    return this.filterBySubject;
  }

  getCollection() {
    return this.collection;
  }
}

// Contexto
class EmailFilter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  filter(emails) {
    return this.strategy.filterEmails(emails);
  }
}

// Ejemplo de uso
const emails = [
  { to: "usuario1@example.com", from: "usuario2@example.com", subject: "Reunión", body: "Hola, te esperamos en la reunión." },
  { to: "usuario3@example.com", from: "usuario2@example.com", subject: "Proyecto", body: "Adjunto encontrarás el informe del proyecto." },
  { to: "usuario1@example.com", from: "usuario4@example.com", subject: "Invitación", body: "Te invitamos a nuestro evento." },
];

const singleton = new Singleton();

let filterByTo = singleton.getFilterByToStrategy();
let filterByFrom = singleton.getFilterByFromStrategy();
let filterBySubject = singleton.getFilterBySubjectStrategy();
let filterByBody = singleton.getFilterByBodyStrategy();
let col = singleton.getCollection()
iter = col.getIterator();

filterByTo.setfilter("io1")
filterByFrom.setfilter("io2")
filterBySubject.setfilter("i")
filterByBody.setfilter("TE")

const filter = new EmailFilter(filterByTo);
col.setitems(filter.filter(emails))
while (iter.valid()) {
    console.log(iter.next())
}
console.log("---------------------------------------------")

filter.setStrategy(filterByFrom);
col.setitems(filter.filter(emails))
while (iter.valid()) {
    console.log(iter.next())
}
console.log("---------------------------------------------")

filter.setStrategy(filterBySubject);
col.setitems(filter.filter(emails))
while (iter.valid()) {
    console.log(iter.next())
}
console.log("---------------------------------------------")

filter.setStrategy(filterByBody);
col.setitems(filter.filter(emails))
while (iter.valid()) {
    console.log(iter.next())
}
