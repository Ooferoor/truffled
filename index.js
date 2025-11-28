const express = require("express");
const http = require("http");
const { createBareServer } = require("@tomphttp/bare-server-node");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    // relaly stupid fix

    if (
        req.path.includes("portal")
    ) {
        res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
        res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    }
    next();
});
app.use(express.static("public"));
function toIPv4(ip) {
  if (!ip) return '127.0.0.1';
  if (ip.includes(',')) ip = ip.split(',')[0].trim();
  if (ip.startsWith('::ffff:')) ip = ip.replace('::ffff:', '');
  return ip.match(/^(\d{1,3}\.){3}\d{1,3}$/) ? ip : '127.0.0.1';
}
app.get('/ip', (req, res) => {
  const rawIp = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ipv4 = toIPv4(rawIp);
  const prefix = ipv4.split('.')[0];
  res.send(prefix);
});
const routes = [
  { path: "/", file: "index.html" },
  { path: "/g", file: "games.html" },
  { path: "/i", file: "iframe.html" },
  { path: "/u", file: "unityframe.html" },
  { path: "/p", file: "profile.html" },
  { path: "/t", file: "tools.html" },
  { path: "/s", file: "settings.html" },
  { path: "/404", file: "404.html" },
];

routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(__dirname, "public", route.file));
  });
});

app.use((req, res) => {
  res.redirect("/404");
});

const bareServer = createBareServer("/b/");
const server = http.createServer((req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
