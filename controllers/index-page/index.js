const DATABASE = global.DATABASE;

const get = async ctx => {
  try {
    const { skills, products } = await DATABASE.emit("index/get", {});

    ctx.status = 200;
    ctx.render("index", { skills, products });
  } catch (error) {
    ctx.status = 500;
    ctx.render("index");
  }
};

module.exports = {
  get
};
