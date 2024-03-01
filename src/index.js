// imports necesary to start the server
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./server/router/index");
const dotenv = require("dotenv");

dotenv.config();


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

// TODO: delete the URL to the server
const MONGO_URL =
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@shipstatus-cr.gj0ckdy.mongodb.net/?retryWrites=true&w=majority`;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error) => {
  console.log(error);
});

app.use("/", router());
