const express = require("express");
const morgan = require("morgan");

const app = express();

// app.use(morgan("tiny"));

// morgan.token("type", function (req, res) {
//   return req.headers["content-type"];
// });

// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms :type")
// );

const fs = require("fs");
const path = require("path");

const accesslogstream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accesslogstream }));

app.get("/", (req, res) => {
  res.send("hello, morgan!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
