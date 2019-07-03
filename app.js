require("./services/event-emitter");
require("./database/db");

const createError = require("http-errors");
const path = require("path");
const router = require("./routes");

// koa package
const Koa = require("koa");
const Pug = require("koa-pug");
const koaBody = require("koa-body");
const static = require("koa-static");
const session = require("koa-session");
const app = new Koa();

// view engine setup

const pug = new Pug({
  viewPath: "./views/pages",
  basedir: "./views",
  pretty: true,
  noCache: true,
  app: app
});

app.use(
  koaBody({
    formidable: {
      uploadDir: path.join(__dirname, "public", "assets", "img", "products")
    },
    multipart: true
  })
);

app.use(
  session(
    {
      key: "koa:sess",
      maxAge: "session",
      overwrite: true,
      httpOnly: true,
      signed: false,
      rolling: false,
      renew: false
    },
    app
  )
);
app.use(static(path.join(__dirname, "public")));

// routes
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080, () => {
  console.log("Server running on localhost:8080");
});
