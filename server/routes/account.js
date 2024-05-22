const express = require("express");

const { login, signup } = require("../controllers/account.js");

const accountRouter = express.Router();

// Base path: /api/v1/account
accountRouter.post("/signup", signup);
accountRouter.post("/login", login);

module.exports = accountRouter;
