import { FilterByToStrategy, FilterByFromStrategy, FilterBySubjectStrategy, FilterByBodyStrategy }from'./strategy.js';
import { Collection } from'./Collection.js';

// Singleton para las estrategias
export class Singleton {
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
