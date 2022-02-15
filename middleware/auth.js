const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.doctor;
const { JWT} = require("../utils/constant");
const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};
exports.isAuthenticate = async (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      let decoded = jwt.verify(req.authToken, JWT.tokenString);
      console.log({decoded})

      if (decoded.user_id) {
        let userDetails = await User.findOne({
          where: {
            id: decoded.user_id,
          },
        });
        if (userDetails) {
          req.userId = userDetails.user_id;
          return next();
        } else {
          return res
            .status(401)
            .json({ message: "You are not authorized to make this request" });
        }
      } else {
        return res
          .status(401)
          .json({ message: "You are not authorized to make this request" });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ message: "You are not authorized to make this request" });
    }
  });
};

