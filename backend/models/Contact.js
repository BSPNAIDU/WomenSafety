const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  relation: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  priority: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model(
  "Contact",
  ContactSchema
);