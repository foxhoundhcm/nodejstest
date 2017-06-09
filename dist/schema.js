'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Person = new _graphql.GraphQLObjectType({
  name: 'Person',
  description: 'This represents a Person',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(person) {
          return person.id;
        }
      },
      firstName: {
        type: _graphql.GraphQLString,
        resolve: function resolve(person) {
          return person.firstName;
        }
      },
      lastName: {
        type: _graphql.GraphQLString,
        resolve: function resolve(person) {
          return person.lastName;
        }
      },
      email: {
        type: _graphql.GraphQLString,
        resolve: function resolve(person) {
          return person.email;
        }
      },
      posts: {
        type: new _graphql.GraphQLList(Post),
        resolve: function resolve(person) {
          return person.getPosts();
        }
      }
    };
  }
});

var Post = new _graphql.GraphQLObjectType({
  name: 'Post',
  description: 'This is a Post',
  fields: function fields() {
    return {
      id: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(post) {
          return post.id;
        }
      },
      title: {
        type: _graphql.GraphQLString,
        resolve: function resolve(post) {
          return post.title;
        }
      },
      content: {
        type: _graphql.GraphQLString,
        resolve: function resolve(post) {
          return post.content;
        }
      },
      person: {
        type: Person,
        resolve: function resolve(post) {
          return post.getPerson();
        }
      }

    };
  }
});

var Query = new _graphql.GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: function fields() {
    return {
      people: {
        type: new _graphql.GraphQLList(Person),
        args: {
          id: {
            type: _graphql.GraphQLInt
          },
          email: {
            type: _graphql.GraphQLString
          }
        },
        resolve: function resolve(root, args) {
          return _db2.default.models.person.findAll({ where: args });
        }
      },
      posts: {
        type: new _graphql.GraphQLList(Post),
        resolve: function resolve(root, args) {
          return _db2.default.models.post.findAll({ where: args });
        }
      }
    };
  }
});

var Mutation = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  description: 'Functions to create stuff',
  fields: function fields() {
    return {
      addPerson: {
        type: Person,
        args: {
          firstName: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
          },
          lastName: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
          },
          email: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
          }
        },
        resolve: function resolve(_, args) {
          return _db2.default.models.person.create({
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email.toLowerCase()
          });
        }
      },
      delPerson: {
        type: _graphql.GraphQLString,
        args: {
          id: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
          }
        },
        resolve: function resolve(_, args) {
          _db2.default.models.person.findById(args.id).then(function (person) {
            person.destroy().then(function (result) {
              console.log('Success');
            }).catch(function (err) {
              console.log(err);
            });
          });
        }
      }
    };
  }
});

var Schema = new _graphql.GraphQLSchema({
  query: Query,
  mutation: Mutation
});

exports.default = Schema;