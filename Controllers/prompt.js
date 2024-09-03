const getPool = require("../config/db");
const Pool = require("../config/mydb");
exports.create = async (req, res) => {
  const connection = await Pool.getConnection();
  const { user, pass, fullname } = req.body;
  try {
    const results = await connection.query(
      "insert  into user(user,pass,fullname)values(?,?,?)",
      [user, pass, fullname]
    );
    connection.release();
    if (results[0].affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(201).json({ message: "User Cerate Successfully", ids });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ status: false, result: null, message: error.message });
  }
};
