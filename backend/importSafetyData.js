const mongoose = require("mongoose");
const fs = require("fs");
const csv = require("csv-parser");

const SafetyData = require("./models/SafetyData");

mongoose.connect(
  "mongodb://127.0.0.1:27017/saferoute"
);

const results = [];

fs.createReadStream(
  "./dataset/17_Crime_by_place_of_occurrence_2014.csv"
)
  .pipe(csv())
  .on("data", (data) => {
    results.push(data);
  })
  .on("end", async () => {
    try {
      await SafetyData.deleteMany();

      for (const row of results) {
        const state = row["States/UTs"];

        const dacoity =
          Number(
            row[
              "TOTAL_DACOITY"
            ]
          ) || 0;

        const robbery =
          Number(
            row[
              "TOTAL_ROBBERY"
            ]
          ) || 0;

        const burglary =
          Number(
            row[
              "TOTAL_BURGLARY"
            ]
          ) || 0;

        const theft =
          Number(
            row[
              "TOTAL_THEFT"
            ]
          ) || 0;

        const crimeCount =
          dacoity +
          robbery +
          burglary +
          theft;

        let safetyScore =
          100 - crimeCount / 1000;

        if (safetyScore < 0)
          safetyScore = 0;

        let riskLevel = "Safe";

        if (safetyScore < 80)
          riskLevel = "Medium";

        if (safetyScore < 60)
          riskLevel = "High";

        await SafetyData.create({
          state,
          crimeCount,
          safetyScore,
          riskLevel,
        });
      }

      console.log(
        "✅ Dataset Imported Successfully"
      );

      process.exit();
    } catch (error) {
      console.log(error);
    }
  });