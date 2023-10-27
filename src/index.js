const http = require("http");
const getUsers = require("./modules/users");

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const query = url.searchParams;

  if (query.has("hello")) {
    const name = query.get("hello");
    if (name) {
      response.statusCode = 200;
      response.setHeader = "Content-Type: text/plain";
      response.write(`Hello, ${name}!`);
      response.end();
      return;
    }
    response.statusCode = 400;
    response.setHeader = "Content-Type: text/plain";
    response.write(`Enter a name`);
    response.end();
    return;
  }
  else if (url.pathname === "/users") {
    response.statusCode = 200;
    // response.statusMessage = "OK";
    response.setHeader = "Content-Type: application/json";
    response.write(getUsers());
    response.end();
    return;
  }
  else if (url.search === "") {
    response.statusCode = 200;
    // response.statusMessage = "OK";
    response.setHeader = "Content-Type: text/plain";
    response.write("Hello, world!");
    response.end();
  } else {
    response.statusCode = 500;
    response.end();
    return;
  }
});
const hostname = '127.0.0.1';
const port = 3003;
server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
