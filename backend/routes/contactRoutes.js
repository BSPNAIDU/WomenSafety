const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);

    const savedContact = await contact.save();

    res.json(savedContact);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      message: "Contact Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;