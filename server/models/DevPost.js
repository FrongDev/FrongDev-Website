const mongoose = require("mongoose");

const devPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "DevPostComment" }],
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  { collection: "DevPosts" }
);

devPostSchema.pre("findOneAndDelete", async function (next) {
  const devPost = await this.model.findOne(this.getQuery());

  try {
    const DevPostComment = mongoose.model("DevPostComment");
    await DevPostComment.deleteMany({ _id: { $in: devPost.comments } });
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("DevPost", devPostSchema);
