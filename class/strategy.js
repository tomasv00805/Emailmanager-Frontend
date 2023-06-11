// Interfaz Strategy
class FilterStrategy {
  filterEmails(emails) {}
}

// Estrategia concreta para filtrar por campo "to"
class FilterByToStrategy extends FilterStrategy {
  setfilter(to) {
    this.to = to
  }

  filterEmails(emails) {
    return emails.filter((email) => email.to.toLowerCase().includes(this.to.toLowerCase()));
  }
}

// Estrategia concreta para filtrar por campo "from"
class FilterByFromStrategy extends FilterStrategy {
  setfilter(from) {
    this.from = from
  }

  filterEmails(emails) {
    return emails.filter((email) => email.from.toLowerCase().includes(this.from.toLowerCase()));
  }
}

// Estrategia concreta para filtrar por campo "subject"
class FilterBySubjectStrategy extends FilterStrategy {
  setfilter(subject) {
    this.subject = subject
  }

  filterEmails(emails) {
    return emails.filter((email) => email.subject.toLowerCase().includes(this.subject.toLowerCase()));
  }
}

// Estrategia concreta para filtrar por campo "body"
class FilterByBodyStrategy extends FilterStrategy {
  setfilter(body) {
    this.body = body
  }

  filterEmails(emails) {
    return emails.filter((email) => email.body.toLowerCase().includes(this.body.toLowerCase()));
  }
}

module.exports = {
    FilterByToStrategy,
    FilterByFromStrategy,
    FilterBySubjectStrategy,
    FilterByBodyStrategy,
};
