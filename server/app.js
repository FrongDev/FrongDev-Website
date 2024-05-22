// Packages
const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

const port = 5000;

const url = process.env.FRONTEND_URL;

app.use(cors({ origin: url }));

// External files
const connectDB = require("./db/connect.js");

// Middleware
app.use(express.json());

// Frontend
app.use(express.static(path.join(__dirname, "../client/dist")));

// Routers
const devPostRouter = require("./routes/devPost.js");
app.use("/api/v1/devPost", devPostRouter);

const accountRouter = require("./routes/account.js");
app.use("/api/v1/account", accountRouter);

// Error handler
const errorHandler = require("./middleware/error_handler.js");
app.use(errorHandler);

// 404
app.all("*", (req, res) => {
  res.status(404).send("Resource not found");
});

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);

    console.log("Connected to database");

    app.listen(port, "0.0.0.0", () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.log(`Could not connect to database. Error: ${err}`);
  }
}

start();
