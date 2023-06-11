import { FilterByToStrategy, FilterByFromStrategy, FilterBySubjectStrategy, FilterByBodyStrategy, EmailFilter }from'./strategy.js';
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
    this.emailFilter = new EmailFilter(this.filterbySubject);

    Singleton.instance = this;
  }

  getEmail() {
    return this.emailFilter;
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
