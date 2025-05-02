const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const billsRoutes = require("./routes/bills");
const groupsRoutes = require("./routes/groups");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Splitzy backend is live.");
});

app.use("/bills", billsRoutes);
app.use("/groups", groupsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
