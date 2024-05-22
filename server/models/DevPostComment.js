const mongoose = require("mongoose");

const devPostCommentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DevPost",
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "DevPostComments" }
);

devPostCommentSchema.pre("findOneAndDelete", async function (next) {
  const devPostComment = await this.model.findOne(this.getQuery());
  console.log("test");

  try {
    const DevPost = mongoose.model("DevPost");
    await DevPost.updateOne(
      { _id: devPostComment.postId },
      { $pull: { comments: devPostComment._id } }
    );
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("DevPostComment", devPostCommentSchema);
