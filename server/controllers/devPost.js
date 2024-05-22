const { StatusCodes } = require("http-status-codes");
const { parseISO, format } = require("date-fns");

const Account = require("../models/Account.js");
const DevPost = require("../models/DevPost.js");
const DevPostComment = require("../models/DevPostComment.js");

const asyncWrapper = require("../middleware/async.js");

// Get a single dev post
const getDevPost = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const devPost = await DevPost.findOne({ _id: id });

  if (!devPost)
    return res.status(StatusCodes.NOT_FOUND).json({ err: "Post not found" });

  res.status(StatusCodes.OK).json(formatDevPost(devPost));
});

// Get page of dev posts
const getDevPostPage = asyncWrapper(async (req, res) => {
  if (!req.query.pageSize || !req.query.pageNum)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Page number and/or page size not given" });

  const pageSize = req.query.pageSize;
  const pageNum = req.query.pageNum;
  const pageNum0Index = pageNum - 1;

  // Get page of posts sorted descending with .skip and .limit
  const response = await DevPost.find({})
    .sort({ date: -1, _id: -1 })
    .skip(pageSize * pageNum0Index)
    .limit(pageSize);

  // Unpack data and convert date to string
  const devPostPage = response.map((devPost) => {
    return formatDevPost(devPost);
  });

  // Check if there is a previous / next page
  const totalPosts = await DevPost.countDocuments({});
  const totalPages = Math.ceil(totalPosts / pageSize);
  const isPrevPage = pageNum > 1;
  const isNextPage = totalPages > pageNum;

  res.json({ devPostPage, isPrevPage, isNextPage, totalPages });
});

// Edit a post
const editDevPost = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const correctedDate = parseISO(req.body.date);

  const editedDevPost = await DevPost.findOneAndUpdate(
    { _id: id },
    { ...req.body, date: correctedDate }
  );

  if (!editedDevPost) {
    return res.status(StatusCodes.NOT_FOUND).json({ err: "Post not found" });
  }

  res.status(StatusCodes.OK).json(editedDevPost);
});

// Create a post
const createDevPost = asyncWrapper(async (req, res) => {
  const correctedDate = parseISO(req.body.date);

  const newDevPost = await DevPost.create({ ...req.body, date: correctedDate });

  if (!newDevPost) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ err: "Failed to create post" });
  }

  res.status(StatusCodes.OK).json(newDevPost);
});

// Delete a post
const deleteDevPost = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const deletedPost = await DevPost.findOneAndDelete({ _id: id });

  if (!deletedPost) {
    return res.status(StatusCodes.NOT_FOUND).json({ err: "Post not found" });
  }

  res.status(StatusCodes.OK).json(deletedPost);
});

// Get comments for a post
const getPostComments = asyncWrapper(async (req, res) => {
  const { postId } = req.params;

  const devPost = await DevPost.findOne({ _id: postId });
  const postComments = await DevPostComment.find({
    _id: { $in: devPost.comments },
  });

  const allComments = await Promise.all(
    postComments.map(async ({ _id, authorId, comment, createdAt }) => {
      const acc = await Account.findOne({ _id: authorId });

      const username = acc ? acc.username : "Anonymous User";

      const readableDate = format(createdAt, "MMMM dd, yyyy");

      return {
        id: _id,
        authorId,
        authorUsername: username,
        comment,
        readableDate: readableDate,
        createdAt,
      };
    })
  );

  res.status(StatusCodes.OK).json(allComments);
});

// Create comment
const createComment = asyncWrapper(async (req, res) => {
  const { accId } = req.user;
  const { postId } = req.params;

  const devPost = await DevPost.findOne({ _id: postId });

  if (!devPost)
    return res.status(StatusCodes.NOT_FOUND).json({ err: "Post not found" });

  const newComment = await DevPostComment.create({
    postId,
    authorId: accId,
    ...req.body,
  });

  if (!newComment) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ err: "Failed to create comment" });
  }

  devPost.comments.push(newComment._id);
  await devPost.save();

  res.status(StatusCodes.OK).json(newComment);
});

// Delete a post
const deleteComment = asyncWrapper(async (req, res) => {
  const { id } = req.params;

  const deletedPost = await DevPostComment.findOneAndDelete({ _id: id });

  if (!deletedPost) {
    return res.status(StatusCodes.NOT_FOUND).json({ err: "Post not found" });
  }

  res.status(StatusCodes.OK).json(deletedPost);
});

// Renames _id to id and formats date
function formatDevPost(devPost) {
  const devPostObj = devPost.toObject();

  const readableDate = format(devPost.date, "MMMM dd, yyyy");
  const dateInput = format(devPost.date, "yyyy-MM-dd");

  return {
    ...devPostObj,
    id: devPost._id,
    readableDate,
    dateInput,
  };
}

module.exports = {
  getDevPost,
  getDevPostPage,
  editDevPost,
  createDevPost,
  deleteDevPost,
  getPostComments,
  createComment,
  deleteComment,
};
