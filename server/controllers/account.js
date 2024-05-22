const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const Account = require("../models/Account.js");

const asyncWrapper = require("../middleware/async.js");

// Makes token for signup / login
function makeToken(acc) {
  return jwt.sign(
    { accId: acc._id, username: acc.username, isAdmin: acc.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
}

// Create account and send jwt
const signup = asyncWrapper(async (req, res) => {
  console.log(req.body);

  const newAcc = await Account.create(req.body);

  const token = makeToken(newAcc);

  res.status(StatusCodes.OK).json({ token: token });
});

// Log into account and send jwt
const login = asyncWrapper(async (req, res) => {
  const { username, password } = req.body;

  const acc = await Account.findOne({ username: username });

  if (!acc) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid credentials" });
  }

  const isPasswordCorrect = await acc.comparePassword(password);

  if (isPasswordCorrect) {
    const token = makeToken(acc);

    res.status(StatusCodes.OK).json({ token: token });
  } else {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Invalid credentials" });
  }
});

module.exports = { signup, login };
