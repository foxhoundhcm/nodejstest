import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import {
  graphqlKoa
} from 'graphql-server-koa';
import graphqlHTTP from 'koa-graphql';

import Schema from './schema';

// var koa = require('koa');
// var koaRouter = require('koa-router');
// var koaBody = require('koa-bodyparser');
// var { graphqlKoa } = require('graphql-server-koa');

// var Schema = require('./schema');

const app = new koa();
const router = new koaRouter();
const PORT = 3000;
app.use(koaBody());
// router.post('/graphql', graphqlKoa({ schema: Schema }));
// router.get('/graphql', graphqlKoa({ schema: Schema }));

router.all('/graphql', graphqlHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT, () => {
  console.log(`\nApp listening on port ${PORT}`);
});
