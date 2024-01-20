// imports necesary to start the server
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) with credentials support.
app.use(
  cors({
    credentials: true,
  })
);

// Use compression middleware to compress responses.
app.use(compression());

// Parse cookies attached to the client request.
app.use(cookieParser());

// Parse incoming JSON requests.
app.use(bodyParser.json());

// Create an HTTP server using the Express application.
const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

// TODO: add the URL to the new server
const MONGO_URL = '';
