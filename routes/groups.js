// Group-related routes
const express = require("express");
const router = express.Router();
const splitzyContract = require("../config/contract");

// GET /groups?address=0x123...
router.get("/", async (req, res) => {
    try {
      const address = req.query.address?.toLowerCase();
      if (!address) {
        return res.status(400).json({ error: "User address is required" });
      }
  
      const count = await splitzyContract.groupCount();
      const userGroups = [];
  
      for (let i = 0; i < count; i++) {
        const group = await splitzyContract.groups(i);
        const groupDetails = await splitzyContract.getGroup(group.id);
  
        const isMember = groupDetails.members.some(
          (member) => member.toLowerCase() === address
        );
  
        if (isMember) {
          userGroups.push({
            id: group.id.toString(),
            name: group.name,
            members: groupDetails.members,
          });
        }
      }
  
      res.json(userGroups);
    } catch (err) {
      console.error("Error fetching user groups:", err);
      res.status(500).json({ error: "Failed to fetch groups" });
    }
});

// GET /groups/:groupId
router.get("/:groupId", async (req, res) => {
    try {
      const groupId = req.params.groupId;
      const group = await splitzyContract.getGroup(groupId);
      res.json({
        id: groupId,
        name: group.name,
        members: group.members,
      });
    } catch (err) {
      console.error("Error fetching group:", err);
      res.status(500).json({ error: "Failed to fetch group" });
    }
});
  
  
// POST /groups
router.post("/", async (req, res) => {
  const { name, members } = req.body;
  try {
    const tx = await splitzyContract.createGroup(name, members);
    await tx.wait();
    res.json({ message: "Group created successfully", txHash: tx.hash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create group" });
  }
});

// POST /groups/bill
router.post("/bill", async (req, res) => {
  const { groupId, title, totalAmount, payees, amounts } = req.body;
  try {
    const tx = await splitzyContract.createBill(groupId, title, totalAmount, payees, amounts);
    await tx.wait();
    res.json({ message: "Bill created successfully", txHash: tx.hash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create bill" });
  }
});

// POST /groups/pay
router.post("/pay", async (req, res) => {
  const { billId } = req.body;
  try {
    const tx = await splitzyContract.payBill(billId);
    await tx.wait();
    res.json({ message: "Payment successful", txHash: tx.hash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment failed" });
  }
});

module.exports = router;
