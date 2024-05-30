const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
exports.auth = async (req, res, next) => {
  try {
    const tokens = req.headers["authorization"];
    const { token } = req.body;
    if (!token) {
      console.log(token);
      return res.status(401).send("no token");
    }
    const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
    req.user = decode.user;
    next();
  } catch (err) {
    return res.send(err).status(500);
  }
};
