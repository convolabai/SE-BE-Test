db.createUser({
  user: 'SEBEApp',
  pwd: '1234',
  roles: [
    {
      role: 'readWrite',
      db: 'test',
    },
  ],
});

db = db.getSiblingDB('test');
db.dropDatabase();
