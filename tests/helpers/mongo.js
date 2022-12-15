class MongoHelper {
  constructor(uri) {
    this.uri = uri;
  }

  connect() {}

  close() {}

  read(query) {
    return 'successful';
  }

  write(query) {
    return 'successful';
  }
}

export { MongoAdapter };
