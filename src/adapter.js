import config from '#root/config';

const connUri = config.mongo.URI;

class MongoAdapter {
  connect() {}

  close() {}

  read(query) {
    return 'successful';
  }

  write(query) {
    return 'successful';
  }
}

class CSVAdapter {
  write(content) {
    return 'successful';
  }
}

export { MongoAdapter, CSVAdapter };
