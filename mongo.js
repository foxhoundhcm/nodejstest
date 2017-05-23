var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = 'mongodb://192.168.1.200:27017/test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");

  // Insert a single document
  db.collection('inserts').insertOne({
    a: 1
  }, function(err, r) {
    assert.equal(null, err);
    assert.equal(1, r.insertedCount);

    // Insert multiple documents
    db.collection('inserts').insertMany([{
      a: 2
    }, {
      a: 3
    }], function(err, r) {
      assert.equal(null, err);
      assert.equal(2, r.insertedCount);
      db.close();
    });
  });
});
