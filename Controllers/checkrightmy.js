const getPool = require("../config/mydb");
exports.testlog = async (req, res) => {
  try {
    const connection = await getPool.getConnection();
    const results = await connection.query("select *   from cright_log");
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.send(results[0][0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  } finally {
    await connection.release();
  }
};
