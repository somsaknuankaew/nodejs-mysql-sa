const getPool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
///register
exports.register = async (req, res) => {
  const user = req.body.user;
  const fullname = req.body.fullname;
  var pass = req.body.pass;
  var pass2 = req.body.pass2;
  //let errors = [];
  try {
    if (!user || !pass || !pass2) {
      return res
        .status(400)
        .json({ messsage: "Please fill in all the fields" });
    }
    if (pass != pass2) {
      return res.status(400).json({ messsage: "Password not match!!!" });
    }
    let [results] = await getPool().query("SELECT * FROM user WHERE user = ?", [
      user,
    ]);
    getPool.release;

    if (results.length > 0) {
      return res
        .status(404)
        .json({ Message: "User Already exit!!! please change user" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const haspass = await bcrypt.hash(pass, salt);

      const result1 = await getPool().query(
        "insert into user(user,pass,fullname) values(?,?,?)",
        [user, haspass, fullname]
      );
      getPool.release;
      res.status(200).json(result1[0]);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

///login
exports.logins = async (req, res) => {
  const user = req.body.email;
  const pass = req.body.password;

  try {
    //check user
    if (!user || !pass) {
      return res
        .status(400)
        .json({ messsage: "Please insert in all the fields" });
    }

    let [results] = await getPool().query("SELECT * FROM user WHERE user = ?", [
      user,
    ]);
    getPool.release;
    if (results.length === 0) {
      return res.status(404).json({ Message: "Invalid username" });
    } else {
      //payload
      // console.log(results);
      const storedHashedPassword = results[0].pass;
      const passwordMatch = await bcrypt.compare(pass, storedHashedPassword);
      if (passwordMatch) {
        //generate
        const token = jwt.sign({ user: user }, process.env.JWT_LOGIN_TOKEN, {
          expiresIn: "1h",
        });
        return res.json({ status: "ok", token: token, name: user });
      } else {
        return res.status(400).json({ status: "Invalid username or password" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server login error");
  }
};

exports.auths = (req, res) => {
  const { token } = req.body;
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
      res.json({
        auth: true,
        data: decode,
      });
    } catch (error) {
      res.json({
        auth: false,
        data: error.message,
      });
    }
  } else {
    res.json({
      auth: false,
      data: "No Token Found in request",
    });
  }
};
