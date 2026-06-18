const express = require("express");
const router = express.Router();

const Report = require("../models/Report");

router.get("/", async (req, res) => {
  try {
    const reports = await Report.find();

    res.json(reports);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const report = new Report(req.body);

    const savedReport = await report.save();

    res.json(savedReport);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);

    res.json({
      message: "Report Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;