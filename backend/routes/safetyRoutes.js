const express = require("express");
const router = express.Router();

const SafetyData = require("../models/SafetyData");

router.get("/", async (req, res) => {
  try {
    const data = await SafetyData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;