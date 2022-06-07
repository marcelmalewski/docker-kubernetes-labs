const express = require("express");
const cors = require("cors");

const app = express();

app.use(
   cors({
     origin: "http://localhost:30100",
   })
 );

app.get("/", (req, res) => {
  res.send("Hello from my node app!");
});

app.listen(4000, () => {
  console.log("listeinig");
});