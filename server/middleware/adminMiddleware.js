const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const { CustomAPIError } = require("../errors/custom_error.js");

const Account = require("../models/Account.js");

async function adminMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ err: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { accId } = decoded;
    req.user = { accId };

    const acc = await Account.findOne({ _id: accId });
    req.user.isAdmin = acc.isAdmin;

    if (!req.user.isAdmin) {
      throw new CustomAPIError(
        "Not authorized to access this route",
        StatusCodes.UNAUTHORIZED
      );
    }
  } catch {
    next(
      new CustomAPIError(
        "Not authorized to access this route",
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  next();
}

module.exports = adminMiddleware;
