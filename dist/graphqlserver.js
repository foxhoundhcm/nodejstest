'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _graphqlServerKoa = require('graphql-server-koa');

var _koaGraphql = require('koa-graphql');

var _koaGraphql2 = _interopRequireDefault(_koaGraphql);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var koa = require('koa');
// var koaRouter = require('koa-router');
// var koaBody = require('koa-bodyparser');
// var { graphqlKoa } = require('graphql-server-koa');

// var Schema = require('./schema');

var app = new _koa2.default();
var router = new _koaRouter2.default();
var PORT = 3000;
app.use((0, _koaBodyparser2.default)());
// router.post('/graphql', graphqlKoa({ schema: Schema }));
// router.get('/graphql', graphqlKoa({ schema: Schema }));

router.all('/graphql', (0, _koaGraphql2.default)({
  schema: _schema2.default,
  pretty: true,
  graphiql: true
}));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT, function () {
  console.log('\nApp listening on port ' + PORT);
});