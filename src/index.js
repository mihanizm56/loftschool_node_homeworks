require("dotenv").config();

const http = require("http");
const SERVER_PORT = process.env.PORT || 3000;

const { makeTimer } = require("./utils");

const server = http.createServer((request, responce) => {
	if (request.method === "GET") {
		makeTimer(responce);
	}
});

server.listen(SERVER_PORT, () => {
	console.log(`Server running on port: ${SERVER_PORT}`);
});
