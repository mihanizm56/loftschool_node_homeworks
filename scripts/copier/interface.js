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
const dirForServerAssets = path.join(
  __dirname,
  "..",
  "..",
  "server",
  "public",
  "assets"
);
const dirForServerJS = path.join(dirForServerAssets, "js");
const dirForServerCSS = path.join(dirForServerAssets, "css");
const dirForServerImages = path.join(dirForServerAssets, "img");
const dirForServerTemplates = path.join(
  __dirname,
  "..",
  "..",
  "server",
  "src",
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
