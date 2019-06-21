const path = require("path");
const Copier = require("./copier");

/// dirs from client
const dirForClientAssets = path.join(
  __dirname,
  "..",
  "..",
  "client",
  "public",
  "assets"
);
const dirForClientJS = path.join(dirForClientAssets, "js");
const dirForClientCSS = path.join(dirForClientAssets, "css");
const dirForClientImages = path.join(dirForClientAssets, "img");
const dirForClientTemplates = path.join(
  __dirname,
  "..",
  "..",
  "client",
  "source",
  "template"
);

/// dirs to server
const dirForServerAssets = path.join(__dirname, "..", "..", "server", "public");
const dirForServerJS = path.join(dirForServerAssets, "javascripts");
const dirForServerCSS = path.join(dirForServerAssets, "stylesheets");
const dirForServerImages = path.join(dirForServerAssets, "images");
const dirForServerTemplates = path.join(
  __dirname,
  "..",
  "..",
  "server",
  "views"
);

const arrayToCopy = [
  { from: dirForClientJS, to: dirForServerJS },
  { from: dirForClientCSS, to: dirForServerCSS },
  { from: dirForClientImages, to: dirForServerImages },
  { from: dirForClientTemplates, to: dirForServerTemplates }
];

// const copierStatic = new Copier({ dirsFromClient, dirsForServer });
const copierStatic = new Copier({ arrayToCopy });

copierStatic.init();
