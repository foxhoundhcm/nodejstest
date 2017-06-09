'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Person from './Person';


var Conn = new _sequelize2.default('test', 'root', '159951', {
  host: '192.168.1.200',
  port: '3036',
  dialect: 'mariadb',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var Person = Conn.import("Person");

var Post = Conn.import("Post");

Person.hasMany(Post);
Post.belongsTo(Person);

Conn.sync({
  force: true
}).then(function () {
  _lodash2.default.times(10, function () {
    return Person.create({
      firstName: _faker2.default.name.firstName(),
      lastName: _faker2.default.name.lastName(),
      email: _faker2.default.internet.email()
    }).then(function (person) {
      return person.createPost({
        title: 'Sample title by ' + person.firstName,
        content: 'This is a sample article'
      });
    });
  });
}).then(function (post) {
  console.log('done!');
});

exports.default = Conn;