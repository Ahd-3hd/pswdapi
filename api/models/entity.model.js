const mongoose = require("mongoose");

const EntitySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 3,
    createIndexes: true,
    unique: true,
  },
  account: {
    type: String,
    required: true,
    min: 3,
  },
  password: {
    type: String,
    required: true,
    min: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
    required: true,
  },
});

const Entity = mongoose.model("Entity", EntitySchema);

module.exports = Entity;
