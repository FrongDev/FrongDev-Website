const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const accountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 36,
      minlength: 1,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { collection: "Accounts" }
);

accountSchema.pre("save", async function (next) {
  const account = this;

  if (account.isModified("password") || account.isNew) {
    try {
      const hashedPassword = await bcrypt.hash(account.password, 10);
      account.password = hashedPassword;
      next();
    } catch (err) {
      next(err);
    }
  }
});

accountSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Account", accountSchema);
