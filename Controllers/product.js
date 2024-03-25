const getPool = require("../config/db");

exports.list = async (req, res, next) => {
  try {
    const results = await getPool().query("select * from user");
    if (results == "") {
      res.status(404).json({ message: "No User found" });
    } else {
      res.status(200).json(results[0]);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.read = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await getPool().query("select * from user where id=?", [
      id,
    ]);
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.send(results[0][0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  const { user, pass, fullname } = req.body;
  try {
    const results = await getPool().query(
      "insert  into user(user,pass,fullname)values(?,?,?)",
      [user, pass, fullname]
    );
    if (results[0].affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(201).json({ message: "User Cerate Successfully", ids });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  const ids = req.params.id;
  const datas = req.body;
  try {
    const updateQuery = "UPDATE user SET ? WHERE id = ? ";
    const results = await getPool().query(updateQuery, [datas, ids]);
    if (results[0].affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", userId: ids });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.del = async (req, res) => {
  const ids = req.params.id;
  try {
    const results = await getPool().query("delete from user where id=?", [ids]);
    if (results[0].affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "Delete complete", ids });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
