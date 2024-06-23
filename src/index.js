const Koa = require('koa');
const Router = require('koa-router');
const buildFront = require('./buildFront');
const buildBack = require('./buildBack');

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

router.post('/buildFront', () => {
  buildFront();
});
router.post('/buildBack', () => {
  buildBack();
});
router.post('/buildNextEditServer', () => {
  buildNextEditServer();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(`web静态服务已启动:${port}`);
});
