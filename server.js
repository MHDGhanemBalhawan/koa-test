const koa = require("koa");
const app = new koa();
const bodyParser = require("koa-parser");
const PORT = 4000;

const Router = require("koa-router");
const router = new Router();
app.use(bodyParser());
const posts = [
  {
    id: "1",
    name: "Node Developer",
    content: " lkjlsdjflkjdsj ljsdkjfaksjld"
  },
  {
    id: "2",
    name: "React Developer",
    content: " kkhjhghjgh ljghjhghjld"
  },
  {
    id: "3",
    name: "Backend Developer",
    content: " jytyjtjty dfgdfgdffaksjld"
  }
];

router.get("/", ctx => {
  ctx.body = "welcome to koa app";
});
router.get("/posts", ctx => {
  ctx.body = posts;
});

router.get("/posts/:id", ctx => {
  ctx.body = posts.find(post => post.id === ctx.params.id);
});

router.post("/posts", ctx => {
  console.log(ctx.request.body);
  let { id, name, content } = ctx.request.body;
  if (!id) {
    ctx.throw(400, "id is required field");
  }
  if (!name) {
    ctx.throw(400, "name is required field");
  }
  if (!content) {
    ctx.throw(400, "content is required field");
  }
  posts.push({ id, name, content });
  ctx.body = posts;
});
app.use(router.routes());

app.listen(PORT);

console.log("app is listening to port " + PORT);
