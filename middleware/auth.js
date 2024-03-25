const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
exports.auth = async (req, res, next) => {
  try {
    const token = req.headers["atoken"];
    if (!token) {
      return res.status(401).send("no token");
    }
    const decode = jwt.verify(token, "secret_key");
    req.user = decode.user;
    next();
  } catch (err) {
    return res.send(err).status(500);
  }
};
