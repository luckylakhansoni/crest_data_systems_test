const jwt = require("jsonwebtoken");
const Bcrypt = require("bcryptjs");
const { JWT } = require("../utils/constant");


exports.jwtToken = async (id, type) => {
  return jwt.sign({ user_id: id, }, JWT.tokenString, {
    expiresIn: "1d",
  });
};

exports.createPassword = async (password) => {
  return Bcrypt.hashSync(password, 10);
};