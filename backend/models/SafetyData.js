const mongoose = require("mongoose");

const SafetyDataSchema = new mongoose.Schema({
  state: String,
  crimeCount: Number,
  safetyScore: Number,
  riskLevel: String,
});

module.exports = mongoose.model(
  "SafetyData",
  SafetyDataSchema
);