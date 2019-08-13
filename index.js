const express = require("express");
const morgan = require("morgan");

const app = express();

app.get("/Hi", (req, res) => {
  res.send("hi");
});

app.use(morgan("dev"));
app.use("/api", require("./API_Routes/routes"));

const PORT = 4000 || process.env.PORT;

app.listen(PORT, _ => {
  console.log(`Server running on ${PORT}`);
});
