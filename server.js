const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({ limit: "10mb" }));

const { readdirSync } = require("fs");
readdirSync("./Routes").map((r) => app.use("/api", require("./Routes/" + r)));

app.listen(5000, async () => {
  // เรียกใช้ connectMySQL ตอน start server
  console.log("Server started on port 5000");
});
