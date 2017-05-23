var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://192.168.1.200:27017/test';

var findInserts = function(db, callback) {
  var cursor = db.collection('inserts').find();
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    if (doc != null) {
      console.dir(doc);
    } else {
      callback();
    }
  });
};

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  findInserts(db, function() {
    db.close();
  });
});
