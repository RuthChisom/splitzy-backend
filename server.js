const express = require("express");
const app = express();
const billsRoutes = require("./routes/bills");

app.use("/bills", billsRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
