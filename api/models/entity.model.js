const mongoose = require("mongoose");

const EntitySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    createIndexes: true,
  },
  value: {
    type: String,
    required: true,
    min: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Entity = mongoose.model("Entity", EntitySchema);

module.exports = Entity;
