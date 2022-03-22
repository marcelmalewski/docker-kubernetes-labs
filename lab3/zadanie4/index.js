const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("hello from nignx");
});

app.listen(8080, () => {
  console.log("listeinig");
});
