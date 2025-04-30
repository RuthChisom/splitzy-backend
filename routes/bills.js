const express = require("express");
const router = express.Router();
const splitzyContract = require("../config");

// GET /bills/:userAddress
router.get("/:userAddress", async (req, res) => {
  try {
    const bills = await splitzyContract.getMyBills({ from: req.params.userAddress });
    res.json({ userBills: bills });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /bills/:billId/amount/:userAddress
router.get("/:billId/amount/:userAddress", async (req, res) => {
  const { billId, userAddress } = req.params;
  try {
    const result = await splitzyContract.checkMyAmount(billId, { from: userAddress });
    const [amount, hasPaid] = result;
    res.json({ amount: amount.toString(), hasPaid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
