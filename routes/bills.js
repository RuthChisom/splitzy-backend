// bill-related routes
const express = require("express");
const router = express.Router();
const splitzyContract = require("../config/contract");

// GET /bills/:userAddress
router.get("/:userAddress", async (req, res) => {
  try {
    const bills = await splitzyContract.getMyBills(req.params.userAddress);
    res.json({ userBills: bills });
  } catch (err) {
    res.status(500).json({ error: "Error fetching user's bills" });
  }
});

// GET /bills/:billId/amount/:userAddress
router.get("/:billId/amount/:userAddress", async (req, res) => {
  const { billId, userAddress } = req.params;
  try {
    const [amount, hasPaid] = await splitzyContract.checkMyAmount(billId, userAddress );;
    res.json({ amount: amount.toString(), hasPaid });
  } catch (err) {
    res.status(500).json({ error: "Error checking user amount"});
  }
});

module.exports = router;
