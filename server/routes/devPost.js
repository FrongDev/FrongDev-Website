const express = require("express");

const {
  getDevPost,
  getDevPostPage,
  editDevPost,
  createDevPost,
  deleteDevPost,
  getPostComments,
  createComment,
  deleteComment,
} = require("../controllers/devPost.js");
const userMiddleware = require("../middleware/userMiddleware.js");
const adminMiddleware = require("../middleware/adminMiddleware.js");

const devPostRouter = express.Router();

// Base path: /api/v1/devPost

// Gets pageNum and pageSize as query parameters. pageNum is 1-indexed
devPostRouter.get("/getDevPostPage", getDevPostPage);
devPostRouter.get("/getDevPost/:id", getDevPost);
devPostRouter.get("/getDevPostComments/:postId", getPostComments);

// User stuff
devPostRouter.post("/createComment/:postId", userMiddleware, createComment);

// Admin stuff
devPostRouter.patch("/editDevPost/:id", adminMiddleware, editDevPost);
devPostRouter.post("/createDevPost", adminMiddleware, createDevPost);
devPostRouter.delete("/deleteDevPost/:id", adminMiddleware, deleteDevPost);
devPostRouter.delete("/deleteComment/:id", adminMiddleware, deleteComment);

module.exports = devPostRouter;
