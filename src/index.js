const Koa = require('koa');
const Router = require('koa-router');
const buildFront = require('./buildFront');

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000



router.get("/buildFront", () => {
    buildFront()
})
router.get("/buildBack", () => {

})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
    console.log(`web静态服务已启动:${port}`);
});
